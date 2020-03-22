import React, { Component, useState } from 'react';
import Style from '../helpers/style/style';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native';
import Icon, {iconNames} from './Icon/Icon';
import Routes from '../Routes/Routes';
import { inject, observer } from "mobx-react";

@inject('NavigationStore', 'AuthStore')
@observer
export default class TabBar extends Component {

  constructor(props) {
    super(props);
    this.state = {currentTab: Routes.Screens.HOME.routeName};
  }

  navigateTo(routeName, params) {
    this.props.NavigationStore.setCurrentTab(routeName);
    this.props.NavigationStore.navigate(routeName, params);
  }

  render() {
    const {NavigationStore, AuthStore} = this.props;
    return (
      <View style={this.props.style}>
          <View style={{...this.props.style, width: '100%', marginBottom: (Platform.OS == 'ios') ? (20):(0)}}>

            <TouchableHighlight 
              onPress={() => this.navigateTo(Routes.Screens.HOME.routeName)} 
              style={styles.tab}
            >
            {
              (NavigationStore.getCurrentTab == Routes.Screens.HOME.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.HOME} color={this.props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.HOME} color={this.props.inactiveTintColor} />)
            }
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => this.navigateTo(Routes.Screens.RECENT_ACTIONS.routeName)} 
              style={styles.tab}
            >
            {
              (NavigationStore.getCurrentTab == Routes.Screens.RECENT_ACTIONS.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.TIMER} color={this.props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.TIMER} color={this.props.inactiveTintColor} />)
            }
            </TouchableHighlight>
            <View style={styles.plusTabBox}>
              <LinearGradient style={{borderRadius: 999, borderWidth: 1, borderColor: 'black'}} colors={[Style.colors.lightMain, Style.colors.darkMain]}>
                <TouchableHighlight onPress={() => this.navigateTo(Routes.Screens.CAMERA.routeName)} style={styles.plusTab}>
                  <Icon size={Style.sizes.icon+10} name={iconNames.CAMERA} color={this.props.inactiveTintColor} />
                </TouchableHighlight>
              </LinearGradient>
            </View>
            <TouchableHighlight 
              onPress={() => this.navigateTo(Routes.Screens.GRAPH.routeName)} 
              style={styles.tab}
            >
            {
              (NavigationStore.getCurrentTab == Routes.Screens.GRAPH.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.GRAPH} color={this.props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.GRAPH} color={this.props.inactiveTintColor} />)
            }
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.navigateTo(Routes.Screens.PROFILE.routeName, {id: AuthStore.getUserLogin._id})}
              style={styles.tab}
            >
            {
              (NavigationStore.getCurrentTab == Routes.Screens.PROFILE.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.AVATAR} color={this.props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.AVATAR} color={this.props.inactiveTintColor} />)
            }
            </TouchableHighlight>
          </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    flexGrow: 1
  },
  plusTabBox: {
    transform: [
      {translateY: -20}
    ],
    borderRadius: 99,
    backgroundColor: Style.colors.bar,
    padding: 10,
    aspectRatio: 1/1
  },
  plusTab: {
    padding: 15,
    borderRadius: 999
  }
});
