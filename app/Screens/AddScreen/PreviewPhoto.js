import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Text } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Routes from "../../Routes/Routes";
import { inject, observer } from "mobx-react";
import UploadService from '../../Services/Upload';
import ApiService from '../../Services/Api';
import { content_width, content_height, window_width } from '../../utils/view';
import UpdateService from '../../Services/Updates';
import IconButton from '../../components/IconButton/IconButton';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';

@inject('AuthStore', 'NavigationStore', 'ContentsStore', 'LoaderStore')
export default class PreviewPhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        style: {
          backgroundColor: Style.colors.bar
        }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      imageData: undefined,
      rotateDeg: 0,
      entranceSecret: 10
    }
    this.focusListener = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'willFocus',
      this.getDataFromParams.bind(this)
    );
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  getDataFromParams() {
    let image = this.props.navigation.getParam('imageData');
    this.setState({ imageData: image});
  }

  rotateImage() {
    this.setState({ rotateDeg: this.state.rotateDeg+90 })
  }

  async postImage() {
    console.log('PreviewPhoto -> postImage');
    const {AuthStore, NavigationStore, navigation} = this.props;
    NavigationStore.setProgress(true);
    let secretMode = navigation.getParam('secret');
    NavigationStore.navigate(secretMode ? (Routes.Screens.PROFILE.routeName):(Routes.Screens.HOME.routeName), secretMode ? ({id: AuthStore.getUserLogin._id}):({}));
    let upload = await UploadService.buildImageForUpload(this.state.imageData);
    let uploadResponse = null;
    if(secretMode) {
      upload.entrance = this.state.entranceSecret;
      uploadResponse = await ApiService.uploadSecret(AuthStore.getUserLogin._id, upload); // the new upload object
    } else {
      uploadResponse = await ApiService.upload(AuthStore.getUserLogin._id, upload); // the new upload object
    }
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
      UpdateService.checkFollowingUpdates();
    }
  }

  render() {
    const isSecret = this.props.navigation.getParam('secret');
    let buttonSize = 30;
    if(!this.state.imageData) {
      return (<View></View>)
    }
    return (
      <View style={{flex: 1, backgroundColor: Style.colors.background, paddingTop: (Platform.OS == 'ios') ? (40):(0)}}>
        <View style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', width: window_width}}>
          {isSecret && <Icon name={iconNames.LOCK} size={buttonSize} color={Style.colors.icon} />}
          <IconButton style={styles.btn} onPress={() => this.postImage()} icon={iconNames.CONFIRM} size={buttonSize} />
        </View>
        <View style={styles.container}>
          {isSecret && <View>
            <Text style={{color: Style.colors.text}}>Select the price to enter your secret:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Slider
                style={{margin: 10, flexGrow: 1}}
                minimumValue={1}
                maximumValue={200}
                minimumTrackTintColor={Style.colors.lightMain}
                maximumTrackTintColor={Style.colors.text}
                value={this.state.entranceSecret}
                onValueChange={(value) => this.setState({entranceSecret: Math.round(value)})}
              />
              <Text style={{color: Style.colors.lightMain, fontSize: 30}}>{this.state.entranceSecret}$</Text>
            </View>
          </View>}

          {this.state.imageData.type ? (
            <Image
                style={[styles.image, {transform: [{ rotate: `${this.state.rotateDeg}deg` }]}]}
                source={{uri: this.state.imageData.uri}}
            />
          ):(
            <Video 
              source={{uri: this.state.imageData.uri}} 
              style={[styles.image, {transform: [{ rotate: `${this.state.rotateDeg}deg` }]}]}
              repeat
            />
          )}

        </View>
        <View style={styles.buttons}>
          <IconButton style={styles.btn} onPress={() => this.postImage()} icon={iconNames.COLLAGE} size={buttonSize} />
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
    padding: 20
  },
  btn: {
    padding: 10
  },
  image: {
    width: content_width, 
    height: content_height
  }
});