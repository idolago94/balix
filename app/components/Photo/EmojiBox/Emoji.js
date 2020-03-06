import React, { Component } from 'react';
// Components
import { StyleSheet, View, Image, Text } from 'react-native';
import Style from '../../../helpers/style/style';
import Icon, {iconNames} from '../../Icon/Icon';

export default class Emoji extends Component {
    // Props = [ data: {url: url, value: number} ]

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{alignItems: 'center', margin: 7}}>
                <Image
                    source={this.props.data.url}
                    style={{
                        height: this.props.size,
                        width: this.props.size
                    }}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{color: Style.colors.text, fontSize: 10}}>{this.props.data.value}</Text>
                    <Icon name={iconNames.DOLLAR} size={10} color={Style.colors.lightMain} />
                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
});
