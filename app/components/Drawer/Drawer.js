import React, {Component} from 'react';
// Componenta
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert, SafeAreaView} from 'react-native';
import { inject, observer } from "mobx-react";
import DrawerTab from './DrawerTab';
import DrawerHeader from './DrawerHeader';
import { iconNames } from '../Icon/Icon';
import Routes from '../../utils/Routes';

@inject ('NavigationStore', 'AuthStore')
export default class Drawer extends Component {

    render() {
        return (
            <SafeAreaView>
                <DrawerHeader user={this.props.AuthStore.getUserLogin} />
                <DrawerTab 
                    onPress={() => this.props.NavigationStore.navigate(Routes.Screens.EDIT_PROFILE.routeName)} 
                    title={'Edit Profile'} 
                    icon={iconNames.AVATAR}
                />
                <DrawerTab 
                    onPress={() => this.props.NavigationStore.navigate(Routes.Screens.POLICY.routeName)} 
                    title={'Privacy Policy'} 
                    icon={iconNames.LAW}
                />
                <DrawerTab 
                    onPress={() => this.props.NavigationStore.navigate(Routes.Screens.TERMS.routeName)} 
                    title={'Terms of Service'} 
                    icon={iconNames.DOC}
                />
                <DrawerTab 
                    onPress={() => this.props.AuthStore.logout()} 
                    title={'Logout'} 
                    icon={iconNames.LOGOUT}
                />
            </SafeAreaView>
        )
    }
}