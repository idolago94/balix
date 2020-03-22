import React, { Component } from 'react';
import Style from '../../helpers/style/style';
// Components
import {StyleSheet, Text, View, TouchableHighlight, Alert, Dimensions, Image} from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import ImagePicker from 'react-native-image-picker';
import db from "../../database/db";
import FormField from '../../components/FormField/FormField';
import { inject, observer } from 'mobx-react';

@inject('AuthStore')
export default class MoreSetAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            profileImage: false,
            keywords: []
        };
    }

    validateForm() {
        let errors = [];
        if(!this.state.profileImage) {
            errors.push('Please select a picture.');
        }
        this.setState({errors: errors});
        return errors;
    }

    onSetImage() {
        let validate = this.validateForm();
        if(validate.length <= 0) {
            let requestBody = {
                contentType: this.state.profileImage.type,
                base64: this.state.profileImage.data
            };
                fetch(`${db.url}/users/updateProfileImage?id=${this.props.newUser._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                }).then(res => res.json()).then(response => {
                    if(response.error) {
                        this.setState({errors: [response.error]});
                    } else {
                        console.log(response);
                        this.setState({page: 2, uploadImage: response});
                    }
                }).catch(err => console.log(err));
        }
    }

    onImagePress() {
        ImagePicker.showImagePicker( (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                Alert.alert(response.error);
            } else {
                this.setState({profileImage: response});
            }
        });
    }

    addKeyword(newKeyword) {
        let keywords = this.state.keywords;
        keywords.push(newKeyword);
        this.setState({keywords: keywords});
    }

    onSave() {
        fetch(`${db.url}/users/updateKeywords?id=${this.props.newUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({keywords: this.state.keywords})
        }).then(res => res.json()).then(response => {
            let createdUser = {
                ...this.props.newUser,
                profileImage: this.state.uploadImage,
                keywords: response
            };
            this.props.AuthStore.setUserLogin(createdUser);
        })
    }

    render() {
        if(this.state.page == 2) {
            return (
                <View style={styles.form}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.label}>You can add keywords that will help other people find you:</Text>
                        <FormField onAdd={(value) => this.addKeyword(value)} placeholder={'Type a word'} type={'keyword'}/>
                        <View style={styles.keywordsBox}>
                            {
                                this.state.keywords.map((word, i) => (
                                    <View key={i} style={styles.keyword}><Text style={{color: Style.colors.text}}>{word}</Text></View>
                                ))
                            }
                        </View>
                    </View>

                    <View style={styles.footerButtons}>
                        <TouchableHighlight style={{padding: 20}} onPress={() => this.setState({page: 1})}>
                            <Icon name={iconNames.LEFT_CHEVRON} size={20} color={'gray'} />
                        </TouchableHighlight>
                        <TouchableHighlight style={{padding: 20}} onPress={() => this.onSave()}>
                            <Text style={{color: 'gray', fontSize: 15}}>SAVE</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }
        return (
                <View style={styles.form}>
                    <View>
                        <Text style={styles.title}>Hello {this.props.newUser.first_name} {this.props.newUser.last_name},</Text>
                        <Text style={styles.label}>Welcome to Balix, just a few steps.</Text>
                        <Text style={styles.label}>Please select photo to your account profile image:</Text>
                    </View>
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
                    <TouchableHighlight onPress={this.onImagePress.bind(this)}>
                        <Image
                            style={styles.imageBox}
                            source={(this.state.profileImage) ? ({uri: `data:${this.state.profileImage.type};base64,${this.state.profileImage.data}`}):(require('../../assets/profileImage.png'))}
                        />
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.setButton} onPress={this.onSetImage.bind(this)}>
                        <Text style={styles.setText}>Set Profile Image</Text>
                    </TouchableHighlight>

                    <View style={styles.footerButtons}>
                        <TouchableHighlight style={{padding: 20}} onPress={() => this.props.toLoginScreen()}>
                            <Text style={{color: 'gray', fontSize: 10}}>Login to account</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{padding: 20}} onPress={() => this.setState({page: 2})}>
                            <Text style={{color: 'gray', fontSize: 25, letterSpacing: 2}}>skip</Text>
                        </TouchableHighlight>
                    </View>
                </View>
        )
    }
}


const styles = StyleSheet.create({
    form: {
        width: Style.sizes.fieldWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    title: {
        color: Style.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 20,
        letterSpacing: 2
    },
    label: {
        color: Style.colors.text,
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        alignSelf: 'flex-start'
    },
    imageBox: {
        backgroundColor: 'gray',
        borderRadius: 999,
        height: Dimensions.get('window').width*0.5,
        aspectRatio: 1
    },
    setButton: {
        width: '100%',
        borderWidth: 1,
        borderColor: Style.colors.formField,
        borderRadius: Style.sizes.border_radius,
        padding: 15,
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    setText: {
        color: Style.colors.text
    },
    keywordsBox: {
      marginTop: 70,
      justifyContent: 'center',
      width: Dimensions.get('window').width*0.5,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    keyword: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: Style.colors.text,
        backgroundColor: 'gray',
        borderRadius: 999,
        margin: 3
    },
    footerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: Dimensions.get('window').width,
      alignItems: 'center',
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
