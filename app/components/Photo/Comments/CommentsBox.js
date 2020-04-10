import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import SingleComment from './SingleComment';
import { colors } from '../../../utils/style';
import { window_width } from '../../../utils/view';
import ApiService from '../../../Services/Api';
import { TextInput } from 'react-native-gesture-handler';
import EditField from '../../../Screens/EditProfileScreen/EditField';
import CommentInput from './CommentInput';
import { inject, observer } from "mobx-react";

@inject('AuthStore')
export default class CommentsBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
    this.animation = new Animated.Value(0);
  }

  async componentDidMount() {
    let comments = await ApiService.getContentComments(this.props.content_id);
    this.setState({comments});
    Animated.spring(this.animation, {
       toValue: 300,
    }).start();
  }

  componentWillUnMount() {
    Animated.spring(this.animation, {
        toValue: 0,
     }).start();
  }

  async sendComment(comment) {
    let sendResponse = await ApiService.sendComment(this.props.AuthStore.getUserLogin._id, this.props.content_id, comment);
    if(sendResponse._id) {
      let newCommentsArray = this.state.comments;
      newCommentsArray.push(sendResponse);
      this.setState({comments: newCommentsArray});
    }
  }

  render() {
    return (
      <Animated.View style={[s.container, {maxHeight: this.animation}]}>
        <CommentInput onSend={c => this.sendComment(c)}/>
        <ScrollView>
          {this.state.comments.length < 1 && <Text style={s.no_comments}>No Comments</Text>}
            {
                this.state.comments.map((com, i) => (
                    <SingleComment key={i} comment={com} />
                ))
            }
        </ScrollView>
        <View style={{height: 40, flexDirection: 'row-reverse', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>{this.state.comments.length} Comments</Text>
        </View>
      </Animated.View>
    );
  }

}


const s = StyleSheet.create({
  container: {
    width: window_width,
    backgroundColor: 'rgba(210,210,210,0.6)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0
  },
  no_comments: {
    fontSize: 20,
    alignSelf: 'center',
    padding: 30,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: colors.text
  }
});
