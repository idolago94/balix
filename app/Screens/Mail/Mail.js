import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';
import ApiService from '../../Services/Api';
import Conversation from './Conversation';
import Routes from '../../utils/Routes';

@inject('AuthStore', 'NavigationStore')
export default class Mail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    }
  }

  async componentDidMount() {
    let rooms = await ApiService.getUserRoomsChat();
    this.setState({rooms});
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						data={this.state.rooms}
						renderItem={({item, index}) => (
              <Conversation 
                key={index}
                // onPress={() => this.props.NavigationStore.navigate(Routes.Screens.CHAT_ROOM.routeName, {room: item})} 
                data={item} 
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
