// Components
import React, {Component} from 'react';
import {View, KeyboardAvoidingView, Keyboard, FlatList} from 'react-native';
import { inject, observer } from "mobx-react";
import {content_height} from '../../utils/view';
import { colors } from '../../utils/style';
import CommentInput from '../../components/Photo/Comments/CommentInput';
import Message from './Message';
import ApiService from '../../Services/Api';
import RoomHeader from './RoomHeader';
import Routes from '../../utils/Routes';

@inject('AuthStore', 'NavigationStore', 'ChatStore')
@observer
export default class ChatRoomScreen extends Component {

	constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
		this.focusListener = null;
		this.keyboardShow = null;
        this.keyboardHide = null;
        this._chat = null;
        this.room_data = null;
    }
    
    messages = [
        {
            context: 'com1\ndfhdfhd',
            user_id: this.props.AuthStore.getUserLogin._id,
            room_id: '1234',
            date: new Date()
        },
        {
            context: 'com2',
            user_id: 'rg34t45yrt',
            room_id: '1234',
            date: new Date()
        },
        {
            context: 'com3',
            user_id: this.props.AuthStore.getUserLogin._id,
            room_id: '1234',
            date: new Date()
        },
        {
            context: 'com4',
            user_id: this.props.AuthStore.getUserLogin._id,
            room_id: '1234',
            date: new Date()
        },
    ]

	componentDidMount() {
		console.log('content_height', content_height);
		this.focusListener = this.props.navigation.addListener('willFocus', async() => {
			console.log('ChatRoomScreen -> willFocus');
            this.room_data = this.props.navigation.getParam('room');
            console.log('roomData', this.room_data);
            if(this.room_data) {
                let messages = await ApiService.getRoomMessages(this.room_data._id);
                messages.sort((a,b) => new Date(a.date) - new Date(b.date));
                this.setState({messages});
            }
		});
		this.keyboardShow = Keyboard.addListener('keyboardDidShow', () => {

		});
		this.keyboardHide = Keyboard.addListener('keyboardDidHide', () => {

		});
	}

	componentWillUnMount() {
		this.focusListener.remove();
		this.keyboardShow.remove();
		this.keyboardHide.remove();
    }
    
    async sendMessage(msg) {
        console.log('send message', msg);
        let receive_user = this.props.navigation.getParam('user');
        let message_data = {
            room_id: this.room_data._id,
            user_id: this.props.AuthStore.getUserLogin._id,
            receive_user: receive_user[0]._id,
            context: msg,
            date: new Date()
        }
        this.props.ChatStore.getSocket.emit("send message", message_data);
        let messages = this.state.messages;
        messages.push(message_data);
        this.setState({messages});
    }


	render() {
        const { AuthStore, NavigationStore, navigation } = this.props
        const users = navigation.getParam('user');
		return (
			<View style={{flex: 1, backgroundColor: colors.background}}>
                <RoomHeader 
                    users={users}
                    onBack={() => NavigationStore.goBack()}
                    onDetails={() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: user._id})}
                />
                <View style={{flexGrow: 1}}>
                    <FlatList
                        ref={(ref) => this._chat = ref}
                        style={{flex: 1}}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						data={this.state.messages}
						renderItem={({item, index}) => (
                            <Message 
                                side={AuthStore.getUserLogin._id == item.user_id ? 'right':'left'} 
                                msg={item.context} 
                                date={item.date}
                            />
						)}
					/>
                </View>
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={40}>
                    <View style={{backgroundColor: 'gray'}}>
                        <CommentInput style={{padding: 10}} onSend={(msg) => this.sendMessage(msg)} />
                    </View>
                </KeyboardAvoidingView>
			</View>
		);
	}
}