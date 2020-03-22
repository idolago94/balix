import React, { Component } from 'react';
import Style from '../../helpers/style/style';
// Components
import {StyleSheet, Text, View, TouchableHighlight, TextInput, Animated, Platform} from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { LinearTextGradient } from "react-native-text-gradient";
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import FormField from '../../components/FormField/FormField';
import Routes from '../../Routes/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import TextButton from '../../components/TextButton/TextButton';
import { inject, observer } from "mobx-react";

@inject('AuthStore')
export default class LoginScreen extends Component {

  constructor(props) {
    console.log('Login Screen');
    super(props);
    this.state = {
      securePassword: true
    }
  }

  onLogin() {
    const {AuthStore} = this.props;
    // let auth = {
    //   username: this.state.username,
    //   password: this.state.password
    // };
      let auth = {
        username: 'Test2',
        password: '1234'
      }
    AuthStore.login(auth);
  }

  //  async getFacebookUserData(user) {
  //     console.log(user);
  //      const infoRequest = new GraphRequest(
  //          `/${user.id}/friends`,
  //          {},
  //          (err, result) => console.log(result)
  //      );
  //      // Start the graph request.
  //      new GraphRequestManager().addRequest(infoRequest).start();
  //   }

  render() {
    const {navigation, AuthStore} = this.props;
    return (
        <View style={styles.container}>
          <AppTitle />
            <View style={styles.form}>
              {AuthStore.getErrors.length > 0 && (
                <View style={styles.errorBox}>
                  <Text style={{color: Style.colors.text}}>{this.props.auth.error}</Text>
                </View>
              )}
                <FormField
                    placeholder={'Username or Email'}
                    onChange={(username) => this.setState({username})}
                />

                <FormField
                    type={'password'}
                    placeholder={'Password'}
                    onChange={(password) => this.setState({password})}
                />

                <TextButton onPress={this.onLogin.bind(this)} content={'Log In'} />

                <TouchableHighlight style={{alignSelf: 'flex-start'}} onPress={() => navigation.navigate(Routes.Screens.REGISTER.routeName)}>
                    <Text style={{color: 'gray', fontSize: 10}}>Create Account</Text>
                </TouchableHighlight>

                </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Style.colors.background,
  },
  title: {
    fontSize: 70,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  form: {
    width: Style.sizes.fieldWidth,
    alignItems: 'center',
  },
  field: {
    width: '100%',
    backgroundColor: Style.colors.formField,
    margin: 10,
    borderRadius: Style.sizes.border_radius,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    color: Style.colors.text,
    flexGrow: 1
  },
  loginButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: Style.colors.formField,
    borderRadius: Style.sizes.border_radius,
    padding: 10,
    alignItems: 'center'
  },
  loginText: {
      color: Style.colors.text
  },
  errorBox: {
      borderRadius: Style.sizes.border_radius,
      borderWidth: 1,
      borderColor: Style.colors.errorBorder,
      width: '100%',
      padding: 10,
      backgroundColor: Style.colors.errorBackground
  }
});