import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  StatusBar,
  Alert,
  AsyncStorage,
} from 'react-native';
import { create } from 'react-native-pixel-perfect';

const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

export default class Playzone extends React.Component {
  static navigationOptions = {
    title: 'PlayZone',
    headerStyle: {
      backgroundColor: '#ffffff',
      marginTop: StatusBar.currentHeight,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      color: '#000',
      fontSize: perfectSize(18),
      fontFamily: 'avenir-medium',
      fontWeight: undefined,
    },
  };

  render() {
    return (
      <View style={styles.container}>
        {/*To play flappychi*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Game');
          }}>
          <Text> Play FlappyChi</Text>
        </TouchableOpacity>

        {/*To play trivio*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (user_email != 'none') {
              this.props.navigation.navigate('Trivio');
            } else {
              Alert.alert(
                'You are not logged in.',
                'Please login to play the game.',
                [
                  {
                    text: 'Login',
                    onPress: () => this.props.navigation.navigate('Login'),
                  },
                  { text: 'OK' },
                ],
                { cancelable: false },
              );
            }
          }}>
          <Text> Trivio</Text>
        </TouchableOpacity>

        {/*To play inquest*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL('https://inquest.arhn.co.in');
          }}>
          <Text> Inquest</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 5,
    width: perfectSize(180),
    marginTop: perfectSize(20),
    marginBottom: perfectSize(20),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
