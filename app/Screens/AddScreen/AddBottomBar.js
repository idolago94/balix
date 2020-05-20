import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Animated } from 'react-native';
import { iconNames } from '../../components/Icon/Icon';
import { colors } from '../../utils/style';
import { window_width } from '../../utils/view';
import { getFromGallery, runAnimation } from '../../utils/Tools';
import ImageButton from '../../components/ImageButton/ImageButton';
import CustomButton from '../../components/CustomButton/CustomButton';

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

    async componentDidMount() {
      let galleryFirstPic = await getFromGallery({
        first: 1,
        assetType: 'All',
        groupName: 'Camera'
      });
      this.setState({galleryFirstPic});
    }

    pictureIn() {
      this.pressTimer = 0;
      this.timer = setInterval(() => {
        this.pressTimer++;
        if(this.pressTimer == 2) {
          runAnimation(this.recButton, 1);
          this.props.onStartVideo();
          console.log('start video');
        }
      }, 1000);
    }

    pictureOut() {
      clearInterval(this.timer);
      this.timer = null;
      runAnimation(this.recButton, 0);
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
        <View style={s.container}>
            <ImageButton 
              style={s.galleryButton}
              imageStyle={s.imageButton}
              src={{uri: this.state.galleryFirstPic}}
              onPress={() => this.props.onGallery()}
            />
            <TouchableHighlight onPressIn={() => this.pictureIn()} onPressOut={() => this.pictureOut()} style={s.captureButton}>
              <Animated.View style={[s.circle, {backgroundColor: this.recButton.interpolate({
                inputRange: [0, 1],
                outputRange: ['white', 'red']
              })}]} />
            </TouchableHighlight>
            <CustomButton 
              onPress={() => this.props.onSwitch()} 
              style={s.switchCameraButton}
              icon={iconNames.FLIP}
            />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.addBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: window_width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  galleryButton: {
    height: window_width*.13,
    aspectRatio: 1,
    borderRadius: 10
  },
  imageButton: {
    height: '100%', 
    width: '100%', 
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
    height: window_width*.17,
    alignItems: 'center',
    justifyContent: 'center'
  },
  switchCameraButton: {
    padding: 10,
    borderRadius: 999,
    backgroundColor: 'gray'
  }
});
