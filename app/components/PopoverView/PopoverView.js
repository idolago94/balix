import React, {Component} from 'react';
import {Text, View} from 'react-native';
import TextButton from '../TextButton/TextButton';
import CustomButton from '../CustomButton/CustomButton';
import { iconNames } from '../Icon/Icon';
import { NavigationStore, AuthStore } from '../../mobx';
import ApiService from '../../Services/Api';
import Routes from '../../utils/Routes';
import UpdateService from '../../Services/Updates';

export default PopoverView = (type, data) => {
    switch(type) {
        case 'content_more':
            let report_pop_view = (
                <View>
                    <Text style={{fontWeight: 'bold', fontSize: 16, padding: 5}}>What is the reason for reporting this post?</Text>
                    <TextButton onPress={() => {console.log('This content is a spam!');NavigationStore.setPopover(null)}} color='black' title={`This is spam.`} />
                    <TextButton onPress={() => {console.log('This content is inappropriate!');NavigationStore.setPopover(null)}} color='black' title={`This is inappropiate.`} />
                </View>
            )
            let pop_view = (
                <View>
                    <CustomButton onPress={ref => NavigationStore.setPopover(ref, report_pop_view)} icon={iconNames.ALERT} color={'black'} title={'Report'} />
                    {data.content && AuthStore.getUserLogin._id == data.content.user_id && <CustomButton 
                        onPress={() => NavigationStore.showAlert('Delete image?', null, () => deleteContent(data.content._id))} 
                        icon={iconNames.TRASH} 
                        color={'black'} 
                        title={'Delete'} 
                    />}
                </View>
            );
            return pop_view;
    }
} 

async function deleteContent(content_id) {
    NavigationStore.setPopover(null);
    let updateResponse = await ApiService.deleteContent(AuthStore.getUserLogin._id, [content_id]);
    if(updateResponse.length) {
        AuthStore.updateUserLogin({uploads: updateResponse});
        NavigationStore.setBanner(`You deleted one image.`, 'lightgreen');
        if(NavigationStore.getCurrentScreen == Routes.Screens.HOME.routeName) {
            UpdateService.checkFollowingUpdates();
        } else if(NavigationStore.getCurrentScreen == Routes.Screens.TOP.routeName) {
            UpdateService.updateTop();
        }
    }
}