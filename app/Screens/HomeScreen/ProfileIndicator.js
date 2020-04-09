import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { inject, observer } from "mobx-react";
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import { sliceString } from '../../utils/view';
import Routes from '../../utils/Routes';
import { colors } from '../../utils/style';
import Animated from 'react-native-reanimated';

@inject('UsersStore', 'NavigationStore', 'ContentsStore')
@observer
export default class ProfileIndicator extends Component {


    render() {
        const {UsersStore, NavigationStore, ContentsStore, data, inView, style, isBack} = this.props;
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        return (
            <Animated.View style={[style, s.box, {transform: [{translateY: inView ? (50):(isBack ? (-25):(0))}], opacity: inView ? (1):(0.5)}]}>
                <ProfileSymbol 
                    press={inView ? (() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: userData._id})):(() => this.props.onPress())}
                    style={[s.profile, {borderColor: inView ? (colors.text):('transparent')}]} 
                    src={userData.profileImage}
                    size={inView ? (83):(isBack ? (20):(50))}
                />
                <Text style={{color: colors.text, fontSize: inView ? (16):(10)}}>{sliceString(userData.username, 12)}</Text>
            </Animated.View>
        );
    }
}

const s = {
    box: {
        marginLeft: 7, 
        alignItems: 'center'
    },
    profile : {
        borderRadius: 999, 
        marginTop: 2, 
        borderWidth: 1
    }
}