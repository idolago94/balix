// Components
import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, Platform, Animated, Dimensions, Text} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import CashIndicator from './CashIndicator/CashIndicator';
// Navigator
import Routes from '../../Routes/Routes';
// Helper
import Style from '../../helpers/style/style';

import { inject, observer } from "mobx-react";
import HeaderButton from './HeaderButton/HeaderButton';
import SearchInput from './SearchInput/SearchInput';
import BackButton from './BackButton/BackButton';

@inject('CashButtonsStore', 'AuthStore', 'NavigationStore')
@observer
export default class Header extends Component {
	constructor(props) {
		super(props);
		this.indicatorOpacity = new Animated.Value(1);
		this.indicatorWidth = new Animated.Value(200);
	}

	hideIndicator() {
		Animated.parallel([
			Animated.timing(this.indicatorOpacity, {
				toValue: 0,
			})
		]).start();
	}

	navigateTo(routeName, params) {
		this.props.NavigationStore.setCurrentTab(routeName);
		this.props.NavigationStore.navigate(routeName, params);
	}

	render() {
		const {AuthStore, CashButtonsStore, NavigationStore} = this.props;
		return (
			<View>
				{Platform.OS == 'ios' && <View style={{height: Style.sizes.iphone_notch, backgroundColor: Style.colors.bar}} />}
				<View style={styles.header}>
					<View style={styles.leftSide}>
						{(NavigationStore.isBack && !NavigationStore.isMyProfile) && <BackButton onPress={() => NavigationStore.goBack()} color={Style.colors.icon} size={Style.sizes.icon}/>}
						{NavigationStore.isCashIndicator && (
							<Animated.View style={{...styles.leftSide, opacity: this.indicatorOpacity, maxWidth: this.indicatorWidth, maxHeight: this.indicatorWidth}}>
								<CashIndicator
									onPress={() => CashButtonsStore.toggleButtons()}
									cash={AuthStore.getUserLogin.cash} hearts={AuthStore.getUserLogin.hearts}
								/>
							</Animated.View>
						)}
					</View>

					<View style={styles.rightSide}>
						<View style={{flex: NavigationStore.isSearch ? (1):(0)}}>
							{NavigationStore.isSearch ? (<SearchInput />) : (
							NavigationStore.isHeaderButton && <HeaderButton
								onPress={this.navigateTo.bind(this, Routes.Screens.SEARCH.routeName)}
								color={Style.colors.icon}
								icon={iconNames.SEARCH}
								size={Style.sizes.icon}
							/>
							)}
						</View>

						{(!NavigationStore.isHeaderButton && !NavigationStore.isSearch) ? (<Text style={styles.title}>{NavigationStore.whoProfile}</Text>) : (
							!NavigationStore.isSearch && <HeaderButton
								onPress={this.navigateTo.bind(this, Routes.Screens.MAIL.routeName)}
								color={Style.colors.icon}
								icon={iconNames.LETTER}
								size={Style.sizes.icon}
							/>)}

						{!NavigationStore.isSearch && (<HeaderButton
							onPress={() => NavigationStore.toggleDrawer()}
							color={Style.colors.icon}
							icon={iconNames.MENU}
							size={Style.sizes.icon}
						/>)}
						
					</View>
				</View>
			</View>

		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: Dimensions.get('window').width,
		backgroundColor: Style.colors.bar,
		height: Style.sizes.barHeight,
	},
	rightSide: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftSide: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	cash: {
		color: Style.colors.text,
		fontSize: 16,
		letterSpacing: 1,
		marginLeft: 3,
	},

	searchIconBox: {
		padding: 2,
		borderRadius: 999,
	},
	searchBox: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
		marginRight: 15
	},
	inputBox: {
		height: '80%',
		alignItems: 'flex-end',
		borderTopLeftRadius: 999,
		borderBottomLeftRadius: 999,
		backgroundColor: Style.colors.background,
		transform: [
			{translateX: 10},
		],
	},
	input: {
		width: '100%',
		height: '90%',
		borderTopLeftRadius: 999,
		borderBottomLeftRadius: 999,
		color: Style.colors.text,
		fontSize: 14,
		backgroundColor: Style.colors.background,
	},
	title: {
		color: Style.colors.text,
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 1
	}
});
