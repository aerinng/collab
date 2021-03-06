import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Image, ScrollView} from "react-native";
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ChangePassword extends React.Component {
    state = {
        textInputPassword: ''
    }

    // allow the setting of new password
    setPassword = (password) => {
        this.setState({textInputPassword: password});
    }

    // allow the changing of new password and sending of email notification
    changePassword = () => {
        firebase.auth()
                .currentUser
                .updatePassword(this.state.textInputPassword)
                .then(function() {
                    alert("Password changed successfully.");
                })
                .catch(function(error) {
                    alert(error.message);
                });
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView style = {styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <Text style = {styles.header}>Change Password</Text>
                    <Text
                        style = {{fontSize: 17, fontWeight: '500', paddingVertical: 15}}
                    >
                        New Password
                    </Text>
                    <TextInput 
                        style = {styles.textInput}
                        onChangeText={textInput => this.setPassword(textInput)}
                        secureTextEntry = {true}
                        autoCapitalize = 'none'
                    />
                    <TouchableOpacity 
                        style = {styles.item}
                        onPress = {() => {
                            this.changePassword();
                            this.props.navigation.goBack();
                        }}
                    >
                        <Text style = {styles.detailsTitle}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    scrollView: {
        padding: 30,
        marginVertical: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 18,
        marginTop: -23,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    textInput: {
        borderColor: "#FFF",
        borderWidth: 1,
        padding: 13,
        borderRadius: 15,
        backgroundColor: "#FFF"
    },
    item: {
        marginTop: 50,
        marginHorizontal: 100,
        borderRadius: 15,
        backgroundColor: "#266E7D"
    },
    detailsTitle: {
        fontSize: 23,
        fontWeight: '600',
        color: "#fff",
        textAlign: 'center',
        zIndex: 1,
        padding: 15
    },
})