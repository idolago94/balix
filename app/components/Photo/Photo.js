import React, {Component} from 'react';
// Componenta
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import SingleComment from './Comments/SingleComment';
import EmojiBox from './EmojiBox/EmojiBox';
import PhotoIndicator from './PhotoIndicator';
import Icon, {iconNames} from '../Icon/Icon';
import Style from '../../helpers/style/style';
import {withComma} from '../../common/numberMethods';
import Routes from '../../Routes/Routes';
import { inject, observer } from "mobx-react";
import ApiService from '../../Services/Api';
import Buttons from './Buttons';
import ProgressiveImage from '../ProgressiveImage/PreogressiveImage';
import { content_height, content_width } from '../../utils/view';

@inject('AuthStore', 'UsersStore', 'NavigationStore', 'ContentsStore')
@observer
export default class Photo extends Component {
  // Props = [ data, titlePress ]

  constructor(props) {
    console.log('Photo -> constructor');
    super(props);
    this.state = {
      openEmoji: false,
      emojiSendPosition: {x: 0, y: 0},
      heartSendPosition: {x: 0, y:0},
      emojiSend: undefined,
      plusCash: 0,
      userData: undefined,
      imageData: undefined,
      userImages: undefined,
      comments: [
        {user: 'simon', comment: 'com1'},
        {user: 'avi', comment: 'com2'},
        {user: 'joh', comment: 'com3'},
        {user: 'IdoLago94', comment: 'com4'},
        {user: 'shlomi', comment: 'com5'},
        {user: 'simon', comment: 'com6'},
      ],
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
    console.log('Photo -> toggleEmoji');
    this.setState((prevState) => {
      return {
        ...prevState,
        openEmoji: !prevState.openEmoji,
      };
    });
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
      Alert.alert(
          `You don't have enough money!`,
          'Go to buy more cash and hearts.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.NavigationStore.navigate(Routes.Screens.BUY_PACKAGE.routeName)},
          ],
          {cancelable: false},
      );
    } else {
      let position = this.getPressPosition(event);
      this.setState({
        openEmoji: false,
        emojiSendPosition: position,
        emojiSend: emoji.url,
      });
      this.startEmojiAnimation(emoji);
    }
  }

  heartPress(event) {
    console.log('Photo -> heartPress');
    if(1 > this.props.AuthStore.getUserLogin.hearts) {
      Alert.alert(
          `You don't have hearts!`,
          'Go to buy more cash and hearts.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.NavigationStore.navigate(Routes.Screens.BUY_PACKAGE.routeName)},
          ],
          {cancelable: false},
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
    const {AuthStore, ContentsStore, data} = this.props;
    let updateResponse = await ApiService.updateContent(AuthStore.getUserLogin._id, data.content_id, values);// {user, owner, content}
    AuthStore.updateUserLogin(updateResponse.user);
    ContentsStore.updateContent(data.content_id, updateResponse.content);
  }

  render() {
    console.log('Photo -> render');
    const {NavigationStore, ContentsStore, UsersStore, data, height} = this.props;
    const {openEmoji, emojiSend, emojiSendPosition, heartSendPosition, comments} = this.state;
    const imageData = ContentsStore.getContentById(data.content_id);
    const userData = UsersStore.getUserById(imageData.user_id);
    return (!userData) ? null :
      <ScrollView style={styles.container}>
        <View style={styles.photoBox}>
          <ProgressiveImage 
            style={{width: content_width, height: content_height}}
            onDoubleClick={this.toggleEmoji.bind(this)}
            buffer_id={imageData.buffer_id}
          />
      <Text style={{color: 'red', fontsize: 20}}>{this.props.index}</Text>
          <PhotoIndicator 
            user={userData}
            cash={imageData.cash}
            hearts={imageData.hearts}
            onSymbol={() => NavigationStore.navigate(Routes.Screens.PROFILE.routeName, {id: userData._id})}
          />
          
          {/* emoji box */}
          <View style={styles.emoji}>
            {openEmoji && <EmojiBox 
              includeHeart={true} 
              emojiSize={this.emojiBoxSize} 
              heartPress={this.heartPress.bind(this)} 
              emojiPress={this.emojiPress.bind(this)}
            />}
          </View>
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
            <Icon color={Style.colors.heart} name={iconNames.FULL_HEART} size={this.emojiBoxSize} />
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
        {/* <Buttons onOpenEmoji={() => this.toggleEmoji()} /> */}
        {/* comments */}
        {/* <View style={styles.commentsBox}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.username}>{userData.username}: </Text>
            <Text style={styles.content}>{imageData.title}My first photo</Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.NavigationStore.navigate(Routes.Screens.COMMENTS.routeName, {
              comments: comments,
            })}>
            <Text
              style={styles.allCommentsLink}>View {withComma(comments.length)} Comments</Text>
          </TouchableHighlight>
          <SingleComment data={comments[comments.length - 1]}/>
        </View> */}
      </ScrollView>;
  }
}

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute',
    bottom: -20,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    backgroundColor: Style.colors.background,
    position: 'relative',
  },
  photoBox: {
    width: Dimensions.get('window').width,
    position: 'relative',
    marginBottom: 10
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  icon: {
    padding: 10,
  },

  username: {
    fontSize: 16,
    color: Style.colors.text,
    fontWeight: 'bold'
  },
  commentsBox: {
    padding: 10,
  },
  content: {
    fontSize: 16,
    color: Style.colors.text,
  },
  allCommentsLink: {
    fontSize: 16,
    color: Style.colors.text,
  },
});
