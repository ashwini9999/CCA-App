import React, { Component } from 'react';
import { Dimensions, Image, ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class MyWeb extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*Navigated to aarohan web page*/}
        <WebView
          source={{ uri: 'https://arhn.co.in/' }}
          onLoad={() => this.hideSpinner()}
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
      </View>
    );
    // return (
    //   // <WebView source={{ uri: "https://musing-almeida-295de9.netlify.com/" }} />
    // );
  }
}
