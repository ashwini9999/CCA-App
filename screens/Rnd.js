import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import TeamObject from '../components/TeamObject';

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../components/Dimensions';

import {create} from 'react-native-pixel-perfect';
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
    // fontWeight: "bold",
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

export default class Rnd extends Component {
  static navigationOptions = {
    title: 'R&D',
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
        console.error(error);
      });
  }

  render() {
    let team = [];
    if (this.state.dataSource) {
      this.state.dataSource.map(data => {
        if (
          data.cell == 'r&d' &&
          data.year != '2019' &&
          data.year !== '2018' &&
          data.year !== '2017'
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
              About Research &amp; Development Cell
            </Text>
            <Text style={styles.stretch}>
              Write from the begining of the dark age alot of ground breaking
              discoveries were made by man. There is no field in which research
              is not done. Research and Development (R&amp;D) flourishes where
              young minds and experienced faculties work synergistically.
              R&amp;D Cell has been established to promote and monitor the
              research Programs of the institute. The cell administers all the
              research Programs of the university by monitoring and coordinating
              the research Programs.The Research and Development Cell aims to
              nurture research culture in the College by promoting research in
              newly emerging and challenging areas of Engineering, Technology,
              Science and Humanities.
            </Text>
            <Text style={styles.meet}>Meet Our Team</Text>
          </View>
          <TeamObject team={team} />
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
