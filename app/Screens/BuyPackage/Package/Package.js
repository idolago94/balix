import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import RadialGradient from 'react-native-radial-gradient';
import { inject, observer } from "mobx-react";
import ApiService from '../../../Services/Api';
import { colors } from '../../../utils/style';

@inject('AuthStore', 'NavigationStore')
export default class Package extends Component {

    async packagePress() {
        let recieveObj = {
            cash: this.props.data.cash,
            hearts: this.props.data.hearts
        };
        let buyResponse = await ApiService.buyPackage(this.props.AuthStore.getUserLogin._id, this.props.data.cost, recieveObj);
        this.props.AuthStore.updateUserLogin(buyResponse);
        let msg = (<Text style={{fontWeight: 'bold', color: 'black'}}>{`You parchased more ${recieveObj.cash}$ and ${recieveObj.hearts} hearts.`}</Text>);
        this.props.NavigationStore.setBanner(msg, 'lightgreen');
        console.log(`${buyResponse.cash}$`, buyResponse.hearts);
        this.props.NavigationStore.goBack();
    }

  render() {
    return (
        <TouchableHighlight onPress={this.packagePress.bind(this)}>
            <View style={{alignItems: 'center', marginVertical: 5}}>
                <LinearGradient
                    start={{x: 0.9, y: 1}} end={{x: 0.1, y: 1}}
                    colors={['transparent', colors.darkMain, 'transparent']}
                    style={styles.container}
                >
                    <Image style={{height: '70%', width: 90}} source={require('../../../assets/coins.png')} />
                    <View style={styles.values}>
                        <View style={styles.cashValue}>
                            <Icon name={iconNames.DOLLAR} size={21} color='white' />
                            <Text style={{color: 'yellow', fontSize: 25}}>{this.props.data.cash}</Text>
                            <Text style={{color: 'white', fontSize: 20}}>+</Text>
                        </View>
                        <View style={styles.heartValue}>
                            <Icon name={iconNames.HEART} size={21} color='white' />
                            <Text style={{color: 'yellow', fontSize: 25}}>{this.props.data.hearts}</Text>
                        </View>
                    </View>
                    <RadialGradient
                        colors={['white', 'transparent']}
                        style={{padding: 7}}
                    >
                        <LinearGradient colors={[colors.darkMain, colors.lightMain]} style={styles.cost}>
                            <Text style={{color: 'white', fontSize: 18}}>{this.props.data.cost}$</Text>
                        </LinearGradient>
                    </RadialGradient>
                </LinearGradient>
            </View>
        </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%',
        maxHeight: 60,
        borderColor: colors.lightMain,
        overflow: 'visible'
    },
    values: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cashValue: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heartValue: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cost: {
        padding: 11,
        borderRadius: 999,
        aspectRatio: 1,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
