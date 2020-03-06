import React, { Component } from 'react';
import Style from '../../../helpers/style/style';
// Components
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import ProfileSymbol from '../../../components/ProfileSymbol/ProfileSymbol';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getActions} from "../../../store/actions/actionsActions";
import db from "../../../database/db";
import Icon, {iconNames} from "../../../components/Icon/Icon";
import {backgroundColor} from "../../../common/style";

class Action extends Component {

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
            if(action.active_user_id == this.props.userLogin._id) {
                otherUser_id = action.disactive_user_id;
            } else otherUser_id = action.active_user_id;
            let otherUser = await this.props.followingUsers.find(user => user._id==otherUser_id);
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
        switch (this.props.data.type) {
            case 0:
                return (
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{...styles.action, fontWeight: (this.props.data.active_user_id == this.props.userLogin._id) ?
                                    ('') : ('bold')}}>
                                {
                                    (this.props.data.active_user_id == this.props.userLogin._id) ?
                                        ('You ') : (`${this.state.otherUser.username} `)
                                }
                            </Text>
                            <Text style={styles.action}>sent </Text>
                            <Image style={{width: 15, height: 16}} source={this.props.data.emoji.url} />
                            <Text style={styles.action}> to </Text>
                            <Text style={{...styles.action, fontWeight: (this.props.data.disactive_user_id == this.props.userLogin._id) ?
                                    ('') : ('bold')}}>
                                {
                                    (this.props.data.disactive_user_id == this.props.userLogin._id) ?
                                        ('you') : (this.state.otherUser.username)
                                }
                            </Text>
                            <Text style={styles.action}> in total {this.props.data.emoji.value}$.</Text>
                        </View>
                        <ProfileSymbol
                            style={styles.otherUserProfile}
                            size={30}
                            src={(this.props.data.active_user_id == this.props.userLogin._id) ?
                                (this.state.otherUser.profileImage):
                                (this.props.userLogin.profileImage)}
                        />
                    </View>
                )
                break;
            case 1:
                if(this.props.data.active_user_id == this.props.userLogin._id) {
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
                        <ProfileSymbol size={30} src={this.props.userLogin.profileImage} style={styles.otherUserProfile} />
                    </View>
                )
                break;
            case 2:
                return (<Text style={styles.action}>You upload a new photo.</Text>);
                break;
            case 3:
                return (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={{...styles.action, fontWeight: (this.props.data.active_user_id == this.props.userLogin._id) ?
                                ('') : (`bold`)}}>
                            {
                                (this.props.data.active_user_id == this.props.userLogin._id) ?
                                    ('You ') : (`${this.state.otherUser.username} `)
                            }
                        </Text>
                        <Text style={styles.action}>sent </Text>
                        <Icon size={15} color={'red'} name={iconNames.FULL_HEART} />
                        <Text style={styles.action}> to </Text>
                        <Text style={{...styles.action, fontWeight: (this.props.data.disactive_user_id == this.props.userLogin._id) ?
                                ('') : ('bold')}}>
                            {
                                (this.props.data.disactive_user_id == this.props.userLogin._id) ?
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
                if(this.props.data.active_user_id == this.props.userLogin._id) {
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
                        <ProfileSymbol size={30} src={this.props.userLogin.profileImage} style={styles.otherUserProfile} />
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
                  (this.props.data.active_user_id == this.props.userLogin._id) ?
                      (<ProfileSymbol src={this.props.userLogin.profileImage} size={40} style={{margin: 5}} />) :
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

const mapStateToProps = (state) => {
    const userLogin = {...state.auth.userLogin};
    const followingUsers = state.users.users.slice()
    return { userLogin, followingUsers }
};

export default connect(mapStateToProps)(Action);
