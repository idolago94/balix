import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Style from '../../../helpers/style/style';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../../components/Header/Header';
import db from '../../../database/db';
import { inject, observer } from "mobx-react";
import Routes from '../../../Routes/Routes';
import ApiService from '../../../Services/Api';

@inject('AuthStore', 'NavigationStore', 'UsersStore')
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
      userData: {},
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
    // const {UsersStore, navigation} = this.props;
    // let user = UsersStore.getUserById(navigation.getParam('id'));
    // let user = navigation.getParam('userData');
    // // check if params exist and different from the last
    // if(user && user._id != AuthStore.getUserLogin._id) {
    //   let follow = AuthStore.getUserLogin.following.find(followUser => followUser == user._id);
    //   if(this.state.userData == undefined || user._id != this.state.userData._id) {
    //     this.setState({userData: user, follow: !!follow});
    //   } else if(!!follow != this.state.follow) {
    //     this.setState({follow: !!follow})
    //   }
    //   // this.getUserContents(user._id);
    // } else {
    //   this.setState({userData: undefined, contents: []});
    //   // this.getUserContents(AuthStore.getUserLogin._id);
    // }
  }

  // getUserContents(user_id) {
  //     console.log('fetch user contents -> ', user_id);
  //     fetch(`${db.url}/content/userContent?id=${user_id}`)
  //     .then(res => res.json()).then(contentsResponse => {
  //       this.setState({contents: contentsResponse});
  //     });
  // }

  async updateFollow() {
    const {AuthStore, UsersStore, navigation} = this.props;
    let userData = UsersStore.getUsers[navigation.getParam('id')];
    let followStatus = AuthStore.isFollow(userData._id);
    let followResponse;
    if(followStatus) {
      followResponse = await ApiService.stopFollow(AuthStore.getUserLogin._id, navigation.getParam('id'));
    } else {
      followResponse = await ApiService.startFollow(AuthStore.getUserLogin._id, navigation.getParam('id'));
    }
    (Array.isArray(followResponse)) && AuthStore.updateUserLogin({following: followResponse});
  }

  navigateToPhoto(params) {
    console.log('ProfileView -> navigateToPhoto -> params ', params);
    params.user_id = this.props.navigation.getParam('id');
    this.props.NavigationStore.navigate(Routes.Screens.PHOTO.routeName, params);
  }

  render() {
    const {UsersStore, AuthStore, navigation} = this.props;
    const userData = UsersStore.getUsers[navigation.getParam('id')];
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.scrollContainer}>
          {userData && <View style={styles.viewContainer}>
            <UserDetails 
              onNavigate={(routeName, params) => this.props.NavigationStore.navigate(routeName, params)} 
              followPress={this.updateFollow.bind(this)}
              isMy={AuthStore.isMyId(userData._id)} 
              follow={AuthStore.isFollow(userData._id)} 
              user={userData} 
            />
            <Photos 
              onPhoto={this.navigateToPhoto.bind(this)}
              data={userData.uploads} 
            />
          </View>}
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
