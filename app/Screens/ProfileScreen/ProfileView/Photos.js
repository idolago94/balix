import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Routes from '../../../Routes/Routes';
import bufferToBase64 from '../../../helpers/convert/Buffer';
import SmallPhoto from './SmallPhoto';

export default function Photos(props) {

    return (
      <View style={styles.container}>
          {
              props.data.map((img, i) => {
                  return (
                      <SmallPhoto key={i} data={img} onPress={(params) => props.onPhoto(params)} />
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
