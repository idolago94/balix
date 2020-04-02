import React, { Component } from 'react';
// Components
import { StyleSheet, View, ScrollView, Text, TouchableHighlight } from 'react-native';
import Header from '../../../components/Header/Header';
import GenderGraph from './GenderGraph';
import CashEarn from './CashEarn';
import FollowersGraph from './FollowersGraph';
import Connection from './Connection/Connection';
import Icon, {iconNames} from "../../../components/Icon/Icon";
// Services
import UpdateService from '../../../Services/Updates';
import { inject, observer } from "mobx-react";
import { window_width } from '../../../utils/view';
import { colors } from '../../../utils/style';
import Routes from '../../../Routes/Routes';

@inject('AuthStore', 'ActionsStore', 'GraphStore', 'NavigationStore')
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
        {count: male_counter, color: colors.darkMain, label: 'Male'},
        {count: female_counter, color: "#993188", label: 'Female'}
      ]
    })
  }

    render() {
      const {AuthStore, ActionsStore, GraphStore, NavigationStore} = this.props;
      const box_height = 120;
      const box_width = window_width*0.48;
        return (
            <ScrollView style={{backgroundColor: colors.background}}>
              <View style={styles.container}>
                <View style={[styles.box, {flexDirection: 'row', justifyContent: 'space-around', width: window_width*0.98, alignItems: 'center'}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255, 255, 255, 0.85)', fontSize: 22, paddingRight: 3}}>{(AuthStore.getUserLogin.cash_earned) ? (AuthStore.getUserLogin.cash_earned):(0)}</Text>
                        <Icon color={'yellow'} size={35} name={iconNames.MONEY_BAG} />
                    </View>
                    <Text style={{color: colors.graph, fontSize: 20, letterSpacing: 3}}>{'<- Total ->'}</Text>
                    <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                        <Text style={{color: 'rgba(255, 255, 255, 0.85)', fontSize: 22, paddingLeft: 6}}>{(AuthStore.getUserLogin.hearts_earned) ? (AuthStore.getUserLogin.hearts_earned):(72)}</Text>
                        <Icon color={colors.heart} size={35} name={iconNames.HEART} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <GenderGraph 
                    data={GraphStore.getGendersData} 
                    style={styles.box} 
                    width={box_width} 
                    height={box_height} 
                    legendColor={colors.graph}
                  />
                  <TouchableHighlight onPress={() => NavigationStore.navigate(Routes.Screens.RECENT_ACTIONS.routeName)} style={[styles.box, {width: box_width, height: box_height}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center', flex: 1, paddingHorizontal: 15}}>
                      <Icon name={iconNames.TIMER} color={colors.text} size={60} />
                      <Text style={{color: colors.text, fontSize: 20, textAlign: 'center', flexGrow: 1, letterSpacing: 1}}>Recent {'\n'} Actions</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FollowersGraph 
                    // userActions={ActionsStore.getActions} 
                    style={styles.box} 
                    fill={colors.graph} 
                    width={box_width} 
                    height={box_height} 
                  />
                  <CashEarn 
                    // userActions={ActionsStore.getActions} 
                    style={styles.box} 
                    fill={colors.graph} 
                    width={box_width} 
                    height={box_height} 
                  />
                </View>
                <Connection data={GraphStore.get14MostVolunteers} />
              </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      paddingTop: 10
    },
    box: {
      borderWidth: 1,
      borderColor: colors.text,
      borderRadius: 10,
      backgroundColor: 'rgba(57, 57, 57, 0.35)',
      padding: 10,
      margin: 5,
    }
});
