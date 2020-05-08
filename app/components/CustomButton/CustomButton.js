import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { colors, sizes } from '../../utils/style';
import Icon from '../Icon/Icon';

export default CustomButton = (props) => {
    const buttonRef = useRef(null);
    return (
        <TouchableHighlight ref={buttonRef} onPress={() => props.onPress(buttonRef.current)} style={[props.style]}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5}}>
                {props.icon && <Icon style={{paddingRight: 3}} name={props.icon} size={props.size || sizes.icon} color={props.color || colors.icon} />}
                {props.title && <Text style={{color: props.color || colors.text, fontSize: 18}}>{props.title}</Text>}
            </View>
        </TouchableHighlight>
    )
}