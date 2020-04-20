import React, { Component } from 'react';
// Components
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormField from '../../components/FormField/FormField';
import Routes from '../../utils/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import TextButton from '../../components/TextButton/TextButton';
import { inject, observer } from "mobx-react";
import HandleError from '../../components/HandleError/HandleError';
import { colors, sizes } from '../../utils/style';
import { window_width } from '../../utils/view';
import CustomLink from '../../components/CustomLink/CustomLink';

@inject('AuthStore')
@observer
export default class LoginScreen extends Component {

  constructor(props) {
    console.log('Login Screen -> constructor');
    super(props);
    this.state = {
      securePassword: true
    }
    this.passwordInput = null;
  }

  onLogin() {
    const {AuthStore} = this.props;
    let auth = {
      username: this.state.username,
      password: this.state.password
    };
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
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.form}
            scrollEnabled={true}
          >
            {AuthStore.getErrors.length > 0 && <HandleError data={AuthStore.getErrors}/>}
              
            <FormField
              placeholder={'Username or Email'}
              onChange={(username) => this.setState({username})}
              keyType={'next'}
              onSubmit={() => this.passwordInput.focus()}
            />

            <FormField
              inputRef={(ref) => this.passwordInput = ref}
              type={'password'}
              placeholder={'Password'}
              onChange={(password) => this.setState({password})}
              keyType={'done'}
              onSubmit={() => this.onLogin()}
            />

            <TextButton onPress={() => this.onLogin()} title={'Log In'} />
            <CustomLink title={'Create Account'}  onPress={() => navigation.navigate(Routes.Screens.REGISTER.routeName)} />

          </KeyboardAwareScrollView>

          {/* <TextButton onPress={() => AuthStore.login({username: 'Idolago94', password: 'ido312546534'})} content={'Log Idolago94'} /> */}
          {/* <TextButton onPress={() => AuthStore.login({username: 'Test2', password: 't12345678'})} content={'Log Test2'} /> */}
          {/* <TextButton onPress={() => AuthStore.login({username: 'Test4', password: 't12345678'})} content={'Log Test4'} /> */}

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
    width: window_width*0.8,
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