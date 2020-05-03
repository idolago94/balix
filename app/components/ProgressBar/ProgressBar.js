import React, {Component} from 'react';
import {window_width} from '../../utils/view';
import {Bar} from 'react-native-progress';
import { colors } from '../../utils/style';

export default function ProgressBar(props) {
    return (
        <Bar 
            indeterminate 
            height={5} 
            width={window_width} 
            color={colors.darkMain} 
            unfilledColor={colors.background} 
            borderWidth={0}
        />
    )
}