import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Text, Dimensions } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, { iconNames } from '../../components/Icon/Icon';
import CameraRoll from "@react-native-community/cameraroll";
import Routes from '../../Routes/Routes';

export default class AddBottomBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'story',
            galleryFirstPic: undefined
        }
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

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsBox}>
              <TouchableHighlight onPress={() => this.props.onGallery(Routes.Screens.GALLERY.routeName)} style={styles.galleryButton}>
                <Image style={{ height: '100%', width: '100%', borderRadius: 10 }} source={{uri: this.state.galleryFirstPic}} />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.onPicture()} style={styles.captureButton}>
                <View style={styles.circle}></View>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this.props.onSwitch()} style={styles.switchCameraButton}>
                <Icon name={iconNames.FLIP} size={Style.sizes.icon} color={Style.colors.icon} />
              </TouchableHighlight>
            </View>
            {Platform.os == 'ios' && <View style={{height: 15, backgroundColor: Style.colors.addBar}}></View>}
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
    backgroundColor: Style.colors.addBar,
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
    height: 70,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: 'white'
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
