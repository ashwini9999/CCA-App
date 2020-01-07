import React from 'react';
import {Text,Image,View} from 'react-native';

export default class Card extends React.Component {
  render() {
    return (
        <View>
            <Image source={{uri: 'https://www.ccanitd.in/images/Shivam.jpg'}}
            style={{width: 100, height: 100}} />
            <Text>Shivam Kumar Jha</Text>
        </View>
    );
  }
}