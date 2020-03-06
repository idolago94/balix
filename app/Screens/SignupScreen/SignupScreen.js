import React, { Component } from 'react';
import Style from '../../helpers/style/style';
// Components
import {StyleSheet, Text, View, TouchableHighlight, TextInput, Animated, Platform, Alert, Dimensions, Image} from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { LinearTextGradient } from "react-native-text-gradient";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import db from "../../database/db";
import FormField from '../../components/FormField/FormField';
import MoreSetAccount from './MoreSetAccount';
import Routes from '../../Routes/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';

export default class SignupScreen extends Component {

    constructor(props) {
        console.log('SignupScreen -> constructor');
        super(props);
        this.state = {
            securePassword: true,
            created: false,
            password: '1234', // for development
            confirmPassword: '1234' // for development
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

    onCreateAccount() {
        let validate = this.validateForm();        
        if(validate.length <= 0) {
        const {navigation} = this.props;
            fetch(`${db.url}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            }).then(res => res.json()).then(response => {
                console.log(response);
                if(response.error) {
                    this.setState({errors: [response.error]});
                } else {
                    // this.setState({created: response});
                    navigation.navigate(Routes.Screens.SET_PROFILE.routeName, {newUser: response});
                }
            }).catch(err => console.log(err));
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <AppTitle />
                            <View style={styles.form}>
                                <Text style={styles.title}>Create New Account:</Text>
                                {
                                    (!this.state.errors || this.state.errors.length < 1) ? (null) :
                                        (
                                            <View style={styles.errorBox}>
                                                {
                                                    this.state.errors.map((err, i) => (
                                                        <Text key={i} style={{color: Style.colors.text}}>{err}</Text>
                                                    ))
                                                }
                                            </View>
                                        )
                                }

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
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Style.colors.background
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
