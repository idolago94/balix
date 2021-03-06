import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon, {iconNames} from '../../Icon/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../utils/style';
import { thousandsWithCommas } from '../../../utils/Tools';


export default function CashIndicator(props) {

	let side_icon_size = 22;
		return (
			<TouchableWithoutFeedback onPress={() => props.onPress()}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<View style={[s.box, {transform: [{translateX: 8}]}]}>
						<Icon style={{transform: [{translateX: 9}], ...s.icon}} name={iconNames.FULL_MONEY_BAG} size={side_icon_size} color={'yellow'}/>
						<Text style={[s.number]}>{thousandsWithCommas(props.cash)}</Text>
					</View>
					<View style={{zIndex: 999, padding: 2, backgroundColor: colors.bar, borderRadius: 999}}>
					<LinearGradient style={s.centerBox} colors={[colors.lightMain, colors.darkMain]}>
						<View style={{aspectRatio: 1, alignItems: 'center', justifyContent: 'center'}}>
							<Icon name={iconNames.BANK2} size={18} color={'white'}/>
							<Text style={{fontSize: 5, color: 'white', fontWeight: 'bold', letterSpacing: 1}}>BANK</Text>
						</View>
					</LinearGradient>
					</View>
					<View style={[s.box, {flexDirection: 'row-reverse', transform: [{translateX: -8}]}]}>
						<Icon style={{transform: [{translateX: -9}], ...s.icon}} name={iconNames.FULL_HEART} size={side_icon_size} color={'red'}/>
						<Text style={[s.number]}>{thousandsWithCommas(props.hearts)}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
}

const s = StyleSheet.create({
	number: {
		color: colors.text,
		fontSize: 15,
		letterSpacing: 1,
		fontWeight: 'bold',
		borderWidth: 0.3,
		borderColor: 'lightgray',
		paddingHorizontal: 8,
		backgroundColor: 'rgba(208, 211, 213, 0.15)'
	},
	box: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 3
	},
	centerBox: {
		borderRadius: 999, 
		padding: 6, 
		justifyContent: 'center', 
		alignItems: 'center',
		marginHorizontal: 3,
		zIndex: 999,
	},
	icon: {
		zIndex: 999
	}
});
