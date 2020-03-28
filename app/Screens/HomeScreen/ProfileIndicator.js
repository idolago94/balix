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
            <View style={[this.props.style, {alignItems: 'center', transform: [{translateY: inView ? (50):(0)},{scale: inView ? (2):(1)}], opacity: inView ? (1):(0.5)}]}>
                <ProfileSymbol 
                    press={inView ? (() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: userData._id})):(() => this.props.onPress())}
                    style={{borderRadius: 999, marginHorizontal: 7, marginTop: 10, borderWidth: 1, borderColor: inView ? ('white'):('transparent')}} 
                    src={userData.profileImage}
                    size={40}
                />
                <Text style={{color: style.colors.text, fontSize: 10}}>{sliceString(userData.username, 12)}</Text>
            </View>
        );
    }
}