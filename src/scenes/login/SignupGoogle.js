import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from "react-native";
import firebase from 'firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class SignupGoogle extends React.Component{
    //Set the state to give each TextInput an 'identity' to call them. Helpful for Firebase.
    state = {
        username: '',
        addressLine1: '',
        addressLine2: '',
        error:''
    }

    //If successful, no error message shown
    onSignupSuccess =  () => {
        var result = this.props.route.params.result;
        //Creates individual email user as a Collection
        var user = result.user.id;
        var name = result.user.name;
        var mail = result.user.email; 
        var pic = result.user.photoUrl;
        firebase.firestore()
                .collection('info')
                .doc(mail)
                .set({
                    promo:'',
                    location:'',
                    category:'',
                    total:'', 
                    date:'',
                    desc:'',
                    avatar: pic,
                    addressLine1: this.state.addressLine1,
                    addressLine2: this.state.addressLine2,
                    name: name,
                    username: this.state.username,
                    pushToken: '',
                    frequency: ''
                })
                .then(() => {
                   this.props.navigation.navigate(
                       'PreferenceGoogle', 
                       {email: mail, 
                        name: name, 
                        username: this.state.username,
                        byGoogle: true
                    });
                })
                .catch(error => {
                    alert(error);
                });
    }

    render() {
        return (           
            <SafeAreaView style = {styles.container}>
            <KeyboardAwareScrollView>
                <View style = {styles.container}>
                    <Image 
                        style = {styles.image}
                        source = {require('../../../assets/collab_transparent.png')}
                    />
                    <Text style = {styles.Title}> Register </Text>
                    <Image 
                        style = {styles.icons}
                        source = {require('../../../assets/user.png')}
                    />
                    <TextInput 
                        style = {styles.TextInput}
                        placeholder = "Username"
                        onChangeText={username => this.setState({username: username})}
                        autoCapitalize = 'none'
                    />
                    <TouchableOpacity 
                        style = {styles.Button} 
                        onPress = {() => {this.onSignupSuccess()}}
                    > 
                        <Text style = {styles.buttonText}> Sign Up </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
    image: {
        resizeMode: 'contain',
        width: 130,
        height: 130,
        alignSelf: 'center',
    },
    icons: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 270,
        padding: 10,
        zIndex: 1
    },
    Title: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '600',
        paddingBottom: 30
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 55,
        color: '#000000',
        borderColor: '#E5E5E5',
        borderWidth: 1,
        padding: 10,
        paddingLeft: 55,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#E5E5E5'
    },
    Button: {
        backgroundColor: "#266E7D",
        padding: 10,
        marginHorizontal: 70,
        marginVertical: 25,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
    },
});