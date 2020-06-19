import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, 
    ScrollView, SafeAreaView, Image, Linking } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from "react-native-modal-datetime-picker";
import firebase from 'firebase';
import {daily, weekly, biweekly, monthly} from './AddOrdFunc'

class AddOrder extends React.Component {
    state = {
        promo:'', 
        location:'', 
        total:'',
        category:'', 
        date:'',
        desc:'',
        switchValue:false, 
        isDateTimePickerVisible: false, 
        displayDate: '', 
        item: null
    }

    changeCategory(item) {
        this.setState({ 
            //label: item.label, 
            value: item.value
        });
    }

    toggleSwitch = (value) => {
        this.setState({switchValue: value})
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    handleDatePicked = date => {
        this.hideDateTimePicker();
        this.setState({displayDate : date});
    };

    render() {
        //these things are carried over from Store Promo.
        const {data} = this.props.route.params
        const {title} = this.props.route.params
        const {Pid} = this.props.route.params
        const {image} = this.props.route.params

        var user = firebase.auth().currentUser; 
        const orderDate = this.state.displayDate.toString().substring(4,16);
        return (
        <SafeAreaView style = {styles.container}>
            <KeyboardAwareScrollView style={styles.scrollView}>
                <TouchableOpacity  
                    style = {styles.backbutton}
                    onPress={() => this.props.navigation.navigate('StorePromo')}
                >
                    <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                </TouchableOpacity>
                <Text style = { styles.header }> Add an Offer </Text>
                <Text style = { styles.titles }> Store Promotion </Text>
                <Text value = {this.state.promo} style = {{paddingBottom: 10, paddingLeft: 2}}>
                    {title}: {data}
                </Text>
                <Text style = { styles.titles }> My Location </Text>
                <TextInput 
                    style = { styles.TextInput } 
                    placeholder = "Enter Your Location"
                    value = {this.state.location}
                    onChangeText={location => this.setState({location})}   
                    textContentType = {"fullStreetAddress"}
                    underlineColorAndroid = { 'transparent' } 
                />
                <Text style = { styles.titles }> Category </Text>
                <DropDownPicker 
                    style = {styles.Picker}
                    items = {[
                        {label: 'Groceries', value: 'Groceries'},
                        {label: 'Stationeries', value: 'Stationeries'}
                    ]}
                    onChangeItems = {(item) => this.changeCategory(item)}
                />
                <Text style = { styles.titles }> Current Total </Text>
                <TextInput 
                    style = { styles.TextInput } 
                    keyboardType = {'numeric'}
                    placeholder = "Enter Your Current Total"
                    value = {this.state.total}
                    onChangeText={total => this.setState({total})}  
                    underlineColorAndroid = { 'transparent' } 
                />
                <Text style = { styles.autopost }> Auto - Post </Text>
                <Switch
                    trackColor={{ false: "#ff0000", true: "#93D17D" }}
                    thumbColor={this.toggleSwitch ? "#ffffff" : "#f4f3f4"}
                    style = {styles.switch}
                    onValueChange = {this.toggleSwitch}
                    value = {this.state.switchValue}
                />
                <Text style = { {marginBottom: 5} }> </Text>
                <Text style = { styles.titles }> Estimated Order Date </Text>
                <Text style = {styles.date}>{orderDate}</Text>
                <TouchableOpacity 
                    style = {styles.datepicker} 
                    onPress = {this.showDateTimePicker} 
                >
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        value = {this.state.date}
                    />
                </TouchableOpacity>
                <Text style = { styles.titles }> Description </Text>
                <TextInput 
                    style = { styles.TextInputDesc } 
                    multiline = {true}
                    placeholder = "Enter a Description"
                    underlineColorAndroid = { 'transparent' } 
                    value = {this.state.desc}
                    onChangeText={desc => this.setState({desc})} 
                />
                <TouchableOpacity 
                    style = {styles.Button} 
                    onPress={() =>  {
                        firebase.firestore().collection(user.email).add({ //add my order id inside
                            data:data,
                            title:title,
                            location:this.state.location,
                            total:this.state.total, 
                            category: this.state.category, 
                            date:this.state.displayDate.toString(),
                            desc:this.state.desc,
                            image:image,
                            switch: this.state.switchValue
                        }).then( (snapshot) => { //all asynchronous.....
                            console.log("already added"); 
                            snapshot.update({
                                id:snapshot.id
                            })
                            this.setState({
                                promo:'',
                                location:'', 
                                total:'', 
                                date:'',
                                desc:''                            
                            })
                            if (this.state.switchValue){
                                daily(snapshot.id, user.email)
                            }
                        // this.props.navigation.navigate('Search');
                        alert("Added Successfully"); 
                        })
                    }}
                >
                    <Text style = {styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
        );
    };
}
export default AddOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
    autopost: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 15,
        paddingTop: 7
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 40,
        color: '#000000',
        borderColor: '#C5C5C5',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
    },
    TextInputDesc: {
        alignSelf: 'stretch',
        height: 80,
        color: '#000000',
        borderColor: '#C5C5C5',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
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
        backgroundColor: '#000000',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: '600'
    },
    switch: {
        alignSelf: 'flex-end',
        marginTop: -30,
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        marginTop: 2
    },
    datepicker: {
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
        marginTop: -33,
        marginRight: 10,
        paddingBottom: 23,
        zIndex: 1
    },
    date: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#C5C5C5",
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        textAlign: 'center'
    },
  });
