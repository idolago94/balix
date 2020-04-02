import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Animated, Dimensions } from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import CameraRoll from "@react-native-community/cameraroll";
import Routes from '../../utils/Routes';
import { colors, sizes } from '../../utils/style';

const pictureButtonSize = 70;

export default class AddBottomBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            galleryFirstPic: undefined
        }
        this.recButton = new Animated.Value(0);
        this.pressTimer = 0;
        this.timer = null;
    }

    componentDidMount() {
      this.getCameraRoll();
    }

    getCameraRoll() {
      CameraRoll.getPhotos({
        first: 1,
        assetType: 'All',
        groupName: 'Camera'
      }).then(r => {
        this.setState({ galleryFirstPic: r.edges[0].node.image.uri });
      })
      .catch((err) => {
        //Error Loading Images
        console.log(err);
      });
    }

    pictureIn() {
      this.pressTimer = 0;
      this.timer = setInterval(() => {
        this.pressTimer++;
        if(this.pressTimer > 2) {
          Animated.timing(this.recButton, {
            toValue: 1
          }).start();
          this.props.onStartVideo();
          console.log('start video');
        }
      }, 1000);
    }

    pictureOut() {
      clearInterval(this.timer);
      this.timer = null;
      if(this.pressTimer >= 2) {
        console.log('stop video');
        this.props.onEndVideo();
      } else {
        this.props.onPicture();
        console.log('take picture');
      }
    }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsBox}>
              <TouchableHighlight onPress={() => this.props.onGallery(Routes.Screens.GALLERY.routeName)} style={styles.galleryButton}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 10 }} source={{uri: this.state.galleryFirstPic}} />
              </TouchableHighlight>
              <TouchableHighlight onPressIn={() => this.pictureIn()} onPressOut={() => this.pictureOut()} style={styles.captureButton}>
                <Animated.View style={[styles.circle, {backgroundColor: this.recButton.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['white', 'red']
                })}]} />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.onSwitch()} style={styles.switchCameraButton}>
                <Icon name={iconNames.FLIP} size={sizes.icon} color={colors.icon} />
              </TouchableHighlight>
            </View>
            {Platform.os == 'ios' && <View style={{height: 15, backgroundColor: colors.addBar}}></View>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  swiper: {
    height: 30,
  },
  slider: {
    width: 60,
    alignItems: 'center'
  },
  container: {
    backgroundColor: colors.addBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  galleryButton: {
    height: 50,
    aspectRatio: 1,
    borderRadius: 10
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 999
  },
  circle: {
    aspectRatio: 1,
    borderRadius: 999,
    height: pictureButtonSize,
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchCameraButton: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: 'gray'
  },
  optionBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50
  },
  option: {
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
  }
});
