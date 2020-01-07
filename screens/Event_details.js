import React, {Component} from 'react';
import {
  Share,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../components/Dimensions';
import {create} from 'react-native-pixel-perfect';
import TeamObject from '../components/TeamObject';
import axios from 'react-native-axios';
import heart from '../assets/images/heart.png';
import dislike from '../assets/images/dislike.png';
import back from '../assets/images/Back.png';
import {TouchableRipple} from 'react-native-paper';
import {white} from 'ansi-colors';
import share from '../assets/images/share.jpg';

const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);
const styles = StyleSheet.create({
  stretch: {
    fontSize: perfectSize(13),
    marginTop: perfectSize(10),
    marginLeft: perfectSize(24),
    marginRight: perfectSize(21),
    lineHeight: perfectSize(17),
    fontFamily: 'avenir-roman',
  },
  contact: {
    fontSize: perfectSize(14),
    marginTop: perfectSize(16),
    marginLeft: perfectSize(24),
    // fontWeight: "bold",
    fontFamily: 'avenir-black',
  },
  meet: {
    fontSize: perfectSize(14),
    marginTop: perfectSize(24),
    marginLeft: perfectSize(24),
    // fontWeight: "bold",
    fontFamily: 'avenir-black',
  },
});

export default class Event_detail extends Component {
  static navigationOptions = {
    //title: "CORE",
    headerStyle: {
      display: 'none',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      color: '#000',
      fontSize: perfectSize(20),
      fontFamily: 'avenir-medium',
      fontWeight: undefined,
    },
  };

  constructor(props) {
    super(props);
    this.state = {feedbacklcl: false};
  }

  closeControlPanel = () => {
    this.props.navigation.closeDrawer();
  };
  openControlPanel = () => {
    this.props.navigation.openDrawer();
  };

  onSharePress = () =>
    Share.share({
      title: this.props.navigation.getParam('events_name', 'NO-NAME'),
      message:
        this.props.navigation.getParam('events_descript') +
        '\n\n\n' +
        this.props.navigation.getParam('events_link'),
      filename: this.props.navigation.getParam('events_photo'),
      url: 'https://www.facebook.com/ccanitd.in/',
    });

  componentDidMount() {
    const {navigation} = this.props;
    const title = navigation.getParam('events_name', 'NO-NAME');
    if (user_email != 'none') {
      let userEvents = JSON.parse(user_data.string);

      for (let userEvent of userEvents.events) {
        if (title == userEvent.title && userEvent.feedback) {
          this.setState({feedbacklcl: true});
          break;
        } else {
          this.setState({feedbacklcl: false});
        }
      }
    }
  }

  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  }

  render() {
    const {navigation} = this.props;
    const title = navigation.getParam('events_name', 'NO-NAME');
    const location = navigation.getParam('events_location');
    const date = navigation.getParam('events_date');
    const image = navigation.getParam('events_photo');
    const description = navigation.getParam('events_descript');
    const like = navigation.getParam('events_like');
    const link_name = navigation.getParam('events_link_name');
    const link = navigation.getParam('events_link');
    console.log('link name', link);

    let dateInfo = new Date(date);
    let st = this.formatDate(dateInfo);

    console.log('date - ' + st);
    console.log(navigation);
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingTop: 24,
            backgroundColor: 'black',
            flexDirection: 'column',
          }}>
          <Image
            style={{
              width: widthPercentageToDP('100%'),
              height: heightPercentageToDP('26.3%'),
            }}
            //resizeMode="contain"

            source={{
              uri: image,
            }}
          />
          <TouchableRipple
            style={{
              position: 'absolute',
              top: perfectSize(21) + 24,
              left: perfectSize(20),
              //padding: perfectSize(10)
            }}
            onPress={() => this.props.navigation.navigate('Upcoming')}
            hitSlop={{left: 50, top: 100, right: 10, bottom: 10}}>
            <Image
              source={back}
              style={{
                height: perfectSize(16),
                width: perfectSize(16),
              }}
            />
          </TouchableRipple>
          <View
            style={{
              backgroundColor: 'white',
              width: widthPercentageToDP('100%'),
              paddingLeft: widthPercentageToDP('7.2%'),
              paddingRight: widthPercentageToDP('7.2%'),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'avenir-heavy',
                  fontSize: perfectSize(16),
                  paddingTop: heightPercentageToDP('2.5%'),
                }}>
                {title}
              </Text>
              <Image
                source={heart}
                style={{
                  position: 'absolute',
                  right: perfectSize(30),
                  top: heightPercentageToDP('2.5%'),
                  height: 20,
                  width: 21,
                }}
              />
              <Text
                style={{
                  color: '#d0026f',
                  position: 'absolute',
                  right: 0,
                  fontFamily: 'avenir-heavy',
                  fontSize: perfectSize(14),
                  paddingTop: heightPercentageToDP('2.5%'),
                }}>
                {like}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'avenir-roman',
                fontSize: perfectSize(12),
                opacity: 0.7,
                paddingTop: heightPercentageToDP('1.6%'),
              }}>
              {location}
            </Text>
            <Text
              style={{
                fontFamily: 'avenir-roman',
                fontSize: perfectSize(12),
                opacity: 0.7,
              }}>
              {st + ' '} Onwards
            </Text>
            <Text
              style={{
                fontFamily: 'avenir-roman',
                fontSize: perfectSize(12),
                paddingTop: heightPercentageToDP('2.5%'),
                lineHeight: perfectSize(15),
              }}>
              {description}
            </Text>
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={this.onSharePress}>
              <Image
                source={share}
                style={{height: 25, width: 25, alignSelf: 'center'}}></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: perfectSize(35),
          }}>
          <TouchableRipple
            disabled={link_name == 'none' ? true : false}
            onPress={() => {
              Linking.openURL(link);
            }}>
            <View
              style={{
                width: perfectSize(172),
                height: perfectSize(40),
                borderRadius: perfectSize(2),
                alignItems: 'center',
                justifyContent: 'center',
                //borderColor: "black",
                //borderWidth: 1,
                marginTop: perfectSize(16),
                backgroundColor: '#1d68bf',
                opacity: link_name == 'none' ? 0 : 1,
              }}>
              <Text
                style={{
                  fontFamily: 'avenir-roman',
                  fontSize: perfectSize(13),
                  color: 'white',
                }}>
                {link_name}
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            disabled={this.feedbacklcl == true ? true : false}
            onPress={() => {
              if (googletoken) {
                this.setState({
                  feedbacklcl: true,
                });
              } else {
                alert('Please login to give feedback');
              }
              if (user_email != 'none') {
                let state = JSON.parse(JSON.stringify(this.state));
                let userEvents = JSON.parse(user_data.string);
                //state.dataSource[i].like = !state.dataSource[i].like;
                let current_event = null;
                for (let event of userEvents.events) {
                  if (event.title == title) {
                    current_event = event;
                  }
                }
                if (!current_event) {
                  userEvents.events.push({
                    title: title,
                    like: false,
                    feedback: true,
                  });
                } else {
                  current_event.feedback = true;
                }
                axios({
                  method: 'put',
                  url:
                    'https://reg.arhn.co.in/api/users/edit_email/' +
                    user_data.email +
                    '/',
                  data: {
                    email: user_data.email,
                    string: JSON.stringify(userEvents),
                  },
                  auth: {
                    username: 'wdct',
                    password: 'Wdct@cca',
                  },
                }).catch(error => {
                  console.error(error);
                });

                user_data = {
                  email: user_data.email,
                  string: JSON.stringify(userEvents),
                };
                if (googletoken) {
                  this.props.navigation.navigate('Feedback', {
                    event_name: title,
                  });
                }
              } else {
                if (googletoken) {
                  this.props.navigation.navigate('Feedback', {
                    event_name: title,
                  });
                }
              }
            }}>
            <View
              style={{
                width: perfectSize(172),
                height: perfectSize(40),
                borderRadius: perfectSize(2),
                alignItems: 'center',
                justifyContent: 'center',
                //borderColor: "black",
                //borderWidth: 1,
                marginTop: perfectSize(16),
                backgroundColor: '#050425',
                opacity: this.state.feedbacklcl == true ? 0 : 1,
              }}>
              <Text
                style={{
                  fontFamily: 'avenir-roman',
                  fontSize: perfectSize(13),
                  color: '#ffffff',
                }}>
                Give Feedback
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    );
  }
}
