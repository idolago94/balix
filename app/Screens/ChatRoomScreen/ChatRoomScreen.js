// Components
import React, {Component} from 'react';
import {View, KeyboardAvoidingView, Keyboard, FlatList} from 'react-native';
import { inject, observer } from "mobx-react";
import {content_height} from '../../utils/view';
import { colors } from '../../utils/style';
import CommentInput from '../../components/Photo/Comments/CommentInput';
import Message from './Message';
import ApiService from '../../Services/Api';

@inject('AuthStore')
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
                messages.sort((a,b) => new Date(b.date) - new Date(a.date));
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
        let receiveUser = this.props.navigation.getParam('user');
        let msgResponse = await ApiService.sendMessage(this.room_data ? this.room_data._id:'', msg, receiveUser);
        let messages = this.state.messages;
        messages.push(msgResponse);
        this.setState({messages});
    }


	render() {
		return (
			<View style={{flex: 1, backgroundColor: colors.background}}>
                <View style={{flexGrow: 1}}>
                    <FlatList
						ref={(ref) => this._chat = ref}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						data={this.state.messages}
						renderItem={({item, index}) => (
                            <Message 
                                side={this.props.AuthStore.getUserLogin._id == item.user_id ? 'right':'left'} 
                                msg={item.context} 
                            />
						)}
					/>
                </View>
                <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={50}>
                    <View style={{paddingBottom: 40, backgroundColor: 'gray'}}>
                        <CommentInput style={{padding: 10}} onSend={(msg) => this.sendMessage(msg)} />
                    </View>
                </KeyboardAvoidingView>
			</View>
		);
	}
}