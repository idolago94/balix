import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Text } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Routes from "../../Routes/Routes";
import { inject, observer } from "mobx-react";
import UploadService from '../../Services/Upload';
import ApiService from '../../Services/Api';
import { content_width, content_height } from '../../utils/view';
import UpdateService from '../../Services/Updates';
import IconButton from '../../components/IconButton/IconButton';

@inject('AuthStore', 'NavigationStore', 'ContentsStore', 'LoaderStore')
export default class PreviewPhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
        style: {
          backgroundColor: Style.colors.bar
        }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      imageData: undefined,
      storyMode: undefined,
      rotateDeg: 0
    }
    this.focusListener = null;
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'willFocus',
      this.getDataFromParams.bind(this)
    );
  }

  componentWillUnMount() {
    this.focusListener.remove();
  }

  getDataFromParams() {
    let image = this.props.navigation.getParam('imageData');
    this.setState({ imageData: image});
  }

  rotateImage() {
    this.setState({ rotateDeg: this.state.rotateDeg+90 })
  }

  async postImage() {
    console.log('PreviewPhoto -> postImage');
    const {AuthStore, NavigationStore} = this.props;
    NavigationStore.setProgress(true);
    NavigationStore.navigate(Routes.Screens.HOME.routeName);
    let upload = await UploadService.buildImageForUpload(this.state.imageData);
    let uploadResponse = await ApiService.upload(AuthStore.getUserLogin._id, upload); // the new upload object
    if(uploadResponse.error) {
      NavigationStore.setBanner(uploadResponse.error);
    } else {
      let myUploads = AuthStore.getUserLogin.uploads;
      myUploads.push({
        content_id: uploadResponse._id,
        uploadDate: uploadResponse.uploadDate,
        lastUpdate: uploadResponse.lastUpdate
      });
      AuthStore.updateUserLogin({uploads: myUploads});
      UpdateService.checkFollowingUpdates();
    }
  }

  render() {
    let buttonSize = 30;
    if(!this.state.imageData) {
      return (<View></View>)
    }
    return (
      <View style={{flex: 1, backgroundColor: Style.colors.background, paddingTop: (Platform.OS == 'ios') ? (40):(0)}}>
        <View style={{alignItems: 'flex-end'}}>
          <IconButton style={styles.btn} onPress={() => this.postImage()} icon={iconNames.CONFIRM} size={buttonSize} />
        </View>
        <View style={styles.container}>
          <Image
              style={{width: content_width, height: content_height, transform: [{ rotate: `${this.state.rotateDeg}deg` }]}}
              source={{uri: this.state.imageData.uri}}
          />
        </View>
        <View style={styles.buttons}>
          <IconButton style={styles.btn} onPress={() => this.postImage()} icon={iconNames.COLLAGE} size={buttonSize} />
          <IconButton style={styles.btn} onPress={() => console.log('ROTATE')} icon={iconNames.ROTATE} size={buttonSize} />
          <IconButton style={styles.btn} onPress={() => console.log('TEXT')} icon={iconNames.TEXT} size={buttonSize} />
          <IconButton style={styles.btn} onPress={() => console.log('DESIGN')} icon={iconNames.DESIGN} size={buttonSize} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  btn: {
    padding: 10
  }
});