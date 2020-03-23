import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, Text } from 'react-native';
import Style from '../../../../helpers/style/style';
import ProfileSymbol from '../../../../components/ProfileSymbol/ProfileSymbol';
import Popup from './Popup';
import Routes from '../../../../Routes/Routes';
import Volunteer from './Volunteer';
import { inject, observer } from "mobx-react";

@inject('AuthStore', 'NavigationStore', 'UsersStore')
@observer
export default class Connection extends Component {

  symbolSize = 45;
  bigCircleSize = Dimensions.get('window').width*0.90;
  smallCircleSize = this.bigCircleSize*0.7;

  constructor(props) {
    super(props);
    this.state = {
      popPosition: {
        x: 0, y: 0, open: false
      },
      mostVolunteers: [],
      sub_mostVolunteers: []
    }
    this.popAnimation = new Animated.Value(0);
  }

  calculateLocation(circleSize, symbolSize, deg) {
    let radius = circleSize / 2;
    let center = radius;
    let angleRad = deg * Math.PI / 180; // deg to rad
    return {
      x: radius * Math.cos(angleRad) + center - symbolSize / 2,
      y: radius * Math.sin(angleRad) + center - symbolSize / 2
    }
  }

  openPopUp(event) {
    let position = {
      x: event.touchHistory.touchBank[0].currentPageX,
      y: event.touchHistory.touchBank[0].currentPageY-230
    };
    if(this.state.popPosition.open) {
      this.setState((prevState) => {
        return {
          popPosition: {
            ...prevState.popPosition,
            open: false
          }
        }
      });
    } else {
      this.setState({
        popPosition: {
          ...position,
          open: true
        }
      });
    }
  }

  navigateToProfile(userData) {
    this.props.NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {userData: userData})
  }

  render() {
    const mainVolunteers = this.props.data.slice(0, this.props.data.length/2);
    const subVolunteers = this.props.data.slice(this.props.data.length/2, this.props.data.length);
    return (
        <View style={styles.connectionsBox}>
          <View style={{...styles.circle, width: this.bigCircleSize}}>
          {
            subVolunteers.map((vol, i) => {
              let symbolPosition = this.calculateLocation(
                  this.bigCircleSize,
                  this.symbolSize,
                  (360/mainVolunteers.length)*(i+1)
              );
              return (
                <Volunteer 
                  key={i}
                  user_id={vol.user_id}
                  amount={vol.amount}
                  size={this.symbolSize}
                  style={{
                    position: 'absolute',
                    top: symbolPosition.y,
                    left: symbolPosition.x
                  }}
                />
                  // <ProfileSymbol
                  //     key={i}
                  //     src={userData.profileImage}
                  //     size={this.symbolSize}
                  //     press={this.navigateToProfile.bind(this, vol.user)}
                  //     showCash={true}
                  //     cash={vol.amount}
                  //     style={{
                  //       position: 'absolute',
                  //       top: symbolPosition.y,
                  //       left: symbolPosition.x
                  //     }}
                  // />
              )
            })
          }
            <View style={{...styles.circle, width: this.smallCircleSize}}>
              {
                mainVolunteers.map((vol, i) => {
                  let symbolPosition = this.calculateLocation(
                      this.smallCircleSize,
                      this.symbolSize+10,
                      50+(360/subVolunteers.length)*(i+1)
                  );
                  return (
                    <Volunteer
                      key={i}
                      user_id={vol.user_id}
                      amount={vol.amount}
                      size={this.symbolSize+10}
                      style={{
                        position: 'absolute',
                        top: symbolPosition.y,
                        left: symbolPosition.x
                      }}
                    />
                      // <View key={i} style={{
                      //     position: 'absolute',
                      //     top: symbolPosition.y,
                      //     left: symbolPosition.x
                      // }}>
                      //   {/* <ProfileSymbol
                      //       src={vol.user.profileImage}
                      //       size={this.symbolSize+10}
                      //       press={this.navigateToProfile.bind(this, vol.user)}
                      //       showCash={true}
                      //       cash={vol.amount}
                      //   /> */}
                      // </View>
                  )
                })
              }
              <View style={styles.imageBox}>
                <ProfileSymbol src={this.props.AuthStore.getUserLogin.profileImage} size={130} />
              </View>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionsBox: {
    padding: 30,
    position: 'relative'
  },
  circle: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'green',
    borderStyle: 'dotted',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  imageBox: {
    padding: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Style.colors.lightMain
  },

  pop: {
    width: 100,
    backgroundColor: Style.colors.popup,
    borderRadius: 20,
    position: 'absolute'
  }
});
