import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

//for integrating web push notification
import OneSignal from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  constructor(properties) {
    super(properties);
    //initializing the onesignal native SDK
    OneSignal.init('dd185f2d-b162-46d5-a3bd-f48b2f44990f');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); // triggers the ids event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  state = {
    isLoadingComplete: false,
  };
  //when component is invoked loading of the screen is done i.e it is set to true.
  async componentDidMount() {
    this.setState({ isLoadingComplete: true });
  }
  //the splashscreen is dismissed as soon as component is invoked.
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <StatusBar translucent backgroundColor="#2d2d2d8C" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
