import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Animated, Text } from 'react-native';
import ProfileSymbol from '../../../../components/ProfileSymbol/ProfileSymbol';
import { inject, observer } from "mobx-react";
import Routes from '../../../../Routes/Routes';
import ApiService from '../../../../Services/Api';
import Icon, {iconNames} from '../../../../components/Icon/Icon';
import { colors } from '../../../../utils/style';
import { thousandsWithCommas } from '../../../../utils/Tools';

@inject('NavigationStore', 'UsersStore')
@observer
export default class Volunteer extends Component {

    async componentDidMount() {
        let userData = this.props.UsersStore.getUserById(this.props.user_id);
        if(!userData) {
            let userResponse = await ApiService.getUser(this.props.user_id);
            this.props.UsersStore.setUsers([userResponse]);
        }
    }

    render() {
        const {UsersStore, NavigationStore, user_id, style, size, amount} = this.props;
        const userData = UsersStore.getUserById(user_id);
        if(!userData) {
            return null;
        }
        return (
            <View style={style}>
                <ProfileSymbol
                    src={userData.profileImage}
                    size={size}
                    press={() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: user_id})}
                />
                <View style={s.cashBox}>
                    <Icon name={iconNames.DOLLAR} size={size/4} color={colors.darkMain}/>
                    <Text style={{...s.cash, fontSize: size/4}}>{thousandsWithCommas(amount)}</Text>
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    image: {
      borderRadius: 999,
      backgroundColor: 'gray'
    },
    cashBox: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    cash: {
      color: colors.text
    },
  });
  