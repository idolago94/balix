import React, {useRef} from 'react';
import {Text, View} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { colors, sizes } from '../../utils/style';
import Icon from '../Icon/Icon';

export default CustomButton = (props) => {
    const buttonRef = useRef(null);
    return (
        <TouchableHighlight 
            ref={buttonRef} 
            onPress={() => props.onPress ? props.onPress(buttonRef.current):console.log('press function not defined!')} 
            style={[props.style]}
        >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {props.icon && <Icon 
                        style={{paddingRight: props.title ? 3:0}} 
                        name={props.icon} 
                        size={props.iconSize || props.size || sizes.icon} 
                        color={props.iconColor || props.color || colors.icon} 
                    />}
                    
                {props.title && <Text 
                        style={props.textStyle ? props.textStyle:{
                            color: props.textColor || props.color || colors.text, 
                            fontSize: props.fontSize || props.size || 18
                        }}
                    >
                        {props.title}
                    </Text>}
            </View>
        </TouchableHighlight>
    )
}