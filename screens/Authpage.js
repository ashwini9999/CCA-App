import React from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import {
  Image,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import FBSDK from 'react-native-fbsdk';
import imagegif from '../assets/images/Home-Page.gif';
import loading from '../assets/images/CCA-App_Loader.gif';
import cca from '../assets/images/cca-main-logo.png';
import axios from 'react-native-axios';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const { LoginButton, AccessToken, GraphRequestManager } = FBSDK;

import { create } from 'react-native-pixel-perfect';

//configuring google signin to integrate in app
GoogleSignin.configure();

//pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(-100), // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.fadeAnim, {
          toValue: -669 + Dimensions.get('window').width,
          easing: Easing.linear,
          duration: 20000,
        }),
        Animated.timing(this.state.fadeAnim, {
          toValue: -100,
          easing: Easing.linear,
          duration: 20000,
        }),
      ]),
      {
        iterations: -1,
      },
    ).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          left: fadeAnim, // Bind opacity to animated value
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: '',
      photoUrl: '',
      isLoading: false,
    };
    this.requestManager = new GraphRequestManager();
  }

  storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
      //   console.log("token saved");
      await AsyncStorage.setItem('signin', this.state.signedIn);
    } catch (error) {
      //console.log("error saving data");
    }
  };

  //signing in through fb 
  signInFB = async token => {
    console.log('fb login');
    this.setState({
      isLoading: true,
    });
    const res = await axios.get(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large),email`,
    );
    global.user_name = res.data.name;
    global.user_photo = res.data.picture.data.url || { imagegif };
    global.user_email = res.data.email || ' ';
    global.user_data = '';
    this.storeData('googletoken', token);
    this.storeData('user_name', res.data.name);
    this.storeData('user_photo', res.data.picture.data.url);
    this.storeData('user_email', res.data.email);
    this.storeData('loginType', 'fb');
    googletoken = token;
    console.log(user_name);
    this.setState({
      signedIn: true,
    });
    this.props.navigation.navigate('Main');
  };

  //signing in through google 
  _signInGoogle = async () => {
    this.setState({
      isLoading: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log(result);
      this.setState({
        signedIn: true,
        name: result.user.name,
        photoUrl: result.user.photo,
      });
      global.user_name = result.user.name;
      global.user_photo = result.user.photo || { imagegif };
      global.user_email = result.user.email || ' ';
      global.user_data = '';

      //console.log(result.accessToken);
      googletoken = result.user.id;
      // console.log(googletoken);
      this.storeData('googletoken', googletoken);
      this.storeData('user_name', result.user.name);
      this.storeData('user_photo', result.user.photo);
      this.storeData('user_email', result.user.email);
      this.storeData('loginType', 'google');
      this.props.navigation.navigate('Main');
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, flexDirection: 'row', backgroundColor: '#020122' }}>
          <FadeInView>
            {/* <View
              style={{
                position: "relative",
                width: "100%",
                height: "50%",
                left: 0
              }}
            > */}

            <Image
              style={{
                position: 'absolute',
                flex: 1,
                top: 0,
                // width: 500,
                // padding: 0,
                marginTop: 23,
                height: perfectSize(350),
              }}
              // resizeMode="contain"
              //sliding image appears
              source={require('../assets/images/photo_slide.png')}
            />
            {/* </View> */}
          </FadeInView>

          <Image
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
            }}
            source={require('../assets/images/login_rectangle.png')}
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              top: perfectSize(184),
            }}>
            <Image
              source={cca}
              resizeMode="contain"
              style={{
                width: perfectSize(157),
                height: perfectSize(80),
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: perfectSize(472),
              width: '100%',
              height: perfectSize(130),
              left: 0,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: perfectSize(94),
            }}>
            <View
              style={{
                position: 'absolute',
                top: '10%',
                opacity: this.state.isLoading == true ? 1 : 0,
              }}>
              <Image
                source={loading}
                style={{
                  height: 100,
                  width: 100,
                }}
              />
            </View>
            {/*fb login button*/}
            <View
              style={{
                opacity: this.state.isLoading == true ? 0 : 1,
              }}>
              <Image
                style={{

                  //position: "absolute",
                  //flex: 1,
                  width: perfectSize(172),
                  //height: perfectSize(40),
                  padding: 0,
                  opacity: this.state.isLoading == true ? 0 : 1,
                  //height: 50
                  // bottom: 168
                }}
                resizeMode="contain"
                source={require('../assets/images/fb_button.png')}
              />
              <LoginButton
                style={{
                  width: perfectSize(180),
                  height: perfectSize(45),
                  marginBottom: perfectSize(24),
                  opacity: 0,
                  position: 'absolute',
                }}
                readPermissions={['public_profile']}
                onLoginFinished={(error, result) => {
                  if (error) {
                    console.log(error);
                  } else if (result.isCancelled) {
                    console.log('cancled');
                  } else {
                    console.log('fb login');
                    AccessToken.getCurrentAccessToken()
                      .then(data => {
                        console.log('fb login btn');
                        console.log(data.accessToken);
                        this.signInFB(data.accessToken);
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  }
                }}
              />
            </View>
            {/*google login button*/}
            <View
              style={{
                opacity: this.state.isLoading == true ? 0 : 1,
              }}>
              <Image
                style={{
                  //position: "absolute",
                  //flex: 1,
                  width: perfectSize(172),
                  height: perfectSize(40),
                  marginBottom: perfectSize(24),
                  opacity: this.state.isLoading == true ? 0 : 1,
                  //height: 50
                  // bottom: 168
                }}
                //resizeMode="contain"
                source={require('../assets/images/google_button.png')}
              />
              <GoogleSigninButton
                style={{
                  width: perfectSize(180),
                  height: perfectSize(50),
                  marginBottom: perfectSize(24),
                  opacity: 0,
                  position: 'absolute',
                }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signInGoogle}
                disabled={this.state.isSigninInProgress}
              />
            </View>

            <View
              style={{
                position: 'relative',
                paddingTop: perfectSize(24),
                paddingBottom: perfectSize(82),
                flex: 1,
                width: undefined,
                height: undefined,
                textAlign: 'center',
                color: '#D8D8D8',
                justifyContent: 'center',
                alignItems: 'center',
              }}>

              <Text
                onPress={() => {
                  global.user_name = 'Champ';
                  global.user_photo = 'none';
                  global.user_email = 'none';
                  googletoken = '';
                  this.props.navigation.navigate('Main');
                }}
                resizeMode="contain"
                style={{
                  fontSize: perfectSize(16),
                  fontFamily: 'avenir-heavy',
                  color: '#ffffff',
                  opacity: this.state.isLoading == true ? 0 : 0.5,
                }}>
                {/*on sign in later, user is logged in with common username: 'champ'*/}
                sign in later
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 0,
  },
});
