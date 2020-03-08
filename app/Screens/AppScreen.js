import React, {Component} from 'react';
// Navigation
import NavigatorMain from '../Routes/navigatorMain';
// Components
import {StyleSheet, Text, View, StatusBar, Animated, Dimensions, TouchableHighlight, Platform} from 'react-native';
// import LoginScreen from './LoginScreen/LoginScreen';
import CashButtons from '../components/CashButtons/CashButtons';
// Redux
import {connect} from 'react-redux';

class AppScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.auth.userLogin && this.props.auth.userLogin._id) {
      return (
        <View style={styles.screen}>
        <CashButtons />
        <StatusBar barStyle={'light-content'}/>
        <NavigatorMain />
      </View>
      );
    }
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

const mapStateToProps = (state) => {
  const auth = state.auth;
  return {openMenu, auth};
};

export default connect(mapStateToProps)(AppScreen);
