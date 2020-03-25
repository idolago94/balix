import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../Icon/Icon';
import { withComma } from '../../common/numberMethods';
import ProfileSymbol from '../ProfileSymbol/ProfileSymbol';

export default function PhotoIndicator(props) {
  // Props = [ indicators: {cash: number, hearts: number} ]

    return (
      <View style={{position: 'absolute', alignItems: 'flex-start'}}>
        {/* <ProfileSymbol 
          style={{marginLeft: 10,marginTop: 10, borderWidth: 1, borderColor: 'black', borderRadius: 999}} 
          src={props.user.profileImage} 
          size={55}
          press={() => props.onSymbol()}
        /> */}
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
          <Icon color={Style.colors.text} name={iconNames.DOLLAR} size={22} />
          <Text style={{color: Style.colors.text}}>{withComma(props.cash)}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
          <Icon color={Style.colors.text} name={iconNames.FULL_HEART} size={22} />
          <Text style={{color: Style.colors.text}}>{withComma(props.hearts)}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -27,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    alignItems: 'center',
    padding: 3,
  },
  indicatorBox: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  iconBox: {
    paddingVertical: 3,
    borderRadius: 999
  },
  number: {
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 15
  },

});
