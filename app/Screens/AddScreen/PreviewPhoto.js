import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Text } from 'react-native';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Routes from "../../utils/Routes";
import { inject, observer } from "mobx-react";
import ApiService from '../../Services/Api';
import { content_width, content_height, window_width } from '../../utils/view';
import UpdateService from '../../Services/Updates';
import IconButton from '../../components/IconButton/IconButton';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { colors } from '../../utils/style';

@inject('AuthStore', 'NavigationStore', 'ContentsStore', 'LoaderStore')
export default class PreviewPhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        style: {
          backgroundColor: colors.bar
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

  async doUpload() {
    console.log('PreviewPhoto -> doUpload');
    const {AuthStore, NavigationStore, ContentsStore, navigation} = this.props;
    let secretMode = navigation.getParam('secret');
    NavigationStore.setProgress(true);
    NavigationStore.navigate(secretMode ? (Routes.Screens.PROFILE.routeName):(Routes.Screens.HOME.routeName), secretMode ? ({id: AuthStore.getUserLogin._id}):({}));
    let uploadResponse = null; // new upload object(contents collection)
    if(secretMode) {
      uploadResponse = await ApiService.uploadSecret(AuthStore.getUserLogin._id, this.state.imageData, this.state.entranceSecret);
    } else {
      uploadResponse = await ApiService.upload(AuthStore.getUserLogin._id, this.state.imageData);
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
      <View style={{flex: 1, backgroundColor: colors.background, paddingTop: (Platform.OS == 'ios') ? (40):(0)}}>
        <View style={{alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', width: window_width}}>
          {isSecret && <Icon name={iconNames.LOCK} size={buttonSize} color={colors.icon} />}
          <IconButton style={styles.btn} onPress={() => this.doUpload()} icon={iconNames.CONFIRM} size={buttonSize} />
        </View>
        <View style={styles.container}>
          {isSecret && <View>
            <Text style={{color: colors.text}}>Select the price to enter your secret:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Slider
                style={{margin: 10, flexGrow: 1}}
                minimumValue={1}
                maximumValue={200}
                minimumTrackTintColor={colors.lightMain}
                maximumTrackTintColor={colors.text}
                value={this.state.entranceSecret}
                onValueChange={(value) => this.setState({entranceSecret: Math.round(value)})}
              />
              <Text style={{color: colors.lightMain, fontSize: 30}}>{this.state.entranceSecret}$</Text>
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