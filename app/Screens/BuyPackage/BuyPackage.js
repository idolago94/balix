import React, { Component } from 'react';
import {View, ScrollView, Image, TouchableHighlight, Platform, Dimensions} from 'react-native';
import Package from './Package/Package';
import Icon, { iconNames } from '../../components/Icon/Icon';
import {getAvailablePurchases, getProducts, initConnection} from "react-native-iap";
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';

@inject('AuthStore')
export default class BuyPackage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  }

  async componentDidMount() {
    let result = await initConnection();
    console.log('connection...', result)
    let products = await getProducts(['Queen_of_hearts', 'King_of_followers']);
    console.log('products...', products);
  }

  render() {
    return (
      <View style={{flex: 1, position: 'relative', backgroundColor: colors.background}}>
        {Platform.OS == 'ios' && <View style={{height: 30, backgroundColor: colors.background}}></View>}
        {/* {this.props.AuthStore.getUserLogin.profileImage && (
              <Image
                style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.1}}
                source={{uri: this.props.AuthStore.getUserLogin.profileImage}}
              />
        )} */}
        <View>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{padding: 15}}>
            <Icon name={iconNames.LEFT_CHEVRON} size={25} color={'white'} />
          </TouchableHighlight>
        </View>
        <ScrollView>
          <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
            {
              Packages.map((p, i) => (
                <Package data={p} key={i} />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const Packages = [
  { cash: 60, hearts: 40, cost: 100 },
  { cash: 50, hearts: 25, cost: 75 },
  { cash: 30, hearts: 20, cost: 50 },
  { cash: 17, hearts: 8, cost: 25 },
  { cash: 10, hearts: 6, cost: 16 },
  { cash: 5, hearts: 4, cost: 9 },
  { cash: 3, hearts: 2, cost: 5 }

];
