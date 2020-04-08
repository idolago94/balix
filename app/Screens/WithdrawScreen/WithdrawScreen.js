import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Text, ScrollView, TouchableHighlight, Alert, Button, Modal, Dimensions, Platform } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { Formik } from 'formik';
import { WebView } from 'react-native-webview';
import { inject, observer } from 'mobx-react';
import { colors } from '../../utils/style';

@inject('AuthStore', 'UsersStore')
export default class WithdrawScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      showWebView: true,
      status: null,
      sliderValue: 10,
      withdrawAmount: 10,
      accessToken: null
    }
  }

  getAllCountries() {
    fetch('https://restcountries.eu/rest/v2/all').then((response) => response.json())
        .then((result) => {
          let allCountries = result.map((c) => {
            return {
              value: c.name
            }
          });
          this.setState({ countries: allCountries });
        });
  }

  withPaypal() {
    this.setState({showWebView: true});
  }

  handleResponse = data => {
    if (data.title === "success") {
      setTimeout(() => {
        this.setState({ showWebView: false, status: "Complete" });
      }, 3000);
    } else if (data.title === "cancel") {
      this.setState({ showWebView: false, status: "Cancelled" });
    } else if(data.title === 'Error') {
      this.setState({showWebView: false});
    } else {
      return;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.AuthStore.getUserLogin.profileImage ? (
              <Image style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, opacity: 0.1}} source={{uri: this.props.AuthStore.getUserLogin.profileImage.base64}} />
          ) : (null)
        }
        <View style={styles.header}>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{padding: 15}}>
            <Icon name={iconNames.LEFT_CHEVRON} size={25} color={'white'} />
          </TouchableHighlight>
        </View>

        <View style={styles.paypal_instructions}>
          <Text style={{color: colors.text, padding: 10, fontWeight: 'bold'}}>Send us a request payment to our paypal account:</Text>
          <TextInput style={{color: colors.text, padding: 5, backgroundColor: 'gray', borderRadius: 10, alignSelf: 'center'}} value={'balix833@gmail.com'} editable={false}/>
          <View style={styles.notesBox}>
            <Text style={styles.note}>* Pay attention that the paypal email campatible with your Balix account email.</Text>
            <Text style={styles.note}>* Pay attention that the amount request campatible with the cash you have in your account.</Text>
          </View>
          <View style={styles.webViewBox}>
            <WebView
                style={{borderRadius: 10}}
                source={{uri: 'https://www.paypal.com/myaccount/transfer/homepage/request'}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.background,
    height: Dimensions.get('window').height,
    alignItems: 'center'
  },
  backgroundImage: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.1
  },
  paypal_instructions: {
    alignItems: 'center'
  },
  notesBox: {
    padding: 5
  },
  note: {
    color: 'gray',
    fontSize: 10
  },
  webViewBox: {
    width: Dimensions.get('window').width*0.95,
    borderRadius: 10,
    height: Dimensions.get('window').height*0.5,
    marginTop: 10
  },
  header: {
    marginTop: (Platform.OS == 'ios') ? (30):(0),
    alignSelf: 'flex-start'
  },
  sliderBox: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  form: {
    width: '80%',
    marginVertical: 30,
    backgroundColor: 'rgba(11,178,178,0.3)',
    borderRadius: 10,
    borderColor: colors.darkMain,
    borderWidth: 1,
    padding: 15
  },
  title: {
    color: colors.text,
    fontSize: 20,
    marginTop: 10
  },
  sub_title: {
    color: colors.text,
    marginTop: 6,
    marginBottom: 30
  },
  input: {
    color: colors.text,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: colors.text,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10
  }
});
