//the following code is for the aarohan bar in the tab bar at the bottom.


import React, { Component } from "react";
import { Animated, TouchableHighlight, View, Image } from "react-native";
import arhnlogo from "../assets/images/arhnlogosmall.png";

import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../constants/Colors";
import { widthPercentageToDP } from "./Dimensions";
const SIZE = widthPercentageToDP("23.3%");

export default class AddButton extends Component {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          alignItems: "center"
        }}
      >
        <TouchableHighlight
          onPress={this.toggleView}
          underlayColor="#2882D8"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: SIZE,
            height: SIZE,
            borderRadius: SIZE / 2,
            backgroundColor: "#080243"
          }}
        >
          <Image
            source={arhnlogo}
            style={{
              height: widthPercentageToDP("11.9%"),
              width: widthPercentageToDP("11.9%")
            }}
          />
        </TouchableHighlight>
      </View>
    );
  }
}
