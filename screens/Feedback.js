import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Slider from 'react-native-slider';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../components/Dimensions';

import { create } from 'react-native-pixel-perfect';
import rating1 from '../assets/images/rating1.png';
import rating2 from '../assets/images/rating2.png';
import rating3 from '../assets/images/rating3.png';
import rating4 from '../assets/images/rating4.png';
import rating5 from '../assets/images/rating5.png';
import markings from '../assets/images/markings.png';
import axios from 'react-native-axios';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

const styles = StyleSheet.create({
  contact: {
    fontSize: perfectSize(13),
    marginTop: perfectSize(32),
    color: 'white',
    fontFamily: 'avenir-roman',
  },
});

export default class Feedback extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0.5,
      in_feedback: '',
    };
  }

  addImage = () => {
    if (this.state.value <= 0.2) {
      return (
        <Image
          source={rating1}
          resizeMode={'contain'}
          style={{
            width: perfectSize(200),
            height: perfectSize(46),
            marginTop: perfectSize(62),
            marginBottom: perfectSize(133),
          }}
        />
      );
    } else if (this.state.value > 0.2 && this.state.value <= 0.4) {
      return (
        <Image
          source={rating2}
          resizeMode={'contain'}
          style={{
            width: perfectSize(200),
            height: perfectSize(107),
            marginTop: perfectSize(62),
            marginBottom: perfectSize(72),
          }}
        />
      );
    } else if (this.state.value > 0.4 && this.state.value <= 0.6) {
      return (
        <Image
          source={rating3}
          resizeMode={'contain'}
          style={{
            width: perfectSize(200),
            height: perfectSize(107),
            marginTop: perfectSize(62),
            marginBottom: perfectSize(72),
          }}
        />
      );
    } else if (this.state.value > 0.6 && this.state.value <= 0.8) {
      return (
        <Image
          source={rating4}
          resizeMode={'contain'}
          style={{
            width: perfectSize(200),
            height: perfectSize(117),
            marginTop: perfectSize(62),
            marginBottom: perfectSize(62),
          }}
        />
      );
    } else if (this.state.value > 0.8 && this.state.value <= 1) {
      return (
        <Image
          source={rating5}
          resizeMode={'contain'}
          style={{
            width: perfectSize(200),
            height: perfectSize(112),
            marginTop: perfectSize(62),
            marginBottom: perfectSize(67),
          }}
        />
      );
    }
  };
  //setting color
  setColor = () => {
    if (this.state.value <= 0.2) {
      return '#791824';
    } else if (this.state.value > 0.2 && this.state.value <= 0.4) {
      return '#4F1879';
    } else if (this.state.value > 0.4 && this.state.value <= 0.6) {
      return '#182679';
    } else if (this.state.value > 0.6 && this.state.value <= 0.8) {
      return '#009CBC';
    } else if (this.state.value > 0.8 && this.state.value <= 1) {
      return '#335D03';
    }
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('event_name', 'NO-NAME');
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{ backgroundColor: this.setColor() }}
          //horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              alignItems: 'stretch',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.contact}>Rate your experience so far!</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {this.addImage()}
            </View>
            <View
              style={{
                marginLeft: perfectSize(56),
                marginRight: perfectSize(56),
              }}>
              <Slider
                thumbTintColor="#ffffff"
                thumbTouchSize={{
                  width: perfectSize(35),
                  height: perfectSize(35),
                }}
                // thumbImage={Oval}
                thumbStyle={{
                  width: perfectSize(28),
                  height: perfectSize(28),
                  borderRadius: perfectSize(28) / 2,
                }}
                trackStyle={{
                  opacity: 0.5,
                }}
                step={0.25}
                //to configure track color on slider
                minimumTrackTintColor={'#000000'}
                maximumTrackTintColor={'#000000'}
                value={this.state.value}
                onValueChange={value => this.setState({ value: value })}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                source={markings}
                resizeMode={'contain'}
                style={{
                  width: perfectSize(232),
                  height: perfectSize(8),
                  marginTop: perfectSize(25),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: perfectSize(12),
              }}>
              <Text
                style={{
                  fontSize: perfectSize(10),
                  color: 'white',
                  opacity: 0.5,
                  position: 'absolute',
                  left: perfectSize(65),
                }}>
                Poor
              </Text>
              <Text
                style={{
                  fontSize: perfectSize(10),
                  color: 'white',
                  opacity: 0.5,
                  position: 'absolute',
                  right: perfectSize(50),
                  //   marginRight: perfectSize(193)
                }}>
                Excellent
              </Text>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    backgroundColor: 'white',
                    padding: perfectSize(10),
                    marginTop: perfectSize(40),
                    marginBottom: perfectSize(0),
                    paddingLeft: perfectSize(10),
                    paddingRight: perfectSize(10),
                    height: perfectSize(100),
                    width: perfectSize(270),
                    borderRadius: perfectSize(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  placeholder="Enter Feedback"
                  onChangeText={in_feedback => this.setState({ in_feedback })}
                  multiline={true}
                  autoCorrect={true}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  //fetching api
                  axios({
                    method: 'post',
                    url: 'http://reg.arhn.co.in/api/users/',
                    data: {
                      email: user_email,
                      string: JSON.stringify({
                        event: 'sdfdsf',
                      }),
                    },
                    auth: {
                      username: 'wdct',
                      password: 'Wdct@cca',
                    },
                  });
                  console.log(this.state.value);
                  axios({
                    method: 'post',
                    url: 'https://reg.arhn.co.in/api/feedback/',
                    data: {
                      rating:
                        this.state.value * 10 == 0
                          ? 1
                          : Math.ceil((this.state.value * 10) / 2),
                      comment: this.state.in_feedback,
                      event: title,
                    },
                    auth: {
                      username: 'wdct',
                      password: 'Wdct@cca',
                    },
                  });

                  this.props.navigation.navigate('Upcoming');
                }}>
                <View
                  style={{
                    // flex: 1,
                    marginLeft: '34.5%',
                    alignContent: 'center',
                    marginTop: 30,
                    paddingHorizontal: 24,
                    paddingVertical: 11,
                    width: widthPercentageToDP('28.9%'),
                    height: heightPercentageToDP('6.2%'),
                    borderRadius: 2,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor:
                      this.state.hallActive == 1 ? '#0e0d2c' : '#f5f5f5',
                    borderWidth: this.state.hallActive != 1 ? 1 : 0,
                    marginRight: widthPercentageToDP('6.7%'),
                    borderColor: '#000000',
                  }}>
                  <Text
                    style={{
                      color: this.state.hallActive == 1 ? '#ffffff' : '#000000',
                    }}>
                    Submit
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
