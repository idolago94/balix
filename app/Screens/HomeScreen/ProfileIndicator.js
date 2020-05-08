import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { inject, observer } from "mobx-react";
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import { sliceString } from '../../utils/view';
import Routes from '../../utils/Routes';
import { colors } from '../../utils/style';
import Animated from 'react-native-reanimated';
import ApiService from '../../Services/Api';
import { iconNames } from '../../components/Icon/Icon';
import IconButton from '../../components/IconButton/IconButton';
import CustomButton from '../../components/CustomButton/CustomButton';
import UpdateService from '../../Services/Updates';

@inject('UsersStore', 'NavigationStore', 'ContentsStore', 'AuthStore')
@observer
export default class ProfileIndicator extends Component {

    async componentDidMount() {
        const {UsersStore, ContentsStore, data} = this.props;        
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        if(!userData) {
            let user = await ApiService.getUser(contentData.user_id);
            UsersStore.setUsers([user]);
        }
    }

    async startFollow() {
        const {AuthStore, ContentsStore, data} = this.props;
        let contentData = ContentsStore.getContentById(data.content_id);
        let followResponse = await ApiService.startFollow(AuthStore.getUserLogin._id, contentData.user_id);
        (Array.isArray(followResponse)) && AuthStore.updateUserLogin({following: followResponse});
    }

    async onDelete() {
        const {AuthStore, NavigationStore, data} = this.props;
        NavigationStore.setPopover(null);
        let updateResponse = await ApiService.deleteContent(AuthStore.getUserLogin._id, [data.content_id]);
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

    onMore(viewRef) {
        const {AuthStore, NavigationStore, ContentsStore, data} = this.props;
        let contentData = ContentsStore.getContentById(data.content_id);
        let pop_view = (
            <View>
                <CustomButton icon={iconNames.ALERT} color={'black'} title={'Report'} />
                {contentData && AuthStore.getUserLogin._id == contentData.user_id && <CustomButton 
                    onPress={() => NavigationStore.showAlert('Delete image?', null, () => this.onDelete())} 
                    icon={iconNames.TRASH} 
                    color={'black'} 
                    title={'Delete'} 
                />}
            </View>
        )
        this.props.NavigationStore.setPopover(viewRef, pop_view);
    }

    render() {
        const {AuthStore, UsersStore, NavigationStore, ContentsStore, data, inView, isBack} = this.props;
        if(!data) {
            return null;
        }
        let contentData = ContentsStore.getContentById(data.content_id);
        let userData = UsersStore.getUserById(contentData.user_id);
        const isMy = userData && AuthStore.getUserLogin._id == userData._id;
        const isFollow = userData && AuthStore.isFollow(userData._id);
        return (
            <Animated.View style={[s.box, {transform: [{translateY: inView ? (37):(isBack ? (-25):(0))}], opacity: inView ? (1):(0.5)}]}>
                {userData && <View style={{alignItems: 'center'}}>
                    <ProfileSymbol 
                        press={() => inView ? NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: userData._id, secret: false}):this.props.onPress()}
                        src={userData.profileImage}
                        size={inView ? (83):(isBack ? (20):(50))}
                        style={[s.profile, {borderColor: inView ? (colors.text):('transparent')}]} 
                        icon={!isMy && !isFollow ? (iconNames.PLUS):(null)}
                        iconStyle={{backgroundColor: colors.darkMain}}
                        iconSize={inView ? (10):(7)}
                        iconPress={() => !isMy && !isFollow && this.startFollow() }
                    />
                    <Text style={{color: colors.text, fontSize: inView ? (16):(10)}}>{sliceString(userData.username, 12)}</Text>
                </View>}
                {inView && <IconButton 
                    style={{transform: [{rotate: '90deg'}], position: 'absolute', bottom: 10, right: -20}} 
                    onPress={ref => this.onMore(ref)} 
                    icon={iconNames.MORE} 
                    size={20} 
                />}
            </Animated.View>
        );
    }
}

const s = {
    box: {
        marginLeft: 7, 
        alignItems: 'center',
        borderRadius: 999,
        flexDirection: 'row'
    },
    profile : {
        borderRadius: 999, 
        borderWidth: 1,
    }
}