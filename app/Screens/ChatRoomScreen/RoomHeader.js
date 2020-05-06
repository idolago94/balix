// Components
import React, {Component} from 'react';
import {StyleSheet, View, Animated, Text} from 'react-native';
import BackButton from '../../components/Header/BackButton/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, sizes } from '../../utils/style';
import { window_width } from '../../utils/view';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';

export default function RoomHeader(props) {
	return (
		<LinearGradient colors={[colors.notch, colors.bar]}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: window_width}}>
                <BackButton onPress={() => props.onBack()} color={colors.icon} size={sizes.icon}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={s.users}>{props.users.map(u => u.username).join(', ')}</Text>
                    <ProfileSymbol 
                        style={{padding: 5}}
                        src={props.users[0].profileImage}
                        size={30}
                        />
                </View>
            </View>
		</LinearGradient>
	);
}

const s = StyleSheet.create({
    users: {
		color: colors.text,
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 1
    }
});
