import React, {Component, useState} from 'react';
import {TouchableHighlight, StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import { colors } from '../../utils/style';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Icon, { iconNames } from '../../components/Icon/Icon';
import DatePicker from 'react-native-datepicker'
import IconButton from '../../components/IconButton/IconButton';

export default function EditField(props) {
    const [keyword, setKeyword] = useState('');

    let field = null;
    switch (props.type) {
        case 'radio': 
            field = (
                <RadioForm
                    ref={(ref) => props.inputRef && props.inputRef(ref)}
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
                                    buttonInnerColor={colors.darkMain}
                                    buttonOuterColor={colors.text}
                                    buttonOuterSize={18}
                                    buttonStyle={{}}
                                    buttonWrapStyle={{marginLeft: 10}}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    onPress={() => props.onChange(obj.value)}
                                    labelStyle={{fontSize: 20, color: colors.text}}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                        ))
                    }
                </RadioForm>
            );
        break;
        case 'datepicker': 
            field = (
                <DatePicker
                    ref={(ref) => props.inputRef && props.inputRef(ref)}
                    style={{width: '100%'}}
                    date={props.value}
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    placeholder="Select date"
                    iconComponent={<Icon style={{paddingLeft: 10}} name={iconNames.CALENDAR} size={23} color={colors.text}/>}
                    customStyles={{
                    dateInput: {
                        borderColor: 'transparent',
                        ...s.input
                    },
                    dateText: {color: colors.text, alignSelf: 'flex-start'},
                    placeholderText: {color: colors.text, alignSelf: 'flex-start'},
                    }}
                    onDateChange={(d) => props.onChange(d)}
                />
            );
        break;
        case 'keywords':
            field = (
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput 
                            ref={(ref) => props.inputRef && props.inputRef(ref)} 
                            style={[s.input, {flexGrow: 1}]} 
                            value={keyword} 
                            onChangeText={s => setKeyword(s)} 
                            returnKeyType={props.keyType}
                            onSubmitEditing={() => props.onSubmit && props.onSubmit()}
                        />
                        <IconButton style={{paddingLeft: 10}} icon={iconNames.PLUS} size={23} color={colors.text} onPress={() => {props.onAdd(keyword);setKeyword('')}}/>
                    </View>
                    <View style={s.keywordsBox}>
                        {Array.from(props.value).map((word, i) => (
                            <View key={i} style={s.keyword}>
                                <Text style={{color: colors.text}}>{word}</Text>
                                <IconButton 
                                    style={{position: 'absolute', top: -4, left: -4, padding: 4, borderRadius: 999, backgroundColor: colors.bar}} 
                                    icon={iconNames.CLOSE} 
                                    size={6} 
                                    color={colors.text} 
                                    onPress={() => props.onRemove(i)}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            );
        break;
        default: field = <TextInput 
            ref={(ref) => props.inputRef && props.inputRef(ref)} 
            style={s.input} 
            value={props.value} 
            onChangeText={(s) => props.onChange(s)} 
            returnKeyType={props.keyType}
            onSubmitEditing={() => props.onSubmit && props.onSubmit()}
        />
    }
    return (
        <View style={[props.style]}>
            <Text style={s.label}>{props.label}</Text>
            {field}
        </View>
    )
}

const s = StyleSheet.create({
    label: {
        color: colors.text,
        fontSize: 10,
        padding: 4
    }, 
    input: {
        borderWidth: 1, 
        borderBottomColor: 'gray',
        padding: 3,
        color: colors.text
    },
    keywordsBox: {
        marginTop: 15,
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
      keyword: {
          paddingHorizontal: 15,
          paddingVertical: 5,
          backgroundColor: 'gray',
          borderRadius: 999,
          margin: 3
      },
})