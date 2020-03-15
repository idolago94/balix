import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Platform, Text } from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../../components/Icon/Icon';
import Routes from "../../Routes/Routes";
import { inject, observer } from "mobx-react/native";
import UploadService from '../../Services/Upload';

@inject('AuthStore')
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
    const {AuthStore} = this.props;
    let requestBody = await UploadService.buildImageForUpload(this.state.imageData);
    fetch(`${db.url}/content/upload?id=${AuthStore.getUserLogin._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': '*'
      },
      body: JSON.stringify(requestBody)
    }).then(res => res.json()).then(response => {
      console.log('PreviewPhoto -> postImage -> response');
      this.onImagePosted(response);
    }).catch(err => {
      console.log('PreviewPhoto -> postImage -> error', err);
    });
  }

  onImagePosted(serverResponse) {
    console.log('PreviewPhoto -> onImagePosted');
    const {NavigationStore, AuthStore} = this.props;
    AuthStore.updateUserLogin({uploads: serverResponse});
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
          <TouchableHighlight onPress={this.postImage.bind(this)} style={styles.btn}>
            <Icon name={iconNames.CONFIRM} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <Image
              style={{width: '100%', height: '100%', transform: [{ rotate: `${this.state.rotateDeg}deg` }]}}
              source={{uri: this.state.imageData.uri}}
              // source={{uri: `data:${this.state.imageData.type};base64,${this.state.imageData.base64}`}}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.COLLAGE} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.rotateImage.bind(this)} style={styles.btn}>
            <Icon name={iconNames.ROTATE} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.TEXT} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
          <TouchableHighlight style={styles.btn}>
            <Icon name={iconNames.DESIGN} color={Style.colors.icon} size={buttonSize} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Style.sizes.barHeight+5,
    width: '100%',
    aspectRatio: 1
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