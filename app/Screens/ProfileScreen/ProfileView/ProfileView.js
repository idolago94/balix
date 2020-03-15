import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Style from '../../../helpers/style/style';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../../components/Header/Header';
import db from '../../../database/db';
import { inject, observer } from "mobx-react/native";
import Routes from '../../../Routes/Routes';

@inject('AuthStore', 'NavigationStore')
@observer
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
      follow: false,
      contents: []
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
    console.log('Profile View -> getDetailsFromParams');
    const {AuthStore, navigation} = this.props;
    let user = navigation.getParam('userData');
    // check if params exist and different from the last
    if(user && user._id != AuthStore.getUserLogin._id) {
      let follow = AuthStore.getUserLogin.following.find(followUser => followUser == user._id);
      if(this.state.userData == undefined || user._id != this.state.userData._id) {
        this.setState({userData: user, contents: [], follow: !!follow});
      } else if(!!follow != this.state.follow) {
        this.setState({follow: !!follow})
      }
      this.getUserContents(user._id);
    } else {
      this.setState({userData: undefined, contents: []});
      this.getUserContents(AuthStore.getUserLogin._id);
    }
  }

  getUserContents(user_id) {
    // return new Promise(resolve => {
      console.log('fetch user contents -> ', user_id);
      fetch(`${db.url}/content/userContent?id=${user_id}`)
      .then(res => res.json()).then(contentsResponse => {
        // resolve(contentsResponse);
        this.setState({contents: contentsResponse});
      });
    // })
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

  navigateToPhoto(params) {
    this.props.NavigationStore.navigate(Routes.Screens.PHOTO.routeName, params);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.scrollContainer}>
            {
              (this.state.userData) ?
              (
                <View style={styles.viewContainer}>
                  <UserDetails onNavigate={(routeName, params) => this.props.NavigationStore.navigate(routeName, params)} followPress={this.updateFollow.bind(this)} follow={this.state.follow} user={this.state.userData} />
                  <Photos onPhoto={this.navigateToPhoto.bind(this)} user={this.state.userData} data={this.state.contents} />
                </View>
              ) :
              (
                <View style={styles.viewContainer}>
                  <UserDetails onNavigate={(routeName, params) => this.props.NavigationStore.navigate(routeName, params)} isMy={true}  user={this.props.AuthStore.getUserLogin} />
                  <Photos onPhoto={this.navigateToPhoto.bind(this)}isMy={true}  user={this.props.AuthStore.getUserLogin} data={this.state.contents} />
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
