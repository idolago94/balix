import React, { Component } from 'react';
// Components
import {StyleSheet, View, ScrollView, FlatList, TouchableHighlight} from 'react-native';
import Action from './Action';
import Style from '../../../helpers/style/style';
import Header from '../../../components/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActions } from '../../../store/actions/actionsActions';
import SearchEmpty from "../../Search/SearchEmpty";
import Routes from "../../../Routes/Routes";
import Result from "../../Search/Result";
import ActionsEmpty from "./ActionsEmpty";
import { inject, observer } from 'mobx-react';

@inject('AuthStore', 'ActionsStore')
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
    this.focusListener = this.props.navigation.addListener('willFocus', () => this.props.ActionsStore.fetchUserActions(this.props.AuthStore.getUserLogin._id));
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <FlatList
            style={styles.container}
            keyExtractor={item => item._id.toString()}
            ListEmptyComponent={() => <ActionsEmpty/>}
            data={this.props.ActionsStore.getActions}
            renderItem={({item}) => (<Action data={item} />)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Style.colors.background
  }
});
