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
import { inject, observer } from 'mobx-react';
import ApiService from '../../Services/Api';
import UploadService from '../../Services/Upload';
import HandleError from '../../components/HandleError/HandleError';
import FooterButton from './FooterButton';

@inject('AuthStore', 'NavigationStore')
@observer
export default class SetProfileImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileImage: undefined,
            errors: []
        };
    }

    componentDidMount() {
        console.log('SetProfileImage -> componentDidMount');
    }

    validateForm() {
        let errors = [];
        if(!this.state.profileImage) {
            errors.push('Please select a picture.');
        }
        this.setState({errors: errors});
        return errors;
    }

    async onSetImage() {
        let validate = this.validateForm();
        if(validate.length <= 0) {
            const {navigation, AuthStore} = this.props;
            const {profileImage} = this.state;
            let signupUser = navigation.getParam('user');
            let resizedProfile = await UploadService.buildProfileImage(profileImage);
            let setProfileResponse = await ApiService.updateProfileImage(signupUser._id, resizedProfile);
            signupUser.profileImage = setProfileResponse._id;
            navigation.navigate(Routes.Screens.SET_KEYWORDS.routeName, {user: signupUser});
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
        const {navigation, AuthStore} = this.props;
        const newUser = navigation.getParam('user');
        return (
            <View style={styles.container}>
                <AppTitle />
                <View style={styles.form}>  
                    <View>
                        <Text style={styles.title}>Hello {newUser.first_name} {newUser.last_name},</Text>
                        <Text style={styles.label}>Welcome to Balix, just a few steps.</Text>
                        <Text style={styles.label}>Please select photo to your account profile image:</Text>
                    </View>
                    {this.state.errors.length > 0 && <HandleError data={this.state.errors} />}
                    <TouchableHighlight onPress={this.onImagePress.bind(this)}>
                        <Image
                            style={styles.imageBox}
                            source={(this.state.profileImage) ? ({uri: `data:${this.state.profileImage.type};base64,${this.state.profileImage.data}`}):(require('../../assets/profileImage.png'))}
                        />
                    </TouchableHighlight>

                    <TextButton onPress={this.onSetImage.bind(this)} content={'Set Profile Image'} />

                    <View style={styles.footerButtons}>
                        <FooterButton title={'SKIP'} onPress={() => navigation.navigate(Routes.Screens.SET_KEYWORDS.routeName, {user: newUser})}/>
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