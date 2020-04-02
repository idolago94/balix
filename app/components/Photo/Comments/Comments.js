import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SingleComment from './SingleComment';
import { colors } from '../../../utils/style';

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
    backgroundColor: colors.background,
    padding: 10
  }
});
