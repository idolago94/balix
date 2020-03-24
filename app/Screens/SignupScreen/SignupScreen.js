import React, { Component } from 'react';
import Style from '../../helpers/style/style';
// Components
import {StyleSheet, Text, View, TouchableHighlight, Image, Dimensions} from 'react-native';
import db from "../../database/db";
import FormField from '../../components/FormField/FormField';
import Routes from '../../Routes/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import { inject, observer } from 'mobx-react';
import ApiService from '../../Services/Api';

@inject('AuthStore')
export default class SignupScreen extends Component {

    constructor(props) {
        console.log('SignupScreen -> constructor');
        super(props);
        this.state = {
            securePassword: true,
            created: false,
            password: null,
            confirmPassword: null
        }
    }

    validateForm() {
        let errors = [];
        if(
            !this.state.first_name ||
            !this.state.last_name ||
            !this.state.username ||
            !this.state.email ||
            !this.state.password ||
            !this.state.confirmPassword ||
            !this.state.gender
        ) {
            errors.push('All fields are required.');
        }
        if(this.state.password != this.state.confirmPassword) {
            errors.push('Your password not match.');
        }
        this.setState({errors: errors});
        return errors;
    }

    async onCreateAccount() {
        let validate = this.validateForm();        
        if(validate.length <= 0) {
            const {navigation} = this.props;
            const {first_name, last_name, username, email, password, gender} = this.state;
            let signupResponse = await ApiService.signup(first_name, last_name, username, password, email, gender);
            if(signupResponse.error) {
                this.setState({errors: [signupResponse.error]});
            } else {
                // this.props.AuthStore.setUserLogin(signupResponse);
                navigation.navigate(Routes.Screens.SET_PROFILE.routeName, {user: signupResponse});
            }
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex: 1, position: 'relative', backgroundColor: Style.colors.background}}>
                <Image
                    style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute', top: 0, left: 0, opacity: 0.188}}
                    source={require('../../assets/background1.jpeg')}
                />
                <View style={styles.container}>
                    <AppTitle />
                        <View style={styles.form}>
                            <Text style={styles.title}>Create New Account:</Text>
                            {(!this.state.errors || this.state.errors.length < 1) ? (null) :
                                (<View style={styles.errorBox}>{this.state.errors.map((err, i) => (
                                    <Text key={i} style={{color: Style.colors.text}}>{err}</Text>))}
                                </View>)}

                                <FormField type={'text'} placeholder={'First Name'} onChange={(first_name) => this.setState({first_name: first_name})}/>

                                <FormField type={'text'} placeholder={'Last Name'} onChange={(last_name) => this.setState({last_name: last_name})}/>

                                <FormField type={'text'} placeholder={'Username'} onChange={(username) => this.setState({username: username})}/>

                                <FormField type={'text'} placeholder={'Email'} onChange={(email) => this.setState({email: email})}/>

                                <FormField
                                    type={'password'}
                                    placeholder={'Password'}
                                    onChange={(password) => this.setState({password: password})}
                                    confirm={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
                                />

                                <FormField
                                    value={this.state.gender}
                                    type={'radio'}
                                    onChange={(gender) => this.setState({gender: gender})}
                                />

                                <TouchableHighlight style={styles.signupButton} onPress={this.onCreateAccount.bind(this)}>
                                    <Text style={styles.loginText}>Signup</Text>
                                </TouchableHighlight>

                                <TouchableHighlight style={{alignSelf: 'flex-start'}} onPress={() => navigation.navigate(Routes.Screens.LOGIN.routeName)}>
                                    <Text style={{color: 'gray', fontSize: 10}}>Login to existing account</Text>
                                </TouchableHighlight>
                        </View>
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
        // backgroundColor: Style.colors.background
    },
    appName: {
        fontSize: 70,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    form: {
        width: Style.sizes.fieldWidth,
        alignItems: 'center',
    },
    title: {
        color: Style.colors.text,
        alignSelf: 'flex-start',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 20,
        letterSpacing: 2
    },
    signupButton: {
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
