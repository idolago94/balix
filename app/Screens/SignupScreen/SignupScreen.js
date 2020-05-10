import React, { Component } from 'react';
// Components
import {StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormField from '../../components/FormField/FormField';
import Routes from '../../utils/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import { inject, observer } from 'mobx-react';
import ApiService from '../../Services/Api';
import HandleError from '../../components/HandleError/HandleError';
import ValidationService from '../../Services/Validation';
import { colors, sizes } from '../../utils/style';
import { window_height, window_width } from '../../utils/view';
import TextButton from '../../components/TextButton/TextButton';
import CustomLink from '../../components/CustomLink/CustomLink';
import ServiceTermsCheck from './ServiceTermsCheck';
@inject('AuthStore')
export default class SignupScreen extends Component {

    constructor(props) {
        console.log('SignupScreen -> constructor');
        super(props);
        this.state = {
            securePassword: true,
            created: false,
            password: '',
            confirmPassword: '',
            confirmTerms: false,
            errors: []
        }
        this.first_nameRef = null;
        this.last_nameRef = null;
        this.emailRef = null;
        this.usernameRef = null;
        this.passwordRef = null;
    }

    async onCreateAccount() {
        let validate = ValidationService.signup(this.state);       
        if(!validate) {
            const {navigation} = this.props;
            const {first_name, last_name, username, email, password, gender} = this.state;
            let signupResponse = await ApiService.signup(first_name, last_name, username, password, email, gender);
            if(signupResponse.error) {
                this.setState({errors: [signupResponse.error]});
            } else {
                this.setState({errors: []});
                navigation.navigate(Routes.Screens.SET_PROFILE.routeName, {auth: signupResponse});
            }
        } else {
            this.setState({errors: validate});
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, position: 'relative', backgroundColor: colors.background}}>
                <Image
                    style={{height: window_height, width: window_width, position: 'absolute', top: 0, left: 0, opacity: 0.188}}
                    source={require('../../assets/background1.jpeg')}
                />
                <View style={styles.container}>
                    <AppTitle />
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        contentContainerStyle={styles.form}
                        scrollEnabled={true}
                    >
                        <Text style={styles.title}>Create New Account:</Text>
                        {this.state.errors.length > 0 && <HandleError data={this.state.errors} />}

                        <FormField 
                            inputRef={(ref) => this.first_nameRef = ref}
                            type={'text'} 
                            placeholder={'First Name'} 
                            onChange={(first_name) => this.setState({first_name: first_name})}
                            keyType={'next'}
                            onSubmit={() => this.last_nameRef.focus()}
                        />

                        <FormField 
                            inputRef={(ref) => this.last_nameRef = ref}
                            type={'text'} 
                            placeholder={'Last Name'} 
                            onChange={(last_name) => this.setState({last_name: last_name})}
                            keyType={'next'}
                            onSubmit={() => this.usernameRef.focus()}
                        />

                        <FormField 
                            inputRef={(ref) => this.usernameRef = ref}
                            type={'text'} 
                            placeholder={'Username'} 
                            onChange={(username) => this.setState({username: username})}
                            keyType={'next'}
                            onSubmit={() => this.emailRef.focus()}
                        />

                        <FormField 
                            inputRef={(ref) => this.emailRef = ref}
                            type={'text'} 
                            placeholder={'Email'} 
                            onChange={(email) => this.setState({email: email})}
                            keyType={'next'}
                            onSubmit={() => this.passwordRef.focus()}
                        />

                        <FormField
                            inputRef={(ref) => this.passwordRef = ref}
                            type={'password'}
                            placeholder={'Password'}
                            onChange={(password) => this.setState({password: password})}
                            confirm={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
                            keyType={'next'}
                        />

                        <FormField
                            value={this.state.gender}
                            type={'radio'}
                            onChange={(gender) => this.setState({gender: gender})}
                        />

                        <ServiceTermsCheck
                            toTerms={() => navigation.navigate(Routes.Screens.TERMS.routeName)}
                            onPress={val => this.setState({confirmTerms: val})}
                            value={this.state.confirmTerms}
                        />

                        <TextButton onPress={this.onCreateAccount.bind(this)} title={'Signup'} />
                        <CustomLink title={'Login to existing account'} onPress={() => navigation.navigate(Routes.Screens.LOGIN.routeName)} />

                    </KeyboardAwareScrollView>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    appName: {
        fontSize: 70,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    form: {
        width: window_width*0.8,
        alignItems: 'center',
    },
    title: {
        color: colors.text,
        alignSelf: 'flex-start',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20,
        letterSpacing: 2
    },
    signupButton: {
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
