import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Style from '../../../helpers/style/style';
import { connect } from 'react-redux';
import UserDetails from './UserDetails';
import Photos from './Photos';
import Header from '../../../components/Header/Header';
import db from '../../../database/db';

class ProfileView extends Component {
  static navigationOptions = ({ navigation }) => {
    let user = navigation.getParam('userData');
    if(user) {
      return {
        title: user.username
      };
    }
    return {
      headerTitle: () => <Header {...navigation} />,
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      userData: undefined,
      follow: false
    }
  }

  getDetailsFromParams() {
    let user = this.props.navigation.getParam('userData');
    if(user) {
      let follow = this.props.userLogin.following.find(followUser => followUser == user._id);
      if(this.state.userData == undefined ||user._id != this.state.userData._id) {
        this.setState({userData: user, follow: !!follow});
      } else if(!!follow != this.state.follow) {
        this.setState({follow: !!follow})
      }
    } else {
      this.setState({userData: undefined});
    }
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'willFocus',
      this.getDetailsFromParams.bind(this)
    );
  }

  updateFollow() {
    this.setState({follow: !this.state.follow});
  }

  render() {
    return (
      <View style={{flex:1}}>
        <ScrollView style={styles.scrollContainer}>
            {
              (this.state.userData) ?
              (
                <View style={styles.viewContainer}>
                  <UserDetails {...this.props.navigation} followPress={this.updateFollow.bind(this)} follow={this.state.follow} user={this.state.userData} />
                  <Photos {...this.props.navigation} user={this.state.userData} />
                </View>
              ) :
              (
                <View style={styles.viewContainer}>
                  <UserDetails {...this.props.navigation} user={this.props.userLogin} />
                  <Photos {...this.props.navigation} user={this.props.userLogin} />
                </View>
              )
            }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Style.colors.background,
    flex: 1
  },
  viewContainer: {
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
  const userLogin = {...state.auth.userLogin};
  return { userLogin }
};

export default connect(mapStateToProps)(ProfileView);
