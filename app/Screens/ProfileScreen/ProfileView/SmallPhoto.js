import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Routes from '../../../Routes/Routes';
import { inject, observer } from "mobx-react";
import ProgressiveImage from '../../../components/ProgressiveImage/PreogressiveImage';
import ApiService from '../../../Services/Api';

@inject('NavigationStore', 'ContentsStore')
@observer
export default class SmallPhoto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: null
        }
    }

    async componentDidMount() {
        const {ContentsStore, data} = this.props;
        const imageData = ContentsStore.getContentById(data.content_id);
        if(!imageData) {
            let contents = await ApiService.getSomeContents([data.content_id]);
            ContentsStore.setContents(contents);
        }
    }

    render() {
        const {ContentsStore, data} = this.props;
        const imageData = ContentsStore.getContentById(data.content_id);
        if(!imageData) {
            return null;
        }
        return (
            <TouchableOpacity
                style={styles.imageBox}
                onPress={() => this.props.onPress({id: this.props.data.content_id})}
            >
                <ProgressiveImage 
                    style={{width: '100%', height: '100%', borderRadius: 10}}
                    buffer_id={imageData.buffer_id}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    imageBox: {
        margin: 3,
        width: '31%',
        aspectRatio: 1
    },
    photo: {
      height: '100%',
      width: '100%',
      borderRadius: 10
    }
});
