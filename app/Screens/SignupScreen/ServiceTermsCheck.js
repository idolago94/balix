import React from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import { colors } from '../../utils/style';
import CustomLink from '../../components/CustomLink/CustomLink';
import Routes from '../../utils/Routes';

export default function ServiceTermsCheck(props) {

    return (
        <View style={{flexDirection: 'row', paddingBottom: 10, alignItems: 'center', width: '100%'}}>
            <Switch 
                onValueChange={val => props.onPress(val)}
                thumbColor={colors.darkMain}
                value={props.value}
            />
            <Text style={{color: colors.text, paddingLeft: 10, flex: 1}}>
                I can confirm I have read and agree to the
                <Text onPress={() => props.toTerms()}> terms of service</Text>
            </Text>
        </View>
    )
}