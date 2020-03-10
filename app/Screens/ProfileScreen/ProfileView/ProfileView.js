import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Style from '../../../helpers/style/style';
import { connect } from 'react-redux';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../../components/Header/Header';
import db from '../../../database/db';
import { inject, observer } from "mobx-react/native";

@inject('AuthStore')
export default class ProfileView extends Component {
  static navigationOptions = ({ navigation }) => {
    let user = navigation.getParam('userData');
    if(user) {
      return {
        title: user.username
      };
    }
    return {
      headerTitle: () => <Header {...navigation} />,
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      follow: false
    }
    this.focusListener = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'willFocus',
      this.getDetailsFromParams.bind(this)
    );
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  getDetailsFromParams() {
    const {AuthStore, navigation} = this.props;
    let user = navigation.getParam('userData');
    if(user && user._id != AuthStore.getUserLogin._id) {
      let follow = AuthStore.getUserLogin.following.find(followUser => followUser == user._id);
      if(this.state.userData == undefined || user._id != this.state.userData._id) {
        this.setState({userData: user, follow: !!follow});
      } else if(!!follow != this.state.follow) {
        this.setState({follow: !!follow})
      }
    } else {
      this.setState({userData: undefined});
    }
  }

  updateFollow() {
    let updateFollowing = this.props.AuthStore.getUserLogin.following;
    let action = '';
    let bodyRequest = {user: this.state.userData._id};    
    if(this.state.follow) {
      // remove user from following
      action = 'stopFollow';
      updateFollowing = updateFollowing.filter(u => u._id != this.state.userData);
    } else {
      // add follow
      action = 'startFollow';
      updateFollowing.push(this.state.userData._id);
    }
    fetch(`${db.url}/users/${action}?id=${this.props.AuthStore.getUserLogin._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    }).then(res => res.json()).then(response => {
      console.log(response);
      if(response.ok) {
        this.props.AuthStore.updateUserLogin({following: updateFollowing});
        this.setState({follow: !this.state.follow});
      }
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.scrollContainer}>
            {
              (this.state.userData) ?
              (
                <View style={styles.viewContainer}>
                  <UserDetails {...this.props.navigation} followPress={this.updateFollow.bind(this)} follow={this.state.follow} user={this.state.userData} />
                  <Photos {...this.props.navigation} user={this.state.userData} />
                </View>
              ) :
              (
                <View style={styles.viewContainer}>
                  <UserDetails isMy={true} {...this.props.navigation} user={this.props.AuthStore.getUserLogin} />
                  <Photos isMy={true} {...this.props.navigation} user={this.props.AuthStore.getUserLogin} />
                </View>
              )
            }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Style.colors.background,
    flex: 1
  },
  viewContainer: {
    alignItems: 'center',
  }
});
