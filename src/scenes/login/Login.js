import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";

export default Login = () => (
    <KeyboardAvoidingView>
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
                placeholder = "Username"
                underlineColorAndroid = { 'transparent' }
            />
            <Image 
                style = {styles.icons2}
                source = {require('../../../assets/password.png')}
            />
            <TextInput 
                style = {styles.TextInput}
                placeholder = "Password"
                secureTextEntry = {true}
                underlineColorAndroid = { 'transparent' }
            />
            <TouchableOpacity style = {styles.Button}>
                <Text style = {styles.buttonText}> Sign In </Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style = {styles.ForgetPW}> Forget Password? </Text>
            </TouchableOpacity>
            <Text style = {styles.NoAccountText}> Don't have an account? </Text>
            <TouchableOpacity>
                <Text style = {styles.NoAccount}> Sign up </Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      backgroundColor: '#ffffff',
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
        marginTop: 318,
        padding: 10,
        zIndex: 1
    },
    icons2: {
        position: 'absolute',
        width: 30,
        height: 30,
        marginLeft: 50,
        marginTop: 392,
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
        padding: 23,
        marginHorizontal: 70,
        marginVertical: 15,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: '600',
        color: '#ffffff',
        paddingBottom: 50,
        marginTop: -14
    },
    ForgetPW: {
        color: '#266E7D',
        textAlign: 'center',
        fontWeight: '700',
        padding: 18
    },
    NoAccountText: {
        textAlign: 'center',
        marginLeft: 0,
        marginTop: 20,
        marginBottom: 30,
        padding: 40,
    },
    NoAccount: {
        color: '#266E7D',
        textAlign: 'center',
        fontWeight: '700',
        marginTop: -45
       
    }
});