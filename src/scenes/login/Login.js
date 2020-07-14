import React from 'react';
import firebase from 'firebase';
import { View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Google from 'expo-google-app-auth';

export default class Login extends React.Component {
    //Set the state to give each TextInput an 'identity' to call them. Helpful for Firebase.
    state = {        
            email:'',
            password:'',
            error:''
    }   

    //NEW SET OF CODES [GOOGLE SIGNIN]
    async googleSignin() {
        try {
          const result = await Google.logInAsync({
            // androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: "335681130717-oai52figqvp0f5dgjdmvlqgtqco7qvsl.apps.googleusercontent.com",
          });
          if (result.type === 'success') {
            //PLEASE IGNORE THE COMMENTED CODES HERE 
            //check if first time user
            // this.props.navigation.navigate('Preferences', {result: result, byGoogle:true})


            //byGoogle login: [boolean value]
            this.props.navigation.navigate('Tabs', {result: result, byGoogle:true})
          } else {
            console.log("cancelled")
          }
        } 
        catch (e) {
          console.log("error", e);
        }
    }     

    //Sign In users with the given email and password (FOR AUTHENTICATION)
    onBottomPress = () =>{
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess)
        .catch(err => {
            if (this.state.email){
                alert(err.message)
            } else {
                alert("Please fill in all fields.")
            }
            <Login/>
        })
    
    }

    onSignUpPress = () => {
        this.props.navigation.navigate('SignUpScreen')
    }    

    //If logged in successfully, go to 'Tabs'
    onLoginSuccess =  () => {
        this.setState({
            error:''
        })
        try{
                const {name} = this.props.route.params
                const {email} = this.props.route.params
                //const {password} = this.props.route.params
                const {username} = this.props.route.params
                this.props.navigation.navigate('Tabs', {name:name, email:email,username:username, byGoogle: false}) // removed password, if you need please add it back in!!
            
        }catch{
            this.props.navigation.navigate('Tabs', {byGoogle: false})
        }
    }

    updateCategory = (category, email) => {
        firebase.firestore()
                .collection('info')
                .doc(email)
                .update({
                    category: category
                })
                .catch(function(error) {
                    console.log("Error updating document:", error);
                });
    }

    render(){ 
        if (this.props.route.params != null) {
            const {category} = this.props.route.params;
            const {email} = this.props.route.params;
            this.updateCategory(category, email)
        }
        return(
            <KeyboardAwareScrollView>
            <View style = {styles.container}>
                <Image 
                    style = {styles.image}
                    source = {require('../../../assets/collab_transparent.png')}
                />
                <Text style = {styles.Title}> Login </Text>
                <Image 
                    style = {styles.icons}
                    source = {require('../../../assets/user.png')}
                />
                <TextInput 
                    style = {styles.TextInput} 
                    onChangeText={email => this.setState({email})}
                    placeholder = "Email"
                    value = {this.state.email}
                    underlineColorAndroid = { 'transparent' }
                    autoCapitalize = 'none'
                />
                <Image 
                    style = {styles.icons2}
                    source = {require('../../../assets/password.png')}
                />
                <TextInput 
                    style = {styles.TextInput} 
                    value = {this.state.password}
                    onChangeText={password => this.setState({password})}
                    placeholder = "Password"
                    secureTextEntry = {true}
                    underlineColorAndroid = { 'transparent' }
                    autoCapitalize = 'none'
                />
                <TouchableOpacity style = {styles.Button} onPress = {() => {
                    this.onBottomPress();
                }}>
                    <Text style = {styles.buttonText}> Sign In </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.googleSignin()}>
                    <Text style = {styles.ForgetPW}> GOOGLE LOGINNN</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style = {styles.ForgetPW}> Forget Password? </Text>
                </TouchableOpacity>
                <Text style = {styles.NoAccountText}> Don't have an account? </Text>
                <TouchableOpacity onPress={this.onSignUpPress} >
                    <Text style = {styles.NoAccount}> Sign up </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
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
        marginTop: 75,
    },
    icons: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 370,
        padding: 10,
        zIndex: 1
    },
    icons2: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 445,
        padding: 10,
        zIndex: 1
    },
    Title: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '600',
        paddingBottom: 55
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
        padding: 15,
        marginHorizontal: 70,
        marginVertical: 15,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
        marginTop: 0
    },
    ForgetPW: {
        color: '#266E7D',
        textAlign: 'center',
        fontWeight: '700',
        padding: 5
    },
    NoAccountText: {
        textAlign: 'center',
    },
    NoAccount: {
        color: '#266E7D',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 5
       
    }
});
