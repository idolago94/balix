import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Dimensions } from 'react-native';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { inject } from 'mobx-react';
import { sizes, colors } from '../../utils/style';

@inject('NavigationStore')
export default class AddHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <TouchableHighlight style={{borderRadius: 999, padding: 5}} onPress={() => this.props.NavigationStore.goBack()}>
            <Icon style={{padding: 5}} name={iconNames.CLOSE} size={sizes.icon} color={colors.icon} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: sizes.barHeight,
    alignItems: 'center',
    width: Dimensions.get('window').width
  }
});
