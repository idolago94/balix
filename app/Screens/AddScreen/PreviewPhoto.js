import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Routes from "../../utils/Routes";
import { inject, observer } from "mobx-react";
import ApiService from '../../Services/Api';
import { content_width, content_height, window_width } from '../../utils/view';
import UpdateService from '../../Services/Updates';
import IconButton from '../../components/IconButton/IconButton';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { colors, row } from '../../utils/style';
import EditField from '../EditProfileScreen/EditField';
import PreviewHeader from './PreviewHeader';

@inject('AuthStore', 'NavigationStore', 'ContentsStore', 'AppStore')
export default class PreviewPhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => null
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      rotateDeg: 0,
      entranceSecret: 10,
      title: ''
    }
  }

  rotateImage() {
    this.setState({ rotateDeg: this.state.rotateDeg+90 })
  }

  async doUpload() {
    console.log('PreviewPhoto -> doUpload');
    const {AuthStore, NavigationStore, AppStore, navigation} = this.props;
    let imageData = this.props.navigation.getParam(Routes.Screens.PREVIEW_PHOTO.params.image);
    let secretMode = navigation.getParam(Routes.Screens.PREVIEW_PHOTO.params.secret);
    // check upload limit
    if(secretMode && AuthStore.getUserLogin.secrets.length >= 9 || !secretMode && AuthStore.getUserLogin.uploads.length >= AuthStore.getUserLogin.limit_of_contents) {
      NavigationStore.setModal({type: 'delete_content', data: AuthStore.getUserLogin[secretMode ? ('secrets'):('uploads')], mode: secretMode ? ('secrets'):('uploads')});
    } else {
      NavigationStore.setProgress(true);
      NavigationStore.navigate(secretMode ? (Routes.Screens.PROFILE.routeName):(Routes.Screens.HOME.routeName), secretMode ? ({id: AuthStore.getUserLogin._id, secret: true}):({}));
      AppStore.setVideoVolume(null);
      let uploadResponse = await ApiService.upload(AuthStore.getUserLogin._id, imageData, {entrance: this.state.entranceSecret, title: this.state.title}, secretMode);
      if(uploadResponse.error) {
        NavigationStore.setBanner(uploadResponse.error);
      } else {
        let myUploads = AuthStore.getUserLogin[secretMode ? ('secrets'):('uploads')];
        myUploads.push({
          content_id: uploadResponse._id,
          uploadDate: uploadResponse.uploadDate,
          lastUpdate: uploadResponse.lastUpdate
        });
        AuthStore.updateUserLogin({[secretMode ? ('secrets'):('uploads')]: myUploads});
        !secretMode && UpdateService.checkFollowingUpdates();
      }
    }
  }

  render() {
    let imageData = this.props.navigation.getParam(Routes.Screens.PREVIEW_PHOTO.params.image);
    const isSecret = this.props.navigation.getParam(Routes.Screens.PREVIEW_PHOTO.params.secret);
    let buttonSize = 30;
    if(!imageData) {
      return null;
    }
    return (
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <PreviewHeader secret={isSecret} />
        <View>
          <EditField 
            style={styles.input}
            label={'Title:'}
            value={this.state.title} 
            onChange={value => this.setState({title: value})}
          />
          {isSecret && <View>
            <Text style={{color: colors.text}}>Select the price to enter your secret:</Text>
            <View style={row}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={200}
                minimumTrackTintColor={colors.lightMain}
                maximumTrackTintColor={colors.text}
                value={this.state.entranceSecret}
                onValueChange={(value) => this.setState({entranceSecret: Math.round(value)})}
              />
              <Text style={styles.sliderPlaceholder}>{this.state.entranceSecret}$</Text>
            </View>
          </View>}

          {imageData.type ? (
            <Image
                style={[styles.image, {transform: [{ rotate: `${this.state.rotateDeg}deg` }]}]}
                source={{uri: imageData.uri}}
            />
          ):(
            <Video 
              source={{uri: imageData.uri}} 
              style={[styles.image, {transform: [{ rotate: `${this.state.rotateDeg}deg` }]}]}
              muted={!this.props.AppStore.inVolume('preview')}
              repeat
            />
          )}

        </View>
        <View style={styles.buttons}>
          <IconButton style={styles.btn} onPress={() => console.log('COLLAGE')} icon={iconNames.COLLAGE} size={buttonSize} />
          <IconButton style={styles.btn} onPress={() => console.log('ROTATE')} icon={iconNames.ROTATE} size={buttonSize} />
          <IconButton style={styles.btn} onPress={() => console.log('TEXT')} icon={iconNames.TEXT} size={buttonSize} />
          <IconButton style={styles.btn} onPress={() => console.log('DESIGN')} icon={iconNames.DESIGN} size={buttonSize} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 10
  },
  image: {
    width: content_width, 
    height: content_height
  },
  input: {
    margin: 5
  },
  slider: {
    margin: 10, 
    flexGrow: 1
  },
  sliderPlaceholder: {
    color: colors.lightMain,
    fontSize: 30
  }
});