import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Text } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Routes from "../../Routes/Routes";
import { inject, observer } from "mobx-react";
import UploadService from '../../Services/Upload';
import ApiService from '../../Services/Api';
import { content_width, content_height } from '../../utils/view';

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
    let upload = await UploadService.buildImageForUpload(this.state.imageData);
    let uploadResponse = await ApiService.upload(AuthStore.getUserLogin._id, upload); // the new upload object
    let myUploads = AuthStore.getUserLogin.uploads;
    myUploads.push({
      content_id: uploadResponse._id,
      uploadDate: uploadResponse.uploadDate,
      lastUpdate: uploadResponse.lastUpdate
    });
    AuthStore.updateUserLogin({uploads: myUploads});
    NavigationStore.navigate(Routes.Screens.HOME.routeName);
  }

  render() {
    let buttonSize = 30;
    if(!this.state.imageData) {
      return (<View></View>)
    }
    return (
      <View style={{flex: 1, backgroundColor: Style.colors.background, paddingTop: (Platform.OS == 'ios') ? (40):(0)}}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableHighlight onPress={() => this.postImage()} style={styles.btn}>
            <Icon name={iconNames.CONFIRM} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <Image
              style={{width: content_width, height: content_height, transform: [{ rotate: `${this.state.rotateDeg}deg` }]}}
              source={{uri: this.state.imageData.uri}}
          />
        </View>
        {/* <View style={styles.buttons}>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.COLLAGE} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.rotateImage()} style={styles.btn}>
            <Icon name={iconNames.ROTATE} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.TEXT} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.DESIGN} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Style.sizes.barHeight+5,
  },
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