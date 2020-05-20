import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon, {iconNames} from '../../components/Icon/Icon';
import {window_width } from '../../utils/view';
import { colors } from '../../utils/style';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function PreviewHeader(props) {
    const buttonSize = 30;
    return (
        <View style={s.container}>
            {props.secret && <Icon name={iconNames.LOCK} size={buttonSize} color={colors.icon} />}
            <CustomButton style={s.btn} onPress={() => this.doUpload()} icon={iconNames.CONFIRM} size={buttonSize} />
        </View>
    )
}

const s  = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        flexDirection: 'row', 
        width: window_width
    },
    btn: {
        padding: 10
    },
})