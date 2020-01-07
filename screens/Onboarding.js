import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  AsyncStorage,
  Image,
} from 'react-native';
import imagegif from '../assets/images/Home-Page.gif';

import Btn from '../components/Buttons';
import Swiper from 'react-native-swiper';
import { withNavigation } from 'react-navigation';
import { create } from 'react-native-pixel-perfect';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

async function retrieveItem(key) {
  try {
    //fetching data
    const retrievedItem = await AsyncStorage.getItem(key);
    return retrievedItem;
  } catch (error) {
    //console.log(error.message);
  }
  return;
}

class Onboarding extends Component {
  //screen navigation
  static navigationOptions = {
    header: null,
  };


  storeData = async (key, data) => {
    try {
      //persisting data
      await AsyncStorage.setItem(key, data);
      console.log('token saved');
      await AsyncStorage.setItem('signin', this.state.signedIn);
    } catch (error) {
      //console.log("error saving data");
    }
  };

  componentDidMount() {
    let token = retrieveItem('onboarding').then(token => {
      if (token == 'done') {
        this.props.navigation.navigate('Login');
      } else {
        this.storeData('onboarding', 'done');
      }
    });
    global.user_name = 'Champ';
    global.user_photo = 'none';
    global.user_email = 'none';
    googletoken = '';
  }

  render() {
    //storing user details; name,email,photo..
    let token = retrieveItem('googletoken')
      .then(token => {
        // console.log("check - " + token);
        if (token) {
          retrieveItem('user_name').then(name => {
            global.user_name = name;
            retrieveItem('user_email').then(email => {
              global.user_email = email;
              retrieveItem('user_photo').then(photo => {
                global.user_photo = photo;
                global.user_data = '';
                googletoken = token;
                this.props.navigation.navigate('Main');
              });
            });
          });
        }
        return token;
      })
      .catch(error => {
        //console.log("Promise is rejected with error: " + error);
      });

    return (
      //swipeable screens
      <Swiper
        paginationStyle={{
          bottom: '5.6%',
        }}
        dotColor={'#d8d8d8'}
        dotStyle={{ opacity: 0.5, marginRight: 7, marginLeft: 7 }}
        activeDotColor={'#d8d8d8'}
        activeDotStyle={{ opacity: 1, marginRight: 7, marginLeft: 7 }}
        showsButtons={true}
        buttonWrapperStyle={{
          paddingRight: '6.6%',
          paddingLeft: '6.6%',
          //marginBottom:'7%',
          alignItems: 'flex-end',
          paddingVertical: 0,
          paddingBottom: '5%',
        }}
        //prevButton

        //skip button
        skipButton={
          <Text
            style={{
              fontFamily: 'avenir-heavy',
              fontSize: perfectSize(16),
              opacity: 0.5,
              color: 'white',
            }}>
            skip
          </Text>
        }
        //next button
        nextButton={
          <Text
            style={{
              fontFamily: 'avenir-heavy',
              fontSize: perfectSize(16),
              color: 'white',
            }}>
            next
          </Text>
        }
        loop={false}>
        {/* First screen */}
        <View
          style={{
            opacity: token == ' ' ? 0 : 1,
          }}>
          <ImageBackground
            source={require('../assets/images/ONB-1(3x).jpg')}
            style={{ width: '100%', height: '100%' }}>
            <Text style={style.headertxt}>IDEATE</Text>
            <Text style={style.detailtxt}>
              CCA perches on pensive learning and applications based on vast
              technical acumen serving as one of our principle motto
            </Text>
          </ImageBackground>
        </View>

        {/* Second screen */}
        <View>
          <ImageBackground
            source={require('../assets/images/ONB-2(3X).jpg')}
            style={{ width: '100%', height: '100%' }}>
            <Text style={style.headertxt}>INNOVATE</Text>
            <Text style={style.detailtxt}>
              Incept the idea of innovation in your mind with us, by going
              through all the dimensions and possibilities of Evolving
              Technology
            </Text>
          </ImageBackground>
        </View>

        {/* Third screen */}
        <View>
          <ImageBackground
            source={require('../assets/images/ONB-3(3X).jpg')}
            style={{ width: '100%', height: '100%' }}>
            <Text style={style.headertxt}>INSPIRE</Text>
            <Text style={style.detailtxt}>
              We believe that knowledge can surpass any boundary and inspire
              others with their ideas to make the world a better place
            </Text>

            //after done login screen appears
            <View style={style.endbtnstyle}>
              <Btn
                text="done"
                textStyle={{
                  opacity: 1,
                  paddingRight: 10,
                  color: '#ffffff',
                  fontFamily: 'avenir-heavy',
                  fontSize: perfectSize(16),
                }}
                onPress={() => this.props.navigation.navigate('Login')}
              />
            </View>
          </ImageBackground>
        </View>
      </Swiper>
    );
  }
}

const style = StyleSheet.create({
  headertxt: {
    color: 'white',
    position: 'absolute',
    top: '68%',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'avenir-black',
    fontSize: perfectSize(17),
  },
  detailtxt: {
    color: 'white',
    position: 'absolute',
    top: '73.75%',
    width: '78.9%',
    textAlign: 'center',
    marginLeft: perfectSize(38),
    fontFamily: 'avenir-roman',
    fontSize: perfectSize(14),
    lineHeight: 22,
  },
  btnstyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: '5%',
    left: 0,
  },
  endbtnstyle: {
    color: '#ffffff',
    position: 'absolute',
    bottom: '5%',
    right: 0,
    //width:'20%'
  },
});

export default withNavigation(Onboarding);
