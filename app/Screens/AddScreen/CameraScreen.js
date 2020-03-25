import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Platform, Text, Dimensions } from 'react-native';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Style from '../../helpers/style/style';
import AddHeader from './AddHeader';
import AddBottomBar from './AddBottomBar';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import Routes from '../../Routes/Routes';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';

@inject('NavigationStore')
export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <AddHeader />,
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
    if(this.state.flashMode) {
      this.setState({ flashMode: false });
    } else this.setState({ flashMode: true });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.saveToCameraRoll(data);
      this.navigateTo(Routes.Screens.PREVIEW_PHOTO.routeName, { imageData: data });
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
          alert('This app can not access to your camera. ')
          this.navigateTo(Routes.Screens.HOME.routeName);
          break;
      }
    });
  }

  navigateTo(routeName, params) {
    this.props.NavigationStore.navigate(routeName, params);
  }

  onGallery() {
    ImagePicker.launchImageLibrary({}, (imageSelected) => {
      console.log(imageSelected);
      if(!imageSelected.didCancel) {
        this.navigateTo(Routes.Screens.PREVIEW_PHOTO.routeName, {imageData: imageSelected});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* cash indicators for live */}
        {this.state.story_live != 'live' && (
          <View style={{position: 'absolute', top: 40, right: 10, borderWidth: 1, borderRadius: 10, borderColor: Style.colors.lightMain}}>
            <Text style={{color: Style.colors.text, padding: 10}}>10$</Text>
          </View>
        )}
        {/*  */}
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex:1}}
          type={this.state.cameraType}
          flashMode={(this.state.flashMode) ? (RNCamera.Constants.FlashMode.on) : (RNCamera.Constants.FlashMode.off)}
        />
        {
          (!this.state.flashMode) ?
          (
            <TouchableHighlight onPress={() => this.toggleFlash()} style={{
              ...styles.flashBox,
              borderColor: Style.colors.icon,
            }}>
              <Icon name={iconNames.FLASH} size={Style.sizes.icon} color={Style.colors.icon} />
            </TouchableHighlight>
          ) :
          (
            <TouchableHighlight onPress={() => this.toggleFlash()} style={{...styles.flashBox, borderColor: Style.colors.lightMain}}>
              <Icon name={iconNames.FLASH} size={Style.sizes.icon} color={Style.colors.lightMain} />
            </TouchableHighlight>
          )
        }

        {
          (this.state.story_live == 'live') ?
              (
                // live button
                <TouchableHighlight style={styles.liveButton}>
                  <LinearGradient colors={[Style.colors.lightMain, Style.colors.darkMain]} style={{borderRadius: 10, padding: 10, paddingHorizontal: 30}}>
                    <Text style={{color: Style.colors.text, fontSize: 20, letterSpacing: 3}}>{'>> GO LIVE <<'}</Text>
                  </LinearGradient>
                </TouchableHighlight>
                // 
              ) :
              (<AddBottomBar
                  story_live={this.state.story_live}
                  onGallery={this.onGallery.bind(this)}
                  onSwitch={this.switchCamera.bind(this)} onPicture={this.takePicture.bind(this)} 
              />)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    position: 'relative'
  },
  liveButton: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    marginBottom: 50
  },
  flashBox: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderWidth: 1,
    borderRadius: 999,
    margin: 7,
    top: (Platform.OS == 'ios') ? (40):(10)
  }
});
