import React, { Component } from 'react';
// Components
import { StyleSheet, View, Image, Text } from 'react-native';
import Icon, {iconNames} from '../../Icon/Icon';
import { colors } from '../../../utils/style';

export default function Emoji(props) {
    // Props = [ data: {url: url, value: number} ]
        return (
            <View style={{alignItems: 'center', margin: 7}}>
                <Image
                    source={{uri: props.data.url}}
                    style={{
                        height: props.size,
                        width: props.size
                    }}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: colors.text, fontSize: 10}}>{props.data.value}</Text>
                    <Icon name={iconNames.DOLLAR} size={10} color={colors.lightMain} />
                </View>
            </View>

        )
}


const styles = StyleSheet.create({
});
