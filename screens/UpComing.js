import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import cca_logo from '../assets/images/cca_white.png';
import menu_icon from '../assets/images/menu_button.png';
import Box from '../constants/Events_box';

import {create} from 'react-native-pixel-perfect';
import axios from 'react-native-axios';
import {TouchableRipple} from 'react-native-paper';

const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

export default class UpComingEvents extends React.Component {
  static navigationOptions = {
    header: null,
  };

  closeControlPanel = () => {
    this.props.navigation.closeDrawer();
  };
  openControlPanel = () => {
    this.props.navigation.openDrawer();
  };

  constructor(props) {
    super(props);
    this.state = {isLoading: true, dataSource: ''};
    // global.user_data = this.state.dataSource;
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://reg.arhn.co.in/api/users/get_email/' + user_email + '/',
      //url: 'http://192.168.100.183:8000/api/users/get_email/' + user_email + '/',
      auth: {
        username: 'wdct',
        password: 'Wdct@cca',
      },
    }).then(response => {
      this.setState({
        isLoading: false,
        dataSource: response.data.hasOwnProperty('detail') ? [] : response.data,
      });
    });
  }

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
    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
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
            paddingTop: 13,
            paddingBottom: 16,
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
            onPress={() => this.props.navigation.navigate('Game')}>
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
        <ScrollView
          style={{backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false}>
          {/* {this.addContent()} */}
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Feedback")}
          > */}
          <Text
            style={{
              marginLeft: perfectSize(26),
              fontFamily: 'avenir-black',
              fontSize: perfectSize(18),
              marginTop: perfectSize(24),
              marginBottom: perfectSize(15),
            }}>
            Events lined Up
          </Text>
          {/* </TouchableOpacity> */}
          <Box />
          {/* <Text>
            {this.state.dataSource ? this.state.dataSource.string.event : ""}
          </Text> */}
        </ScrollView>
      </View>
    );
  }
}
