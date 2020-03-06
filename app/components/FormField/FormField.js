import React, { Component, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../Icon/Icon';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export default function FormField(props) {

    const [securePassword, setSecure] = useState(true);
    const [keyword, setKeyword] = useState('');

    const pressAdd = () => {
        props.onAdd(keyword);
        setKeyword('');
    }

    if(props.type == 'password') {
        return (
            <View>
                <View style={styles.field}>
                    <TextInput
                        secureTextEntry={securePassword}
                        onChangeText={(value) => props.onChange(value)}
                        placeholderTextColor={Style.colors.text}
                        style={styles.input} placeholder={props.placeholder}
                    />
                    <TouchableHighlight style={{paddingHorizontal: 15}} onPress={() => setSecure(!securePassword)}>
                        <Icon name={(securePassword) ? (iconNames.INVISIBLE):(iconNames.VISIBLE)} size={15} color='white' />
                    </TouchableHighlight>
                </View>
                {
                    (!props.confirm) ? (null) :
                        (
                            <View style={styles.field}>
                                <TextInput
                                    secureTextEntry={securePassword}
                                    onChangeText={(confirmPassword) => props.confirm(confirmPassword)}
                                    placeholderTextColor={Style.colors.text} style={styles.input}
                                    placeholder='Password Confirm'
                                />
                            </View>
                        )
                }
            </View>
        )
    } else if(props.type == 'radio') {
        return (
            <View style={{...styles.field, backgroundColor: 'transparent'}}>
                <RadioForm
                    formHorizontal={true}
                    animation={true}
                >
                    {
                        [{label: 'Male', value: 'Male'},{label: 'Female', value: 'Female'}].map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={props.value == obj.value}
                                    onPress={() => props.onChange(obj.value)}
                                    borderWidth={2}
                                    buttonInnerColor={Style.colors.darkMain}
                                    buttonOuterColor={Style.colors.text}
                                    buttonOuterSize={18}
                                    buttonStyle={{}}
                                    buttonWrapStyle={{marginLeft: 10}}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={() => props.onChange(obj.value)}
                                    labelStyle={{fontSize: 20, color: Style.colors.text}}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))
                    }
                </RadioForm>
            </View>
        )
    } else if(props.type == 'keyword') {
        return (
            <View style={styles.field}>
                <TextInput
                    value={keyword}
                    onChangeText={(value) => setKeyword(value)}
                    placeholderTextColor={Style.colors.text}
                    style={styles.input} placeholder={props.placeholder}
                />
                <TouchableHighlight style={{paddingHorizontal: 15}} onPress={() => pressAdd()}>
                    <Icon name={iconNames.PLUS} size={15} color='white' />
                </TouchableHighlight>
            </View>
        )
    }

    return (
        <View style={styles.field}>
            <TextInput
                onChangeText={(value) => props.onChange(value)}
                placeholderTextColor={Style.colors.text}
                style={styles.input}
                placeholder={props.placeholder}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    field: {
        width: '100%',
        backgroundColor: Style.colors.formField,
        margin: 10,
        borderRadius: Style.sizes.border_radius,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    input: {
        color: Style.colors.text,
        flexGrow: 1
    },
});
