import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { inject, observer } from "mobx-react";
import Pdf from 'react-native-pdf';
import { colors } from '../../utils/style';
import { window_width, window_height } from '../../utils/view';
import IconButton from '../../components/IconButton/IconButton';
import { iconNames } from '../../components/Icon/Icon';

@inject('NavigationStore')
export default class PolicyScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <IconButton
          style={{position: 'absolute', top: 10, left: 10, zIndex: 999}}
          icon={iconNames.CLOSE}
          color={'black'}
          size={20}
          onPress={() => this.props.NavigationStore.goBack()}
        />
        <Pdf
            source={require('../../assets/pdftest.pdf')}
            onLoadComplete={(numberOfPages,filePath)=>{
                console.log(`number of pages: ${numberOfPages}`);
            }}
            style={styles.pdf}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    width: window_width,
    height: window_height
  }
});
