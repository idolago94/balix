import React, { Component } from 'react';
import Style from '../../helpers/style/style';
// Components
import {StyleSheet, Text, View, TouchableHighlight, Dimensions} from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import db from "../../database/db";
import FormField from '../../components/FormField/FormField';
import Routes from '../../Routes/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import { inject, observer } from 'mobx-react';
import ApiService from '../../Services/Api';
import FooterButton from './FooterButton';

@inject('AuthStore')
export default class SetKeywords extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords: []
        };
    }

    componentDidMount() {
        console.log('SetKeywords -> componentDidMount');
    }

    addKeyword(newKeyword) {
        let {keywords} = this.state;
        keywords.push(newKeyword);
        this.setState({keywords});
    }

    async onSave() {
        const {keywords} = this.state;
        const {AuthStore, navigation} = this.props;
        if(keywords.length < 1) {
            this.toApp();
        } else {
            let signupUser = navigation.getParam('user');
            let keywordsResponse = await ApiService.updateKeywords(signupUser._id, keywords);
            signupUser.keywords = keywordsResponse;
            AuthStore.setUserLogin(signupUser);
            navigation.navigate(Routes.Screens.LOGIN.routeName);
        }
    }

    toApp() {
        const {AuthStore, navigation} = this.props;
        let signupUser = navigation.getParam('user');
        AuthStore.setUserLogin(signupUser);
        navigation.navigate(Routes.Screens.LOGIN.routeName);
    }

    render() {
        const {keywords} = this.state;
        const {navigation} = this.props;
            return (
                <View style={styles.container}>
                    <AppTitle />
                    <View style={styles.form}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.label}>You can add keywords that will help other people find you:</Text>
                            <FormField onAdd={(value) => this.addKeyword(value)} placeholder={'Type a word'} type={'keyword'}/>
                            <View style={styles.keywordsBox}>
                                {
                                    keywords.map((word, i) => (
                                        <View key={i} style={styles.keyword}><Text style={{color: Style.colors.text}}>{word}</Text></View>
                                    ))
                                }
                            </View>
                        </View>


                        <View style={styles.footerButtons}>
                            <FooterButton title={'SKIP'} onPress={() => this.toApp()}/>
                            <FooterButton title={'DONE'} onPress={() => this.onSave()}/>                            
                            {/* <TouchableHighlight style={{padding: 20}} onPress={() => this.toApp()}>
                                <Text style={{color: 'gray', fontSize: 15}}>SKIP</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={{padding: 20}} onPress={() => this.onSave()}>
                                <Text style={{color: 'gray', fontSize: 15}}>DONE</Text>
                            </TouchableHighlight> */}
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

