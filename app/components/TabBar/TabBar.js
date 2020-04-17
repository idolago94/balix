// import React, { Component, useState } from 'react';
// import { colors, sizes } from '../utils/style';
// import LinearGradient from 'react-native-linear-gradient';
// // Components
// import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native';
// import Icon, {iconNames} from './Icon/Icon';
// import Routes from '../Routes/Routes';
// import { inject, observer } from "mobx-react";
// import { window_width, window_height } from '../utils/view';
// import Svg, {Path} from 'react-native-svg';

// @inject('NavigationStore', 'AuthStore')
// @observer
// export default class TabBar extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {currentTab: Routes.Screens.HOME.routeName};
//   }

//   navigateTo(routeName, params) {
//     this.props.NavigationStore.navigate(routeName, params);
//   }

//   render() {
//     const {NavigationStore, AuthStore} = this.props;
//     return (
//       <LinearGradient colors={[colors.bar, 'black']} style={[this.props.style, styles.container]}>
//         <View style={[styles.curve, {alignItems: 'center', width: window_width, transform: [{translateY: window_height*0.38}]}]}>
//             <View style={{padding: 10, zIndex: 999}}>
//               <LinearGradient style={{borderRadius: 999, borderWidth: 1, borderColor: 'black'}} colors={[colors.lightMain, colors.darkMain]}>
//                   <TouchableHighlight onPress={() => this.navigateTo(Routes.Screens.CAMERA.routeName)} style={styles.plusTab}>
//                     <Icon size={sizes.icon+10} name={iconNames.CAMERA} color={this.props.inactiveTintColor} />
//                   </TouchableHighlight>
//               </LinearGradient>
//             </View>
//           <View style={{...this.props.style, width: window_width, marginBottom: (Platform.OS == 'ios') ? (20):(0), position: 'absolute', top: 35}}>

//             <TouchableHighlight 
//               onPress={() => this.navigateTo(Routes.Screens.HOME.routeName)} 
//               style={styles.tab}
//             >
//             {
//               (NavigationStore.getCurrentTab == Routes.Screens.HOME.routeName) ?
//               (<Icon size={sizes.icon} name={iconNames.HOME} color={this.props.activeTintColor} />) :
//               (<Icon size={sizes.icon} name={iconNames.HOME} color={this.props.inactiveTintColor} />)
//             }
//             </TouchableHighlight>
//             <TouchableHighlight 
//               onPress={() => this.navigateTo(Routes.Screens.TOP.routeName)} 
//               style={styles.tab}
//             >
//             {
//               (NavigationStore.getCurrentTab == Routes.Screens.TOP.routeName) ?
//               (<Icon size={sizes.icon} name={iconNames.TOP} color={this.props.activeTintColor} />) :
//               (<Icon size={sizes.icon} name={iconNames.TOP} color={this.props.inactiveTintColor} />)
//             }
//             </TouchableHighlight>
//             <View style={styles.plusTabBox}>
//             </View>
//             <TouchableHighlight 
//               onPress={() => this.navigateTo(Routes.Screens.GRAPH.routeName)} 
//               style={styles.tab}
//             >
//             {
//               (NavigationStore.getCurrentTab == Routes.Screens.GRAPH.routeName) ?
//               (<Icon size={sizes.icon} name={iconNames.GRAPH} color={this.props.activeTintColor} />) :
//               (<Icon size={sizes.icon} name={iconNames.GRAPH} color={this.props.inactiveTintColor} />)
//             }
//             </TouchableHighlight>
//             <TouchableHighlight
//               onPress={() => this.navigateTo(Routes.Screens.PROFILE.routeName, {id: AuthStore.getUserLogin._id})}
//               style={styles.tab}
//             >
//             {
//               (NavigationStore.getCurrentTab == Routes.Screens.PROFILE.routeName) ?
//               (<Icon size={sizes.icon} name={iconNames.AVATAR} color={this.props.activeTintColor} />) :
//               (<Icon size={sizes.icon} name={iconNames.AVATAR} color={this.props.inactiveTintColor} />)
//             }
//             </TouchableHighlight>
//           </View>
//         </View>
//       </LinearGradient>

//       // <Svg height={250}>
//       //   <Path 
//       //     // d={`M 700 200 L 500 200 C 450 100 150 100 120 200 L 0 200 L 0 700 L ${window_width-50} 700 L 700 200 `}
//       //     d={`M 800 200 L 0 200 L 0 70 L ${150} 70 C 0 250 160 -155 ${window_width-100} 70 L ${window_width} 70 L ${window_width} 200 `}
//       //     fill={'black'}
//       //   />
//       // </Svg>
//     );
//   }

// }


// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center'
//   },
//   tab: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//     flexGrow: 1
//   },
//   plusTabBox: {
//     borderRadius: 99,
//     // backgroundColor: colors.bar,
//     padding: 35,
//     aspectRatio: 1/1
//   },
//   plusTab: {
//     padding: 15,
//     borderRadius: 999
//   },
//   curve: {
//     borderRadius: window_width,
//     width: window_width * 2,
//     height: window_width * 2,
//     // backgroundColor: colors.bar
//   }
// });



import React, { Component, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { StyleSheet, View, TouchableHighlight, Platform } from 'react-native';
import Icon, {iconNames} from '../Icon/Icon';
import Routes from '../../utils/Routes';
import { inject, observer } from "mobx-react";
import { colors, sizes } from '../../utils/style';
import TabButton from './TabButton';
import CurveSvg from './CurveSvg';

@inject('NavigationStore', 'AuthStore')
@observer
export default class TabBar extends Component {

  constructor(props) {
    super(props);
    this.state = {currentTab: Routes.Screens.HOME.routeName};
  }

  navigateTo(routeName, params) {
    this.props.NavigationStore.navigate(routeName, params);
  }

  render() {
    const {NavigationStore, AuthStore} = this.props;
    return (
        <View>
          <CurveSvg />
          <View style={styles.container}>
            <TabButton 
              style={styles.tab}
              icon={iconNames.HOME} 
              isSelected={NavigationStore.getCurrentTab == Routes.Screens.HOME.routeName}
              onPress={() => this.navigateTo(Routes.Screens.HOME.routeName)} 
            />
            <TabButton 
              style={styles.tab}
              icon={iconNames.TOP} 
              isSelected={NavigationStore.getCurrentTab == Routes.Screens.TOP.routeName}
              onPress={() => this.navigateTo(Routes.Screens.TOP.routeName)} 
            />
            <View style={styles.plusTabBox}>
              <LinearGradient style={{borderRadius: 999, borderWidth: 1, borderColor: 'black'}} colors={[colors.lightMain, colors.darkMain]}>
                <TouchableHighlight onPress={() => this.navigateTo(Routes.Screens.CAMERA.routeName, {story_live: null})} style={styles.plusTab}>
                  <Icon size={sizes.icon+10} name={iconNames.CAMERA} color={colors.text} />
                </TouchableHighlight>
              </LinearGradient>
            </View>
            <TabButton 
              style={styles.tab}
              icon={iconNames.GRAPH} 
              isSelected={NavigationStore.getCurrentTab == Routes.Screens.GRAPH.routeName}
              onPress={() => this.navigateTo(Routes.Screens.GRAPH.routeName)}
            />
            <TabButton 
              style={styles.tab}
              icon={iconNames.AVATAR} 
              isSelected={NavigationStore.getCurrentTab == Routes.Screens.PROFILE.routeName}
              onPress={() => this.navigateTo(Routes.Screens.PROFILE.routeName, {id: AuthStore.getUserLogin._id})}
            />
          </View>
        </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: sizes.barHeight,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  plusTabBox: {
    transform: [
      {translateY: sizes.barHeight/2*-1}
    ],
    borderRadius: 99,
    padding: 10,
    aspectRatio: 1/1,
  },
  plusTab: {
    padding: 15,
    borderRadius: 999,
  }
});