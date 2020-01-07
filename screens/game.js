import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import WebView from 'react-native-webview';
import { create } from 'react-native-pixel-perfect';
import back from '../assets/images/Back.png';
import { Dimensions, PixelRatio, Modal, ScrollView } from 'react-native';
import { TouchableRipple, Button } from 'react-native-paper';
import axios from 'react-native-axios';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Leader extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modalVisible: false,
      isLoading: true,
      dataSource: [],
    };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onMessage(event) {
    data = event.nativeEvent.data;
    //fetching api
    axios({
      method: 'get',
      url: `https://reg.arhn.co.in/api/flappybird/get_email/${user_email}/`,
      auth: {
        username: 'wdct',
        password: 'Wdct@cca',
      },
    }).then(response => {
      if (response.data.score < data) {
        axios({
          method: 'put',
          url: `https://reg.arhn.co.in/api/flappybird/edit_email/${user_email}/`,
          data: {
            email: user_email,
            name: user_name,
            score: data,
          },
          auth: {
            username: 'wdct',
            password: 'Wdct@cca',
          },
        });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: 'https://www.ccanitd.in/game.html' }}
          onLoad={() => this.hideSpinner()}
          javaScriptEnabledAndroid={true}
          injectedJavaScript={`
         window.email='${user_email}';
      `}
          onMessage={this.onMessage}
        />

        {this.state.visible && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: height / 2,
              left: (width - 80) / 2,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              //backgroundColor: "white"
            }}>
            <Image
              source={require('../assets/images/CCA-App_Loader.gif')}
              style={{ width: 80, height: 80 }}
            />
          </View>
        )}

        <TouchableRipple
          style={{
            position: 'absolute',
            top: perfectSize(15) + 24,
            left: perfectSize(20),
            //padding: perfectSize(10)
          }}
          onPress={() => this.props.navigation.navigate('Home')}
          //increasing interactive area
          hitSlop={{ left: 50, top: 100, right: 10, bottom: 10 }}>
          <Image
            source={back}
            style={{
              height: perfectSize(16),
              width: perfectSize(16),
            }}
          />
        </TouchableRipple>
        <TouchableRipple
          style={{
            position: 'absolute',
            right: 0,
            top: perfectSize(17),
            marginRight: perfectSize(10),
          }}
          onPress={() => this.props.navigation.navigate('Leader')}
          hitSlop={{ left: 50, top: 100, right: 10, bottom: 10 }}>
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
              Leaderboard
            </Text>
          </View>
        </TouchableRipple>
      </View>
    );
  }
}
