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

class RecentActions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header {...navigation} />,
    };
  }

  componentDidMount() {
    console.log('recent actions', this.props.userLogin._id);
    this.props.navigation.addListener('didFocus', () => this.props.getActions(this.props.userLogin._id));
  }

  render() {
    return (
      <View style={{flex:1}}>
        {/*<ScrollView style={{backgroundColor: Style.colors.background}}>*/}
        {/*  <View style={styles.container}>*/}
        {/*    {*/}
        {/*      this.props.actions.actions.map((act, i) => (*/}
        {/*        <Action key={i} data={act} />*/}
        {/*      ))*/}
        {/*    }*/}
        {/*  </View>*/}
        {/*</ScrollView>*/}
        <FlatList
            style={styles.container}
            keyExtractor={item => item._id.toString()}
            ListEmptyComponent={() => <ActionsEmpty/>}
            data={this.props.actions.actions}
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

const mapStateToProps = (state) => {
  const userLogin = {...state.auth.userLogin};
  const actions = {...state.actions}
  return { userLogin, actions }
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
      getActions
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RecentActions);
