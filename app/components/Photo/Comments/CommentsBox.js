import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, KeyboardAvoidingView, Keyboard } from 'react-native';
import SingleComment from './SingleComment';
import { colors } from '../../../utils/style';
import { window_width } from '../../../utils/view';
import ApiService from '../../../Services/Api';
import CommentInput from './CommentInput';
import { inject, observer } from "mobx-react";
import IconButton from '../../IconButton/IconButton';
import { iconNames } from '../../Icon/Icon';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

@inject('AuthStore')
export default class CommentsBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
    this.animation = new Animated.Value(0);
    this.keyboardShow = null;
    this.keyboardHide = null;
    this.keyboard = false;
  }

  maxHeight = 270;

  async componentDidMount() {
    let comments = await ApiService.getContentComments(this.props.content_id);
    comments.sort((a,b) => new Date(b.date) - new Date(a.date));
    this.setState({comments});
    Animated.spring(this.animation, {
       toValue: this.maxHeight,
    }).start();
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', () => this.keyboard = true);
		this.keyboardHide = Keyboard.addListener('keyboardDidHide', () => this.keyboard = false);
  }

  componentWillUnMount() {
    Animated.spring(this.animation, {
      toValue: 0,
    }).start();
    this.keyboardShow.remove();
    this.keyboardHide.remove();
  }

  async sendComment(comment) {
    let sendResponse = await ApiService.sendComment(this.props.AuthStore.getUserLogin._id, this.props.content_id, comment);
    if(sendResponse._id) {
      let newCommentsArray = this.state.comments;
      newCommentsArray.unshift(sendResponse);
      this.setState({comments: newCommentsArray});
    }
  }
  
  onLayout(e) {
    console.log('comments box height', e.nativeEvent.layout.height);
    this.setState({height: e.nativeEvent.layout.height});
  }

  onBackground() {
    if(this.keyboard) {
      Keyboard.dismiss();
    } else {
      this.props.onClose();
    }
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'flex-end'}} 
        behavior={'padding'}
        keyboardVerticalOffset={this.state.comments.length < 1 ? (10):(this.state.height < this.maxHeight ? (this.state.height*0.35):(-300))}
      >
        <TouchableWithoutFeedback onPress={() => this.onBackground()} style={{height: '100%', justifyContent: 'flex-end'}}>
          <IconButton onPress={() => this.onBackground()} style={s.closeIcon} icon={iconNames.CLOSE} size={13} />
        </TouchableWithoutFeedback>

        <CommentInput 
          sendDismissKeyboard 
          multiline 
          style={{width: window_width,backgroundColor: background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 7}} 
          onSend={c => this.sendComment(c)}
        />
        
        <Animated.View onLayout={this.onLayout.bind(this)} style={[this.props.style, s.container, {maxHeight: this.animation}]}>
          <ScrollView>
            {this.state.comments.length < 1 && <Text style={s.no_comments}>No Comments</Text>}
            {this.state.comments.map((com, i) => (
              <SingleComment key={i} comment={com} />
            ))}
          </ScrollView>
          <View style={{height: 40, flexDirection: 'row-reverse', alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold'}}>{this.state.comments.length} Comments</Text>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    );
  }

}

const background = 'rgba(210,210,210,0.4)';

const s = StyleSheet.create({
  container: {
    width: window_width,
    backgroundColor: background,
    padding: 10,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // paddingBottom: 0,
  },
  no_comments: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: colors.text
  },
  closeIcon: {
    // position: 'absolute', 
    // top: -35, 
    // left: 10,
    alignSelf: 'flex-start',
    borderRadius: 999,
    padding: 7,
    backgroundColor: background,
    margin: 10,
}
});
