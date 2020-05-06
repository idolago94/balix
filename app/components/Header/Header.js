// Components
import React, {Component} from 'react';
import {StyleSheet, View, Animated, Dimensions, Text} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import CashIndicator from './CashIndicator/CashIndicator';
// Navigator
import Routes from '../../utils/Routes';

import { inject, observer } from "mobx-react";
import HeaderButton from './HeaderButton/HeaderButton';
import SearchInput from './SearchInput/SearchInput';
import BackButton from './BackButton/BackButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors, sizes } from '../../utils/style';
import { window_width } from '../../utils/view';

@inject('AuthStore', 'NavigationStore', 'ChatStore')
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

	goBack() {
		const {NavigationStore, navigation} = this.props;
		if(NavigationStore.getCurrentScreen == Routes.Screens.PHOTO.routeName) {
			let id = navigation.state.routes[navigation.state.index].params.user_id;
			NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id});
		} else NavigationStore.goBack();
	}

	render() {
		const {AuthStore, NavigationStore, ChatStore} = this.props;
		let newMessages = ChatStore.hasNewMessages;
		console.log('newMessages', newMessages)
		return (
			<LinearGradient colors={[colors.notch, colors.bar]}>
				<View>
					<View style={styles.header}>
						<View style={styles.leftSide}>
							{(NavigationStore.isBack && !NavigationStore.isMyProfile) && <BackButton onPress={() => this.goBack()} color={colors.icon} size={sizes.icon}/>}
							{NavigationStore.isCashIndicator && (
								<Animated.View style={{...styles.leftSide, opacity: this.indicatorOpacity, maxWidth: this.indicatorWidth, maxHeight: this.indicatorWidth}}>
									<CashIndicator
										onPress={() => NavigationStore.toggleCashButtons()}
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
										color={colors.icon}
										icon={iconNames.SEARCH}
										size={sizes.icon}
									/>
									)}
							</View>

							{(!NavigationStore.isHeaderButton && !NavigationStore.isSearch) ? (<Text style={styles.title}>{NavigationStore.whoProfile}</Text>) : (
								!NavigationStore.isSearch && <HeaderButton
								onPress={this.navigateTo.bind(this, Routes.Screens.MAIL.routeName)}
								color={colors.icon}
								icon={iconNames.LETTER}
								size={sizes.icon}
								badge={newMessages}
							/>)}

							{!NavigationStore.isSearch && (<HeaderButton
								onPress={() => NavigationStore.toggleDrawer()}
								color={colors.icon}
								icon={iconNames.MENU}
								size={sizes.icon}
							/>)}
							
						</View>
					</View>
				</View>
			</LinearGradient>

		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: window_width,
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
		color: colors.text,
		fontSize: 16,
		letterSpacing: 1,
		marginLeft: 3,
	},
	title: {
		color: colors.text,
		fontWeight: 'bold',
		fontSize: 16,
		letterSpacing: 1
	}
});
