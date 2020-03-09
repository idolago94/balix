import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import Style from '../../../helpers/style/style';
import Icon, {iconNames} from '../../Icon/Icon';
import {withComma} from '../../../common/numberMethods';
import LinearGradient from 'react-native-linear-gradient';


export default function CashIndicator(props) {

		return (
			<TouchableHighlight onPress={() => props.onPress()}>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>
					<View style={{flexDirection: 'row'}}>
						<View style={{
							alignSelf: 'flex-end',
							flexDirection: 'row',
							alignItems: 'center',
							margin: 2,
							borderBottomColor: 'gray',
						}}>
							<Icon name={iconNames.MONEY_BAG} size={15} color={Style.colors.lightMain}/>
							<Text style={{...styles.number, marginLeft: 3}}>{withComma(this.props.cash)}</Text>
						</View>
						<LinearGradient style={{borderRadius: 999, padding: 5}} colors={[Style.colors.lightMain, Style.colors.darkMain]}>
							<Icon name={iconNames.PLUS} size={13} color={'white'}/>
						</LinearGradient>
						<View style={{alignSelf: 'flex-end', flexDirection: 'row-reverse', alignItems: 'center', margin: 2}}>
							<Icon name={iconNames.HEART} size={15} color={Style.colors.lightMain}/>
							<Text style={{...styles.number, fontSize: 10, marginRight: 3}}>{withComma(this.props.hearts)}</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
}

const styles = StyleSheet.create({
	box: {
		backgroundColor: '#000000',
		borderRadius: 99,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 2,
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: 'center',
	},
	number: {
		color: Style.colors.text,
		fontSize: 13,
		letterSpacing: 1,
		marginLeft: 3,
		fontWeight: 'bold',
	},
});
