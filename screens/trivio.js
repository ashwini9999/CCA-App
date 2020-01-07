import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableRipple,
  Button,
} from 'react-native';

import {create} from 'react-native-pixel-perfect';

import moment from 'moment';
import CountDown from 'react-native-countdown-component';
import CountdownCircle from 'react-native-countdown-circle';
import axios from 'react-native-axios';
import BackgroundTimer from 'react-native-background-timer';

// const server = '172.16.38.82:8000' //physical android device local api test
// const server = '10.0.2.2:8000' //android emulator local api test
const server = 'http://13.233.216.21'; //develpoment api

let qt = 10;
let at = 5;

const designResolution = {
  width: 360,
  height: 640,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);
const styles = StyleSheet.create({
  stretch: {
    fontSize: perfectSize(13),
    marginTop: perfectSize(10),
    marginLeft: perfectSize(24),
    marginRight: perfectSize(21),
    lineHeight: perfectSize(17),
    fontFamily: 'avenir-roman',
  },
  contact: {
    fontSize: perfectSize(14),
    marginTop: perfectSize(16),
    marginLeft: perfectSize(24),
    fontFamily: 'avenir-black',
  },
  meet: {
    fontSize: perfectSize(14),
    marginTop: perfectSize(24),
    marginLeft: perfectSize(24),
    // fontWeight: "bold",
    fontFamily: 'avenir-black',
  },
});

//question screen
class Question extends Component {
  render() {
    console.log('question time:' + qt);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'avenir-roman'}}>
            {' '}
            Q {this.props.num + 1}
          </Text>

          {/* timer */}
          <View
            style={{
              marginTop: perfectSize(60),
              zIndex: 1,
              marginLeft: perfectSize(20),
            }}>
            <CountdownCircle
              seconds={qt}
              radius={40}
              borderWidth={8}
              color="#00a3a0"
              bgColor="#fff"
              textStyle={{fontSize: 20, fontFamily: 'avenir-black'}}
              onTimeElapsed={() => {
                qt = 10;
                BackgroundTimer.runBackgroundTimer(() => {
                  at -= 1;
                }, 1000);
                console.log(at);
                this.props.setdispans();
              }} //display answer function
            />
          </View>

          <Text style={{fontFamily: 'avenir-roman'}}>
            Score: {this.props.score}{' '}
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            backgroundColor: 'skyblue',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: perfectSize(5),
            marginRight: perfectSize(5),
            paddingLeft: perfectSize(20),
            paddingRight: perfectSize(20),
          }}>
          <Text
            style={{
              fontFamily: 'avenir-roman',
              lineHeight: perfectSize(18),
            }}>
            {this.props.question}
          </Text>
        </View>

        <View style={{flex: 0.3}} />

        <TouchableHighlight
          underlayColor="steelblue"
          style={{
            flex: 0.6,
            backgroundColor: this.props.bgcolor1,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: perfectSize(20),
            marginRight: perfectSize(20),
          }}
          onPress={() => this.props.setbgcolor1()}>
          <Text style={{fontFamily: 'avenir-roman'}}>{this.props.opt1}</Text>
        </TouchableHighlight>

        <View style={{flex: 0.3}} />

        <TouchableHighlight
          underlayColor="steelblue"
          style={{
            flex: 0.6,
            backgroundColor: this.props.bgcolor2,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: perfectSize(20),
            marginRight: perfectSize(20),
          }}
          onPress={() => this.props.setbgcolor2()}>
          <Text style={{fontFamily: 'avenir-roman'}}>{this.props.opt2}</Text>
        </TouchableHighlight>

        <View style={{flex: 0.3}} />

        <TouchableHighlight
          underlayColor="steelblue"
          style={{
            flex: 0.6,
            backgroundColor: this.props.bgcolor3,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: perfectSize(20),
            marginRight: perfectSize(20),
          }}
          onPress={() => this.props.setbgcolor3()}>
          <Text style={{fontFamily: 'avenir-roman'}}>{this.props.opt3}</Text>
        </TouchableHighlight>

        <View style={{flex: 0.5}} />
      </View>
    );
  }
}

//answer screen
class Answer extends Component {
  render() {
    console.log('answer time:' + at);
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: 'avenir-roman'}}>
            {' '}
            Q.{this.props.num + 1}{' '}
          </Text>

          {/* timer */}
          <View
            style={{
              marginTop: perfectSize(75),
              zIndex: 1,
              marginLeft: perfectSize(20),
            }}>
            <CountdownCircle
              seconds={at}
              radius={40}
              borderWidth={8}
              color="#00a3a0"
              bgColor="#fff"
              textStyle={{fontSize: 20, fontFamily: 'avenir-black'}}
              onTimeElapsed={() => {
                at = 5;
                BackgroundTimer.runBackgroundTimer(() => {
                  qt -= 1;
                }, 1000);
                this.props.setdispques();
              }} //display question function
            />
          </View>

          <Text style={{fontFamily: 'avenir-roman'}}>
            {' '}
            Score: {this.props.score}{' '}
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            backgroundColor: 'skyblue',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: perfectSize(5),
            marginRight: perfectSize(5),
            paddingLeft: perfectSize(10),
            paddingRight: perfectSize(10),
          }}>
          <Text
            style={{fontFamily: 'avenir-roman', lineHeight: perfectSize(18)}}>
            {this.props.question}
          </Text>
        </View>

        <View style={{flex: 1}} />

        <View
          style={{
            flex: 0.8,
            backgroundColor: 'green',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: perfectSize(30),
            marginRight: perfectSize(30),
          }}>
          <Text style={{fontFamily: 'avenir-roman'}}>{this.props.ans}</Text>
        </View>

        <View style={{flex: 1}} />
      </View>
    );
  }
}

export default class Trivio extends Component {
  static navigationOptions = {
    title: 'Trivio',
    headerStyle: {
      backgroundColor: '#ffffff',
      marginTop: StatusBar.currentHeight,
      zIndex: 0,
      position: 'absolute',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      color: '#000',
      fontSize: perfectSize(18),
      fontFamily: 'avenir-medium',
      fontWeight: undefined,
    },
    // headerRight: (
    //   <View
    //     style={{marginRight: perfectSize(10), marginBottom: perfectSize(15)}}>
    //     <TouchableOpacity
    //       onPress={() => {
    //         this.props.navigation.navigate('TrivioLeader');
    //       }}>
    //       <View
    //         style={{
    //           width: perfectSize(112),
    //           height: perfectSize(25),
    //           borderRadius: perfectSize(2),
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           borderColor: '#020122',
    //           borderWidth: 1,
    //           marginTop: perfectSize(16),
    //           backgroundColor: 'transparent',
    //           //opacity: link == "none" ? 0 : 1
    //         }}>
    //         <Text
    //           style={{
    //             fontFamily: 'avenir-roman',
    //             fontSize: perfectSize(13),
    //             color: '#020122',
    //           }}>
    //           LeaderBoard
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // ),
  };

  //initailize state
  constructor(props) {
    super(props);
    this.state = {
      timer: '',
      next_timer: '',
      animating: true,
      start: false,
      counter: 0,
      questions: [],
      no_of_ques: 0,
      displayquestion: true,
      displayanswer: false,
      score: 0,
      bgcolor1: 'powderblue',
      bgcolor2: 'powderblue',
      bgcolor3: 'powderblue',
      uanswer: 0,
      flag: 'red',
      correctans: '',
    };
  }

  componentDidMount = () => {
    //fetch all questions
    axios({
      method: 'get',
      url: `${server}/question/?format=json`,
      auth: {
        username: 'admin',
        password: 'admin123',
      },
    })
      .then(response => {
        // console.log(response.data);

        let ob = [];

        //store all questions in ob array
        for (let q in response.data) {
          ob.push({
            question: response.data[q].question,
            option1: response.data[q].opt1,
            option2: response.data[q].opt2,
            option3: response.data[q].opt3,
            ans: response.data[q].ans,
          });
        }
        // console.log(ob);
        this.setState({
          // data: response.data,
          animating: false,
          questions: ob,
        });
      })
      .catch(error => {
        console.error(error);
      });

    //fetch upcoming events
    fetch(`${server}/event/`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          timer: responseJson[0].event,
          // next_timer :responseJson[0].next_event,
          no_of_ques: responseJson[0].no_of_ques - 1,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  //display answer function
  setdispans = () => {
    console.log('display answer ' + at);
    if (this.state.questions[this.state.counter].ans == this.state.uanswer) {
      this.setState({
        score: this.state.score + 1,
        flag: 'green',
      });
    }

    if (this.state.questions[this.state.counter].ans == '1') {
      this.setState({
        correctans: this.state.questions[this.state.counter].option1,
      });
    } else if (this.state.questions[this.state.counter].ans == '2') {
      this.setState({
        correctans: this.state.questions[this.state.counter].option2,
      });
    } else {
      this.setState({
        correctans: this.state.questions[this.state.counter].option3,
      });
    }

    this.setState({
      displayquestion: false,
      displayanswer: true,
    });
  };

  //display question function
  setdispques = () => {
    console.log('display question ' + qt);
    this.setState({
      displayquestion: true,
      displayanswer: false,
      counter: this.state.counter + 1, //increment counter for each question
      bgcolor1: 'powderblue',
      bgcolor2: 'powderblue',
      bgcolor3: 'powderblue',
      uanswer: 0,
      flag: 'red',
    });

    //post score after last question
    if (this.state.counter == this.state.no_of_ques) {
      this.setState({
        displayquestion: false,
        displayanswer: false,
      });

      //post player score
      axios({
        method: 'post',
        url: `${server}/players/`,
        data: {
          name: user_name,
          email: user_email,
          score: this.state.score,
        },
        auth: {
          username: 'admin',
          password: 'admin123',
        },
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };

  //answer 1 color change
  setbgcolor1 = () => {
    this.setState({
      bgcolor1: 'orange',
      bgcolor2: 'powderblue',
      bgcolor3: 'powderblue',
      uanswer: 1,
    });
  };

  //answer 2 color change
  setbgcolor2 = () => {
    this.setState({
      bgcolor1: 'powderblue',
      bgcolor2: 'orange',
      bgcolor3: 'powderblue',
      uanswer: 2,
    });
  };

  //answer 3 color change
  setbgcolor3 = () => {
    this.setState({
      bgcolor1: 'powderblue',
      bgcolor2: 'powderblue',
      bgcolor3: 'orange',
      uanswer: 3,
    });
  };

  render() {
    qt = 2;
    at = 1;
    const animating = this.state.animating;
    const currentDate = moment(); //get current time
    const future = moment(this.state.timer); //upcoming event time

    const duration = moment.duration(future.diff(currentDate)).asSeconds(); //time till upcoming event

    //loading over
    if (this.state.animating == false) {
      //game not started
      if (this.state.start != false) {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              flex: 1,
            }}>
            <Image
              source={require('../assets/images/triviologo.png')}
              style={{width: perfectSize(200), height: perfectSize(200)}}
            />
            {/* coundown timer */}
            <CountDown
              style={{marginBottom: perfectSize(60)}}
              until={duration}
              size={30}
              onFinish={() => this.setState({start: true})}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: '#1CC625'}}
              timeToShow={['D', 'H', 'M', 'S']}
              timeLabels={{d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds'}}
            />

            {/* leaderboard button */}
            <TouchableHighlight
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: perfectSize(2),
                borderColor: 'black',
                borderWidth: 1,
                width: perfectSize(150),
                height: perfectSize(30),
                // marginBottom: perfectSize(50),
                // marginRight: perfectSize(10),
              }}
              onPress={() => {
                this.props.navigation.navigate('TrivioLeader');
              }}>
              <Text> Leader Board </Text>
            </TouchableHighlight>
          </View>
        );
      } else {
        //display question
        if (
          this.state.displayquestion == true &&
          this.state.displayanswer == false
        ) {
          return (
            <Question
              question={this.state.questions[this.state.counter].question}
              opt1={this.state.questions[this.state.counter].option1}
              opt2={this.state.questions[this.state.counter].option2}
              opt3={this.state.questions[this.state.counter].option3}
              setdispans={this.setdispans}
              score={this.state.score}
              uanswer={this.state.uanswer}
              setbgcolor1={this.setbgcolor1}
              setbgcolor2={this.setbgcolor2}
              setbgcolor3={this.setbgcolor3}
              bgcolor1={this.state.bgcolor1}
              bgcolor2={this.state.bgcolor2}
              bgcolor3={this.state.bgcolor3}
              num={this.state.counter}
            />
          );
        }
        //display answer
        else if (
          this.state.displayquestion == false &&
          this.state.displayanswer == true
        ) {
          return (
            <Answer
              question={this.state.questions[this.state.counter].question}
              setdispques={this.setdispques}
              score={this.state.score}
              flag={this.state.flag}
              num={this.state.counter}
              // ans = {this.state.questions[this.state.counter].ans}
              ans={this.state.correctans}
            />
          );
        }
        //display score
        else {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: perfectSize(-5),
                  top: perfectSize(-40),
                  marginRight: perfectSize(19),
                  zIndex: 999999999,
                  elevation: 99999,
                }}
                onPress={() => {
                  this.props.navigation.navigate('TrivioLeader');
                }}>
                <View
                  style={{
                    width: perfectSize(112),
                    height: perfectSize(25),
                    borderRadius: perfectSize(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#020122',
                    borderWidth: 1,
                    // marginTop: perfectSize(50),
                    backgroundColor: 'transparent',
                    //opacity: link == "none" ? 0 : 1
                  }}>
                  <Text
                    style={{
                      fontFamily: 'avenir-roman',
                      fontSize: perfectSize(13),
                      color: '#020122',
                    }}>
                    LeaderBoard
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  paddingLeft: perfectSize(70),
                  paddingRight: perfectSize(70),
                  paddingTop: perfectSize(80),
                  paddingBottom: perfectSize(80),
                  backgroundColor: '#c0d5ec',
                  borderRadius: 10,
                  elevation: 2,
                }}>
                <Text
                  style={{
                    fontFamily: 'avenir-roman',
                    fontSize: perfectSize(20),
                  }}>
                  {' '}
                  Your score is: {this.state.score}
                </Text>
              </View>
            </View>
          );
        }
      }
    }
    //display loader
    else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Image
            source={require('../assets/images/CCA-App_Loader.gif')}
            style={{width: 80, height: 80}}
          />
        </View>
      );
    }
  }
}
