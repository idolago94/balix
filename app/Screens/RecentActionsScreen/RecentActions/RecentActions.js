import React, { Component } from 'react';
// Components
import {StyleSheet, View, ScrollView, FlatList, TouchableHighlight} from 'react-native';
import Action from './Action';
import Header from '../../../components/Header/Header';
import ActionsEmpty from "./ActionsEmpty";
import { inject, observer } from 'mobx-react';
import UpdateService from '../../../Services/Updates';
import { colors } from '../../../utils/style';

@inject('AuthStore', 'ActionsStore', 'IdentifierStore')
@observer
export default class RecentActions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header {...navigation} />,
    };
  }

  constructor(props) {
    super(props);
    this.focusListener = null;
  }

  componentDidMount() {
    console.log('recent actions', this.props.AuthStore.getUserLogin._id);
    this.focusListener = this.props.navigation.addListener('willFocus', () => {
      UpdateService.updateActions();
    });
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
            style={styles.container}
            keyExtractor={item => item.toString()}
            ListEmptyComponent={() => <ActionsEmpty/>}
            data={this.props.IdentifierStore.getActions}
            renderItem={({item}) => (<Action id={item} />)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  }
});
