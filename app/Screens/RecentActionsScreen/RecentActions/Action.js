import React, { Component } from 'react';
import Style from '../../../helpers/style/style';
// Components
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
import db from "../../../database/db";
import Icon, {iconNames} from "../../../components/Icon/Icon";
import { inject, observer } from 'mobx-react/native';

@inject('AuthStore', 'UsersStore')
export default class Action extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otherUser: undefined,
            ready: false
        }
    }

    async componentDidMount() {
        let action = this.props.data;
        if(action.disactive_user_id) {
            let otherUser_id;
            if(action.active_user_id == this.props.AuthStore.getUserLogin._id) {
                otherUser_id = action.disactive_user_id;
            } else otherUser_id = action.active_user_id;
            let otherUser = await this.props.UsersStore.getUsers.find(user => user._id==otherUser_id);
            if(!otherUser) {
                await fetch(`${db.url}/users/getSingleUser?id=${otherUser_id}`)
                    .then(res => res.json()).then(user => {
                    otherUser = user;
                });
            }
            this.setState({ otherUser: otherUser, ready: true });
        } else this.setState({ otherUser: null, ready: true });
    }

    renderActionContent() {
        const {AuthStore, data} = this.props;
        switch (this.props.data.type) {
            case 0:
                return (
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{...styles.action, fontWeight: (data.active_user_id == AuthStore.getUserLogin._id) ?
                                    ('') : ('bold')}}>
                                {
                                    (data.active_user_id == AuthStore.getUserLogin._id) ?
                                        ('You ') : (`${this.state.otherUser.username} `)
                                }
                            </Text>
                            <Text style={styles.action}>sent </Text>
                            <Image style={{width: 15, height: 16}} source={data.emoji.url} />
                            <Text style={styles.action}> to </Text>
                            <Text style={{...styles.action, fontWeight: (data.disactive_user_id == AuthStore.getUserLogin._id) ?
                                    ('') : ('bold')}}>
                                {
                                    (data.disactive_user_id == AuthStore.getUserLogin._id) ?
                                        ('you') : (this.state.otherUser.username)
                                }
                            </Text>
                            <Text style={styles.action}> in total {data.emoji.value}$.</Text>
                        </View>
                        <ProfileSymbol
                            style={styles.otherUserProfile}
                            size={30}
                            src={(data.active_user_id == AuthStore.getUserLogin._id) ?
                                (this.state.otherUser.profileImage):
                                (AuthStore.getUserLogin.profileImage)}
                        />
                    </View>
                )
                break;
            case 1:
                if(data.active_user_id == AuthStore.getUserLogin._id) {
                    return (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.action}>{`You start follow ${this.state.otherUser.username}.`}</Text>
                            <ProfileSymbol size={30} src={this.state.otherUser.profileImage} style={styles.otherUserProfile} />
                        </View>
                    )
                }
                return (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{...styles.action, fontWeight: 'bold'}}>{this.state.otherUser.username}</Text>
                            <Text style={styles.action}> start follow you.</Text>
                        </View>
                        <ProfileSymbol size={30} src={AuthStore.getUserLogin.profileImage} style={styles.otherUserProfile} />
                    </View>
                )
                break;
            case 2:
                return (<Text style={styles.action}>You upload a new photo.</Text>);
                break;
            case 3:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{...styles.action, fontWeight: (data.active_user_id == AuthStore.getUserLogin._id) ?
                                ('') : (`bold`)}}>
                            {
                                (data.active_user_id == AuthStore.getUserLogin._id) ?
                                    ('You ') : (`${this.state.otherUser.username} `)
                            }
                        </Text>
                        <Text style={styles.action}>sent </Text>
                        <Icon size={15} color={'red'} name={iconNames.FULL_HEART} />
                        <Text style={styles.action}> to </Text>
                        <Text style={{...styles.action, fontWeight: (data.disactive_user_id == AuthStore.getUserLogin._id) ?
                                ('') : ('bold')}}>
                            {
                                (data.disactive_user_id == AuthStore.getUserLogin._id) ?
                                    ('you') : (this.state.otherUser.username)
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
                if(data.active_user_id == AuthStore.getUserLogin._id) {
                    return (
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.action}>{`You stop follow ${this.state.otherUser.username}.`}</Text>
                            <ProfileSymbol size={30} src={this.state.otherUser.profileImage} style={styles.otherUserProfile} />
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
            default: return null;
        }
    }

  render() {
    if(!this.state.ready) {
        return (<View></View>)
    }
    return (
      <View style={styles.container}>
          <View style={styles.leftSide}>
              {
                  (this.props.data.active_user_id == this.props.AuthStore.getUserLogin._id) ?
                      (<ProfileSymbol src={this.props.AuthStore.getUserLogin.profileImage} size={40} style={{margin: 5}} />) :
                      (<ProfileSymbol src={this.state.otherUser.profileImage} size={40} style={{margin: 5}} />)
              }
              <View style={styles.content}>
                  {this.renderActionContent()}

              </View>
          </View>
          {/*right side profile symbol/picture*/}
        <Text style={styles.actionDate}>{this.props.data.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginLeft: 10
    },
    actionDate: {
        color: 'gray',
        fontSize: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 2
    }
});
