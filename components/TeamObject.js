import React from "react";
import { Text, Image, View } from "react-native";
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
export default class TeamObject extends React.Component {
  render() {
    let children = [];
    let team = this.props.team;
    let len = team.length;
    if (len % 2 == 0) len = len;
    else len = len - 1;

    for (let i = 0; i < len; i = i + 2) {
      children.push(
        <View
          key={i}
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: heightPercentageToDP("2.5%")
            //justifyContent: ""
          }}
        >
          <View
            style={{
              marginRight: widthPercentageToDP("11.1%"),
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: widthPercentageToDP("35.6%"),
              height: widthPercentageToDP("40%"),
              marginTop: 30
            }}
          >
            <Image
              // resizeMode={"contain"}
              source={{ uri: team[i].image }}
              style={{
                width: widthPercentageToDP("35.6%"),
                height: widthPercentageToDP("35.6%"),
                backgroundColor: "white"
              }}
            />

            <Text
              style={{
                textAlign: 'center',
                fontSize: perfectSize(13),
                fontFamily: 'avenir-heavy',
                opacity: 0.9,
                marginTop: heightPercentageToDP("1.4%")
              }}
            >
              {team[i].name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: perfectSize(12),
                fontFamily: 'avenir-roman',
                opacity: 0.7,
              }}
            >
              {team[i].post}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: widthPercentageToDP("35.6%"),
              height: widthPercentageToDP("40%"),
              marginTop: 30
            }}
          >
            <Image
              // resizeMode={"contain"}
              source={{ uri: team[i + 1].image }}
              style={{
                width: widthPercentageToDP("35.6%"),
                height: widthPercentageToDP("35.6%"),
                backgroundColor: "white"
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: perfectSize(13),
                fontFamily: 'avenir-heavy',
                opacity: 0.9,
                marginTop: heightPercentageToDP("1.4%")
              }}
            >
              {team[i + 1].name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: perfectSize(12),
                fontFamily: 'avenir-roman',
                opacity: 0.7,
              }}
            >
              {team[i + 1].post}
            </Text>
          </View>
        </View>
      );
    }

    if (team.length % 2 != 0) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: perfectSize(16),
            paddingBottom: heightPercentageToDP("6%"),
            paddingHorizontal: widthPercentageToDP("8.9%")
          }}
        >
          {children}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: widthPercentageToDP("35.6%"),
              height: widthPercentageToDP("40%"),
              marginTop: 30
            }}
          >
            <Image
              // resizeMode={"contain"}
              source={{ uri: team[team.length - 1].image }}
              style={{
                width: widthPercentageToDP("35.6%"),
                height: widthPercentageToDP("35.6%"),
                backgroundColor: "white"
              }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: perfectSize(13),
                fontFamily: 'avenir-heavy',
                opacity: 0.9,
                marginTop: heightPercentageToDP("1.4%")
              }}
            >
              {team[team.length - 1].name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: perfectSize(12),
                fontFamily: 'avenir-roman',
                opacity: 0.7,
              }}
            >
              {team[team.length - 1].post}
            </Text>
          </View>
        </View>
      );
    }

    if (team.length % 2 == 0) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: perfectSize(16),
            paddingHorizontal: widthPercentageToDP("8.9%"),
            paddingBottom: heightPercentageToDP("6%")
          }}
        >
          {children}
        </View>
      );
    }
  }
}
