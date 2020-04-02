import React, { Component } from 'react';
// Components
import {StyleSheet, Text, View, TouchableHighlight, TextInput, Animated, Platform} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import FormField from '../../components/FormField/FormField';
import Routes from '../../utils/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import TextButton from '../../components/TextButton/TextButton';
import { inject, observer } from "mobx-react";
import HandleError from '../../components/HandleError/HandleError';
import { colors, sizes } from '../../utils/style';

@inject('AuthStore')
@observer
export default class LoginScreen extends Component {

  constructor(props) {
    console.log('Login Screen -> constructor');
    super(props);
    this.state = {
      securePassword: true
    }
  }

  onLogin() {
    const {AuthStore} = this.props;
    let auth = {
      username: this.state.username,
      password: this.state.password
    };
      // let auth = {
      //   username: 'Idoalgo94',
      //   password: 'ido312546534'
      // }
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
              {AuthStore.getErrors.length > 0 && <HandleError data={AuthStore.getErrors}/>}
              
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

                <TextButton onPress={() => AuthStore.login({username: 'Test', password: '1234'})} content={'Log Test'} />
                <TextButton onPress={() => AuthStore.login({username: 'Test2', password: '1234'})} content={'Log Test2'} />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 70,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  form: {
    width: sizes.fieldWidth,
    alignItems: 'center',
  },
  field: {
    width: '100%',
    backgroundColor: colors.formField,
    margin: 10,
    borderRadius: sizes.border_radius,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    color: colors.text,
    flexGrow: 1
  },
  loginButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.formField,
    borderRadius: sizes.border_radius,
    padding: 10,
    alignItems: 'center'
  },
  loginText: {
      color: colors.text
  },
  errorBox: {
      borderRadius: sizes.border_radius,
      borderWidth: 1,
      borderColor: colors.errorBorder,
      width: '100%',
      padding: 10,
      backgroundColor: colors.errorBackground
  }
});