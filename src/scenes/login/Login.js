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
        var curr = this;
        try {
          const result = await Google.logInAsync({
            // androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: "335681130717-oai52figqvp0f5dgjdmvlqgtqco7qvsl.apps.googleusercontent.com",
          });
          if (result.type === 'success') {
            var doc = firebase.firestore().collection("info").doc(result.user.email);
            doc.get().then(function(docRef) {
                if (!docRef.exists) {
                    console.log("not exists")
                    curr.props.navigation.navigate('SignUpGoogleScreens', {result: result, byGoogle:true})
                } else {
                    console.log("exists")
                    curr.props.navigation.navigate('Tabs', {result: result, byGoogle:true})
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
          } else {
            console.log("cancelled")
          }
        } 
        catch (error) {
          console.log("error: ", error);
        }
    }     

    googleSignUp = () => {
        //Creates individual email user as a Collection
        var mail = this.state.email;
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
                    avatar: 'null',
                    addressLine1: this.state.addressLine1,
                    addressLine2: this.state.addressLine2,
                    name: this.state.name,
                    username: this.state.username,
                    pushToken: ''
                })
                .then(() => {
                    this.props.navigation.navigate(
                        'Preferences', 
                        {email: mail, 
                        name: this.state.name, 
                        username: this.state.username,
                        byGoogle: false
                    });
                })
                .catch(error => {
                    alert(error);
                });
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
            
            this.props.navigation.navigate('Tabs', {name:name, email:email, username:username, byGoogle: false}) // removed password, if you need please add it back in!!
        }catch{
            this.props.navigation.navigate('Tabs', {byGoogle: false})
        }   
    }

    updateCategory = (category, email) => {
        const temp = [];
        temp.push(category);
        firebase.firestore()
                .collection('info')
                .doc(email)
                .update({
                    category: temp
                })
                .catch(function(error) {
                    console.log("Error updating document:", error);
                });
    }

    // email validation
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

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
                <TouchableOpacity onPress={() => this.googleSignin()}>
                    <Image source = {require('../../../assets/google.png')} style = {styles.google}/>
                </TouchableOpacity>
                <Text style = {styles.or}>OR</Text>
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
                <TouchableOpacity 
                    style = {styles.Button} 
                    onPress = {() => {
                        if (!this.validateEmail(this.state.email)) {
                            alert("Please input a valid email!")
                        } else {
                            this.onBottomPress();
                        }
                    }}
                >
                    <Text style = {styles.buttonText}> Sign In </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {() => {this.props.navigation.navigate('ForgetPassword')}}
                >
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
        marginTop: 45,
    },
    icons: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 405,
        padding: 10,
        zIndex: 1
    },
    icons2: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 480,
        padding: 10,
        zIndex: 1
    },
    Title: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: '600',
        paddingBottom: 20
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
    },
    google: {
        width: 205,
        height: 50,
        alignSelf: 'center',
        marginBottom: 15
    },
    or: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10
    }
});
 