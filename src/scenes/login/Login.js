import React from 'react';
import firebase from 'firebase';
import { View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
//import { render } from 'react-dom';
//import { withFormik } from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export default class Login extends React.Component {
    //Set the state to give each TextInput an 'identity' to call them. Helpful for Firebase.
    state ={        
            email:'',
            password:'',
            error:''
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
        this.props.navigation.navigate('Signup')
    }    

    //If logged in successfully, go to 'Tabs'
    onLoginSuccess =  () => {
        this.setState({
            error:''
        })
        this.props.navigation.navigate('Tabs')
    }

    render(){
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
                />
                <TouchableOpacity style = {styles.Button} onPress = {this.onBottomPress}>
                    <Text style = {styles.buttonText}> Sign In </Text>
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

// export default withFormik({
//     mapPropsToValues: ({details}) => ({
//       email: details.email,
//       password: details.password,
//     }),
//     enableReinitialize: true,
//     validationSchema: (props) => yup.object().shape({
//       email: yup.string().max(30).required(),
//       password: yup.string().max(15).required()
//     }),
//     handleSubmit: (values, { props }) => {
//       console.log(props);
//       console.log(values);
  
//       addFood(values);
//     //   if (props.details.id) {
//     //     values.id = props.details.id;
//     //     values.createdAt = props.details.createdAt;
//     //     uploadFood(values, props.onFoodUpdated);
//     //   } else {
//     //     uploadFood(values, props.onFoodAdded);
//     //   }
//     },
//   })(Login);

 