import React, {Component} from 'react';
// Navigation
import NavigatorMain from '../Routes/navigatorMain';
import AppNavigator from '../Routes/AppNavigator';
// Components
import {StyleSheet, View, Dimensions} from 'react-native';
// import LoginScreen from './LoginScreen/LoginScreen';
import CashButtons from '../components/CashButtons/CashButtons';

import { inject, observer } from "mobx-react/native";


@inject('CashButtonsStore', 'AuthStore')
@observer
export default class AppScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {CashButtonsStore, AuthStore} = this.props;
      return (
        <View style={styles.screen}>
          {CashButtonsStore.isVisible && <CashButtons />}
          <NavigatorMain ref={(r) => AppNavigator.setRef(r)}/>
        </View>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: Dimensions.get('window').width * 1.75
  },
  screen: {
    flex: 1,
    flexGrow: 1,
  },
});
