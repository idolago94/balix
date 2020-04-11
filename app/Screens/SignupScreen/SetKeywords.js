import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Dimensions} from 'react-native';
import FormField from '../../components/FormField/FormField';
import Routes from '../../utils/Routes';
import AppTitle from '../../components/AppTitle/AppTitle';
import { inject, observer } from 'mobx-react';
import ApiService from '../../Services/Api';
import FooterButton from './FooterButton';
import { colors, sizes } from '../../utils/style';

@inject('AuthStore')
export default class SetKeywords extends Component {

    constructor(props) {
        console.log('SetKeywords -> constructor');
        super(props);
        this.state = {
            keywords: []
        };
    }

    addKeyword(newKeyword) {
        let {keywords} = this.state;
        keywords.push(newKeyword);
        this.setState({keywords});
    }

    async onSave() {
        const {keywords} = this.state;
        const {navigation} = this.props;
        let authData = navigation.getParam('auth');
        if(keywords.length > 0) {
            let keywordsResponse = await ApiService.updateKeywords(authData.user._id, keywords);
            authData.user.keywords = keywordsResponse;
        }
        this.toApp(authData);
    }

    toApp(auth) {
        this.props.AuthStore.setUserLogin(auth);
        this.props.navigation.navigate(Routes.Screens.LOGIN.routeName);
    }

    render() {
        const {keywords} = this.state;
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
                                        <View key={i} style={styles.keyword}><Text style={{color: colors.text}}>{word}</Text></View>
                                    ))
                                }
                            </View>
                        </View>


                        <View style={styles.footerButtons}>
                            <FooterButton title={'SKIP'} onPress={() => this.toApp()}/>
                            <FooterButton title={'DONE'} onPress={() => this.onSave()}/>        
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
        backgroundColor: colors.background
    },
    form: {
        width: sizes.fieldWidth,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexGrow: 1
    },
    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        paddingVertical: 20,
        letterSpacing: 2
    },
    label: {
        color: colors.text,
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
        color: colors.text,
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
        borderRadius: sizes.border_radius,
        borderWidth: 1,
        borderColor: colors.errorBorder,
        width: '100%',
        padding: 10,
        backgroundColor: colors.errorBackground
    }
});

