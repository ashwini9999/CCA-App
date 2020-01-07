import React from "react";
import { Image } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../components/Dimensions";
import Colors from "../constants/Colors";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Image
        source={this.props.source}
        resizeMode={"contain"}
        style={{
          marginRight: this.props.marginRight || 0,
          marginLeft: this.props.marginLeft || 0,
          width: widthPercentageToDP(this.props.width)
          // height: heightPercentageToDP(this.props.height)
        }}
      />
    );
  }
}
