import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import imageService from '../../../demoDB/Images/imageService';
import Routes from '../../../Routes/Routes';
import bufferToBase64 from '../../../helpers/convert/Buffer';

export default function Photos(props) {

    return (
      <View style={styles.container}>
          {
              props.data.map((img, i) => {
                  return (
                      <TouchableOpacity
                          key={i}
                          style={styles.imageBox}
                          onPress={() => props.onPhoto({
                              userData: props.user,
                              selectedImage: img,
                              userImages: props.user.uploads
                          })}
                      >
                          <Image
                              source={{uri:`data:${img.contentType};base64,${bufferToBase64(img.buffer)}`}}
                              style={styles.photo}
                          />
                      </TouchableOpacity>
                  )
              })
          }
      </View>
    );
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
