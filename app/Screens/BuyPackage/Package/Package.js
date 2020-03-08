import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Style from '../../../helpers/style/style';
import Icon, { iconNames } from '../../../components/Icon/Icon';
import RadialGradient from 'react-native-radial-gradient';
import db from "../../../database/db";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { updateUserLogin } from "../../../store/auth/authActions";

class Package extends Component {

    packagePress() {
        let bodyRequest = {
            cost: this.props.data.cost,
            recieve: {
                cash: this.props.data.cash,
                hearts: this.props.data.hearts
            }
        };
        fetch(`${db.url}/users/buyPackage?id=${this.props.userLogin._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyRequest)
        }).then(res => res.json()).then(response => {
            this.props.updateUserLogin(response);
            Alert.alert(`You parchased more ${bodyRequest.recieve.cash}$ and ${bodyRequest.recieve.hearts} hearts.` );
            console.log(`${response.cash}$`, response.hearts);
        });
    }

  render() {
    return (
        <TouchableHighlight onPress={this.packagePress.bind(this)}>
            <LinearGradient
                start={{x: 0.9, y: 1}} end={{x: 0.1, y: 1}}
                colors={['transparent', Style.colors.darkMain, 'transparent']}
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
                    <LinearGradient colors={[Style.colors.darkMain, Style.colors.lightMain]} style={styles.cost}>
                        <Text style={{color: 'white', fontSize: 18}}>{this.props.data.cost}$</Text>
                    </LinearGradient>
                </RadialGradient>
            </LinearGradient>
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
        borderColor: Style.colors.lightMain,
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

const mapStateToProps = (state) => {
    return {
        userLogin: state.auth.userLogin
    }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateUserLogin
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Package);
