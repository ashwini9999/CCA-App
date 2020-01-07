import React, { Component } from "react";
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "../assets/style/SliderEntry.style";
import styles, { colors } from "../assets/style/index.style";
import SliderEntry from "./SliderEntry";
import { ENTRIES1, ENTRIES2 } from "../assets/entries";
import axios from "react-native-axios";

const IS_ANDROID = Platform.OS === "android";
const SLIDER_1_FIRST_ITEM = 1;

export default class Carousal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      dataSource: [],
      isLoading: true
    };
  }

  componentDidMount() {
    //fetching api
    axios({
      method: "get",
      url: "https://reg.arhn.co.in/api/slideshow/",
      auth: {
        username: "wdct",
        password: "Wdct@cca"
      }
    })
      .then(response => {
        let ob = [];
        for (let image of response.data) {
          ob.push({
            illustration: image.image,
            link: image.slide_link
          });
        }
        //console.log(ob);
        this.setState({
          isLoading: false,
          dataSource: ob
        });
      })
      .catch(error => {
        console.error("hello - " + error);
      });
  }

  _renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(`${this.state.dataSource[index].link}`);
        }}
      >
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
      </TouchableOpacity>
    );
  };

  mainExample(number, title) {
    const { slider1ActiveSlide } = this.state;
    return (
      <View style={styles.exampleContainer}>

        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.state.dataSource}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.8}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
        />
      </View>
    );
  }

  render() {
    const example1 = this.mainExample(
      1,
      "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots"
    );

    return <View>{example1}</View>;
  }
}
