import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import { inject, observer } from "mobx-react";
import { FlatList } from 'react-native-gesture-handler';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import style from '../../helpers/style/style';
import { sliceString } from '../../utils/view';
import Routes from '../../Routes/Routes';
import { backgroundColor } from '../../common/style';

@inject('UsersStore', 'NavigationStore', 'ContentsStore')
@observer
export default class ProfileIndicator extends Component {


    render() {
        const {UsersStore, NavigationStore, ContentsStore, data, inView} = this.props;
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        return (
            <View style={[this.props.style, {marginLeft: 7, alignItems: 'center', transform: [{translateY: inView ? (50):(0)}], opacity: inView ? (1):(0.5)}]}>
                <ProfileSymbol 
                    press={inView ? (() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: userData._id})):(() => this.props.onPress())}
                    style={{borderRadius: 999, marginTop: 2, borderWidth: 1, borderColor: inView ? ('white'):('transparent')}} 
                    src={userData.profileImage}
                    size={inView ? (83):(50)}
                />
                <Text style={{color: style.colors.text, fontSize: inView ? (16):(10)}}>{sliceString(userData.username, 12)}</Text>
            </View>
        );
    }
}