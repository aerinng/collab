import React, {useState} from 'react';
import { View, StatusBar, Text, StyleSheet, TextInput, Switch, TouchableOpacity, 
    ScrollView, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import AutoPostSwitch from './AutoPostSwitch';

export default AddOrder = () => (
    <SafeAreaView style = {styles.container}>
        <KeyboardAvoidingView>
        <KeyboardAwareScrollView style={styles.scrollView}>
            <Text style = { styles.header }> Add an Offer </Text>
            <Text style = { styles.titles }> Store Promotion </Text>
            <TextInput 
                style = { styles.TextInput } 
                placeholder = "Enter Store Promotion"
                underlineColorAndroid = { 'transparent' } />
            <Text style = { styles.titles }> My Location </Text>
            <TextInput 
                style = { styles.TextInput } 
                placeholder = "Enter Your Location"
                textContentType = {"fullStreetAddress"}
                underlineColorAndroid = { 'transparent' } />
            <Text style = { styles.titles }> Category </Text>
            <DropDownPicker 
                style = {styles.Picker}
                defaultNull placeholder = "Select a Category"
                items = {[
                    {label: 'Groceries', value: 'Groceries'},
                    {label: 'Stationeries', value: 'Stationeries'}
                ]}
                onChangeItems = {item => this.ListeningStateChangedEvent({ label: item.label, value: item.value})}
            />
            <Text style = { styles.titles }> Current Total </Text>
            <TextInput 
                style = { styles.TextInput } 
                keyboardType = {'numeric'}
                placeholder = "Enter Your Current Total"
                underlineColorAndroid = { 'transparent' } />
            <Text style = { styles.titles }> Auto - Post </Text>
            
            <Text style = { {marginBottom: 5} }> </Text>
            <Text style = { styles.titles }> Estimated Order Date </Text>
            <TextInput 
                style = { styles.TextInput } 
                placeholder = "Enter Your Estimated Order Date"
                underlineColorAndroid = { 'transparent' } />
            <Text style = { styles.titles }> Description </Text>
            <TextInput 
                style = { styles.TextInput } 
                multiline = {true}
                placeholder = "Enter a Description"
                underlineColorAndroid = { 'transparent' } />
            <TouchableOpacity style = {styles.Button}>
                <Text style = {styles.buttonText}>Post</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    AddOrder: {
      alignSelf: 'stretch',
      padding: 35,
    },
    scrollView: {
        padding: 30,
        marginVertical: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 18,
        marginTop: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    titles: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 15
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 40,
        color: '#000000',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15
    },
    Picker: {
        marginBottom: 15,
    },
    Button: {
        borderColor: '#000000',
        borderWidth: 1,
        alignSelf: 'stretch',
        paddingVertical: 8,
        marginTop: 10,
        marginBottom: 60,
        backgroundColor: '#000000'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: '600'
    }
  });
