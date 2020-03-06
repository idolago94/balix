import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Animated, Dimensions, Alert} from 'react-native';
import Style from '../../helpers/style/style';
import Icon, {iconNames} from '../Icon/Icon';
import SingleComment from './Comments/SingleComment';
import EmojiBox from './EmojiBox/EmojiBox';
import PhotoIndicator from './PhotoIndicator';
import ProfileSymbol from '../ProfileSymbol/ProfileSymbol';
import {withComma} from '../../common/numberMethods';
import Routes from '../../Routes/Routes';
import DoubleClick from 'react-native-double-click';
// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateUsers } from "../../store/users/usersActions";
import db from "../../database/db";
import {updateUserLogin} from "../../store/auth/authActions";
import bufferToBase64 from '../../helpers/convert/Buffer';

class Photo extends Component {
  // Props = [ data, titlePress ]

  constructor(props) {
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
    if(emoji.value > this.props.userLogin.cash) {
      Alert.alert(
          `You don't have enough money!`,
          'Go to buy more cash and hearts.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.navigation.navigate(Routes.Screens.BUY_PACKAGE.routeName)},
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
    if(1 > this.props.userLogin.hearts) {
      Alert.alert(
          `You don't have hearts!`,
          'Go to buy more cash and hearts.',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.props.navigation.navigate(Routes.Screens.BUY_PACKAGE.routeName)},
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
      this.updateValues({emoji: undefined, hearts: 1})
    });
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
      this.updateValues({emoji: emoji, hearts: 0})
    });
  }

  updateValues(values) {
    let bodyRequest = {
      owner_id: this.state.userData._id,
      content_id: this.state.imageData._id,
      achievements: { cash: (values.emoji) ? (values.emoji.value):(0), hearts: values.hearts, emoji: values.emoji }
    }
    // fetch(`${db.url}/images/updateAchievement?id=${this.props.userLogin._id}`, {
    fetch(`${db.url}/content/update?id=${this.props.userLogin._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    }).then(res => res.json()).then(response => {
      if (!response.error) {
        let updateUser = {
          ...this.state.userData,
          cash: this.state.userData.cash + bodyRequest.achievements.cash,
          hearts: this.state.userData.heart + bodyRequest.achievements.hearts,
        };
        let updateUsers = [];
        this.props.users.map(u => {
          if (u._id == this.state.userData._id) {
            updateUsers.push(updateUser);
          } else updateUsers.push(u);
        })
        this.props.updateUsers(updateUsers);
        this.props.updateUserLogin({
          ...this.props.userLogin,
          cash: response.cash,
          hearts: response.cash,
          cash_earned: this.props.userLogin.cash_earnedv + bodyRequest.achievements.cash,
          hearts_earned: this.props.userLogin.hearts_earnedv + bodyRequest.achievements.hearts
        });
        let imageData = {
          ...this.state.imageData,
          cash: this.state.imageData.cash + bodyRequest.achievements.cash,
          hearts: this.state.imageData.hearts + bodyRequest.achievements.hearts
        }
        this.setState({userData: updateUser, imageData: imageData})
      } else console.log(response.error);
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    let userData;
    if(this.props.data.user_id == this.props.userLogin._id) {
      userData = this.props.userLogin;
    } else {
      userData = this.props.users.find(user => user._id == this.props.data.user_id);
    }
    this.setState({userData: userData, imageData: this.props.data});
  }

  navigateToProfile() {
    this.props.navigation.navigate(Routes.Screens.PROFILE.routeName, {userData: this.state.userData});
  }

  render() {
    return (!this.state.userData) ? null :
      <ScrollView style={styles.container}>
        <View style={styles.photoBox}>
          <DoubleClick onClick={this.toggleEmoji.bind(this)}>
            <Image
                style={styles.photo}
                source={{uri:`data:${this.state.imageData.contentType};base64,${bufferToBase64(this.state.imageData.buffer)}`}}
            />
          </DoubleClick>
          <View style={{position: 'absolute', alignItems: 'flex-start'}}>
            <ProfileSymbol style={{marginLeft: 10,marginTop: 10, borderWidth: 1, borderColor: 'black', borderRadius: 999}} src={this.state.userData.profileImage} size={55}/>
            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
              <Icon color={Style.colors.text} name={iconNames.DOLLAR} size={22} />
              <Text style={{color: Style.colors.text}}>{this.state.imageData.cash}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5, marginLeft: 10, padding: 4}}>
              <Icon color={Style.colors.text} name={iconNames.FULL_HEART} size={22} />
              <Text style={{color: Style.colors.text}}>{this.state.imageData.hearts}</Text>
            </View>
          </View>
          {/*<PhotoIndicator indicators={{*/}
          {/*  cash: this.state.imageData.cash + this.state.plusCash,*/}
          {/*  hearts: this.state.imageData.hearts,*/}
          {/*}}/>*/}
          <View style={styles.emoji}>
            {
              !this.state.openEmoji ? null :
                <EmojiBox includeHeart={true} emojiSize={this.emojiBoxSize} heartPress={this.heartPress.bind(this)} emojiPress={this.emojiPress.bind(this)}/>
            }
          </View>
          {/* emoji sent */}
          <Animated.Image
            source={this.state.emojiSend}
            style={{
              position: 'absolute',
              width: this.sizeEmoji,
              height: this.sizeEmoji,
              opacity: this.fadeEmoji,
              top: this.moveEmoji.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.emojiSendPosition.y, 50],
              }),
              left: this.moveEmoji.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.emojiSendPosition.x, Dimensions.get('window').width * 0.1],
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
                  outputRange: [this.state.heartSendPosition.y, 90],
                }),
                left: this.state.heartSendPosition.x
              }}
          >
            <Icon color={Style.colors.heart} name={iconNames.FULL_HEART} size={this.emojiBoxSize} />
          </Animated.View>
          {
            this.sparkleAnimation.map((anim, i) => (
              <Animated.Image key={i} source={require('../../assets/sparkle.gif')} style={{
                position: 'absolute',
                width: this.sizeEmoji,
                height: this.sizeEmoji,
                opacity: this.fadeEmoji,
                top: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.emojiSendPosition.y, 0],
                }),
                left: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.emojiSendPosition.x, Dimensions.get('window').width * 0.77],
                }),
              }}/>
            ))
          }
          <View style={styles.buttonsBox}>
          {/*  <View  style={styles.iconBox}>*/}
          {/*    <Icon style={styles.icon} name={iconNames.FULL_COMMENT} size={Style.sizes.icon-3}*/}
          {/*          color={Style.colors.icon}/>*/}
          {/*  </View>*/}
          {/*  <TouchableHighlight style={styles.iconBox} onPress={this.toggleEmoji.bind(this)}>*/}
          {/*  <Icon style={styles.icon} name={iconNames.FULL_EARN} size={Style.sizes.icon+10}*/}
          {/*        color={Style.colors.icon}/>*/}
          {/*</TouchableHighlight>*/}
          {/*  <View style={styles.iconBox}>*/}
          {/*    <Icon style={styles.icon} name={iconNames.FULL_SHARE} size={Style.sizes.icon-3}*/}
          {/*          color={Style.colors.icon}/>*/}
          {/*  </View>*/}


            {/*<View style={styles.iconBox}>*/}
            {/*  <Icon style={styles.icon} name={iconNames.FULL_SHARE} size={Style.sizes.icon-5}*/}
            {/*        color={Style.colors.icon}/>*/}
            {/*</View>*/}
            {/*<View  style={styles.iconBox}>*/}
            {/*  <Icon style={styles.icon} name={iconNames.FULL_COMMENT} size={Style.sizes.icon-5}*/}
            {/*        color={Style.colors.icon}/>*/}
            {/*</View>*/}
            {/*<TouchableHighlight style={styles.iconBox} onPress={this.toggleEmoji.bind(this)}>*/}
            {/*  <Icon style={styles.icon} name={iconNames.FULL_EARN} size={Style.sizes.icon+17}*/}
            {/*        color={Style.colors.icon}/>*/}
            {/*</TouchableHighlight>*/}
          </View>
        </View>
        <View style={styles.buttonsBox}>
          <View style={styles.leftSide}>
            <TouchableHighlight onPress={this.toggleEmoji.bind(this)}>
              <Icon style={styles.icon} name={iconNames.FULL_EARN} size={Style.sizes.icon}
                    color={Style.colors.icon}/>
            </TouchableHighlight>
            <Icon style={styles.icon} name={iconNames.FULL_COMMENT} size={Style.sizes.icon}
                  color={Style.colors.icon}/>
            <Icon style={styles.icon} name={iconNames.FULL_SHARE} size={Style.sizes.icon}
                  color={Style.colors.icon}/>
          </View>
          <View style={styles.leftSide}>
            {/*<View style={styles.anotherPhotos}>*/}
            {/*  {*/}
            {/*    this.state.userImages.map((img, i) => {*/}
            {/*      if (img.id === this.state.imageData.id) {*/}
            {/*        return (<View key={i}></View>);*/}
            {/*      }*/}
            {/*      return (*/}
            {/*          <TouchableHighlight key={i} style={{padding: 5, width: 40, aspectRatio: 1}}*/}
            {/*                              onPress={() => this.setState({imageData: img})}>*/}
            {/*            <Image style={styles.smallPhoto} source={{uri:img.base64}}/>*/}
            {/*          </TouchableHighlight>*/}
            {/*      );*/}
            {/*    })*/}
            {/*  }*/}
            {/*</View>*/}
          </View>
        </View>
        {/*<View style={styles.anotherPhotos}>*/}
        {/*  {*/}
        {/*    this.state.userImages.map((img, i) => {*/}
        {/*      if (img.id === this.state.imageData.id) {*/}
        {/*        return (<View key={i}></View>);*/}
        {/*      }*/}
        {/*      return (*/}
        {/*        <TouchableHighlight key={i} style={{padding: 5, width: '12.5%', aspectRatio: 1}}*/}
        {/*                            onPress={() => this.setState({imageData: img})}>*/}
        {/*          <Image style={styles.smallPhoto} source={{uri:img.base64}}/>*/}
        {/*        </TouchableHighlight>*/}
        {/*      );*/}
        {/*    })*/}
        {/*  }*/}
        {/*</View>*/}

        <View style={styles.commentsBox}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={styles.username}>{this.state.userData.username}: </Text>
            <Text style={styles.content}>{this.state.imageData.title}My first photo</Text>
          </View>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(Routes.Screens.COMMENTS.routeName, {
              comments: this.state.comments,
            })}>
            <Text
              style={styles.allCommentsLink}>View {withComma(this.state.comments.length)} Comments</Text>
          </TouchableHighlight>
          <SingleComment data={this.state.comments[this.state.comments.length - 1]}/>
        </View>
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
  userName: {
    fontSize: 16,
    color: Style.colors.text,
    fontWeight: 'bold',
  },
  photoBox: {
    width: Dimensions.get('window').width,
    aspectRatio: 1,
    // height: Dimensions.get('window').width*1.3,
    // height: Dimensions.get('window').height-150,

    // padding: 8,
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoEarn: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    borderRadius: 999,
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 22,
  },
  iconBagBox: {
    padding: 5,
    backgroundColor: Style.colors.darkMain,
    borderRadius: 999,
  },
  number: {
    color: Style.colors.text,
    paddingHorizontal: 8,
  },

  buttonsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    marginTop: 10,
    // position: 'relative',

    // position: 'absolute',
    // bottom: 0,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  leftSide: {
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
  },
  iconBox: {
    margin: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Style.colors.text,
  },

  anotherPhotos: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.6,
  },
  smallPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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

const mapStateToProps = (state) => {
	return {
    userLogin: state.auth.userLogin,
    users: state.users.users
  }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      updateUsers,
      updateUserLogin
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
