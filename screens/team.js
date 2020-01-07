import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StyleSheet, AppState } from 'react-native';
import cca_logo from '../assets/images/cca_white.png';
import hall_of_fame from '../assets/images/hall_of_fame.png';
import menu_icon from '../assets/images/menu_button.png';
import TeamObject from '../components/TeamObject';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../components/Dimensions';
import { create } from 'react-native-pixel-perfect';
import axios from 'react-native-axios';
import { TouchableRipple } from 'react-native-paper';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

export default class UpComingEvents extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    active: 'team',
  };

  constructor(props) {
    super(props);
    this.state = {
      hallActive: 1,
      isLoading: true,
      active: 'team',
    };
  }

  componentDidMount() {
    //fetching api
    axios({
      method: 'get',
      url: 'https://reg.arhn.co.in/api/members?sort_by=order&order_by=asc/',
      //url: 'http://192.168.100.183:8000/api/members?sort_by=order&order_by=asc/',
      auth: {
        username: 'wdct',
        password: 'Wdct@cca',
      },
    })
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data,
        });

        setTimeout(() => {
          this.setState({
            time: 0,
          });
        }, 2000);
      })
      .catch(error => {
        console.error(error);
      });
  }

  closeControlPanel = () => {
    this.props.navigation.closeDrawer();
  };
  openControlPanel = () => {
    this.props.navigation.openDrawer();
  };

  addContent() {
    return <View />;
  }
  //dividing team members according to year
  addTeam() {
    let team2020 = [];
    let team2019 = [];
    let team2018 = [];
    let team2017 = [];
    let team = null;
    if (this.state.dataSource)
      team = JSON.parse(JSON.stringify(this.state.dataSource));

    if (team == null) return;

    team.map(person => {
      if (person.year == '2020') {
        team2020.push({
          image: person.image,
          name: person.name,
          post: person.post,
          order: person.order,
        });
      } else if (person.year == '2019') {
        team2019.push({
          image: person.image,
          name: person.name,
          post: person.post,
          order: person.order,
        });
      } else if (person.year == '2018') {
        team2018.push({
          image: person.image,
          name: person.name,
          order: person.order,
          post: ' ',
        });
      } else if (person.year == '2017') {
        team2017.push({
          image: person.image,
          name: person.name,
          order: person.order,
          post: ' ',
        });
      }
    });

    const propComparator = propName => (a, b) =>
      a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
    team2020.sort(propComparator('order'));
    team2019.sort(propComparator('order'));
    team2018.sort(propComparator('order'));
    team2017.sort(propComparator('order'));

    if (this.state.active == 'team') {
      team = team2020;
    } else if (this.state.hallActive == 1 && this.state.active == 'hall') {
      team = team2019;
    } else if (this.state.hallActive == 2 && this.state.active == 'hall') {
      team = team2018;
    } else if (this.state.hallActive == 3 && this.state.active == 'hall') {
      team = team2017;
    }

    return <TeamObject team={team} />;
  }

  addHallOptions = () => {
    if (this.state.active == 'team') return null;

    return (
      <ScrollView
        style={{}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            paddingLeft: widthPercentageToDP('7.8%'),
            paddingRight: widthPercentageToDP('7.8%'),
            paddingVertical: heightPercentageToDP('2.5%'),
            flex: 1,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ hallActive: 1 });
            }}>
            <View
              style={{
                // flex: 1,
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
                borderWidth: this.state.hallActive != 1 ? 0.5 : 0,
                marginRight: widthPercentageToDP('6.7%'),
                borderColor: '#000000',
              }}>
              <Text
                style={{
                  fontFamily: 'avenir-roman',
                  fontSize: perfectSize(13),
                  color: this.state.hallActive == 1 ? '#ffffff' : '#000000',
                }}>
                Class '19
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ hallActive: 2 });
            }}>
            <View
              style={{
                // flex: 1,
                paddingHorizontal: 24,
                paddingVertical: 11,
                width: widthPercentageToDP('28.9%'),
                height: heightPercentageToDP('6.2%'),
                borderRadius: 2,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor:
                  this.state.hallActive == 2 ? '#0e0d2c' : '#f5f5f5',
                borderWidth: this.state.hallActive != 2 ? 0.5 : 0,
                marginRight: widthPercentageToDP('6.7%'),
                borderColor: '#000000',
              }}>
              <Text
                style={{
                  fontFamily: 'avenir-roman',
                  fontSize: perfectSize(13),
                  color: this.state.hallActive == 2 ? '#ffffff' : '#000000',
                }}>
                Class '18
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({ hallActive: 3 });
            }}>
            <View
              style={{
                // flex: 1,
                paddingHorizontal: 24,
                paddingVertical: 11,
                width: widthPercentageToDP('28.9%'),
                height: heightPercentageToDP('6.2%'),
                borderRadius: 2,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                backgroundColor:
                  this.state.hallActive == 3 ? '#0e0d2c' : '#f5f5f5',
                borderWidth: this.state.hallActive != 3 ? 0.5 : 0,
                marginRight: widthPercentageToDP('6.7%'),
                borderColor: '#000000',
              }}>
              <Text
                style={{
                  fontFamily: 'avenir-roman',
                  fontSize: perfectSize(13),
                  color: this.state.hallActive == 3 ? '#ffffff' : '#000000',
                }}>
                Class '17
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {
              this.setState({ hallActive: 3 });
            }}
          >
            <View
              style={{
                // flex: 1,
                paddingHorizontal: 24,
                paddingVertical: 11,
                width: widthPercentageToDP("28.9%"),
                height: heightPercentageToDP("6.2%"),
                borderRadius: 2,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor:
                  this.state.hallActive == 3 ? "#0e0d2c" : "#f5f5f5",
                borderWidth: this.state.hallActive != 3 ? 1 : 0,
                borderColor: "#000000"
              }}
            >
              <Text
                style={{
                  color: this.state.hallActive == 3 ? "#ffffff" : "#000000"
                }}
              >
                Class '16
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  };

  storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
      console.log('token saved');
      //await AsyncStorage.setItem('signin', this.state.signedIn,);
    } catch (error) {
      console.log('error saving data');
    }
  };

  render() {
    console.log(this.state.appState);
    // console.log(this.state.active);
    if (this.state.isLoading == false && this.state.time == 0) {
      return (
        <View
          style={{
            flex: 1,
          }}>
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
              paddingTop: 11,
              paddingBottom: 16,
              height: perfectSize(50),
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
              onPress={() => this.props.navigation.navigate('Game')}>
              {/*FLAPPYCHI*/}
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
                  Play FlappyChi
                </Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={styles.welcome}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 12,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ active: 'team' });
                }}>
                <View
                  style={{
                    // flex: 1,
                    // paddingHorizontal: 24,
                    paddingVertical: 11,
                    width: widthPercentageToDP('28.9%'),
                    height: heightPercentageToDP('6.2%'),
                    borderRadius: 2,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor:
                      this.state.active == 'team' ? 'white' : '#020122',

                    borderWidth: this.state.active == 'hall' ? 0.5 : 0,
                    marginRight: 16,
                    borderColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'avenir-roman',
                      fontSize: perfectSize(13),
                      color: this.state.active == 'hall' ? 'white' : 'black',
                    }}>
                    Team '20
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ active: 'hall' });
                }}>
                <View
                  style={{
                    //flex: 1,
                    width: widthPercentageToDP('28.9%'),
                    height: heightPercentageToDP('6.2%'),
                    paddingHorizontal: 18,
                    paddingVertical: 11,
                    borderRadius: 2,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor:
                      this.state.active == 'hall' ? '#1d68bf' : '#020122',
                    borderWidth: this.state.active == 'team' ? 0.5 : 0,
                    borderColor: 'white',
                  }}>
                  <Image
                    source={hall_of_fame}
                    style={{
                      width: 68,
                      height: 16,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: '#f5f5f5' }}>
            {this.addHallOptions()}
          </View>
          <ScrollView
            style={{ backgroundColor: 'white' }}
            showsVerticalScrollIndicator={false}>
            {this.addTeam()}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            source={require('../assets/images/CCA-App_Loader.gif')}
            style={{ width: 80, height: 80 }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  welcome: {
    height: heightPercentageToDP('14%'),
    backgroundColor: '#020122',
  },
});
