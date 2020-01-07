import React from 'react';
import { View, Text } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  BottomTabBar,
} from 'react-navigation';

import ArhnIcon from '../components/ArhnIcon';

import { create } from 'react-native-pixel-perfect';

const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

//importing the image icons 
import Get_Social from '../assets/images/icons/Get-Social.png';
import Icon_Events from '../assets/images/icons/Icon_Events.png';
import Icon_Home from '../assets/images/icons/Icon_Home.png';
import Icon_Team from '../assets/images/icons/Icon_Team.png';
import Get_Social_select from '../assets/images/icons/Get-Social_select.png';
import Icon_Events_select from '../assets/images/icons/Icon_Events_select.png';
import Icon_Home_select from '../assets/images/icons/Icon_Home_select.png';
import Icon_Team_select from '../assets/images/icons/Icon_Team_select.png';

import TabBarIcon from '../components/TabBarIcon';

//importing the screens.
import HomeScreen from '../screens/HomeScreen';
import Team from '../screens/team';
import UpComingEvents from '../screens/UpComing';
import ContactUs from '../screens/ContactUs';
import Profile from '../screens/Profile';
import Arhn from '../screens/Arhn';
import Wdct from '../screens/wdct';
import Core from '../screens/Core';
import Robo from '../screens/Robo';
import Ecell from '../screens/Ecell';
import Rnd from '../screens/Rnd';
import FeedbackComp from '../screens/Feedback';
import Event_detail from '../screens/Event_details';
import Game from '../screens/game';
import Leader from '../screens/leader';
import Playzone from '../screens/Playzone';
import Trivio from '../screens/trivio';
import TrivioLeader from '../screens/trivio-leader';


import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../components/Dimensions';

const TabBarComponent = props => <BottomTabBar {...props} />;

//createstacknaviagtor maps route names to route i.e it tells navigator what to present for the particular route name
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Wdct: Wdct,
  Core: Core,
  Robo: Robo,
  Ecell: Ecell,
  Rnd: Rnd,
  Game: Game,
  Leader: Leader,
  Playzone: Playzone,
  Trivio: Trivio,
  TrivioLeader: TrivioLeader,
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  //on screen tracking if the active screen is not the very first screen, tab bar at the bottom will be hidden.
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    // Home tab in the tab bar.
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'avenir-roman',
          fontSize: perfectSize(10),
          //if title string of tab is displayed i.e if focused then color of the text is black russian else dark grey.
          color: focused ? '#020122' : '#aaaaaa',
        }}>
        Home
      </Text>
    ),
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        //if focused then home icon is Icon_Home_select else Icon_home.
        source={focused ? Icon_Home_select : Icon_Home}
        width="5.5%"
        height="3.8%"
      />
    ),
  };
};


const Upcoming = createStackNavigator({
  Upcoming: UpComingEvents,
  Event_details: Event_detail,
  //in the feedback screen tab bar is hidden.
  Feedback: {
    screen: FeedbackComp,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarVisible: false,
      // headerMode: "screen"
    }),
  },
});

Upcoming.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  //on screen tracking if the active screen is not the very first screen, tab bar at the bottom will be hidden.
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  // Events bar in tab bar 
  return {
    tabBarLabel: ({ focused }) => (
      <Text
        style={{
          textAlign: 'center',
          fontSize: perfectSize(10),
          fontFamily: 'avenir-roman',
          marginRight: 23,
          //if title string of tab is displayed i.e if focused then color of the text is black russian else dark grey.
          color: focused ? '#020122' : '#aaaaaa',
        }}>
        Events
      </Text>
    ),
    tabBarVisible,
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        //if focused then home icon is Icon_Events_select else Icon_Events.
        source={focused ? Icon_Events_select : Icon_Events}
        width="5.8%"
        height="3.5%"
        marginRight={23}
      />
    ),
  };
};


// navigating to the aarohan screen.
const AarohanStack = createStackNavigator({
  Aarohan: Arhn,
});

AarohanStack.navigationOptions = {
  tabBarLabel: (
    <Text
      style={{
        textAlign: 'center',
        fontSize: perfectSize(10),
        position: 'absolute',
        fontFamily: 'avenir-roman',
        paddingTop: widthPercentageToDP('23.3%'),
        opacity: 0,
      }}>
      Aarohan
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    //here code for aarohan icon id taken from ArhnIcon.js 
    <ArhnIcon
      focused={focused}
    // name={Platform.OS === "ios" ? "ios-options" : "aaroharn"}
    />
  ),
};


// team bar in tab bar
const Theteam = createStackNavigator({
  team: Team,
});

Theteam.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text
      style={{
        textAlign: 'center',
        fontSize: perfectSize(10),
        fontFamily: 'avenir-roman',
        marginLeft: 23,
        //if title string of tab is displayed i.e if focused then color of the text is black russian else dark grey.
        color: focused ? '#020122' : '#aaaaaa',
      }}>
      Team
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      //if focused then home icon is Icon_Team_select else Icon_Team.
      source={focused ? Icon_Team_select : Icon_Team}
      width="7.5%"
      height="3.3%"
      marginLeft={23}
    />
  ),
};

// get social bar in tab bar.
const Contactus = createStackNavigator({
  contact: ContactUs,
});

Contactus.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text
      style={{
        textAlign: 'center',
        fontSize: perfectSize(10),
        fontFamily: 'avenir-roman',
        //if title string of tab is displayed i.e if focused then color of the text is black russian else dark grey.
        color: focused ? '#020122' : '#aaaaaa',
      }}>
      Get Social!
    </Text>
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      //if focused then home icon is Icon_Team_select else Icon_Team.
      source={focused ? Get_Social_select : Get_Social}
      width="4.8%"
      height="3.05%"
    />
  ),
};

//exporting the screens.
export default createBottomTabNavigator(
  {
    HomeStack,
    Upcoming,
    AarohanStack,
    Theteam,
    Contactus,
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
      },
      activeTintColor: '#020122',
      style: {
        elevation: 30,
        // paddingBottom: 2,
        // marginTop: 2,
        borderTopWidth: 0,
        height: heightPercentageToDP('8.8%'),
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      },
    },
    style: {
      elevation: 2,
      backgroundColor: 'black',
    },
    navigationOptions: {
      titleStyle: {
        textAlign: 'center',
      },
    },
    //for smooth transition in tool tip when mouse hovers from one data point to another.
    animationEnabled: true,
    //to swipe between screens.
    swipeEnabled: true,
  },
);

