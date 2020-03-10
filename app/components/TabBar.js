import React, { Component } from 'react';
import Style from '../helpers/style/style';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native';
import Icon, {iconNames} from './Icon/Icon';
import Routes from '../Routes/Routes';

export default function TabBar(props) {

  function navigateTo(routeName, params) {
    props.navigation.navigate(routeName, params);
  }

    return (
      <View style={props.style}>
          <View style={{...props.style, width: '100%', marginBottom: (Platform.OS == 'ios') ? (20):(0)}}>

            <TouchableHighlight onPress={() => navigateTo(Routes.Navigators.HOME.routeName)} style={styles.tab}>
            {
              (props.navigation.state.routes[props.navigation.state.index].key==Routes.Navigators.HOME.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.HOME} color={props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.HOME} color={props.inactiveTintColor} />)
            }
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigateTo(Routes.Navigators.RECENT_ACTIONS.routeName)} style={styles.tab}>
            {
              (props.navigation.state.routes[props.navigation.state.index].key==Routes.Navigators.RECENT_ACTIONS.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.TIMER} color={props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.TIMER} color={props.inactiveTintColor} />)
            }
            </TouchableHighlight>
            <View style={styles.plusTabBox}>
              <LinearGradient style={{borderRadius: 999, borderWidth: 1, borderColor: 'black'}} colors={[Style.colors.lightMain, Style.colors.darkMain]}>
                {/*<TouchableHighlight onPress={() => navigateTo(routeNames.ADD)} style={styles.plusTab}>*/}
                <TouchableHighlight onPress={() => navigateTo(Routes.Navigators.ADD.routeName)} style={styles.plusTab}>
                  <Icon size={Style.sizes.icon+10} name={iconNames.CAMERA} color={props.inactiveTintColor} />
                </TouchableHighlight>
              </LinearGradient>
            </View>
            <TouchableHighlight onPress={() => navigateTo(Routes.Navigators.GRAPH.routeName)} style={styles.tab}>
            {
              (props.navigation.state.routes[props.navigation.state.index].key==Routes.Navigators.GRAPH.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.GRAPH} color={props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.GRAPH} color={props.inactiveTintColor} />)
            }
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => navigateTo(Routes.Navigators.PROFILE.routeName)}
              style={styles.tab}
            >
            {
              (props.navigation.state.routes[props.navigation.state.index].key==Routes.Navigators.PROFILE.routeName) ?
              (<Icon size={Style.sizes.icon} name={iconNames.AVATAR} color={props.activeTintColor} />) :
              (<Icon size={Style.sizes.icon} name={iconNames.AVATAR} color={props.inactiveTintColor} />)
            }
            </TouchableHighlight>
          </View>
      </View>
    );
}


const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 999
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
