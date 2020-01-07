import React from 'react';
import {
  Image,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Onboard from '../screens/Onboarding';
import Auth from '../screens/Authpage';
import SideBar from '../components/SideBar';

import { create } from 'react-native-pixel-perfect';

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

const OnboardingStack = createSwitchNavigator({
  Onboarding: Onboard,
  // When `Onboarding Screen` is loaded by the StackNavigator, it will be given a `navigation` prop.
  //Onboarding is mapped to route config 'Onboard'.
  //The above line tells the navigator to present 'Onboard' to route 'Onboarding'.
  Login: Auth,
  //Login is mapped to route config 'Auth'.
  //The above line tells the navigator to present 'Auth' to route 'Login'.
});

const main = createDrawerNavigator(
  {
    MainTabNavigator,
  },
  {
    contentComponent: SideBar,
    drawerWidth: perfectSize(250),
    drawerType: 'back',
    //the drawer is revealed behind the screen of swipe.

  },
);

export default createSwitchNavigator({
  OnboardingStack,
  Main: main,
});
