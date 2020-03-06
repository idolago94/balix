import React, { Component } from 'react';
import Style from '../../../helpers/style/style';

// Components
import { StyleSheet, View, Dimensions, ScrollView, Text } from 'react-native';
import Header from '../../../components/Header/Header';
import GenderGraph from './GenderGraph';
import CashEarn from './CashEarn';
import FollowersGraph from './FollowersGraph';
import Connection from './Connection/Connection';
// Redux
import {bindActionCreators} from "redux";
import {getActions} from "../../../store/actions/actionsActions";
import {connect} from "react-redux";
import db from "../../../database/db";
import Icon, {iconNames} from "../../../components/Icon/Icon";

class Graph extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: () => <Header {...navigation} />
      };
  };

  constructor(props) {
    super(props);
    this.state = {
        mostVolunteers: []
    }
  }

  componentDidMount() {
      console.log('Graph', this.props.userLogin._id);
      this.props.navigation.addListener('didFocus', () => this.props.getActions(this.props.userLogin._id));
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
      if(prevProps.actions.fetching && this.props.actions.fetched) {
          this.getMostVolunteers();
      }
  }

  getMostVolunteers() {
      let getEmoji_actions = this.props.actions.actions.filter(act => (act.disactive_user_id == this.props.userLogin._id && act.type == 0));
      let volunteers_ids = [];
      let volunteers_amount = [];

      getEmoji_actions.map((act, i) => {
          let index = volunteers_ids.indexOf(act.active_user_id);
          if(act.emoji) { // for production

              if (index == -1) {
                  volunteers_ids.push(act.active_user_id);
                  volunteers_amount.push(act.emoji.value);
              } else {
                  volunteers_amount[index] = volunteers_amount[index] + act.emoji.value;
              }

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

    render() {
        if(!this.props.actions.fetched) {
            return (<View></View>)
        }
        return (
          <View style={{flex:1, backgroundColor: Style.colors.background}}>
            <ScrollView style={{backgroundColor: Style.colors.background}}>
              <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', width: Dimensions.get('window').width*0.4, padding: 10}}>
                    <Icon name={iconNames.EARN} size={30} color={Style.colors.text} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: Style.colors.text, fontSize: 18, paddingRight: 3}}>{(this.props.userLogin.cash_earned) ? (this.props.userLogin.cash_earned):(0)}</Text>
                        <Icon color={Style.colors.lightMain} size={18} name={iconNames.MONEY_BAG} />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: Style.colors.text, fontSize: 18, paddingRight: 3}}>{(this.props.userLogin.hearts_earned) ? (this.props.userLogin.hearts_earned):(0)}</Text>
                        <Icon color={Style.colors.heart} size={18} name={iconNames.HEART} />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <GenderGraph mostVolunteers={this.state.mostVolunteers} style={styles.box} width={Dimensions.get('window').width*0.45} height={80} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FollowersGraph userActions={this.props.actions.actions} style={styles.box} fill='rgba(255, 255, 255, 0.3)' width={Dimensions.get('window').width*0.48} height={80} />
                  <CashEarn userActions={this.props.actions.actions} style={styles.box} fill='rgba(255, 255, 255, 0.3)' width={Dimensions.get('window').width*0.48} height={80} />
                </View>
                <Connection mostVolunteers={this.state.mostVolunteers.slice(0, 16)} {...this.props.navigation} />
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

const mapStateToProps = (state) => {
    const userLogin = state.auth.userLogin;
    const actions = state.actions;
    return { actions, userLogin }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getActions
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
