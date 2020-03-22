import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Dimensions } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, { iconNames } from '../../components/Icon/Icon';
import Routes from "../../Routes/Routes";
import { inject } from 'mobx-react';

@inject('NavigationStore')
export default class AddHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftSide}>
          <TouchableHighlight style={{borderRadius: 999, padding: 5}} onPress={() => this.props.NavigationStore.goBack()}>
            <Icon style={{padding: 5}} name={iconNames.CLOSE} size={Style.sizes.icon} color={Style.colors.icon} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: Style.sizes.barHeight,
    alignItems: 'center',
    width: Dimensions.get('window').width
  }
});
