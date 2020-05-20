import React, { Component } from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Package from './Package/Package';
import { iconNames } from '../../components/Icon/Icon';
import {getAvailablePurchases, getProducts, initConnection} from "react-native-iap";
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';
import CustomButton from '../../components/CustomButton/CustomButton';
import { FlatList } from 'react-native-gesture-handler';

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
      <View style={s.container}>
        {this.props.AuthStore.getUserLogin.profileImage && (
          <Image
            style={s.backgroundImage}
            source={{uri: this.props.AuthStore.getUserLogin.profileImage}}
          />
        )}
        <CustomButton 
          onPress={() => this.props.navigation.goBack()} 
          style={{padding: 15}}
          icon={iconNames.LEFT_CHEVRON} 
          size={25}
        />
        <FlatList
          data={Packages}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => <Package data={item} />}
        />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1, 
    position: 'relative', 
    backgroundColor: colors.background
  },
  backgroundImage: {
    height: '100%', 
    width: '100%', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    opacity: 0.17
  }
})

const Packages = [
  { cash: 60, hearts: 40, cost: 100 },
  { cash: 50, hearts: 25, cost: 75 },
  { cash: 30, hearts: 20, cost: 50 },
  { cash: 17, hearts: 8, cost: 25 },
  { cash: 10, hearts: 6, cost: 16 },
  { cash: 5, hearts: 4, cost: 9 },
  { cash: 3, hearts: 2, cost: 5 }

];
