import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Image, Text, ScrollView, TouchableHighlight, Alert, Button, Modal, Dimensions, Platform } from 'react-native';
import Style from '../../helpers/style/style';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Icon, { iconNames } from '../../components/Icon/Icon';
import { Formik } from 'formik';
import { WebView } from 'react-native-webview';
import Slider from '@react-native-community/slider';
import db from "../../database/db";
import { inject, observer } from 'mobx-react';

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

 async sendMoney() {
   // request to get access token if not exist or expired
   if(!this.state.accessToken || this.state.accessToken.expires_date < new Date().getTime()) {
     let token = await fetch(`${db.url}/paypal/getToken`).then(res => res.json());
     if(token.error) {
       Alert.alert('Network error.');
       return;
     } else {
       token.expires_date = new Date().getTime()+token.expires_in;
       this.setState({accessToken: token});
     }
   }

   let requestBody = {
     "sender_batch_header": {
       "sender_batch_id": new Date().getTime(),
       "email_subject": "You have a payout!",
       "email_message": "You have received a payout! Thanks for using our service!"
     },
     "items": [
       {
         "recipient_type": "EMAIL",
         "amount": {
           "value": this.state.withdrawAmount,
           "currency": "USD"
         },
         "note": "Thanks for your patronage!",
         "receiver": "idolago94@gmail.com"
       }
     ]
   };
   fetch('https://api.sandbox.paypal.com/v1/payments/payouts', {
   // fetch('https://api.paypal.com/v1/payments/payouts', {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.state.accessToken.token_type} ${this.state.accessToken.access_token}` // TOKEN
     },
     body: JSON.stringify(requestBody)
   }).then(res => res.json()).then(result => {
     console.log(result);
     if(result.batch_header) {
       Alert.alert('Please check your email.');
     }
   })
 }

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
          <Text style={{color: Style.colors.text, padding: 10, fontWeight: 'bold'}}>Send us a request payment to our paypal account:</Text>
          <TextInput style={{color: Style.colors.text, padding: 5, backgroundColor: 'gray', borderRadius: 10, alignSelf: 'center'}} value={'balix833@gmail.com'} editable={false}/>
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
    backgroundColor: Style.colors.background,
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
    borderColor: Style.colors.darkMain,
    borderWidth: 1,
    padding: 15
  },
  title: {
    color: Style.colors.text,
    fontSize: 20,
    marginTop: 10
  },
  sub_title: {
    color: Style.colors.text,
    marginTop: 6,
    marginBottom: 30
  },
  input: {
    color: Style.colors.text,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: Style.colors.text,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10
  }
});
