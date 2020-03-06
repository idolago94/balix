// Components
import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, TextInput, Animated, Dimensions} from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import CashIndicator from './CashIndicator/CashIndicator';
// Navigator
import Routes from '../../Routes/Routes';
// Helper
import Style from '../../helpers/style/style';
// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleSearch, clearSearch} from '../../store/search/searchActions';
import {toggleButtons} from '../../store/cashButtons/cashButtonsActions';

class Header extends Component {
	constructor(props) {
		super(props);

		this.openInputAnim = new Animated.Value(0);
		this.opacityInput = new Animated.Value(0);
		this.openIconBox = new Animated.Value(0);
		this.iconOpacity = new Animated.Value(1);
		this.iconWidth = new Animated.Value(70);
		this.indicatorOpacity = new Animated.Value(1);
		this.indicatorWidth = new Animated.Value(200);
	}

	componentDidMount() {
		if (this.props.state.routeName === Routes.Screens.SEARCH.routeName) {
			this.startInputAnimation();
		}
		if (this.props.state.routeName === Routes.Screens.PROFILE.routeName && this.props.getParam('userData') && this.props.getParam('userData').userId !== this.props.userLogin._id) {
			this.hideIndicator();
		}
	}

	hideIndicator() {
		Animated.parallel([
			Animated.timing(this.indicatorOpacity, {
				toValue: 0,
			})
		]).start();
	}

	startInputAnimation() {
		Animated.sequence([
			Animated.parallel([
				Animated.timing(this.iconOpacity, {
					toValue: 0,
				}),
				Animated.timing(this.iconWidth, {
					toValue: 0,
				}),
				Animated.timing(this.indicatorOpacity, {
					toValue: 0
				}),
				Animated.timing(this.indicatorWidth, {
					toValue: 0
				})
			]),
			Animated.parallel([
				Animated.timing(this.opacityInput, {
					toValue: 1,
				}),
				Animated.timing(this.openInputAnim, {
					toValue: 1,
				}),
				Animated.timing(this.openIconBox, {
					toValue: 1,
				})
			]),
		]).start();
	}

	toggleMenu() {
		this.props.changeMenuStatus();
	}

	navigateTo(routeName, params) {
		this.props.navigate(routeName, params);
	}

	handleSearch(text) {
		if(text.length >= 3) {
			this.props.handleSearch(text);
		}
		if(text.length < 3) {
			this.props.clearSearch();
		}
	}

	render() {
		const {toggleDrawer, userLogin} = this.props;
		return (
			<View style={styles.header}>
				<Animated.View style={{...styles.leftSide, opacity: this.indicatorOpacity, maxWidth: this.indicatorWidth, maxHeight: this.indicatorWidth}}>
					{
						(this.props.state.routeName === Routes.Screens.PROFILE.routeName && this.props.getParam('userData') && this.props.getParam('userData').userId === userLogin._id) ?
							null :
							<CashIndicator
								openTabs={this.props.toggleButtons.bind(this)}
								cash={userLogin.cash} hearts={userLogin.hearts}
							/>
					}
				</Animated.View>

				{/*{*/}
				{/*	(this.props.state.routeName === Routes.Screens.SEARCH.routeName) ? (null) :*/}
				{/*		(*/}
				{/*			<TouchableHighlight onPress={this.navigateTo.bind(this, Routes.Screens.CAMERA.routeName, {story_live: true})} style={{padding: 5, backgroundColor: Style.colors.bar, borderRadius: 999, aspectRatio: 1, transform: [{translateY: 8}]}}>*/}
				{/*				<View style={{borderRadius: 999, padding: 7, borderColor: 'white', borderWidth: 1}}*/}
				{/*					  // colors={[Style.colors.lightMain, Style.colors.darkMain]}*/}
				{/*				>*/}
				{/*					<Icon name={iconNames.CAMERA} color={Style.colors.text} size={20} />*/}
				{/*				</View>*/}
				{/*			</TouchableHighlight>*/}
				{/*		)*/}
				{/*}*/}

				<View style={styles.rightSide}>
					{
						(this.props.state.routeName === Routes.Screens.SEARCH.routeName) ?
							(
								<View style={styles.searchBox}>
									<Animated.View style={
										{
											...styles.inputBox,
											flexGrow: this.openInputAnim,
											paddingHorizontal: this.openInputAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [0, 10],
											}),
											opacity: this.opacityInput,
										}}>
										<TextInput autoFocus value={this.props.wordSearch}
												   onChangeText={(text) => this.handleSearch(text)}
												   style={styles.input}/>
									</Animated.View>
									<Animated.View style={{
										...styles.searchIconBox,
										backgroundColor: this.openIconBox.interpolate({
											inputRange: [0, 1],
											outputRange: ['rgba(125,125,125,0)', 'gray'],
										}),
									}}>
										<Icon color={Style.colors.icon} name={iconNames.SEARCH}
											  size={Style.sizes.icon} style={styles.icon}/>
									</Animated.View>
								</View>
							) :
							(
								<TouchableHighlight
									onPress={this.navigateTo.bind(this, Routes.Navigators.SEARCH.routeName)}>
									<Icon color={Style.colors.icon} name={iconNames.SEARCH} size={Style.sizes.icon}
										  style={styles.icon}/>
								</TouchableHighlight>
							)
					}
					<Animated.View style={{opacity: this.iconOpacity, maxWidth: this.iconWidth}}>
						<TouchableHighlight onPress={this.navigateTo.bind(this, Routes.Navigators.MAIL.routeName)}>
							<Icon color={Style.colors.icon} name={iconNames.LETTER} size={Style.sizes.icon}
								  style={styles.icon}/>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={{opacity: this.iconOpacity, maxWidth: this.iconWidth}}>
						<TouchableHighlight onPress={() => toggleDrawer()}>
							<Icon color={Style.colors.icon} name={iconNames.MENU} size={Style.sizes.icon}
								style={styles.icon}/>
						</TouchableHighlight>
					</Animated.View>
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
		// borderColor: 'blue',
		// borderWidth: 1,
	},
	leftSide: {
		marginLeft: 10,
		alignItems: 'center',
		flexDirection: 'row',
		// borderColor: 'red',
		// borderWidth: 1,
	},
	cash: {
		color: Style.colors.text,
		fontSize: 16,
		letterSpacing: 1,
		marginLeft: 3,
	},
	icon: {
		margin: 10,
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
});

const mapStateToProps = (state) => {
	return {
		userLogin: state.auth.userLogin,
		wordSearch: state.search.wordSearch,
	};
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		handleSearch,
		toggleButtons,
		clearSearch
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
