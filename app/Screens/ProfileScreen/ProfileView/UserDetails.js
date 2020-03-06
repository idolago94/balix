import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Style from '../../../helpers/style/style';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
import { connect } from 'react-redux';
import messageService from '../../../demoDB/Messages/messageService';
import Routes from '../../../Routes/Routes';
import db from "../../../database/db";
import { updateUserLogin } from "../../../store/auth/authActions";
import {bindActionCreators} from "redux";

class UserDetails extends Component {

  navigateTo(routeName, params) {
    this.props.navigate(routeName, params);
  }

  followPress() {
    let updateFollowing = [];
    let url = '';
    let bodyRequest = {};
    if(this.props.follow) {
      updateFollowing = this.props.userLogin.following.filter(follow => follow != this.props.user._id);
      bodyRequest.user_stop = this.props.user._id;
      url = `${db.url}/users/stopFollow?id=${this.props.userLogin._id}`;
    } else {
      updateFollowing = this.props.userLogin.following.slice();
      updateFollowing.push(this.props.user._id);
      url = `${db.url}/users/startFollow?id=${this.props.userLogin._id}`
    }
    bodyRequest.follow = updateFollowing;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    }).then(res => res.json()).then(response => {
      console.log(response);
      if(response.ok) {
        let updateUser = {...this.props.userLogin};
        updateUser.following = updateFollowing.slice();
        this.props.updateUserLogin(updateUser);
        this.props.followPress();
      }
    })
  }

  render() {
    if(!this.props.user) {
      return (<View></View>)
    }
    return (
      <View>
        <View style={styles.userDetails}>
          <View style={styles.user}>
            <View style={styles.imageBox}>
              <ProfileSymbol
                iconPress={(this.props.user._id == this.props.userLogin._id) ? (this.navigateTo.bind(this, Routes.Screens.CAMERA.routeName, {story_live: 'live'})) : (this.navigateTo.bind(this, Routes.Screens.CONVERSATION.routeName))}
                src={this.props.user.profileImage}
                icon={(this.props.user._id == this.props.userLogin._id) ? (iconNames.LIVE) : (iconNames.LETTER)}
                size={100}
              />
              {
                (this.props.user._id == this.props.userLogin._id) ? (null) :
                    (
                        <TouchableHighlight onPress={this.followPress.bind(this)} >
                          <View style={{...styles.followButton, borderColor: (this.props.follow) ? (Style.colors.lightMain):(Style.colors.text)}}>
                            <Icon size={15} name={iconNames.FOLLOW} color={(this.props.follow) ? (Style.colors.lightMain):(Style.colors.text)} />
                            <Text style={{color: (this.props.follow) ? (Style.colors.lightMain):(Style.colors.text), marginLeft: 7}}>{(this.props.follow) ? ('STOP'):('START')} FOLLOW</Text>
                          </View>
                        </TouchableHighlight>
                    )
              }
            </View>
            <Text style={styles.name}>{this.props.user.username}</Text>
          </View>
          <View style={styles.achievement}>
            <View style={{...styles.achiveBox, ...styles.rightBorder}}>
              <Text style={styles.number}>{this.props.user.followers.length}</Text>
              <Text style={styles.type}>Followers</Text>
            </View>
            <View style={{...styles.achiveBox, ...styles.rightBorder}}>
              <Text style={styles.number}>{this.props.user.following.length}</Text>
              <Text style={styles.type}>Following</Text>
            </View>
            <View style={styles.achiveBox}>
              <Text style={styles.number}>{this.props.user.cash}$</Text>
              <Text style={styles.type}>Dollars</Text>
            </View>
          </View>
        </View>
        {
          (this.props.user._id == this.props.userLogin._id) ?
          (
          <View style={styles.buttonBox}>
              <View style={styles.extraButton}>
                  <Text style={styles.buttonContent}>Extra Photo</Text>
              </View>
          </View>
          ) : (<View></View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userDetails: {
    justifyContent: 'center',
    marginVertical: 10
  },

  user: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: Style.colors.text,
    paddingVertical: 7,
    fontWeight: 'bold'
  },
  imageBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5
  },
  achievement: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  achiveBox: {
    alignItems: "center",
    paddingHorizontal: 35,

  },
  rightBorder: {
    borderRightColor: 'white',
    borderRightWidth: 1
  },
  number: {
    color: Style.colors.text,
    fontWeight: 'bold'
  },
  type: {
    color: Style.colors.text
  },

  buttonBox: {
    alignItems: 'center',
    margin: 10
  },
  extraButton: {
    width: '70%',
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center'
  },
  buttonContent: {
    color: Style.colors.text,
    paddingVertical: 8
  }
});

const mapStateToProps = (state) => {
  const userLogin = state.auth.userLogin;
  return { userLogin }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      updateUserLogin
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
