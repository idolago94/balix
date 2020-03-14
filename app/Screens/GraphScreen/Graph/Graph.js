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
// Redux
import {bindActionCreators} from "redux";
import {getActions} from "../../../store/actions/actionsActions";
import {connect} from "react-redux";

import db from "../../../database/db";
import { inject, observer } from "mobx-react/native";

@inject('AuthStore', 'ActionsStore')
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
      this.focusListener = this.props.navigation.addListener('willFocus', () => this.getMostVolunteers());
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  getMostVolunteers() {
      let getEmoji_actions = this.props.ActionsStore.getActions.filter(act => 
        (act.disactive_user_id == this.props.AuthStore.getUserLogin._id && act.type == 0)
      );
      let volunteers_ids = [];
      let volunteers_amount = [];

      getEmoji_actions.map((act, i) => {
        let index = volunteers_ids.indexOf(act.active_user_id);
          if (index == -1) {
            volunteers_ids.push(act.active_user_id);
            volunteers_amount.push(act.emoji.value);
          } else {
            volunteers_amount[index] = volunteers_amount[index] + act.emoji.value;
          }
      });

      fetch(`${db.url}/users/getUsers?ids=${volunteers_ids.join(',')}`)
          .then(res => res.json()).then(response => {
            let volunteers = [];
            for (let i = 0; i < volunteers_ids.length; i++) {
                volunteers.push({
                    user: response.find(user => user._id == volunteers_ids[i]),
                    amount: volunteers_amount[i]
                });
            }
            volunteers = volunteers.sort((a, b) => b.amount - a.amount);
            this.setState({mostVolunteers: volunteers});
      });
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
      const {AuthStore, ActionsStore} = this.props;
        if(this.props.ActionsStore.getActions.length < 1) {
            return (<View style={{flex:1, backgroundColor: Style.colors.background}}></View>)
        }
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
                    data={this.state.gendersData} 
                    style={styles.box} 
                    width={Dimensions.get('window').width*0.45} 
                    height={80} 
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FollowersGraph 
                    userActions={ActionsStore.getActions} 
                    style={styles.box} 
                    fill='rgba(255, 255, 255, 0.3)' 
                    width={Dimensions.get('window').width*0.48} 
                    height={80} 
                  />
                  <CashEarn 
                    userActions={ActionsStore.getActions} 
                    style={styles.box} 
                    fill='rgba(255, 255, 255, 0.3)' 
                    width={Dimensions.get('window').width*0.48} 
                    height={80} 
                  />
                </View>
                <Connection 
                  mostVolunteers={this.state.mostVolunteers.slice(0, 16)} 
                  {...this.props.navigation} 
                />
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
