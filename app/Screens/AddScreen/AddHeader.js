import React from 'react';
import { StyleSheet, View } from 'react-native';
import { iconNames } from '../../components/Icon/Icon';
import { colors } from '../../utils/style';
import { window_width } from '../../utils/view';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function AddHeader(props){
    return (
      <View style={styles.container}>
        <CustomButton 
          style={styles.btn}
          onPress={() => props.onClose()}
          icon={iconNames.CLOSE} 
        />
        <CustomButton
          style={[styles.btn, {borderColor: !props.flashMode ? colors.icon : colors.lightMain}]} 
          icon={iconNames.FLASH} 
          color={!props.flashMode ? colors.icon : colors.lightMain} 
          onPress={() => props.onFlash()} 
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: window_width,
    padding: 5
  },
  btn: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 999,
  }
});
