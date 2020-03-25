import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import { inject, observer } from "mobx-react";
import { FlatList } from 'react-native-gesture-handler';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';

@inject('UsersStore', 'NavigationStore', 'ContentsStore')
@observer
export default class ProfileIndicator extends Component {


    render() {
        const {UsersStore, NavigationStore, ContentsStore, data, inView} = this.props;
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        return (
            <ProfileSymbol 
                style={{borderRadius: 999, margin: 5}} 
                src={userData.profileImage}
                size={inView ? (80):(60)}
            />
        );
    }
}