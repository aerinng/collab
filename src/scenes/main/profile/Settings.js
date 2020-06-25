import React , {useState} from 'react';
import { TextInput, StyleSheet, Text, ScrollView, 
    SafeAreaView, TouchableOpacity, Image, Switch } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import firebase from 'firebase'; 

export default class SettingsScreen extends React.Component {
    state = { 
        switchValue1: false,
        switchValue2: false,
        switchValue3: false,
        switchValue4: false,
        isDateTimePickerVisible: false, 
        displayTime: "", 
        frequency: "",
        freq:''
    };
    toggleSwitch1 = (value) => {
        this.setState({switchValue1: value})
    }
    toggleSwitch2 = (value) => {
        this.setState({switchValue2: value})
    }
    toggleSwitch3 = (value) => {
        this.setState({switchValue3: value})
    }
    toggleSwitch4 = (value) => {
        this.setState({switchValue4: value})
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    handleTimePicked = time => {
        this.hideDateTimePicker();
        this.setState({displayTime : time});
    };

    changeFreq = (item) => {
        this.setState({freq: item.value})
        console.log("the iem v for setState", item.value);
    }

    onSave = () => {
        var user = firebase.auth().currentUser;
        //Update this into 'info' collection
        firebase.firestore().collection('info').doc(user.email).update({
            frequency: this.state.freq
        })
        this.props.navigation.navigate('Profile')
    }

    render() {
        const time = this.state.displayTime.toString().substring(16, 21);
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView style = {styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <Text style = {styles.header}> Settings </Text>
                    <Text style = {styles.title}> Auto-Post Frequency</Text>
                    <DropDownPicker 
                        style = {styles.Picker}
                        placeholder = "Select a Frequency"
                        defaultValue = ""
                        items = {[
                            {label: 'Weekly', value: 'Weekly'},
                            {label: 'Daily', value: 'Daily'},
                            {label: 'Biweekly', value: 'Biweekly'},
                            {label: 'Monthly', value: 'Monthly'},
                        ]}
                    />
                    <Text style = {styles.title}> Auto-Post Timing</Text>
                    <TouchableOpacity 
                        style = {styles.timepicker} 
                        onPress = {this.showDateTimePicker} 
                    >
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            mode = "time"
                            onConfirm={this.handleTimePicked}
                            onCancel={this.hideDateTimePicker}
                            headerTextIOS = "Pick a Time"
                        />
                    </TouchableOpacity>
                    <Text style = {styles.timing} >{time}</Text>
                    <Text style = {styles.title}> Push Notifications </Text>
                    <Text style = {styles.notif}> New Chat Messages</Text>
                    <Switch
                        trackColor={{ false: "#ff0000", true: "#93D17D" }}
                        thumbColor={this.toggleSwitch1 ? "#ffffff" : "#f4f3f4"}
                        style = {styles.switch}
                        onValueChange = {this.toggleSwitch1}
                        value = {this.state.switchValue1}
                    />
                    <Text style = {styles.notif}> New Offers in your Groups</Text>
                    <Switch
                        trackColor={{ false: "#ff0000", true: "#93D17D" }}
                        thumbColor={this.toggleSwitch2 ? "#ffffff" : "#f4f3f4"}
                        style = {styles.switch}
                        onValueChange = {this.toggleSwitch2}
                        value = {this.state.switchValue2}
                    />
                    <Text style = {styles.notif}> New Buyers in your Requested Offer </Text>
                    <Switch
                        trackColor={{ false: "#ff0000", true: "#93D17D" }}
                        thumbColor={this.toggleSwitch3 ? "#ffffff" : "#f4f3f4"}
                        style = {styles.switch}
                        onValueChange = {this.toggleSwitch3}
                        value = {this.state.switchValue3}
                    />
                    <Text style = {styles.notif}> Received Offers that are removed</Text>
                    <Switch
                        trackColor={{ false: "#ff0000", true: "#93D17D" }}
                        thumbColor={this.toggleSwitch4 ? "#ffffff" : "#f4f3f4"}
                        style = {styles.switch}
                        onValueChange = {this.toggleSwitch4}
                        value = {this.state.switchValue4}
                    />
                    <TouchableOpacity 
                        style = {styles.Button} 
                        onPress={() => this.onSave()}
                    >
                        <Text style = {styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
    },
    scrollView: {
        padding: 30,
    },
    header: {
        fontSize: 24,
        marginBottom: 18,
        marginTop: -23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 10
    },
    notif: {
        fontSize: 15,
        marginRight: 80,
    },
    timing: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
    switch: {
        alignSelf: 'flex-end',
        paddingVertical: 25,
        marginTop: -22,
        
    },
    timepicker: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 16,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#C5C5C5',
        transform: [{rotate: '180deg'}],
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: -26,
        zIndex: 1
    },
    Button: {
        borderColor: '#000000',
        borderWidth: 1,
        alignSelf: 'stretch',
        paddingVertical: 8,
        marginTop: 10,
        marginBottom: 60,
        backgroundColor: '#000000',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: '600'
    },
});
