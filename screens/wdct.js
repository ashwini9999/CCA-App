import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../components/Dimensions';
import {create} from 'react-native-pixel-perfect';
import TeamObject from '../components/TeamObject';
import axios from 'react-native-axios';

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

export default class Wdct extends Component {
  static navigationOptions = {
    title: 'WDCT',
    headerStyle: {
      backgroundColor: '#ffffff',
      marginTop: StatusBar.currentHeight,
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      color: '#000',
      fontSize: perfectSize(18),
      fontFamily: 'avenir-medium',
      fontWeight: undefined,
    },
  };

  constructor(props) {
    super(props);
    this.state = {isLoading: true, dataSource: []};
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://reg.arhn.co.in/api/members/',
      auth: {
        username: 'wdct',
        password: 'Wdct@cca',
      },
    })
      .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.data,
        });
        setTimeout(() => {
          this.setState({
            time: 0,
          });
        }, 2000);
      })
      .catch(error => {
        //console.error(error);
      });
  }

  render() {
    let team = [];
    if (this.state.dataSource) {
      this.state.dataSource.map(data => {
        if (
          data.cell == 'wdct' &&
          data.year != '2019' &&
          data.year != '2018' &&
          data.year != '2017'
        ) {
          team.push({
            name: data.name,
            post: data.post,
            image: data.image,
            order: data.order,
          });
        }
      });
    }

    const propComparator = propName => (a, b) =>
      a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
    team.sort(propComparator('order'));
    if (this.state.isLoading == false && this.state.time == 0) {
      return (
        <ScrollView
          style={{backgroundColor: 'white'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              flexDirection: 'column',
            }}>
            <Text style={styles.contact}>
              About Web, Design &amp; Creative Team(WDCT)
            </Text>
            <Text style={styles.stretch}>
              At WDCT, We believe in creativity and design thinking. Design that
              is simple, meaningful yet modern and eye-catching.{'\n'} {'\n'}A
              congregation of enthusiastic techno-crats and creative fellas, we
              manage the technical aspects of the club, to keep it up and
              running in the cyber front. From art, digital art, photography,
              designing &amp; developing websites for AAROHAN, to organising
              workshops for amateurs, designing &amp; building Android and iOS
              applications, and hosting online events, Overnight gaming,
              Creative corner, etc, we nurture the creative spurt in the club.
            </Text>
            <Text style={styles.meet}>Meet Our Team</Text>
            <TeamObject team={team} />
          </View>
        </ScrollView>
      );
    } else {
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
