import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Linking,
} from 'react-native';
import { create } from 'react-native-pixel-perfect';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
  }
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    // this.props.navigation.dispatch(navigateAction);
  };

  storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
      //   console.log("token saved");
      //await AsyncStorage.setItem('signin', this.state.signedIn,);
    } catch (error) {
      //   console.log("error saving data");
    }
  };

  componentDidMount = () =>
    AsyncStorage.getItem('loginType').then(value =>
      this.setState({ type: value }),
    );

  state = {
    userName: '',
    userPhoto: '',
    userEmail: '',
    googleToken: '',
    pdfUrl: '',
  };

  componentDidUpdate() {
    if (global.user_name != this.state.userName) {
      this.setState({ userName: global.user_name });
    }
    if (global.user_email != this.state.userEmail) {
      this.setState({ userEmail: global.user_email });
    }
    if (global.user_photo != this.state.userPhoto) {
      this.setState({ userPhoto: global.user_photo });
    }
    if (global.googletoken != this.state.googleToken) {
      this.setState({ googleToken: global.googletoken });
    }
    // console.log(this.state.userName.split(" ", 1)[0]);
  }

  googleSignout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingTop: perfectSize(42),
          paddingLeft: perfectSize(40),
          backgroundColor: '#fff',
        }}>
        <Image
          source={{ uri: this.state.userPhoto }}
          style={{
            height: perfectSize(80),
            width: perfectSize(80),
            borderRadius: 50,
          }}
        />

        <Text
          style={{
            paddingTop: perfectSize(26),
            fontFamily: 'avenir-heavy',
            fontSize: perfectSize(18),
            opacity: 0.9,
          }}>
          Hey,{this.state.userName}!
        </Text>
        <Text
          style={{
            paddingTop: perfectSize(1),
            display: this.state.googleToken == '' ? 'none' : 'flex',
            fontFamily: 'avenir-roman',
            fontSize: perfectSize(13),
            opacity: 0.7,
          }}>
          {this.state.user_email != 'none' ? this.state.userEmail : ''}
        </Text>
        <TouchableOpacity
          style={{
            paddingTop: perfectSize(48),
          }}
          onPress={() => {
            Linking.openURL(
              'https://drive.google.com/a/ccanitd.in/uc?authuser=1&id=1XKOVAzk_jspeB-p4X-pCMsmIKdtrIU6l&export=download',
            );
          }}>
          <Text
            style={{
              fontFamily: 'avenir-roman',
              fontSize: perfectSize(13),
            }}>
            {' '}
            FAQ
          </Text>
        </TouchableOpacity>
        {/*logout of app*/}
        <TouchableOpacity
          onPress={() => {
            console.log(this.state.type);
            if (this.state.type === 'fb') LoginManager.logOut();
            else this.googleSignout();
            this.storeData('loginType', '');
            this.storeData('googletoken', '').then(() => {
              this.props.navigation.navigate('Login');
            });
          }}
          style={{
            paddingTop: perfectSize(24),
            display: this.state.googleToken == null ? 'none' : 'flex',
          }}>
          <Text
            style={{
              fontFamily: 'avenir-roman',
              fontSize: perfectSize(13),
              opacity: this.state.googleToken == '' ? 0 : 0.9,
            }}>
            {' '}
            LOG OUT{' '}
          </Text>
          {/*to log in when user is logged out*/}
          <Text
            style={{
              fontFamily: 'avenir-roman',
              fontSize: perfectSize(13),
              opacity: this.state.googleToken == '' ? 0.9 : 0,
            }}>
            {' '}
            LOG IN{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: perfectSize(24),
            left: perfectSize(16),
          }}>
          <Text
            style={{
              fontFamily: 'avenir-roman',
              fontSize: perfectSize(10),
              paddingRight: perfectSize(5),
              paddingBottom: perfectSize(10),
            }}
            onPress={() => {
              Linking.openURL('https://www.ccanitd.in/privacy_policy.html');
            }}>
            Privacy policy url
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'avenir-roman',
                fontSize: perfectSize(10),
                paddingRight: perfectSize(5),
              }}>
              Made with
            </Text>
            <Image
              source={require('../assets/images/heart.png')}
              style={{ width: perfectSize(10), height: perfectSize(10) }}
            />
          </View>
          <Text
            style={{
              fontFamily: 'avenir-heavy',
              fontSize: perfectSize(10),
            }}>
            by Web, Design & Creative Team, CCA
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    height: 150,
  },
  headerText: {
    color: '#fff8f8',
  },
  screenContainer: {
    paddingTop: 20,
  },
  screenStyle: {
    height: 30,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  screenTextStyle: {
    fontSize: 20,
    marginLeft: 20,
  },
});
