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
      () => {
        const {AuthStore, NavigationStore, UsersStore, navigation} = this.props;
        let id = navigation.getParam('id');
        let userData = UsersStore.getUsers[id];
        NavigationStore.setProfileName(userData.username);
        if(id == AuthStore.getUserLogin._id) {
          NavigationStore.setCurrentTab(Routes.Screens.PROFILE.routeName);
        }
      }
    );
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

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
