import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Platform, Text, Dimensions } from 'react-native';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Style from '../../helpers/style/style';
import AddHeader from './AddHeader';
import AddBottomBar from './AddBottomBar';
import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import {PermissionsAndroid} from 'react-native';
import Routes from '../../Routes/Routes';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';

export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <AddHeader {...navigation} />,
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
  }

  componentDidMount() {
    this.props.navigation.addListener(
        'willFocus', () => {
          let story_live = this.props.navigation.getParam('story_live');
          console.log(story_live);
          this.setState({story_live: story_live});
        }
    );
    this.askCameraRollPermission();
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
    if(Platform.OS) {
      check(PERMISSIONS.IOS.CAMERA)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                break;
              case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                request(PERMISSIONS.IOS.CAMERA).then(res => console.log(res));
                break;
              case RESULTS.GRANTED:
                console.log('The permission is granted');
                break;
              case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                alert('This app can not access to your camera. ')
                this.props.navigation.navigate(Routes.Screens.HOME.routeName);
                break;

            }
          })
    } else {
      await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
      );
    }
  }

  navigateTo(routeName, params) {
    if(this.state.story_live && this.state.postMode == 'live') {
      // live post
    } else {
      // story or regular post
      if(this.state.story_live && this.state.postMode == 'story') {
        params.storyMode = this.state.postMode;
      }
      this.props.navigation.navigate(routeName, params);
    }
  }

  onGallery() {
    ImagePicker.launchImageLibrary({}, (imageSelected) => {
      if(!imageSelected.didCancel) {
        let galleryImage = {
        contentType: imageSelected.type,
        base64: imageSelected.data
        };
        this.navigateTo(Routes.Screens.PREVIEW_PHOTO.routeName, {imageData: galleryImage});
      }
    });
  }

  onChangeMode(mode) {
    this.setState({postMode: mode});
  }

  render() {
    return (
      <View style={styles.container}>
        {
          (this.state.story_live != 'live') ? (null) :
              (
                  <View style={{position: 'absolute', top: 40, right: 10, borderWidth: 1, borderRadius: 10, borderColor: Style.colors.lightMain}}>
                    <Text style={{color: Style.colors.text, padding: 10}}>10$</Text>
                  </View>
              )
        }
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex:1}}
          type={this.state.cameraType}
          flashMode={(this.state.flashMode) ? (RNCamera.Constants.FlashMode.on) : (RNCamera.Constants.FlashMode.off)}
          // androidCameraPermissionOptions={{
          //   title: 'Permission to use camera',
          //   message: 'We need your permission to use your camera',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
          // androidRecordAudioPermissionOptions={{
          //   title: 'Permission to use audio recording',
          //   message: 'We need your permission to use your audio',
          //   buttonPositive: 'Ok',
          //   buttonNegative: 'Cancel',
          // }}
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
                  <TouchableHighlight style={styles.liveButton}>
                    <LinearGradient colors={[Style.colors.lightMain, Style.colors.darkMain]} style={{borderRadius: 10, padding: 10, paddingHorizontal: 30}}>
                      <Text style={{color: Style.colors.text, fontSize: 20, letterSpacing: 3}}>{'>> GO LIVE <<'}</Text>
                    </LinearGradient>
                  </TouchableHighlight>
              ) :
              (<AddBottomBar
                  onChangeMode={this.onChangeMode.bind(this)}
                  story_live={this.state.story_live}
                  onGallery={this.onGallery.bind(this)}
                  onSwitch={this.switchCamera.bind(this)} onPicture={this.takePicture.bind(this)} />)
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
