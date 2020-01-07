import React from "react";
import { Text, Image, View, ScrollView } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../components/Dimensions";

import { create } from "react-native-pixel-perfect";

//for pixel perfect app
const designResolution = {
  width: 360,
  height: 640
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

export default class PlayersObject extends React.Component {
  render() {
    console.log("in modal");
    let children = [];
    let player = this.props.players;
    let len = player.length;
    // if (len % 2 == 0) len = len;
    // else len = len - 1;
    console.log(len);
    //console.log(player[0].name)

    for (var j = 0; j < len; j++) {
      //console.log(player[j].name + "player: " + j);
      children.push(
        <View
          //key={i}
          style={{
            backgroundColor: "skyblue",
            paddingVertical: perfectSize(15),
            flexDirection: "row",
            //justifyContent: "space-around",
            backgroundColor: j % 2 != 0 ? "skyblue" : "white"
          }}
        >
          <Text
            style={{
              paddingHorizontal: perfectSize(40),
              fontSize: perfectSize(16),
              fontFamily: "avenir-roman",
              textAlign: "center",
              color: j % 2 != 0 ? "white" : "black"
            }}
          >
            {j + 1}
          </Text>
          <Text
            style={{
              width: perfectSize(160),
              fontSize: perfectSize(16),
              fontFamily: "avenir-roman",
              textAlign: "center",
              color: j % 2 != 0 ? "white" : "black"
            }}
          >
            {player[j].name}
          </Text>
          <Text
            style={{
              paddingHorizontal: perfectSize(20),
              fontSize: perfectSize(16),
              fontFamily: "avenir-roman",
              textAlignHorizontal: "center",
              color: j % 2 != 0 ? "white" : "black"
            }}
          >
            {player[j].score}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
          //justifyContent: "center",
          //alignItems: "center"
          //paddingTop: perfectSize(16),
          //paddingHorizontal: widthPercentageToDP("8.9%"),
          //paddingBottom: heightPercentageToDP("6%")
        }}
      >
        {children}
      </View>
    );
  }
}
