//Get social bar at tab bar at the bottom
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { create } from 'react-native-pixel-perfect';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

const styles = StyleSheet.create({
  stretch: {
    aspectRatio: 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    bottom: '13%',
  },
  contact: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '45%',
    width: '80%',
    marginLeft: '10%',
  },
  icon: {
    width: perfectSize(64),
    height: perfectSize(64),
  },
});

export default class ContactUs extends React.Component {
  static navigationOptions = {
    header: null,
  };

  closeControlPanel = () => {
    this.props.navigation.closeDrawer();
  };
  openControlPanel = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    storeData = async (key, data) => {
      try {
        await AsyncStorage.setItem(key, data);
        console.log('token saved');
        //await AsyncStorage.setItem('signin', this.state.signedIn,);
      } catch (error) {
        //console.log("error saving data");
      }
    };

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#f5f5f5',
            flex: 1,
            paddingTop: perfectSize(70),
          }}>
          <View>
            <Image
              style={styles.stretch}
              source={require('../assets/images/Contact-Us.png')}
            />
          </View>
          <View>
            <View style={styles.contact}>
              {/*Aarohan Facebook*/}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://www.facebook.com/arhn.nitd/');
                }}>
                <Image
                  source={require('../assets/images/facebook.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              {/*Aarohan Instagram*/}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://www.instagram.com/arhn.nitd/');
                }}>
                <Image
                  source={require('../assets/images/instagram.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              {/*Aarohan Twitter*/}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://twitter.com/aarohan_nitdgp');
                }}>
                <Image
                  source={require('../assets/images/twitter.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              {/*Aarohan LinkedIn*/}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    'https://in.linkedin.com/company/aarohan-nit-durgapur',
                  );
                }}>
                <Image
                  source={require('../assets/images/linkedIn.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                bottom: '45%',
                width: '60%',
                marginLeft: '20%',
              }}>

              {/*Aarohan Youtube*/}
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://www.youtube.com/user/arhnNITD');
                }}>
                <Image
                  source={require('../assets/images/youtube.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
