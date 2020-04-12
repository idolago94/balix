import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { inject, observer } from "mobx-react";
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import { sliceString } from '../../utils/view';
import Routes from '../../utils/Routes';
import { colors } from '../../utils/style';
import Animated from 'react-native-reanimated';
import ApiService from '../../Services/Api';
import { iconNames } from '../../components/Icon/Icon';

@inject('UsersStore', 'NavigationStore', 'ContentsStore', 'AuthStore')
@observer
export default class ProfileIndicator extends Component {

    async componentDidMount() {
        const {UsersStore, ContentsStore, data} = this.props;        
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        if(!userData) {
            let user = await ApiService.getUser(contentData.user_id);
            UsersStore.setUsers([user]);
        }
    }

    render() {
        const {AuthStore, UsersStore, NavigationStore, ContentsStore, data, inView, isBack} = this.props;
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        return (
            <Animated.View style={[s.box, {transform: [{translateY: inView ? (50):(isBack ? (-25):(0))}], opacity: inView ? (1):(0.5)}]}>
                {userData && <View>
                    <ProfileSymbol 
                        press={inView ? (() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: userData._id})):(() => this.props.onPress())}
                        src={userData.profileImage}
                        size={inView ? (83):(isBack ? (20):(50))}
                        style={[s.profile, {borderColor: inView ? (colors.text):('transparent')}]} 
                        icon={!AuthStore.isFollow(userData._id) && AuthStore.getUserLogin._id != userData._id ? (iconNames.PLUS):(null)}
                        iconStyle={{backgroundColor: colors.darkMain}}
                        iconSize={inView ? (10):(7)}
                        />
                    <Text style={{color: colors.text, fontSize: inView ? (16):(10)}}>{sliceString(userData.username, 12)}</Text>
                </View>}
            </Animated.View>
        );
    }
}

const s = {
    box: {
        marginLeft: 7, 
        alignItems: 'center',
    },
    profile : {
        borderRadius: 999, 
        borderWidth: 1,
    }
}