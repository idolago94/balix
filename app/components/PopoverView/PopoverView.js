import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import TextButton from '../TextButton/TextButton';
import CustomButton from '../CustomButton/CustomButton';
import { iconNames } from '../Icon/Icon';
import { NavigationStore, AuthStore, AppStore } from '../../mobx';
import ApiService from '../../Services/Api';
import Routes from '../../utils/Routes';
import UpdateService from '../../Services/Updates';

export default PopoverView = (type, data) => {
    switch(type) {
        case 'inappropiate_options':
            return (<View>
                <Text style={{fontWeight: 'bold', fontSize: 16, padding: 5}}>Why this {data.type} is inappropiate?</Text>
                <ScrollView>
                    {AppStore.getInappropiateOptions.map((opt, i) => (
                        <TextButton key={i} onPress={() => sendReport(data, opt)} color='black' title={opt} />
                    ))}
                </ScrollView>
            </View>);
        case 'report':
            return (<View>
                <Text style={{fontWeight: 'bold', fontSize: 16, padding: 5}}>What is the reason for reporting this {data.type}?</Text>
                <TextButton onPress={() => sendReport(data, 'This is spam.')} color='black' title={`This is spam.`} />
                <TextButton onPress={ref => NavigationStore.setPopover(ref, PopoverView('inappropiate_options', data))} color='black' title={`This is inappropiate.`} />
            </View>);
        case 'content_more':
            return (<View>
                <CustomButton onPress={ref => NavigationStore.setPopover(ref, PopoverView('report', data))} icon={iconNames.ALERT} color={'black'} title={'Report'} />
                {data.item && AuthStore.getUserLogin._id == data.item.user_id && <CustomButton 
                    onPress={() => NavigationStore.showAlert('Delete image?', null, () => deleteContent(data.item._id))} 
                        icon={iconNames.TRASH} 
                        color={'black'} 
                    title={'Delete'} 
                />}
            </View>);
        case 'user_more':
            return (<View>
                <CustomButton onPress={ref => NavigationStore.setPopover(ref, PopoverView('report', data))} icon={iconNames.ALERT} color={'black'} title={'Report'} />
                {data.item && AuthStore.getUserLogin._id == data.item._id && <CustomButton 
                    onPress={() => NavigationStore.navigate(Routes.Screens.EDIT_PROFILE.routeName)} 
                        icon={iconNames.AVATAR} 
                        color={'black'} 
                    title={'Delete'} 
                />}
            </View>)
        default: return <Text>Popover not defined</Text>;
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

const sendReport = async(report, desc) => {
    let reportResponse = await ApiService.sendReport(report.type, report.item._id, desc);
    console.log(reportResponse);
    NavigationStore.setPopover(null)
}