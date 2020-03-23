import React, { Component } from 'react';
import Style from '../../../helpers/style/style';
// Components
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
import db from "../../../database/db";
import Icon, {iconNames} from "../../../components/Icon/Icon";
import { inject, observer } from 'mobx-react';
import ApiService from '../../../Services/Api';
import moment from 'moment';
import ProgressiveImage from '../../../components/ProgressiveImage/PreogressiveImage';

@inject('AuthStore', 'UsersStore', 'ActionsStore')
@observer
export default class Action extends Component {

    constructor(props) {
        super(props);
        this.state = {
            other_user_id: null
        }
    }

    async componentDidMount() {
        console.log('Action -> componentDidMount -> ', this.props.id); 
        const {ActionsStore, AuthStore, UsersStore, id} = this.props;
        let action = ActionsStore.getActionById(id);
        if(action.disactive_user_id) {
            if(action.disactive_user_id != AuthStore.getUserLogin._id) {
                let other_user = UsersStore.getUserById(action.disactive_user_id);
                if(!other_user) {
                    let userResponse = await ApiService.getUser(action.disactive_user_id);
                    UsersStore.setUsers([userResponse]);
                }
                this.setState({other_user_id: action.disactive_user_id});
            } else {
                let other_user = UsersStore.getUserById(action.active_user_id);
                if(!other_user) {
                    let userResponse = await ApiService.getUser(action.active_user_id);
                    UsersStore.setUsers([userResponse]);
                }
                this.setState({other_user_id: action.active_user_id});
            }
        }
    }

    renderActionContent() {
        const {ActionsStore, AuthStore, UsersStore, id} = this.props;
        const actionData = ActionsStore.getActionById(id);
        const otherUserData = UsersStore.getUserById(this.state.other_user_id);
        switch (actionData.type) {
            case 0:
                return (
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{...styles.action, fontWeight: (actionData.active_user_id == AuthStore.getUserLogin._id) ?
                                    ('') : ('bold')}}>
                                {
                                    (actionData.active_user_id == AuthStore.getUserLogin._id) ?
                                        ('You ') : (`${otherUserData.username} `)
                                }
                            </Text>
                            <Text style={styles.action}>sent </Text>
                            <Image style={{width: 15, height: 16}} source={actionData.emoji.url} />
                            <Text style={styles.action}> to </Text>
                            <Text style={{...styles.action, fontWeight: (actionData.disactive_user_id == AuthStore.getUserLogin._id) ?
                                    ('') : ('bold')}}>
                                {
                                    (actionData.disactive_user_id == AuthStore.getUserLogin._id) ?
                                        ('you') : (otherUserData.username)
                                }
                            </Text>
                            <Text style={styles.action}> in total {actionData.emoji.value}$.</Text>
                        </View>
                        {/* <ProfileSymbol
                            style={styles.otherUserProfile}
                            size={30}
                            src={(actionData.active_user_id == AuthStore.getUserLogin._id) ?
                                (otherUserData.profileImage):
                                (AuthStore.getUserLogin.profileImage)}
                        /> */}
                        <ProgressiveImage 
                            style={{width: 30, height: 30, borderRadius: 5}}
                            buffer_id={actionData.image_buffer_id}
                        />
                    </View>
                )
                break;
            case 1:
                if(actionData.active_user_id == AuthStore.getUserLogin._id) {
                    return (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.action}>{`You start follow ${otherUserData.username}.`}</Text>
                            <ProfileSymbol size={30} src={otherUserData.profileImage} style={styles.otherUserProfile} />
                        </View>
                    )
                }
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{...styles.action, fontWeight: 'bold'}}>{otherUserData.username}</Text>
                            <Text style={styles.action}> start follow you.</Text>
                        </View>
                    </View>
                )
                break;
            case 2:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.action}>You upload a new photo.</Text>
                        <ProgressiveImage 
                                style={{width: 30, height: 30, borderRadius: 5}}
                                buffer_id={actionData.image_buffer_id}
                        />
                    </View>
                );
                break;
            case 3:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{...styles.action, fontWeight: (actionData.active_user_id == AuthStore.getUserLogin._id) ?
                                ('') : (`bold`)}}>
                            {
                                (actionData.active_user_id == AuthStore.getUserLogin._id) ?
                                    ('You ') : (`${otherUserData.username} `)
                            }
                        </Text>
                        <Text style={styles.action}>sent </Text>
                        <Icon size={15} color={'red'} name={iconNames.FULL_HEART} />
                        <Text style={styles.action}> to </Text>
                        <Text style={{...styles.action, fontWeight: (actionData.disactive_user_id == AuthStore.getUserLogin._id) ?
                                ('') : ('bold')}}>
                            {
                                (actionData.disactive_user_id == AuthStore.getUserLogin._id) ?
                                    ('you') : (otherUserData.username)
                            }.
                        </Text>
                    </View>
                )
                break;
            case 4:
                return (<Text style={styles.action}>You made a deposit.</Text>)
                break;
            case 5:
                return (<Text style={styles.action}>You made a withdraw.</Text>)
                break;
            case 6:
                return (<Text style={styles.action}>You just sign up.</Text>)
            case 7:
                if(actionData.active_user_id == AuthStore.getUserLogin._id) {
                    return (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.action}>{`You stop follow ${this.state.otherUser.username}.`}</Text>
                            <ProfileSymbol size={30} src={otherUserData.profileImage} style={styles.otherUserProfile} />
                        </View>
                    )
                }
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{...styles.action, fontWeight: 'bold'}}>{this.state.otherUser.username}</Text>
                        <Text style={styles.action}>{` stop follow you.`}</Text>
                        <ProfileSymbol size={30} src={AuthStore.getUserLogin.profileImage} style={styles.otherUserProfile} />
                    </View>
                )
                break;
            case 11:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.action}>You update your profile image.</Text>
                        <ProfileSymbol size={30} src={AuthStore.getUserLogin.profileImage} style={styles.otherUserProfile} />                        
                    </View>
                )
            default: return null;
        }
    }

    dateFormat(date) {
        return moment(date).startOf().fromNow();
    }

    render() {
        console.log('Action => render');
        const {ActionsStore, AuthStore, UsersStore, id} = this.props;
        const actionData = ActionsStore.getActionById(id);
        const otherUserData = UsersStore.getUserById(this.state.other_user_id);
        if(actionData.disactive_user_id && !otherUserData) {
            return null;
        }
        return (
        <View style={styles.container}>
            <View style={styles.leftSide}>
                {
                    (actionData.active_user_id == AuthStore.getUserLogin._id) ?
                        (<ProfileSymbol src={AuthStore.getUserLogin.profileImage} size={40} style={{margin: 5}} />) :
                        (<ProfileSymbol src={otherUserData.profileImage} size={40} style={{margin: 5}} />)
                }
                <View style={styles.content}>
                    {this.renderActionContent()}
                </View>
            </View>
            <Text style={styles.actionDate}>{this.dateFormat(actionData.date)}</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        color: Style.colors.text,
        fontWeight: 'bold'
    },
    action: {
        fontSize: 16,
        color: Style.colors.text
    },
    otherUserProfile: {
        // marginLeft: 10
        // padding: 10,
    },
    actionDate: {
        color: 'gray',
        fontSize: 12,
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 2
    }
});
