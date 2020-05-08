import React, {Component} from 'react';
// Componenta
import {StyleSheet, View, Animated, Dimensions, Share, Text} from 'react-native';
import EmojiBox from './EmojiBox/EmojiBox';
import PhotoIndicator from './PhotoIndicator';
import Icon, {iconNames} from '../Icon/Icon';
import Routes from '../../utils/Routes';
import { inject, observer } from "mobx-react";
import ApiService from '../../Services/Api';
import Buttons from './Buttons';
import ProgressiveImage from '../ProgressiveImage/PreogressiveImage';
import { photo_box, content, emoji_popup_box, colors } from '../../utils/style';
import CommentsBox from './Comments/CommentsBox';
import UpdateService from '../../Services/Updates';
import { getScreenUrl } from '../../utils/Tools';
import IconButton from '../IconButton/IconButton';

@inject('AuthStore', 'UsersStore', 'NavigationStore', 'ContentsStore', 'AppStore')
@observer
export default class Photo extends Component {
  // Props = [ data, index, isLast ]

  constructor(props) {
    console.log('Photo -> constructor');
    super(props);
    this.state = {
      openEmoji: false,
      openComments: false,
      emojiSendPosition: {x: 0, y: 0},
      heartSendPosition: {x: 0, y:0},
      emojiSend: undefined,
      plusCash: 0,
      userData: undefined,
      imageData: undefined,
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

  getPressPosition(event) {
    console.log('Photo -> getPressPosition');
    return{
      x: event.touchHistory.touchBank[1].currentPageX - 20,
      y: event.touchHistory.touchBank[1].currentPageY - 150,
    };
  }

  emojiPress(emoji, event) {
    console.log('Photo -> emojiPress -> ', emoji);
    if(emoji.value > this.props.AuthStore.getUserLogin.cash) {
      this.props.NavigationStore.showAlert(
        `You don't have enough money!`, 
        'Go to buy more cash and hearts.',
        () => this.props.NavigationStore.navigate(Routes.Screens.BUY_PACKAGE.routeName)
      );
    } else {
      let position = this.getPressPosition(event);
      this.setState({
        openEmoji: false,
        emojiSendPosition: position,
        emojiSend: emoji.url,
      });
      // this.startEmojiAnimation(emoji);
      this.updateValues({emoji: emoji, hearts: 0, cash: emoji.value})
    }
  }

  heartPress(event) {
    console.log('Photo -> heartPress');
    if(1 > this.props.AuthStore.getUserLogin.hearts) {
      this.props.NavigationStore.showAlert(
        `You don't have hearts!`,
        'Go to buy more cash and hearts.',
        () => this.props.NavigationStore.navigate(Routes.Screens.BUY_PACKAGE.routeName)
      );
    } else {
      let position = this.getPressPosition(event);
      this.setState({
        openEmoji: false,
        heartSendPosition: position
      });
      this.startHeartAnimation();
    }

  }

  startHeartAnimation() {
    console.log('Photo -> startHeartAnimation');
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

  startEmojiAnimation(emoji) {
    console.log('Photo -> startEmojiAnimation');
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

  async updateValues(values) {
    console.log('Photo -> updateValues -> ', values);    
    const {AppStore, AuthStore, ContentsStore, data} = this.props;
    let updateResponse = await ApiService.updateContent(AuthStore.getUserLogin._id, data.content_id, values);
    AppStore.setAnimation(updateResponse.animationJson);
    AuthStore.updateUserLogin(updateResponse.user);
    ContentsStore.updateContent(data.content_id, updateResponse.content);
  }

  async onDelete() {
    const {AuthStore, ContentsStore, NavigationStore, data} = this.props;
    const imageData = ContentsStore.getContentById(data.content_id);
    let updateResponse = await ApiService.deleteContent(AuthStore.getUserLogin._id, [imageData._id]);
    if(updateResponse.length) {
        AuthStore.updateUserLogin({uploads: updateResponse});
        NavigationStore.setBanner(`You deleted one image.`, 'lightgreen');
        UpdateService.checkFollowingUpdates();
    }
  }

  async onShare() {
    const imageData = this.props.ContentsStore.getContentById(this.props.data.content_id);
    let result = await Share.share({
      message: imageData.title,
      url: getScreenUrl(Routes.Screens.PHOTO.routeName, {id: imageData._id, user_id: imageData.user_id})
    })
    console.log('share response -> ', result);
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  }

  render() {
    console.log('Photo -> render');
    const {AuthStore, NavigationStore, ContentsStore, UsersStore, data, isLast} = this.props;
    const {openEmoji, emojiSend, emojiSendPosition, heartSendPosition, openComments} = this.state;
    const imageData = ContentsStore.getContentById(data.content_id);
    const userData = UsersStore.getUserById(imageData.user_id);
    return (!userData) ? null :
        <View style={[this.props.style, {marginBottom: isLast ? (70):(photo_box.marginBottom)}]}>
          <ProgressiveImage 
            id={`${this.props.id}${data.content_id}`}
            style={content}
            onDoubleClick={() => this.setState({openEmoji: !this.state.openEmoji, openComments: false})}
            url={imageData.url}
            contentType={imageData.mimetype}
          />

          <PhotoIndicator 
            user={userData}
            cash={imageData.cash}
            hearts={imageData.hearts}
            onDelete={AuthStore.getUserLogin._id == userData._id ? (() => NavigationStore.showAlert('Delete image?', null, () => this.onDelete())):(null)}
          />
          {/* Buttons Box */}
          {!openComments && !openEmoji && <Buttons 
            content_title={imageData.title}
            onOpenEmoji={() => this.setState({openEmoji: !this.state.openEmoji})}
            onComments={() => this.setState({openComments: !this.state.openComments})}
            onShare={() => this.onShare()}
          />}
          
          {/* emoji box */}
          {openEmoji && <EmojiBox 
            includeHeart={true} 
            emojiSize={this.emojiBoxSize} 
            heartPress={this.heartPress.bind(this)} 
            emojiPress={this.emojiPress.bind(this)}
            onClose={() => this.setState({openEmoji: false})}
          />}
  
          {/* comments box */}
          {openComments && <CommentsBox 
            onClose={() => this.setState({openComments: false})} 
            content_id={data.content_id} 
          />}

          {/* emoji sent */}
          <Animated.Image
            source={{uri: emojiSend}}
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
                outputRange: [emojiSendPosition.x, Dimensions.get('window').width * 0.9],
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
          {this.sparkleAnimation.map((anim, i) => (
            <Animated.Image key={i} source={require('../../assets/sparkle.gif')} style={{
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
          ))}
        </View>
  }
}
