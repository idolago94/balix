import React, { Component } from 'react';
import Style from '../../../helpers/style/style';

// Components
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import Header from '../../../components/Header/Header';
import GenderGraph from './GenderGraph';
import CashEarn from './CashEarn';
import FollowersGraph from './FollowersGraph';
import Connection from './Connection/Connection';
import Icon, {iconNames} from "../../../components/Icon/Icon";
import db from "../../../database/db";
import { inject, observer } from "mobx-react";
import UpdateService from '../../../Services/Updates';

@inject('AuthStore', 'ActionsStore', 'GraphStore')
@observer
export default class Graph extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: () => <Header {...navigation} />
      };
  };

  constructor(props) {
    super(props);
    this.state = {
        mostVolunteers: [],
        gendersData: []
    }
    this.focusListener = null;
  }

  componentDidMount() {
      console.log('Graph', this.props.AuthStore.getUserLogin._id);
      this.focusListener = this.props.navigation.addListener('willFocus', () => UpdateService.updateActions());
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  genderCounter() {
    let male_counter = 0;
    let female_counter = 0;

    this.state.mostVolunteers.map(vol => {
      switch (vol.user.gender) {
        case 'male':
          male_counter++;
          break;
        case 'female':
          female_counter++;
          break;
        default: break;
      }
    });
    this.setState({
      gendersData: [
        {count: male_counter, color: Style.colors.darkMain, label: 'Male'},
        {count: female_counter, color: "#993188", label: 'Female'}
      ]
    })
  }

    render() {
      const {AuthStore, ActionsStore, GraphStore} = this.props;
        return (
          <View style={{flex:1, backgroundColor: Style.colors.background}}>
            <ScrollView style={{backgroundColor: Style.colors.background}}>
              <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: Dimensions.get('window').width*0.4, padding: 10}}>
                    <Icon name={iconNames.EARN} size={30} color={Style.colors.text} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: Style.colors.text, fontSize: 18, paddingRight: 3}}>{(AuthStore.getUserLogin.cash_earned) ? (AuthStore.getUserLogin.cash_earned):(0)}</Text>
                        <Icon color={Style.colors.lightMain} size={18} name={iconNames.MONEY_BAG} />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: Style.colors.text, fontSize: 18, paddingRight: 3}}>{(AuthStore.getUserLogin.hearts_earned) ? (AuthStore.getUserLogin.hearts_earned):(0)}</Text>
                        <Icon color={Style.colors.heart} size={18} name={iconNames.HEART} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <GenderGraph 
                    data={GraphStore.getGendersData} 
                    style={styles.box} 
                    width={Dimensions.get('window').width*0.45} 
                    height={80} 
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  {/* <FollowersGraph 
                    userActions={ActionsStore.getActions} 
                    style={styles.box} 
                    fill='rgba(255, 255, 255, 0.3)' 
                    width={Dimensions.get('window').width*0.48} 
                    height={80} 
                  /> */}
                  {/* <CashEarn 
                    userActions={ActionsStore.getActions} 
                    style={styles.box} 
                    fill='rgba(255, 255, 255, 0.3)' 
                    width={Dimensions.get('window').width*0.48} 
                    height={80} 
                  /> */}
                </View>
                <Connection data={GraphStore.get14MostVolunteers} />
              </View>
            </ScrollView>
          </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Style.colors.background,
      alignItems: 'center',
      paddingTop: 10
    },
    box: {
      marginBottom: 10
    }
});
