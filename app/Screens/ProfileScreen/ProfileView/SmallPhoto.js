import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { inject, observer } from "mobx-react";
import ProgressiveImage from '../../../components/ProgressiveImage/PreogressiveImage';
import ApiService from '../../../Services/Api';
import SecretIndicator from './SecretIndicator';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import DeleteIndicator from './DeleteIndicator';

@inject('NavigationStore', 'ContentsStore', 'AuthStore')
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

    onPhotoPress() {
        const {AuthStore, ContentsStore, NavigationStore, data, secret, onPress, isMy, deleteMode} = this.props;
        if(deleteMode) {
            onPress();
        } else {
            const imageData = ContentsStore.getContentById(data.content_id);
            const isViewed = imageData.views.includes(AuthStore.getUserLogin._id);
            if(!secret || isViewed || isMy) {
                onPress({id: data.content_id, secret});
            } else {
                NavigationStore.showAlert(
                    `You want to pay ${imageData.entrance}USD to see this secret?`,
                    null,
                    () => this.openPhoto()
                );
            }
        }
    }

    async openPhoto() {
        const {AuthStore, ContentsStore, NavigationStore, data} = this.props;
        const imageData = ContentsStore.getContentById(data.content_id);
        let viewResponse = await ApiService.addSecretView(AuthStore.getUserLogin._id, imageData);
        if(viewResponse.error) {
            NavigationStore.setBanner(viewResponse.error);
        } else {
            ContentsStore.updateContent(data.content_id, viewResponse);
        }
    }

    render() {
        const {ContentsStore, AuthStore, data} = this.props;
        const imageData = ContentsStore.getContentById(data.content_id);
        if(!imageData) {
            return null;
        }
        const isViewed = imageData.views.includes(AuthStore.getUserLogin._id);
        console.log(this.props.isSelected);
        return (
            <TouchableOpacity
                style={[s.imageBox, this.props.style]}
                onPress={() => this.onPhotoPress()}
            >
                <ProgressiveImage 
                    style={s.photo}
                    url={imageData.url}
                    contentType={imageData.mimetype}
                    smallView={true}
                />
                {this.props.secret && !this.props.isMy && !isViewed && <BlurView 
                  style={[s.photo, {position: 'absolute', top: 0, left: 0}]}
                  blurAmount={3.5}
                  blurType="light"
                />}
                {this.props.secret && <SecretIndicator views={imageData.views.length} />}
                {this.props.isSelected && <DeleteIndicator />}
            </TouchableOpacity>
        )
    }
}

const s = StyleSheet.create({
    imageBox: {
        margin: 3,
        width: '31%',
        aspectRatio: 1,
        backgroundColor: 'rgba(210,210,210,0.5)',
        borderRadius: 10
    },
    photo: {
      height: '100%',
      width: '100%',
      borderRadius: 10
    }
});
