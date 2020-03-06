import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SingleComment from './SingleComment';
import { backgroundColor } from '../../../common/style';

export default class Comments extends Component {
  // Params = [ comments ]

  render() {
    return (
        <ScrollView style={styles.container}>
            {
                this.props.navigation.getParam('comments').map((com, i) => (
                    <SingleComment key={i} data={com} />
                ))
            }
        </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    padding: 10
  }
});
