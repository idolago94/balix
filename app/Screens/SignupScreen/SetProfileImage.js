import React, { Component } from 'react';
import Style from '../../helpers/style/style';
// Components
import {StyleSheet, Text, View, TouchableHighlight, TextInput, Animated, Platform, Alert, Dimensions, Image} from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import ImagePicker from 'react-native-image-picker';
import db from "../../database/db";
import Routes from '../../Routes/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import TextButton from '../../components/TextButton/TextButton';

export default class SetProfileImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newUser: undefined,
            profileImage: undefined
        };
    }

    componentDidMount() {
        console.log('SetProfileImage -> componentDidMount');
        const {navigation} = this.props;
        navigation.addListener('willFocus', () => {
            console.log('SetProfileImage -> willFocus');
            let newUser = navigation.getParam('newUser');  
            console.log('setProfileScreen -> newUser -> ', newUser.username);
            this.setState({newUser});
        });
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
            const {navigation} = this.props;
            const {newUser,profileImage} = this.state;
            let requestBody = {
                contentType: profileImage.type,
                base64: profileImage.data
            };
                fetch(`${db.url}/users/updateProfileImage?id=${newUser._id}`, {
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
                        // this.setState({page: 2, uploadImage: response});  
                        let userWithProfliImage =  {
                            ...newUser,
                            profileImage: response
                        }
                        navigation.navigate(Routes.Screens.SET_KEYWORDS.routeName, {newUser: userWithProfliImage});
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

    render() {
        const {newUser} = this.state;
        const {navigation} = this.props;
        if(!this.state.newUser) {
            return (
                <View></View>
            )
        }
        return (
            <View style={styles.container}>
                <AppTitle />
                <View style={styles.form}>  
                    <View>
                        <Text style={styles.title}>Hello {newUser.first_name} {newUser.last_name},</Text>
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

                    <TextButton onPress={this.onSetImage.bind(this)} content={'Set Profile Image'} />

                    <View style={styles.footerButtons}>
                        <TouchableHighlight style={{padding: 20, alignSelf: 'flex-end'}} onPress={() => navigation.navigate(Routes.Screens.SET_KEYWORDS.routeName, {newUser})}>
                            <Text style={{color: 'gray', fontSize: 25, letterSpacing: 2}}>skip</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Style.colors.background
    },
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