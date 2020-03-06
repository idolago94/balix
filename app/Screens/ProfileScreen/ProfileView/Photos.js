import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import imageService from '../../../demoDB/Images/imageService';
import Routes from '../../../Routes/Routes';
import bufferToBase64 from '../../../helpers/convert/Buffer';

export default class Photos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userImages: []
    }
  }

  goToPhoto(params) {
    this.props.navigate(Routes.Screens.PHOTO.routeName, params);
  }

    render() {
    return (
      <View style={styles.container}>
          {
              this.props.user.uploads.map((img, i) => {
                  return (
                      <TouchableOpacity
                          key={i}
                          style={styles.imageBox}
                          onPress={this.goToPhoto.bind(this, {
                              userData: this.props.user,
                              selectedImage: img,
                              userImages: this.props.user.uploads
                          })}
                      >
                          <Image
                              source={{uri:`data:${img.contentType};base64,${bufferToBase64(img.buffer)}`}}
                              // source={{uri:img.base64}}
                              style={styles.photo}
                          />
                      </TouchableOpacity>
                  )
              })
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 3,
        width: '100%'
    },
    imageBox: {
        margin: 3,
        width: '31%',
        aspectRatio: 1
    },
    photo: {
      height: '100%',
      width: '100%',
      borderRadius: 10
    }
});
