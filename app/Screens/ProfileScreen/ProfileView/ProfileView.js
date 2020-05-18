import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../../components/Header/Header';
import ProfileButton from './ProfileButton';
import { inject, observer } from "mobx-react";
import Routes from '../../../utils/Routes';
import ApiService from '../../../Services/Api';
import { window_width } from '../../../utils/view';
import { iconNames } from '../../../components/Icon/Icon';
import FollowButton from './FollowButton';
import SecretView from './SecretView';
import { colors } from '../../../utils/style';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';

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
      showScret: false
    }
    this.focusListener = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'willFocus',
      async() => {
        const {AuthStore, NavigationStore, UsersStore, navigation} = this.props;
        let id = navigation.getParam('id');
        let userData = UsersStore.getUserById(id);
        console.log('profile id -> ', id);
        if(!userData) {
          userData = await ApiService.getUser(id);
          UsersStore.setUsers([userData]);
        }
        NavigationStore.setProfileName(userData.username);
        if(id == AuthStore.getUserLogin._id) {
          NavigationStore.setCurrentTab(Routes.Screens.PROFILE.routeName);
        }
        this.setState({showScret: navigation.getParam('secret')});
      }
    );
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  async updateFollow() {
    const {AuthStore, UsersStore, navigation} = this.props;
    let userData = UsersStore.getUserById(navigation.getParam('id'));
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

  pressExtra() {
    const {UsersStore, AuthStore, NavigationStore} = this.props;
    NavigationStore.showAlert(
      'Buy extra photo',
      'You want to buy more 3 photo for uploads in 3USD ?',
      async() => {
        let buyResponse = await ApiService.addExtraContent(AuthStore.getUserLogin._id, 3);
        if(buyResponse.error) {
          NavigationStore.setBanner(buyResponse.error);
        } else {
          AuthStore.updateUserLogin(buyResponse);
        }
      }
    )
  }

  async toChat() {
    let room = await ApiService.getUsersRoom([this.props.navigation.getParam('id')]);
    room = room[0];
    let user = this.props.UsersStore.getUserById(this.props.navigation.getParam('id'))
    this.props.NavigationStore.navigate(Routes.Screens.CHAT_ROOM.routeName, {room, user: [user]});
  }

  onMore(viewRef) {
    const {NavigationStore, UsersStore, navigation} = this.props;
    const userData = UsersStore.getUserById(navigation.getParam('id'));
    NavigationStore.setPopover(viewRef, PopoverView('user_more', {type: 'user', item: userData}));
  }

  render() {
    const {NavigationStore, UsersStore, AuthStore, navigation} = this.props;
    const userData = UsersStore.getUserById(navigation.getParam('id'));
    let myProfile = false;
    if(userData) {
      myProfile = AuthStore.isMyId(userData._id);
    }
    return (
      <View style={{flex:1}}>
        {NavigationStore.inProgress && <ProgressBar />}
        {userData && <View style={s.viewContainer}>
          <UserDetails 
            followPress={this.updateFollow.bind(this)}
            isMy={myProfile} 
            follow={AuthStore.isFollow(userData._id)} 
            user={userData}
            toChat={() => this.toChat()}
            toLive={() => NavigationStore.navigate(Routes.Screens.CAMERA.routeName, {story_live: 'live'})}
            onMore={ref => this.onMore(ref)}
          />
          <View style={s.buttons}>
            {myProfile ? (<ProfileButton style={{backgroundColor: colors.text}} title='Extra Photo' onPress={() => this.pressExtra()} icon={iconNames.PLUS} />)
              :(<FollowButton onPress={this.updateFollow.bind(this)} follow={AuthStore.isFollow(userData._id)} />)}
            <ProfileButton style={{backgroundColor: this.state.showScret ? (colors.background):(colors.text)}} title='Secret' icon={iconNames.LOCK} onPress={() => this.setState({showScret: !this.state.showScret})} />
          </View>
          {this.state.showScret ? (
            <SecretView
              isMy={myProfile}   
              data={userData.secrets}     
              toAdd={() => NavigationStore.navigate(Routes.Screens.CAMERA.routeName, {secret: true, story_live: null})}
              onPhoto={this.navigateToPhoto.bind(this)}
            />
          ):(
            <Photos 
              isMy={myProfile}
              amount={userData.limit_of_contents}
              onPhoto={this.navigateToPhoto.bind(this)}
              data={userData.uploads}
              toAdd={() => NavigationStore.navigate(Routes.Screens.CAMERA.routeName, {story_live: null})}
            />
          )}
        </View>}
      </View>
    );
  }
}

const s = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    width: window_width*0.8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
