import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Style from '../../../helpers/style/style';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../../components/Header/Header';
import ProfileButton from './ProfileButton';
import { inject, observer } from "mobx-react";
import Routes from '../../../Routes/Routes';
import ApiService from '../../../Services/Api';
import { window_width } from '../../../utils/view';
import { iconNames } from '../../../components/Icon/Icon';
import FollowButton from './FollowButton';

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
      showExtra: false
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

  async pressExtra(cost, amount) {
    const {UsersStore, AuthStore, NavigationStore} = this.props;
    let buyResponse = await ApiService.addExtraContent(AuthStore.getUserLogin._id, cost, amount);
    if(buyResponse.error) {
      NavigationStore.setBanner(buyResponse.error);
    } else {
      AuthStore.updateUserLogin(buyResponse);
      UsersStore.updateUser(AuthStore.getUserLogin._id, buyResponse);
    }
  }

  render() {
    const {UsersStore, AuthStore, navigation} = this.props;
    const userData = UsersStore.getUsers[navigation.getParam('id')];
    const myProfile = AuthStore.isMyId(userData._id);
    return (
      <View style={{flex:1}}>
        {userData && <View style={s.viewContainer}>
          <UserDetails 
            onNavigate={(routeName, params) => this.props.NavigationStore.navigate(routeName, params)} 
            followPress={this.updateFollow.bind(this)}
            isMy={myProfile} 
            follow={AuthStore.isFollow(userData._id)} 
            user={userData}
          />
          <View style={s.buttons}>
            {myProfile ? (<ProfileButton style={{transform: [{skewX: '10deg'}]}} title='Extra Photo' onPress={() => this.setState({showExtra: !this.state.showExtra})} icon={iconNames.PLUS} />)
              :(<FollowButton style={{transform: [{skewX: '10deg'}]}} onPress={this.updateFollow.bind(this)} follow={AuthStore.isFollow(userData._id)} />)}
            <ProfileButton style={{transform: [{skewX: '10deg'}]}} title='Secret' icon={iconNames.LOCK} />
          </View>
          <Photos 
            isMy={myProfile}
            amount={userData.limit_of_contents}
            onPhoto={this.navigateToPhoto.bind(this)}
            data={userData.uploads}
            toAdd={() => this.props.NavigationStore.navigate(Routes.Screens.CAMERA.routeName)}
            showExtra={this.state.showExtra}
            onPressExtra={this.pressExtra.bind(this)}
          />
        </View>}
      </View>
    );
  }
}

const s = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    backgroundColor: Style.colors.background,
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    width: window_width*0.7
  }
});
