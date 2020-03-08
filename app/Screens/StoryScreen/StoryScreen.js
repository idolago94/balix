import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Animated,
  ScrollView,
  Dimensions,
  Platform,
  Alert
} from 'react-native';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import Style from '../../helpers/style/style';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { withComma } from '../../common/numberMethods';
import { connect } from 'react-redux';
import EmojiBox from '../../components/Photo/EmojiBox/EmojiBox';
import db from "../../database/db";
import {bindActionCreators} from "redux";
import {updateUsers} from "../../store/users/usersActions";
import {updateUserLogin} from "../../store/auth/authActions";
import Routes from "../../Routes/Routes";
import StoryEmojiBox from "./StoryEmojiBox";

class StoryScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            tabBarVisible: false
        };
    }

  constructor(props) {
    super(props);
    this.state = {
      cash: 0,
      currentImageIndex: 0,
      userIndex: undefined,
      userData: undefined,
      sendHeart: false,
      sendEmoji: undefined,
      openEmoji: false
    }

    this.emojiBoxTimer = undefined;
    this.storyBarWidthArr = [];
    this.heartTransform = new Animated.Value(0);
    this.heartOpacity = new Animated.Value(1);
    this.emojiSize = new Animated.Value(0);
    this.groupEmojiPosition = new Animated.Value(0);
    this.buttonSize = 30;
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
        'didFocus',
        this.screenFocused.bind(this)
    );
  }

  componentWillUnmount() {
    if(this.emojiBoxTimer) {
      clearTimeout(this.emojiBoxTimer);
      this.emojiBoxTimer = undefined;
    }
  }

  screenFocused() {
    let userIndex = this.props.navigation.getParam('userIndex');
    let user = this.props.users[userIndex];

    this.initStory(user, userIndex);
    if(!this.state.openEmoji) {
      this.toggleEmoji();
    }
  }

  initStory(user, index) {
    this.storyBarWidthArr = [];
    user.story.map(() => {
      this.storyBarWidthArr.push(new Animated.Value(0));
    });
    this.setState(() => {
      return {userData: user, userIndex: index, currentImageIndex: 0};
    });
    this.runStory(0);
  }

  runStory(i) {
    Animated.timing(this.storyBarWidthArr[i], {
        toValue: 1,
        duration: 5000
    }).start(() => {
        if(this.state.currentImageIndex+1 < this.state.userData.story.length) {
          this.setState(() => {
            return { currentImageIndex: this.state.currentImageIndex+1 }
          });
          this.runStory(this.state.currentImageIndex)
        } else {
          this.checkMoreStory();
        };
    });
  }

  checkMoreStory() {
      let nextStory_user = this.props.users.find((user, i) => (i > this.state.userIndex && user.story.length > 0));
      let nextStory_index = this.props.users.findIndex((user, i) => (i > this.state.userIndex && user.story.length > 0));
      if(nextStory_user == -1 || nextStory_index == -1) {
        this.exitStory()
      } else this.initStory(nextStory_user, nextStory_index);
  }

  toggleEmoji() {
    if(!this.state.openEmoji) {
        this.setState({ openEmoji: true });
        this.emojiBoxTimer = setTimeout(() => {
            this.setState({ openEmoji: false })
        }, 10000);
    } else {
        clearTimeout(this.emojiBoxTimer);
        this.setState({ openEmoji: false })
    }
  }

  exitStory() {
    this.setState({ userData: undefined, currentImageIndex: 0 });
    this.props.navigation.goBack();
  }

  heartSend(owner_id, imageIndex) {
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
      this.updateValues({emoji: undefined, hearts: 1}, owner_id, imageIndex);
      this.setState({ sendHeart: true });
      Animated.sequence([
        this.flyHeartAnimation(200),
        this.heartOpacityAnimation(0)
      ]).start(() => {
            this.heartTransform.setValue(0);
            this.heartOpacity.setValue(1);
            this.setState({ sendHeart: false });
      });
    }
  }

  flyHeartAnimation(height) {
    return Animated.timing(this.heartTransform, {
      toValue: height*(-1),
      duration: 1200
    });
  }

  profileOpacityAnimation(opacity) {
    return Animated.timing(this.profileOpacity, {
      toValue: opacity,
      duration: 100
    });
  }

  heartOpacityAnimation(opacity) {
    return Animated.timing(this.heartOpacity, {
      toValue: opacity,
      delay: 200,
      duration: 500
    });
  }

  emojiSizeAnimation(size) {
    return Animated.timing(this.emojiSize, {
      toValue: size,
      duration: 1500
    });
  }

  groupEmojiAnimation(position) {
    return Animated.timing(this.groupEmojiPosition, {
      toValue: position,
      duration: 2500
    });
  }

  emojiPress(owner_id, imageIndex, emoji) {
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
      this.updateValues({emoji: emoji, hearts: 0}, owner_id, imageIndex);
      clearTimeout(this.emojiBoxTimer);
      this.emojiBoxTimer = setTimeout(() => {
        this.toggleEmoji();
      }, 10000);
      let randomNum = Math.floor(Math.random() * 2);
      this.setState({ sendEmoji: { url: emoji.url, animType: randomNum } });
      switch (randomNum) {
        case 0:
          this.emojiSizeAnimation(200)
              .start(() => {
                setTimeout(() => {
                  this.emojiSize.setValue(0);
                  this.setState({ sendEmoji: undefined, cash: this.state.cash+emoji.value });
                }, 1000)
              });
          break;
        case 1:
          this.groupEmojiAnimation(1)
              .start(() => {
                setTimeout(() => {
                  this.groupEmojiPosition.setValue(0);
                  this.setState({ sendEmoji: undefined });
                }, 1000)
              });
          break;
      }
    }

  }

  updateValues(values, owner_id, imageIndex) {
    let bodyRequest = {
      owner_id: owner_id,
      image_id: this.state.userData.story[imageIndex].id,
      achievements: { cash: (values.emoji) ? (values.emoji.value):(0), hearts: values.hearts, emoji: values.emoji }
    }
    fetch(`${db.url}/images/updateAchievement?id=${this.props.userLogin._id}&story=true`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyRequest)
    }).then(res => res.json()).then(response => {
      if (!response.error) {
        let updateUser = {
          ...this.state.userData,
          cash: response.cash,
          hearts: response.hearts,
          story: response.story
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
          cash: this.props.userLogin.cash - bodyRequest.achievements.cash,
          hearts: this.props.userLogin.hearts - bodyRequest.achievements.hearts
        });
        this.setState({userData: updateUser})
      } else console.log(response.error);
    });
  }

  renderAnimationEmoji() {
    switch (this.state.sendEmoji.animType) {
      case 0:
        return (
          <View style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, alignItems: 'center', justifyContent: 'center'}}>
            <Animated.Image
              source={this.state.sendEmoji.url}
              style={{
                width: this.emojiSize,
                height: this.emojiSize
              }}
            />
          </View>
        );
      case 1:
        return (
          <Animated.View
            style={{
              height: 400,
              width: 400,
              position: 'absolute',
              top: this.groupEmojiPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-400, Dimensions.get('window').height]
              }),
              left: this.groupEmojiPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-400,  Dimensions.get('window').width]
              })
            }}
          >
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 10}}>
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
              <Image source={this.state.sendEmoji.url} style={{width: 30, height: 30}} />
            </View>
          </Animated.View>
        )
      default:
        return null;
    }
  }

  render() {
    if(!this.state.userData) {
      return (<View></View>);
    }
    return (
      <View style={styles.container}>
        <Image
          source={this.state.userData.story[this.state.currentImageIndex]}
          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
        />
        <View style={styles.storyBar}>
            {
                this.state.userData.story.map((s, i) => (
                    <View
                        key={i}
                        style={{
                            position: 'relative',
                            height: '100%',
                            marginHorizontal: 2,
                            backgroundColor: 'gray',
                            width: Dimensions.get('window').width/this.state.userData.story.length
                        }}
                    >
                        <Animated.View
                         style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            backgroundColor: 'white',
                            width: this.storyBarWidthArr[i].interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%']
                            })
                         }}
                        ></Animated.View>
                    </View>
                ))
            }
        </View>
        <View style={styles.header}>
          <View style={styles.leftSide}>
            <ProfileSymbol src={this.state.userData.profileImage} size={30} />
            <Text style={styles.userName}>{this.state.userData.username}</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={[styles.cashBox, {borderColor: Style.colors.lightMain}]}>{withComma(this.state.userData.story[this.state.currentImageIndex].cash)}$</Text>
            <Text style={[styles.cashBox, {borderColor: Style.colors.text}]}>
              {withComma(this.state.userData.story[this.state.currentImageIndex].hearts)}
              <Icon name={iconNames.FULL_HEART} size={8} color={Style.colors.heart} />
            </Text>
            <TouchableHighlight onPress={this.exitStory.bind(this)}>
              <Icon style={{padding: 10}} name={iconNames.CLOSE} size={Style.sizes.icon-5} color={Style.colors.icon} />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttons}>
            <ProfileSymbol
                style={styles.btn}
                press={() => this.props.navigation.navigate(Routes.Screens.PROFILE.routeName, {userData: this.state.userData})}
                src={this.state.userData.profileImage}
                size={this.buttonSize}
            />
            <TouchableHighlight style={styles.btn}>
              <Icon color={Style.colors.text} name={iconNames.SEND} size={this.buttonSize} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn}>
              <Icon color={Style.colors.text} name={iconNames.COMMENT_SQUARE} size={this.buttonSize} />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this.toggleEmoji()} style={styles.btn}>
              <Icon color={Style.colors.text} name={iconNames.EARN} size={this.buttonSize} />
            </TouchableHighlight>
          </View>
          {
            (this.state.openEmoji) ? (
                <StoryEmojiBox
                    includeHeart={true}
                    emojiSize={25}
                    heartPress={this.heartSend.bind(this, this.state.userData._id, this.state.currentImageIndex)}
                    emojiPress={this.emojiPress.bind(this, this.state.userData._id, this.state.currentImageIndex)}
                />
                ) : (null)
          }
        </View>
        {
          // send emoji animation area
          (!this.state.sendEmoji) ? (<View style={{position: 'absolute'}}></View>) :
          ( this.renderAnimationEmoji() )
        }
        {
          // send heart animation area
          (!this.state.sendHeart) ? (<View style={{position: 'absolute'}}></View>) :
          (
          <Animated.View style={{position: 'absolute', bottom: 150, left: 25, opacity: this.heartOpacity, transform: [{ translateY: this.heartTransform }]}} >
            <Icon name={iconNames.FULL_HEART} size={20} color={'red'} />
          </Animated.View>
          )
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Style.colors.background,
    justifyContent: 'space-between',
    position: 'relative',
    paddingTop: (Platform.OS == 'ios') ? (37):(0)
  },
  storyBar: {
    flexDirection: 'row',
    height: 5
  },
  header: {
    position: 'absolute',
    top: (Platform.OS == 'ios') ? (35):(0),
    left: 0,
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12
  },
  footer: {
    alignItems: 'flex-end'
  },
  buttons: {
    justifyContent: 'flex-end',
    padding: 12
  },
  btn: {
    padding: 10,
    marginBottom: 10
  },
  userName: {
    color: Style.colors.text,
    fontWeight: 'bold',
    padding: 5
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cashBox: {
    padding: 5,
    fontWeight: 'bold',
    color: Style.colors.text,
    borderRadius: 5,
    fontSize: 10,
    borderColor: Style.colors.lightMain,
    borderWidth: 1,
    margin: 10
  },
  flyBox: {
    position: 'relative'
  },
  emojiBar: {
    flexDirection: 'row',
    marginBottom: 7
  },
  emojiBox: {
    backgroundColor: 'rgba(165,165,165,0.5)',
    borderRadius: 15,
    marginHorizontal: 5,
    paddingHorizontal: 15,
    alignItems:'center',
    justifyContent: 'center'
  }
});


const mapStateToProps = (state) => {
  const userLogin = state.auth.userLogin;
  const users = state.users.users;
  return { userLogin, users }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      updateUsers,
      updateUserLogin
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(StoryScreen);
