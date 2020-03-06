import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import Style from '../../helpers/style/style';

export default class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      this.getCameraRoll.bind(this)
    );
  }

  getCameraRoll() {
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'All',
      groupName: 'Camera'
    }).then(r => {
      this.setState({ gallery: r.edges });
    })
    .catch((err) => {
      //Error Loading Images
      console.log(err);
    });
  }

  imageSelected(image) {
    console.log(image);
  }

  render() {
    return (
        <View style={styles.container}>

          <ScrollView contentContainerStyle={styles.picturesContainer}>
            {
              this.state.gallery.map((pic, i) => (
                <View key={i} style={styles.picture}>
                  <TouchableHighlight onPress={this.imageSelected.bind(this, pic)}>
                    <Image style={{width: '100%', height: '100%'}} source={{uri: pic.node.image.uri}} />
                  </TouchableHighlight>
                </View>
              ))
            }
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    paddingTop: (Platform.OS == 'ios') ? (100):(60)
  },
  picturesContainer : {
    backgroundColor: Style.colors.background,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  picture: {
    padding: 2,
    width: '33%',
    aspectRatio: 1
  }
});
