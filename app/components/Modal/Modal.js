import React, {Component, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { window_width, window_height } from '../../utils/view';
import Slider from '@react-native-community/slider';
import { colors } from '../../utils/style';
import SmallPhoto from '../../Screens/ProfileScreen/ProfileView/SmallPhoto';
import ModalButton from './ModalButton';
import { inject, observer } from "mobx-react";
import ApiService from '../../Services/Api';

@inject('AuthStore', 'NavigationStore', 'ContentsStore')
export default class Modal extends Component{
    // Props = {type: String, data}

    constructor(props) {
        super(props);
        this.state = {
            selected: []
        }
    }

    photoSelected(content_id) {
        console.log('Modal -> photoSelected', content_id);
        let newSelect = this.state.selected;
        if(newSelect.includes(content_id)) {
            newSelect = newSelect.filter(id => id != content_id);
            console.log('Modal -> photoSelected', newSelect);
        } else {
            newSelect.push(content_id);
        }
        console.log('Modal -> photoSelected', newSelect);
        this.setState({selected: newSelect})
    }

    async onDelete() {
        const {AuthStore} = this.props;
        let updateResponse = await ApiService.deleteContent(AuthStore.getUserLogin._id, this.state.selected, this.props.mode == 'secrets');
        if(updateResponse.length) {
            this.props.AuthStore.updateUserLogin({[this.props.mode == 'secrets' ? 'secrets':'uploads']: updateResponse});
            this.props.NavigationStore.setBanner(`You deleted ${this.state.selected.length} images.`, 'lightgreen');
            this.props.NavigationStore.setModal(null);
        }
    }

    renderModal() {
        switch (this.props.type) {
            case 'delete_content':
                return (
                    <View>
                        <Text style={{color: colors.text}}>You got your limit of uploads.{'\n'}You can buy extra photo to your profile or delete one of your photo.</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 5}}>
                            {this.props.content.map((c, i) => (
                            <SmallPhoto 
                                key={i} 
                                deleteMode={true} 
                                onPress={() => this.photoSelected(c.content_id)} 
                                isSelected={this.state.selected.includes(c.content_id)} 
                                data={c} 
                            />
                            ))}
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <ModalButton onPress={() => this.props.NavigationStore.setModal(null)} title={'Cancel'} color={'gray'} />
                            <ModalButton onPress={() => this.onDelete()} title={'Delete'} color={'red'} />
                        </View>
                    </View>
                )
        }
    }

    render() {
        return (
            <View style={[s.container]}>
                <View style={[s.modalBox]}>
                    {this.renderModal()}
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        width: window_width,
        height: window_height,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBox: {
        maxWidth: window_width*0.7,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8
    }
})

export const rangeModal = (title, confirmCallback, cancelCallback) => {
    return (
        <View style={{}}>
            <Text style={{margin: 10, color: colors.text, fontSize: 20, borderBottomwidth: 1, borderBottomColor: 'lightgray'}}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
                <Slider
                    style={{margin: 10, flexGrow: 1}}
                    minimumValue={1}
                    maximumValue={200}
                    minimumTrackTintColor={colors.lightMain}
                    maximumTrackTintColor={colors.text}
                    value={value}
                />
                <Text style={{color: colors.lightMain, fontSize: 20}}>{value}</Text>
            </View>
        </View>
    )
}