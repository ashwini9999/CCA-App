import React, { Component } from "react";
import heart from "../assets/images/heart.png";
import dislike from "../assets/images/dislike.png";
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TouchableOpacity
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "../components/Dimensions";
import { withNavigation } from "react-navigation";
import { TouchableRipple } from "react-native-paper";
import { create } from "react-native-pixel-perfect";
import axios from "react-native-axios";

const designResolution = {
  width: 360,
  height: 640
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);

class Eventbox extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, dataSource: [], time: 1 };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "https://reg.arhn.co.in/api/events/",
      //url: "http://192.168.100.183:8000/api/events/",
      auth: {
        username: "wdct",
        password: "Wdct@cca"
      }
    })
      .then(response => {
        if (!response.data.hasOwnProperty("detail")) {
          let events = JSON.parse(JSON.stringify(response.data));

          if (events == null) return;

          if (user_email != "none") {
            let userEvents = JSON.parse(user_data.string);
            let i = 0;

            console.log("events - " + userEvents);

            for (let event of events) {
              for (let userEvent of userEvents.events) {
                if (event.title == userEvent.title && userEvent.like) {
                  events[i].like = true;
                  break;
                } else {
                  events[i].like = false;
                }
              }
              i++;
            }
          } else {
            for (let event of events) {
              event.like = false;
            }
          }

          console.log(events);

          this.setState({
            isLoading: false,
            dataSource: events
          });
        } else {
          this.setState({
            isLoading: false,
            dataSource: []
          });
        }
      })
      .catch(error => {
        // console.error(error);
        //console.log(error);
      });

    setTimeout(() => {
      this.setState({
        time: 0
      });
    }, 2000);
  }

  //   fetch("http://reg.arhn.co.in/api/events/")
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       if (!responseJson.hasOwnProperty("detail")) {
  //         let events = JSON.parse(JSON.stringify(responseJson));

  //         if (events == null) return;

  //         if (user_email != "none") {
  //           let userEvents = JSON.parse(user_data.string);
  //           let i = 0;
  //           for (let event of events) {
  //             for (let userEvent of userEvents.events) {
  //               if (event.title == userEvent.title && userEvent.like) {
  //                 events[i].like = true;
  //               } else {
  //                 events[i].like = false;
  //               }
  //             }
  //             i++;
  //           }
  //         } else {
  //           for (let event of events) {
  //             event.like = false;
  //           }
  //         }

  //         this.setState({
  //           isLoading: false,
  //           dataSource: events
  //         });
  //       } else {
  //         this.setState({
  //           isLoading: false,
  //           dataSource: []
  //         });
  //       }
  //     })
  //     .catch(error => {});

  //   setTimeout(() => {
  //     this.setState({
  //       time: 0
  //     });
  //   }, 2000);
  // }

  addevents() {
    let children = [];

    let events = this.state.dataSource;
    console.log(events[0].event_link_name);

    for (let i = 0; i < events.length; i++) {
      children.push(
        <View
          key={i}
          style={{
            marginBottom: 24,
            marginHorizontal: widthPercentageToDP("7.8%"),
            elevation: 5,
            overflow: "hidden",
            backgroundColor: "white"
          }}
        >
          <TouchableRipple
            style={{}}
            //disabled={user_email == "none" ? true : false}
            onPress={() =>
              this.props.navigation.navigate("Event_details", {
                events_name: events[i].title,
                events_location: events[i].location,
                events_date: events[i].Date,
                events_photo: events[i].image,
                events_descript: events[i].description,
                events_like: events[i].like_count,
                events_link_name: events[i].event_link_name,
                events_link: events[i].event_link
              })
            }
          >
            <View>
              <Image
                source={{ uri: events[i].image }}
                style={{ height: perfectSize(128), width: "100%" }}
              />
              <View
                style={{
                  backgroundColor: "#ffffff",
                  paddingBottom: perfectSize(18),
                  paddingLeft: perfectSize(16),
                  paddingRight: perfectSize(16),
                  paddingTop: perfectSize(8)
                }}
              >
                <Text
                  style={{
                    fontSize: perfectSize(16),
                    fontFamily: "avenir-heavy",
                    color: "#000000"
                  }}
                >
                  {/* {user_data.string} */}
                  {events[i].title}
                </Text>
                <Text
                  style={{
                    fontSize: perfectSize(12),
                    fontFamily: "avenir-roman",
                    opacity: 0.7,
                    color: "#000000",
                    marginTop: perfectSize(3)
                  }}
                >
                  {events[i].location}
                </Text>
                <Text
                  style={{
                    fontSize: perfectSize(12),
                    fontFamily: "avenir-roman",
                    color: "#000000",
                    lineHeight: perfectSize(17),
                    marginTop: perfectSize(4)
                  }}
                >
                  {events[i].details}
                </Text>

                {console.log(events[i].like)}
                <TouchableOpacity
                  style={{
                    position: "absolute",

                    right: perfectSize(15),
                    top: perfectSize(24)
                  }}
                  disabled={user_email == "none" ? true : false}
                  onPress={() => {
                    // fetch("http://reg.arhn.co.in/like/" + (i + 1) + "/")
                    //   .then(response => response.json())
                    //   .then(responseJson => {
                    //     // this.setState({
                    //     //   //isLoading: false,
                    //     //   dataSource: responseJson
                    //     // });
                    //   })
                    //   .catch(error => {
                    //     console.error(error);
                    //   });

                    if (user_email != "none") {
                      let state = JSON.parse(JSON.stringify(this.state));
                      let userEvents = JSON.parse(user_data.string);
                      state.dataSource[i].like = !state.dataSource[i].like;
                      let current_event = null;

                      for (let event of userEvents.events) {
                        if (event.title == state.dataSource[i].title) {
                          current_event = event;
                        }
                      }

                      if (!current_event) {
                        userEvents.events.push({
                          title: events[i].title,
                          like: state.dataSource[i].like,
                          feedback: false
                        });
                      } else {
                        current_event.like = state.dataSource[i].like;
                      }

                      axios({
                        method: "put",
                        url:
                         "https://reg.arhn.co.in/api/users/edit_email/" +
                         //"http://192.168.100.183:8000/api/users/edit_email/" +
                          user_data.email +
                          "/",
                        data: {
                          email: user_data.email,
                          string: JSON.stringify(userEvents)
                        },
                        auth: {
                          username: "wdct",
                          password: "Wdct@cca"
                        }
                      }).catch(error => {
                        //console.error(error);
                      });

                      user_data = {
                        email: user_data.email,
                        string: JSON.stringify(userEvents)
                      };

                      if (state.dataSource[i].like) {
                        axios({
                          method: "get",
                          url:
                            "https://reg.arhn.co.in/api/like/" +
                            //"http://192.168.100.183:8000/api/like/" +
                            events[i].title +
                            "/",
                          auth: {
                            username: "wdct",
                            password: "Wdct@cca"
                          }
                        }).catch(error => {
                          //console.error(error);
                        });

                        state.dataSource[i].like_count++;
                      } else {
                        axios({
                          method: "get",
                          url:
                            "https://reg.arhn.co.in/api/dlike/" +
                            //"http://192.168.100.183:8000/api/dlike/" +
                            events[i].title +
                            "/",
                          auth: {
                            username: "wdct",
                            password: "Wdct@cca"
                          }
                        }).catch(error => {
                          //console.error(error);
                        });
                        state.dataSource[i].like_count--;
                      }

                      this.setState({
                        dataSource: state.dataSource
                      });
                    }
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={events[i].like ? heart : dislike}
                      // resizeMode={"contain"}
                      style={{
                        width: perfectSize(20),
                        height: perfectSize(19),

                        display: user_email == "none" ? "none" : "flex"
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: perfectSize(4),
                        marginTop: perfectSize(2),
                        color: events[i].like ? "#d0026f" : "#D8D8D8",
                        fontSize: perfectSize(13),
                        fontFamily: "avenir-heavy",
                        display: user_email == "none" ? "none" : "flex"
                      }}
                    >
                      {" "}
                      {events[i].like_count}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableRipple>
        </View>
      );
    }

    return <View style={{}}>{children}</View>;
  }

  render() {
    if (this.state.isLoading == false && this.state.time == 0) {
      return (
        <ScrollView
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          {this.addevents()}
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../assets/images/CCA-App_Loader.gif")}
            style={{ width: 80, height: 80 }}
          />
        </View>
      );
    }
  }
}

export default withNavigation(Eventbox);
