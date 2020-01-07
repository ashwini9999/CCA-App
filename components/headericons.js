import React from 'react';
import { View,Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

class Icons extends React.Component {
  render() {
    const Profile = (
      <Icon.Button name="user" color="black" backgroundColor="white" onPress={() => this.props.navigation.navigate('Profile')}>
      </Icon.Button>
    );

    const Notify = (
      <Icon.Button name="bell" color="black" backgroundColor="white" onPress={() => this.props.navigation.navigate('Profile')}>
      </Icon.Button>
    );

    return (
        <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between', }}>
          {Notify}
          {Profile}
        </View>
    );
  }
}

export default withNavigation(Icons);