// Components
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { inject, observer } from "mobx-react";
import { colors } from '../../utils/style';
import EditHeader from './EditHeader';
import ProfileSymbol from '../../components/ProfileSymbol/ProfileSymbol';
import ImagePicker from 'react-native-image-picker';
import EditField from './EditField';
import { getCountryList } from '../../utils/Tools';
import { Dropdown } from 'react-native-material-dropdown';
import ApiService from '../../Services/Api';
import HandleError from '../../components/HandleError/HandleError';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

@inject('NavigationStore', 'AuthStore')
@observer
export default class EditProfileScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			errors: [],
			countries: [],
			edit: false,
			edit_fields: {}
		}
	}

	async componentDidMount() {
		let countries = await getCountryList();
		this.setState({countries});
	}
	
	onImagePress() {
        ImagePicker.showImagePicker( (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                this.props.NavigationStore.setBanner(response.error);
            } else {
                this.setState({
					edit_profile_image: response
				});
            }
        });
	}

	async saveProfileImage() {
		let profileResponse = await ApiService.updateProfileImage(this.props.AuthStore.getUserLogin._id, this.state.edit_profile_image);
		this.props.AuthStore.updateUserLogin({profileImage: profileResponse});
		this.setState({
			edit_profile_image: undefined
		})
	}
	
	updateField(value, fieldName) {
		console.log('updateField', fieldName, value);
		this.setState({edit_fields: {
			...this.state.edit_fields,
			[fieldName]: value
		}, edit: true});
	}

	addKeyword(value) {
		console.log('addKeyword', value);
		let newKeywordsArray = [];
		if(!this.state.edit_fields.keywords) {
			newKeywordsArray = this.props.AuthStore.getUserLogin.keywords;
		} else {
			newKeywordsArray = this.state.edit_fields.keywords;
		}
		newKeywordsArray.push(value);
		this.setState({edit_fields: {
			...this.state.edit_fields,
			keywords: newKeywordsArray
		}, edit: true});
	}

	removeKeyword(i) {
		let newKeywordsArray = [];
		if(!this.state.edit_fields.keywords) {
			newKeywordsArray = this.props.AuthStore.getUserLogin.keywords;
		} else {
			newKeywordsArray = this.state.edit_fields.keywords;
		}
		newKeywordsArray.splice(i, 1);
		this.setState({edit_fields: {
			...this.state.edit_fields,
			keywords: newKeywordsArray
		}, edit: true});
	}

	async saveUpdates() {
		let updateResponse = await ApiService.updateUser(this.props.AuthStore.getUserLogin._id, this.state.edit_fields);
		if(updateResponse.errors) {
			this.setState({errors: updateResponse.errors});
		} else {
			this.props.AuthStore.updateUserLogin(this.state.edit_fields);		
			this.setState({
				errors: [],
				edit: false,
				edit_fields: {}
			})	
		}
	}

	render() {
		const {NavigationStore, AuthStore} = this.props;
		const {edit, edit_fields, countries, edit_profile_image} = this.state;
		return (
			<View style={{flex: 1, backgroundColor: colors.background}}>
				<EditHeader 
					onBack={() => NavigationStore.goBack()} 
					onCancel={() => this.setState({edit: false, edit_fields: {}})}
					onSave={() => this.saveUpdates()}
					edit={edit}
				/>
					
				<KeyboardAwareScrollView
					resetScrollToCoords={{ x: 0, y: 0 }}
					scrollEnabled={true}
				>
					<View style={{padding: 10}}>
						<ProfileSymbol
							src={edit_profile_image ? (edit_profile_image.uri):(AuthStore.getUserLogin.profileImage)}
							press={() => this.onImagePress()}
							size={140}
						/>
						{edit_profile_image && <TouchableHighlight onPress={() => this.saveProfileImage()} style={{position: 'absolute', bottom: 0, right: 0, paddingVertical: 3, paddingHorizontal: 20, borderRadius: 999, backgroundColor: colors.darkMain}}>
							<Text style={{color: colors.text, fontWeight: 'bold'}}>Save new profile image</Text>
						</TouchableHighlight>}
					</View>
					
					{this.state.errors.length > 0 && <HandleError data={this.state.errors} />}
					<View style={{flexDirection: 'row'}}>
						<EditField
							style={{...s.field, flexGrow: 1}} 
							label={'First Name:'}
							value={edit_fields.first_name || AuthStore.getUserLogin.first_name} 
							onChange={value => this.updateField(value, 'first_name')}
						/>
						<EditField
							style={{...s.field, flexGrow: 1}} 
							label={'Last Name:'}
							value={edit_fields.last_name || AuthStore.getUserLogin.last_name} 
							onChange={value => this.updateField(value, 'last_name')}
						/>
					</View>
					<EditField
						style={s.field}
						label={'Username:'}
						value={edit_fields.username || AuthStore.getUserLogin.username} 
						onChange={value => this.updateField(value, 'username')}
					/>
					<EditField
						style={s.field}
						label={'Email:'}
						value={edit_fields.email || AuthStore.getUserLogin.email} 
						onChange={value => this.updateField(value, 'email')}
					/>
					<EditField
						style={s.field}
						label={'Gender:'}
						type={'radio'}
						value={edit_fields.gender || AuthStore.getUserLogin.gender} 
						onChange={value => this.updateField(value, 'gender')}
					/>
					<View style={s.field}>
						<Dropdown 
							pickerStyle={{backgroundColor: colors.bar}} 
							baseColor={colors.text}
							textColor={colors.text}
							selectedItemColor={colors.text}
							itemColor={'gray'}
							label='Country' 
							value={edit_fields.country || AuthStore.getUserLogin.country} 
							data={countries} 
							onChangeText={value => this.updateField(value, 'country')}
						/>
					</View>
					<EditField
						style={s.field}
						label={'Date of birth:'}
						type={'datepicker'}
						value={edit_fields.date_of_birth || AuthStore.getUserLogin.date_of_birth} 
						onChange={value => this.updateField(value, 'date_of_birth')}
					/>
					<EditField
						style={s.field}
						label={'Keywords:'}
						type={'keywords'}
						value={edit_fields.keywords || AuthStore.getUserLogin.keywords} 
						onAdd={value => this.addKeyword(value)}
						onRemove={index => this.removeKeyword(index)}
					/>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

const s = StyleSheet.create({
	field: {
		paddingHorizontal: 20, 
		paddingVertical: 10,
	}
});