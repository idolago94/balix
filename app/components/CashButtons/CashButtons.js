// Components
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import RequestPass from './RequestPass/RequestPass';
import Routes from '../../utils/Routes';
import { inject } from "mobx-react";
import { sizes, colors } from '../../utils/style';
import ApiService from '../../Services/Api';

@inject('AuthStore', 'NavigationStore')
export default class CashButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAuthBox: false,
      authError: ''
    }
    this.dropDownBottom = new Animated.Value(-200);
  }

  componentDidMount() {
    this.openDropDown();
  }

  componentWillUnMount() {
    this.closeDropDown();
  }

  async checkPassword(pass) {
    const {AuthStore} = this.props;
    let auth = await ApiService.login(AuthStore.getUserLogin.username, pass);
    if(auth.token) {
      this.setState({ authError: '', showAuthBox: false });
      this.navigateTo(Routes.Screens.WITHDRAW.routeName);
    } else this.setState({ authError: 'Password wrong' })
  }

  navigateTo(routeName) {
    const {NavigationStore} = this.props;
    NavigationStore.toggleCashButtons();
    NavigationStore.navigate(routeName);
  }

  openDropDown() {
      Animated.spring(this.dropDownBottom, {
        toValue: sizes.barHeight*2+7
      }).start();
  }

  closeDropDown() {
    Animated.spring(this.dropDownBottom, {
        toValue: -200
    }).start();
  }

  render() {
    return (
        <Animated.View style={{...styles.dropDownBox, transform: [ {translateY: this.dropDownBottom} ]}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight onPress={() => this.navigateTo(Routes.Screens.BUY_PACKAGE.routeName)} style={styles.dropDownButton}>
              <Text style={{color: colors.text, letterSpacing: 1}}>Buy Cash</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.setState({ showAuthBox: !this.state.showAuthBox })} style={styles.dropDownButton}>
              <Text style={{color: colors.text, letterSpacing: 1}}>Get Your Money</Text>
            </TouchableHighlight>
          </View>
          {
            (this.state.showAuthBox) ?
            (
              <RequestPass error={this.state.authError} onConfirm={this.checkPassword.bind(this)} />
            ) : (<View></View>)
          }

        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
    dropDownBox: {
      position: 'absolute',
      left: 0,
      width: '50%',
      zIndex: 999,
      top: 0
    },
    dropDownButton: {
      padding: 6,
      marginHorizontal: 5,
      height: 30,
      backgroundColor: colors.darkMain,
      alignItems: 'center',
      position: 'relative',
      zIndex: 999
    }
});
