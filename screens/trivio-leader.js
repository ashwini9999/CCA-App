import React, { Component } from "react";
import {
  WebView,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { create } from "react-native-pixel-perfect";
import back from "../assets/images/Back.png";
import { Dimensions, PixelRatio, Modal, ScrollView } from "react-native";
import { TouchableRipple, Button } from "react-native-paper";
import axios from "react-native-axios";
import PlayersObject from "../components/players";

const designResolution = {
  width: 360,
  height: 640
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

export default class TrivioLeader extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [] };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://13.233.216.21/players/",
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(response => {
        console.log("data there");
        this.setState({
          isLoading: false,
          dataSource: response.data
        });
      })
      .catch(error => {});
    // console.log(name);
  }

  render() {
    let players = null;
    if (this.state.dataSource) players = this.state.dataSource;

    const propComparator = propName => (a, b) =>
      a[propName] == b[propName] ? 0 : a[propName] > b[propName] ? -1 : 1;
    players.sort(propComparator("score"));

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: perfectSize(20) + 24,
            //paddingVertical: perfectSize(20),
            backgroundColor: "#0e0d2c"
          }}
        >
          <Text
            style={{
              fontSize: perfectSize(16),
              textAlign: "center",
              backgroundColor: "transparent",
              color: "white",
              fontFamily: "avenir-black"
            }}
          >
            Leaderboard
          </Text>
        </View>
        <View
          style={{
            paddingTop: perfectSize(20),
            backgroundColor: "skyblue",
            paddingVertical: perfectSize(15),
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "#0e0d2c"
          }}
        >
          <Text
            style={{
              fontSize: perfectSize(16),
              fontFamily: "avenir-roman",
              color: "white"
            }}
          >
            Rank
          </Text>
          <Text
            style={{
              fontSize: perfectSize(16),
              fontFamily: "avenir-roman",
              color: "white"
            }}
          >
            Name
          </Text>
          <Text
            style={{
              fontSize: perfectSize(16),
              fontFamily: "avenir-roman",
              color: "white"
            }}
          >
            Score
          </Text>
        </View>
        <TouchableRipple
          style={{
            position: "absolute",
            top: perfectSize(20) + 24,
            left: perfectSize(20)
            //padding: perfectSize(10)
          }}
          onPress={() => {
            this.props.navigation.navigate("Trivio");
          }}
          hitSlop={{ left: 50, top: 100, right: 10, bottom: 10 }}
        >
          <Image
            source={back}
            style={{
              height: perfectSize(16),
              width: perfectSize(16)
            }}
          />
        </TouchableRipple>

        <ScrollView showsVerticalScrollIndicator={false}>
          <PlayersObject players={players} />
        </ScrollView>
      </View>
    );
  }
}
