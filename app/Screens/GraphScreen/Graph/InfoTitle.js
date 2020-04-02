import React from 'react';
import { Text, View } from 'react-native';

export default function InfoTitle(props) {
  return (
    <View style={[props.style, {alignItems: 'center', width: '95%'}]}>
      <View style={{position: 'relative', flexDirection: 'row', marginBottom: 5}}>
          <View style={{flexGrow: 1, height: '60%', borderColor: 'lightgray', borderBottomWidth: 1, borderStyle: 'dashed'}}></View>
          <Text style={{  color: 'lightgray', fontSize: 10, paddingLeft: 5, paddingRight: 5}}>{props.title}</Text>
      </View>
    </View>
  );
}
