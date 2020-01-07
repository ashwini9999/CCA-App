import React, { Component } from "react";
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View // Container component
} from "react-native";

export default class Button extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    //borderRadius: 50,         // Rounded border
    //borderWidth: 2,           // 2 point border widht
    //borderColor: '#FFFFFF',   // White colored border
    paddingHorizontal: 10, // Horizontal padding
    paddingVertical: 3 // Vertical padding
  },
  // Button text
  text: {
    color: "#FFFFFF",
    //fontSize: 20,
    opacity: 1
  }
});
