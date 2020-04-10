import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import Icon, {iconNames} from '../../../components/Icon/Icon';
import SingleComment from '../../../components/Photo/Comments/SingleComment';
import EmojiBox from '../../../components/Photo/EmojiBox/EmojiBox';
import PhotoIndicator from '../../../components/Photo/PhotoIndicator';
import Routes from '../../../utils/Routes';
import { inject, observer } from "mobx-react";
import ApiService from '../../../Services/Api';
import Buttons from '../../../components/Photo/Buttons';
import DoubleClick from 'react-native-double-click';
import ProgressiveImage from '../../../components/ProgressiveImage/PreogressiveImage';
import { photo_box, content, emoji_popup_box, colors } from '../../../utils/style';
import { thousandsWithCommas } from '../../../utils/Tools';
import CommentsBox from '../../../components/Photo/Comments/CommentsBox';
import { window_height } from '../../../utils/view';

@inject('AuthStore', 'UsersStore', 'NavigationStore', 'ContentsStore')
@observer
export default class PhotoScreen extends Component {
  // Params = [ userImages, selectedImage, userData ] ||

  constructor(props) {
    super(props);
    this.state = {
      openEmoji: false,
      openComments: false,
      emojiSendPosition: {x: 0, y: 0},
      heartSendPosition: {x: 0, y:0},
      emojiSend: undefined,
      userImages: undefined,
    };
    this.emojiBoxSize = 25;
    this.moveEmoji = new Animated.Value(0);
    this.moveHeart = new Animated.Value(0);
    this.fadeEmoji = new Animated.Value(1);
    this.fadeHeart = new Animated.Value(1);
    this.sizeEmoji = new Animated.Value(0);
    this.sizeHeart = new Animated.Value(0);
    this.fadeSparkle = new Animated.Value(0);
    this.sparkleAnimation = [
      new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),
      new Animated.Value(0), new Animated.Value(0), new Animated.Value(0), new Animated.Value(0),
      new Animated.Value(0), new Animated.Value(0),
    ];
  }

  toggleEmoji() {
    this.setState((prevState) => {
      return {
        ...prevState,
        openEmoji: !prevState.openEmoji,
      };
    });
  }

  getPressPosition(event) {
    return{
      x: event.touchHistory.touchBank[1].currentPageX - 20,
      y: event.touchHistory.touchBank[1].currentPageY - 150,
    };
  }

  emojiPress(emoji, event) {
    if(emoji.value > this.props.AuthStore.getUserLogin.cash) {
      this.props.NavigationStore.showAlert(
        `You don't have enough money!`,
        'Go to buy more cash and hearts.',
        () => this.props.NavigationStore.navigate(Routes.Screens.BUY_PACKAGE.routeName)
      );
    } else {
      let position = {
        x: event.touchHistory.touchBank[1].currentPageX - 20,
        y: event.touchHistory.touchBank[1].currentPageY - 100,
      };
      this.setState({
        openEmoji: false,
        emojiSendPosition: position,
        emojiSend: emoji.url,
      });
      this.startEmojiAnimation(emoji);
    }
  }

  heartPress(event) {
    if(1 > this.props.AuthStore.getUserLogin.hearts) {
      this.props.NavigationStore.showAlert(
        `You don't have hearts!`,
        'Go to buy more cash and hearts.',
        () => this.props.NavigationStore.navigate(Routes.Screens.BUY_PACKAGE.routeName)
      )
    } else {
      let position = this.getPressPosition(event);
      this.setState({
        openEmoji: false,
        heartSendPosition: position
      });
      this.startHeartAnimation()
    }

  }

  startEmojiAnimation(emoji) {
    this.sparkleAnimation.map((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 1500,
        delay: 100 * i + 600,
      }).start(() => {
        anim.setValue(0);
      });
    });
    Animated.sequence([
      Animated.timing(this.sizeEmoji, {
        toValue: this.emojiBoxSize + 18,
      }),
      Animated.parallel([
        Animated.timing(this.moveEmoji, {
          duration: 1500,
          toValue: 1,
        }),
        Animated.timing(this.sizeEmoji, {
          duration: 2000,
          toValue: this.emojiBoxSize,
        }),
      ]),
      Animated.timing(this.fadeEmoji, {
        toValue: 0,
      }),
    ]).start(() => {
      this.fadeEmoji.setValue(1);
      this.moveEmoji.setValue(0);
      this.sizeEmoji.setValue(0);
      this.updateValues({emoji: emoji, hearts: 0, cash: emoji.value})
    });
  }

  startHeartAnimation() {
    this.sparkleAnimation.map((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 1500,
        delay: 100 * i + 600,
      }).start(() => {
        anim.setValue(0);
      });
    });
    Animated.sequence([
      Animated.timing(this.sizeHeart, {
        duration: 800,
        toValue: this.emojiBoxSize + 18,
      }),
      Animated.parallel([
        Animated.timing(this.moveHeart, {
          duration: 1500,
          toValue: 1,
        }),
        Animated.timing(this.sizeHeart, {
          duration: 2000,
          toValue: this.emojiBoxSize,
        }),
        Animated.timing(this.fadeHeart, {
          delay: 600,
          toValue: 0,
        }),
      ])
    ]).start(() => {
      this.fadeHeart.setValue(1);
      this.moveHeart.setValue(0);
      this.sizeHeart.setValue(0);
      this.updateValues({emoji: undefined, hearts: 1, cash: 0})
    });
  }

  async updateValues(values) {
    const {AuthStore, ContentsStore, navigation} = this.props;
    let updateResponse = await ApiService.updateContent(AuthStore.getUserLogin._id, navigation.getParam('id'), values);// {user, owner, content}
    AuthStore.updateUserLogin(updateResponse.user);
    ContentsStore.updateContent(navigation.getParam('id'), updateResponse.content);
  }

  navigateToProfile() {
    this.props.NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: this.props.navigation.getParam('user_id')});
  }

  render() {
    const {openEmoji, emojiSend, emojiSendPosition, heartSendPosition, openComments} = this.state;
    const {NavigationStore, ContentsStore, UsersStore, navigation} = this.props;
    const userData = UsersStore.getUserById(navigation.getParam('user_id'));
    const imageData = ContentsStore.getContentById(navigation.getParam('id'));
    return (
      <View style={{backgroundColor: colors.background, height: window_height}}>
      {(!userData || !imageData) ? null :
          <View>
            <ProgressiveImage 
              style={[content, {height: window_height-160}]}
              url={imageData.url}
              onDoubleClick={() => this.setState({openEmoji: !this.state.openEmoji, openComments: false})}
              contentType={imageData.contentType}

            />
            <PhotoIndicator 
              user={userData}
              cash={imageData.cash}
              hearts={imageData.hearts}
            />

            {!openComments && !openEmoji && <Buttons
              content_title={imageData.title}
              onOpenEmoji={() => this.setState({openEmoji: !this.state.openEmoji})}
              onComments={() => this.setState({openComments: !this.state.openComments})}
            />}

            {openEmoji &&<EmojiBox 
              includeHeart={true} 
              emojiSize={this.emojiBoxSize} 
              heartPress={this.heartPress.bind(this)} 
              emojiPress={this.emojiPress.bind(this)}
              onClose={() => this.setState({openEmoji: false})}
            />}

            {openComments && <CommentsBox 
              onClose={() => this.setState({openComments: false})} 
              content_id={imageData._id} 
              />}


            {/* emoji sent */}
            <Animated.Image
              source={emojiSend}
              style={{
                position: 'absolute',
                width: this.sizeEmoji,
                height: this.sizeEmoji,
                opacity: this.fadeEmoji,
                top: this.moveEmoji.interpolate({
                  inputRange: [0, 1],
                  outputRange: [emojiSendPosition.y, 50],
                }),
                left: this.moveEmoji.interpolate({
                  inputRange: [0, 1],
                  outputRange: [emojiSendPosition.x, Dimensions.get('window').width * 0.1],
                }),
              }}
            />
            {/* heart sent */}
            <Animated.View
                style={{
                  position: 'absolute',
                  width: this.sizeHeart,
                  height: this.sizeHeart,
                  opacity: this.fadeHeart,
                  top: this.moveHeart.interpolate({
                    inputRange: [0, 1],
                    outputRange: [heartSendPosition.y, 90],
                  }),
                  left: heartSendPosition.x
                }}
            >
              <Icon color={colors.heart} name={iconNames.FULL_HEART} size={this.emojiBoxSize} />
            </Animated.View>
            {/* sparkle animation */}
            {
              this.sparkleAnimation.map((anim, i) => (
                  <Animated.Image key={i} source={require('../../../assets/sparkle.gif')} style={{
                    position: 'absolute',
                    width: this.sizeEmoji,
                    height: this.sizeEmoji,
                    opacity: this.fadeEmoji,
                    top: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [emojiSendPosition.y, 0],
                    }),
                    left: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [emojiSendPosition.x, Dimensions.get('window').width * 0.77],
                    }),
                  }}/>
              ))
            }
        </View>}
      </View>
    )
  }
}
