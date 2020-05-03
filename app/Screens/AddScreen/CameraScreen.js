import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Platform, Text, Dimensions } from 'react-native';
import {iconNames} from '../../components/Icon/Icon';
import AddHeader from './AddHeader';
import AddBottomBar from './AddBottomBar';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import Routes from '../../utils/Routes';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import { colors, sizes } from '../../utils/style';
import IconButton from '../../components/IconButton/IconButton';
import PhotoIndicator from '../../components/Photo/PhotoIndicator';

@inject('NavigationStore')
export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => null,
      headerTransparent: true
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      story_live: false,
      postMode: undefined,
      flashMode: false
    }
    this.camera = null;
    this.focusListener = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
        'willFocus', () => {
          let story_live = this.props.navigation.getParam('story_live');
          console.log(story_live);
          this.setState({story_live: story_live});
        }
    );
    this.askCameraRollPermission();
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  switchCamera() {
    if(this.state.cameraType == RNCamera.Constants.Type.back) {
      this.setState({ cameraType: RNCamera.Constants.Type.front });
    } else this.setState({ cameraType: RNCamera.Constants.Type.back });
  }

  toggleFlash() {
    console.log('toggle flash', !this.state.flashMode);
    this.setState({flashMode: !this.state.flashMode});
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.saveToCameraRoll(data);
      let secret = this.props.navigation.getParam('secret');
      this.navigateTo(Routes.Screens.PREVIEW_PHOTO.routeName, { imageData: data, secret });
    }
  }

  saveToCameraRoll(data) {
    CameraRoll.saveToCameraRoll(data.uri);
  }

  async askCameraRollPermission() {
    let cameraPermission = Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA:PERMISSIONS.ANDROID.CAMERA;
    check(cameraPermission).then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          console.log('The permission has not been requested / is denied but requestable');
          request(cameraPermission).then(res => console.log(res));
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          this.props.NavigationStore.setBanner('This app can not access to your camera.');
          this.navigateTo(Routes.Screens.HOME.routeName);
          break;
      }
    });
  }

  navigateTo(routeName, params) {
    this.props.NavigationStore.navigate(routeName, params);
  }

  onGallery() {
    ImagePicker.launchImageLibrary({mediaType: 'mixed'}, (imageSelected) => {
      console.log('CameraScreen -> onGallery -> imageSelected ', imageSelected);
      if(!imageSelected.didCancel) {
        let secret = this.props.navigation.getParam('secret');
        console.log('imageSelected', imageSelected);
        this.navigateTo(Routes.Screens.PREVIEW_PHOTO.routeName, {imageData: imageSelected, secret});
      }
    });
  }

  startRecord() {
    this.camera.recordAsync().then((record) => {
      console.log('record', record)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <AddHeader
          onClose={() => this.props.NavigationStore.goBack()}
          onFlash={() => this.toggleFlash()}
          flashMode={this.state.flashMode}
        />
        {/* cash indicators for live */}
        {/* {this.state.story_live == 'live' && <Text style={styles.liveIndicator}>10$</Text>} */}
        {this.state.story_live == 'live' && <PhotoIndicator style={{top: 60}} cash={7} hearts={22}/>}
        {/* CAMERA */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex:1}}
          type={this.state.cameraType}
          flashMode={(this.state.flashMode) ? (RNCamera.Constants.FlashMode.on) : (RNCamera.Constants.FlashMode.off)}
        />
        {
          (this.state.story_live == 'live') ?
              (
                // live button
                <TouchableHighlight style={styles.liveButton}>
                  <LinearGradient colors={[colors.lightMain, colors.darkMain]} style={{borderRadius: 10, padding: 10, paddingHorizontal: 30}}>
                    <Text style={{color: colors.text, fontSize: 20, letterSpacing: 3}}>{'>> GO LIVE <<'}</Text>
                  </LinearGradient>
                </TouchableHighlight>
                // 
              ) :
              // camera bottom buttons
              (<AddBottomBar
                  story_live={this.state.story_live}
                  onGallery={this.onGallery.bind(this)}
                  onSwitch={this.switchCamera.bind(this)} 
                  onPicture={this.takePicture.bind(this)} 
                  onStartVideo={() => this.startRecord()}
                  onEndVideo={() => this.camera.stopRecording()}
              />)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  liveButton: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginBottom: 50
  },
  liveIndicator: {
    borderWidth: 1, 
    borderRadius: 7, 
    borderColor: colors.lightMain,
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colors.text,
    alignSelf: 'flex-end'
  }
});
