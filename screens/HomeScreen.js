import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {StyleSheet} from 'react-native';
import Icons from '../components/headericons.js';
import Carousal from '../components/Carousal.js';
import hellogif from '../assets/images/Home-Page.gif';
import core from '../assets/images/core.png';
import wdct from '../assets/images/wdct.png';
import robo from '../assets/images/robocell.png';
import ecell from '../assets/images/ecell.png';
import rnd from '../assets/images/rnd.png';
import cca_logo from '../assets/images/cca_white.png';
import menu_icon from '../assets/images/menu_button.png';
import flappy_chi from '../assets/images/flappychu_icon.png';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../components/Dimensions.js';

import {create} from 'react-native-pixel-perfect';
import axios from 'react-native-axios';
import {TouchableRipple} from 'react-native-paper';
import OfflineNotice from '../components/OfflineNotice.js';

const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

//import SideMenu from "./sidedrawer.js";

class HelloWorldApp extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    notification: {},
  };

  closeControlPanel = () => {
    this.props.navigation.closeDrawer();
  };
  openControlPanel = () => {
    this.props.navigation.openDrawer();
  };

  componentDidMount() {
    // global.user_name = "Champ";
    // global.user_photo = "none";
    // global.user_email = "none";
    // googletoken = "";
    // console.log(user_photo);

    AsyncStorage.getItem('googletoken');

    if (!googletoken) {
      googletoken = '';
    }

    if (user_email == 'none') {
      return null;
    }

    axios({
      method: 'get',
      url:
        'https://reg.arhn.co.in/api/flappybird/get_email/' + user_email + '/',
      auth: {
        username: 'wdct',
        password: 'Wdct@cca',
      },
    })
      .then(response => {
        // console.log("game data there");
      })
      .catch(error => {
        // console.log("no user");
        axios({
          method: 'post',
          url: 'https://reg.arhn.co.in/api/flappybird/',
          data: {
            email: user_email,
            name: user_name,
            score: '0',
          },
          auth: {
            username: 'wdct',
            password: 'Wdct@cca',
          },
        }).catch(error => {
          //console.log("Hello Stuck !");
          //console.error(error);
        });
      });

    axios({
      method: 'get',
      url: 'https://reg.arhn.co.in/api/users/get_email/' + user_email + '/',
      auth: {
        username: 'wdct',
        password: 'Wdct@cca',
      },
    })
      .then(response => {
        // if (user_email == "none") {
        //   global.user_data = {};
        // } else {
        user_data = response.data.hasOwnProperty('detail')
          ? {email: global.user_email, string: '{"events": []}'}
          : response.data;
        // console.log(user_data);
        // }
      })
      .catch(error => {
        user_data = {email: user_email, string: '{"events": []}'};

        axios({
          method: 'post',
          url: 'https://reg.arhn.co.in/api/users/',
          data: {
            email: user_email,
            string: JSON.stringify({events: []}),
          },
          auth: {
            username: 'wdct',
            password: 'Wdct@cca',
          },
        }).catch(error => {
          //console.log("Hello Stuck !");
          //console.error(error);
        });
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#020122',
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: perfectSize(24),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#020122',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: perfectSize(13),
            paddingBottom: perfectSize(16),
            height: perfectSize(56),
          }}>
          <TouchableOpacity
            style={{
              padding: perfectSize(15),
            }}
            onPress={this.openControlPanel}>
            <Image
              source={menu_icon}
              // resizeMode={"contain"}
              style={{
                width: perfectSize(18),
                height: perfectSize(11.5),
                //marginLeft: perfectSize(19),
                //padding: perfectSize(10)
              }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this.openControlPanel}> */}
          <Image
            source={cca_logo}
            // resizeMode={"contain"}
            style={{
              width: perfectSize(59),
              height: perfectSize(30),
              //marginLeft: perfectSize(10)
            }}
          />
          {/* </TouchableOpacity> */}

          <TouchableRipple
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              marginRight: perfectSize(19),
            }}
            onPress={() => {
              this.props.navigation.navigate('Playzone');
            }}>
            <View
              style={{
                width: perfectSize(112),
                height: perfectSize(25),
                borderRadius: perfectSize(2),
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'white',
                borderWidth: 1,
                marginTop: perfectSize(16),
                backgroundColor: 'transparent',
                //opacity: link == "none" ? 0 : 1
              }}>
              <Text
                style={{
                  fontFamily: 'avenir-roman',
                  fontSize: perfectSize(13),
                  color: '#ffffff',
                }}>
                Playzone
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <OfflineNotice />
        <ScrollView
          style={{backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.welcome}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: widthPercentageToDP('3.3%'),
              }}>
              <Image
                style={{height: 80, width: 80}}
                source={require('../assets/images/Home-Page.gif')}
              />
              <Text
                style={{
                  fontSize: perfectSize(16),
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontFamily: 'avenir-black',
                }}>
                Hey, {user_name.split(' ', 1)[0]}!
              </Text>
            </View>
            {/* <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "white" }}>
                Origin: {this.state.notification.origin}
              </Text>
              <Text style={{ color: "white" }}>
                Data: {JSON.stringify(this.state.notification.data)}
              </Text>
            </View> */}

            <Text
              style={{
                color: 'white',
                fontFamily: 'avenir-roman',
                fontSize: perfectSize(12),
                opacity: 0.8,
                paddingBottom: 16,
                lineHeight: perfectSize(17),
                paddingLeft: widthPercentageToDP('6.7%'),
                paddingRight: widthPercentageToDP('6.7%'),
              }}>
              Let’s hook you up with the technical gymkhana of NITD, CCA. Over
              the years we have been the locus of ideas, innovation, creativity
              and managerial acumen.
            </Text>
          </View>

          <View style={{backgroundColor: '#f5f5f5', paddingBottom: 16}}>
            <Text
              style={{
                fontSize: perfectSize(14),
                marginLeft: widthPercentageToDP('6.7%'),
                marginTop: perfectSize(16),
                marginBottom: perfectSize(16),
                fontFamily: 'avenir-black',
              }}>
              What's new?
            </Text>
            <Carousal />
          </View>

          <Text
            style={{
              fontSize: perfectSize(14),
              marginLeft: widthPercentageToDP('6.7%'),
              marginTop: 16,
              marginBottom: 6,
              fontFamily: 'avenir-black',
            }}>
            Our Cells
          </Text>
          <Text
            style={{
              fontSize: perfectSize(13),
              marginLeft: widthPercentageToDP('6.7%'),
              marginBottom: 15,
              fontFamily: 'avenir-roman',
              lineHeight: perfectSize(17),
            }}>
            For proper functioning, CCA is divided into 5 cells.
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
              flex: 1,
              marginBottom: 20,
              flexDirection: 'row',
            }}>
            {/* core */}
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: widthPercentageToDP('6.7%'),
                }}
                onPress={() => this.props.navigation.navigate('Core')}>
                <Image style={styles.circle} source={core} />
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: perfectSize(13),
                    fontFamily: 'avenir-roman',
                    opacity: 0.7,
                    marginTop: 6,
                  }}>
                  CORE
                </Text>
              </TouchableOpacity>
            </View>

            {/* wdct */}
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: widthPercentageToDP('6.7%'),
                }}
                onPress={() => this.props.navigation.navigate('Wdct')}>
                <Image style={styles.circle} source={wdct} />
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: perfectSize(13),
                    fontFamily: 'avenir-roman',
                    opacity: 0.7,
                    marginTop: 6,
                  }}>
                  WDCT
                </Text>
              </TouchableOpacity>
            </View>

            {/* robocell */}
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: widthPercentageToDP('6.7%'),
                }}
                onPress={() => this.props.navigation.navigate('Robo')}>
                <Image style={styles.circle} source={robo} />
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: perfectSize(13),
                    fontFamily: 'avenir-roman',
                    opacity: 0.7,
                    marginTop: 6,
                  }}>
                  ROBO
                </Text>
              </TouchableOpacity>
            </View>

            {/* ecell */}
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: widthPercentageToDP('6.7%'),
                }}
                onPress={() => this.props.navigation.navigate('Ecell')}>
                <Image style={styles.circle} source={ecell} />
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: perfectSize(13),
                    fontFamily: 'avenir-roman',
                    opacity: 0.7,
                    marginTop: 6,
                  }}>
                  E-CELL
                </Text>
              </TouchableOpacity>
            </View>

            {/* rnd */}
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: widthPercentageToDP('6.7%'),
                  paddingRight: widthPercentageToDP('6.7%'),
                }}
                onPress={() => this.props.navigation.navigate('Rnd')}>
                <Image style={styles.circle} source={rnd} />
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: perfectSize(13),
                    fontFamily: 'avenir-roman',
                    opacity: 0.7,
                    marginTop: 6,
                  }}>
                  R&D
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

export default HelloWorldApp;

const styles = StyleSheet.create({
  welcome: {
    // height: '25%',
    backgroundColor: '#020122',
    // padding: "2%"
  },
  about: {
    // height: '25%',
    backgroundColor: 'transparent',
    padding: '2%',
  },
  circle: {
    width: perfectSize(110),
    height: perfectSize(111),
    // margin: 10,
    borderRadius: 50,
    //backgroundColor: "skyblue"
  },
  drawer: {
    marginTop: heightPercentageToDP('6.6%'),
  },
});
