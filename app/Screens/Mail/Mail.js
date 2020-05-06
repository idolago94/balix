import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';
import ApiService from '../../Services/Api';
import Conversation from './Conversation';
import Routes from '../../utils/Routes';

@inject('ChatStore')
export default class Mail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						data={this.props.ChatStore.getRoomsIds}
						renderItem={({item, index}) => (
              <Conversation 
                key={index}
                data={this.props.ChatStore.getRoomById(item)} 
              />
						)}
					/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  }
});
