import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Platform, Text } from 'react-native';
import AddHeader from './AddHeader';
import AddBottomBar from './AddBottomBar';
import { RNCamera } from 'react-native-camera';
import Routes from '../../utils/Routes';
import {PERMISSIONS} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import { colors } from '../../utils/style';
import PhotoIndicator from '../../components/Photo/PhotoIndicator';
import { launchGallery, askPermission, saveToGallery } from '../../utils/Tools';

@inject('NavigationStore')
export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => null
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      isLive: false,
      postMode: undefined,
      flashMode: false
    }
    this.camera = null;
    this.focusListener = null;
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
        'willFocus', () => {
          let isLive = this.props.navigation.getParam(Routes.Screens.CAMERA.params.isLive);
          console.log('isLive', isLive);
          this.setState({isLive});
        }
    );
    let per = await askPermission(Platform.OS == 'ios' ? PERMISSIONS.IOS.CAMERA:PERMISSIONS.ANDROID.CAMERA);    
    if(!per) {
      this.props.NavigationStore.setBanner('This app can not access to your camera.');
      this.props.NavigationStore.navigate(Routes.Screens.HOME.routeName);
    }
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
      const options = { quality: 0.5 };
      const imageData = await this.camera.takePictureAsync(options);
      saveToGallery(imageData);
      let secret = this.props.navigation.getParam(Routes.Screens.CAMERA.params.secret);
      this.props.NavigationStore.navigate(
        Routes.Screens.PREVIEW_PHOTO.routeName, 
        { [Routes.Screens.PREVIEW_PHOTO.params.image]: imageData, [Routes.Screens.PREVIEW_PHOTO.params.secret]: secret }
      );
    }
  }

  async onGallery() {
    let imageData = await launchGallery({mediaType: 'mixed'});
    let secret = this.props.navigation.getParam(Routes.Screens.CAMERA.params.secret);
    this.props.NavigationStore.navigate(
      Routes.Screens.PREVIEW_PHOTO.routeName, 
      { [Routes.Screens.PREVIEW_PHOTO.params.image]: imageData, [Routes.Screens.PREVIEW_PHOTO.params.secret]: secret }
    );
  }

  startRecord() {
    this.camera.recordAsync().then((record) => {
      console.log('record', record)
    }).catch(err => console.log(err))
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
        {this.state.isLive && <PhotoIndicator style={styles.liveIndicator} cash={7} hearts={22}/>}
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
          (this.state.isLive) ?
              (
                // live button
                <View style={styles.liveFooter}>
                  <TouchableHighlight onPress={() => console.log('start live')}>
                    <LinearGradient colors={[colors.lightMain, colors.darkMain]} style={styles.liveButton}>
                      <Text style={styles.liveText}>{'>> GO LIVE <<'}</Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>
              ) :
              // camera bottom buttons
              (<AddBottomBar
                  onGallery={() => this.onGallery()}
                  onSwitch={() => this.switchCamera()} 
                  onPicture={() => this.takePicture()} 
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
  liveFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  liveIndicator: {
    top: 60
  },
  liveButton: {
    borderRadius: 10, 
    padding: 10, 
    paddingHorizontal: 30
  },
  liveText: {
    color: colors.text, 
    fontSize: 20, 
    letterSpacing: 3
  }
});
