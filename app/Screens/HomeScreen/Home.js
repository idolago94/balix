// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView} from 'react-native';
import Photo from '../../components/Photo/Photo';
import Header from '../../components/Header/Header';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
// Navigator
import AppNavigator from '../../Routes/AppNavigator';
import Routes from '../../Routes/Routes';

import imageService from '../../demoDB/Images/imageService';
import Style from '../../helpers/style/style';
import userService from '../../demoDB/Users/userService';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getUsers } from '../../store/users/usersActions';
import HomeEmpty from "./HomeEmpty";
import db from '../../database/db';

class Home extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerTitle: () => <Header {...navigation} />,
		};
	};

	constructor(props) {
		super(props);
		this.state = {
			contents: undefined,
		};
	}

	componentDidMount() {
		this.props.navigation.addListener('willFocus', () => {
			console.log('HomeScreen -> willFocus');
			this.props.getUsers(this.props.auth.userLogin.following)
		})
	}

	componentDidUpdate(prevProps) {
		console.log('HomeScreen -> componentDidUpdate');
		if(prevProps.users.fetching && this.props.users.fetched) {
			this.updateHomeScreenContents();
		}
	}

	updateHomeScreenContents() {
		console.log('HomeScreen -> updateHomeScreenContents');
		const {auth, users} = this.props;
		let contents_ids = [];
		users.users.map((user) => {
			contents_ids = contents_ids.concat(user.uploads);
		});
		fetch(`${db.url}/content/getContents?ids=${contents_ids.join(',')}`)
		.then(res => res.json()).then(contetnsResponse => {
			let contents = contetnsResponse.concat(auth.userLogin.uploads);
			contents.sort((a,b) => new Date(b.uploadDate) - new Date(a.uploadDate));
			console.log('HomeScreen -> contents new length', contents.length);
			this.setState({contents});
		})
	}

	onTitlePress(user) {
		this.props.navigation.navigate(Routes.Screens.PROFILE, {userData: user});
	}

	symbolPressed(index) {
		let user = this.props.users.users[index];
		if (user.live) {
			// connect to agora(live stream).
		} else if (user.story) {
			AppNavigator.getRef()._navigation.navigate(Routes.Screens.STORY.routeName, {
				userIndex: index
			});
		}
	}

	render() {
		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				{
					!this.state.contents ? (
						<View style={{flex: 1, backgroundColor: Style.colors.background}}>
							{/*loader*/}
						</View>
					) : (
						<FlatList
							style={styles.following}
							showsVerticalScrollIndicator={false}
							keyExtractor={(item, index) => index.toString()}
							ListEmptyComponent={() => <HomeEmpty/>}
							data={this.state.contents}
							renderItem={({item}) => (
								<Photo 
									smallView={true} 
									navigation={this.props.navigation} 
									titlePress={this.onTitlePress.bind(this)}
									data={item}
								/>
							)}
						/>
					)
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Style.colors.background,
	},
	storyContainer: {
		flexDirection: 'row',
		// backgroundColor: Style.colors.background,
		borderTopColor: 'white',
		borderTopWidth: 4,
		backgroundColor: Style.colors.bar
	},
	following: {
		backgroundColor: Style.colors.background
	}
});

const mapStateToProps = (state) => {
	return {
		auth: {...state.auth},
		users: {...state.users},
	};
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		getUsers,
	}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
