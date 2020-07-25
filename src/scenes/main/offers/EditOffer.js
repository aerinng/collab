import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Image, 
    View, TextInput, Switch } from "react-native";
import * as Progress from 'react-native-progress';
import DateTimePicker from "react-native-modal-datetime-picker";
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

class EditOffer extends React.Component {
    state = {
        switchValue: false, 
        isDateTimePickerVisible: false, 
        displayDate: '', 
        users: null,
        unsubscribe: '',
        currOrderID: '',
        location: '',
        desc: '',
    }

    // allow the auto post switch to be toggled
    toggleSwitch = (value) => {
        this.setState({switchValue: value})
    }

    // display the datetime picker
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    // hide the display of datetime picker
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };
    
    // allow the setting of date picked from the datetime picker
    handleDatePicked = date => {
        this.hideDateTimePicker();
        this.setState({displayDate : date});
    };

    // fetch offer details data from Cloud Firestore database
    componentDidMount() {
        const {orderID} = this.props.route.params
        this.state.unsubscribe = firebase.firestore()
                                         .collection("offers")
                                         .doc(orderID)
                                         .get()
                                        . then(snapshot => {
                                                const results = []
                                                results.push(snapshot.data())
                                                this.setStates(results, snapshot.data())
                                        })
                                        .catch(err => console.error(err));
    }    

    // unsubscribe from the fetching of data from database
    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

    // allow the setting of offer details data
    setStates = (results, offerData) => {
        this.setState({users: [...results]})
        this.setState({displayDate: offerData.date})
        this.setState({location: offerData.location})
        this.setState({desc: offerData.desc})
        this.setState({switchValue: offerData.switch})
    }

    // add the offer details to the Cloud Firestore database
    addToDB = () => {
        const {orderID} = this.props.route.params;
        firebase.firestore()
                .collection("offers")
                .doc(orderID)
                .update({
                    desc: this.state.desc,
                    location: this.state.location,
                    date: this.state.displayDate.toString().substring(4,16),
                    switch: this.state.switchValue
                })
    }

    render(){
        const orderDate = this.state.displayDate.toString();
        const {result} = this.props.route.params;
        return (
            <SafeAreaView style = {styles.container}>
                <FlatList
                    ListHeaderComponent = {
                        <>
                            <TouchableOpacity  
                                style = {styles.backbutton}
                                onPress={() => {this.props.navigation.goBack()}}
                            >     
                                <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                            </TouchableOpacity>
                            <Text style = {styles.header} > Edit My Offer </Text>
                        </>
                    }
                    data={this.state.users}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Text style = { styles.titles }> Store Promotion </Text>
                            <Text style = { styles.data }>{item.data}</Text>
                            <Text style = { styles.titles }> My Location </Text>
                            <TextInput 
                                style = { styles.TextInput } 
                                placeholder = {item.location}
                                placeholderTextColor = "#000"
                                value = {this.state.location}
                                onChangeText={location => this.setState({location})}
                            />
                            <Text style = { styles.titles }> Category </Text>
                            <Text style ={ styles.data }>{item.category}</Text>
                            <Text style = { styles.titles }> Current Total ($)</Text>
                            <Text style ={ styles.data }>{item.total}</Text>
                            <Text style = { styles.autopost }> Auto - Post </Text>
                            <Switch
                                trackColor={{ false: "#ff0000", true: "#93D17D" }}
                                thumbColor={this.toggleSwitch ? "#ffffff" : "#f4f3f4"}
                                style = {styles.switch}
                                onValueChange = {this.toggleSwitch}
                                value = {this.state.switchValue}
                            />
                            <Text style = { styles.titles }> Estimated Order Date</Text>
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
                                style = { styles.TextInputDesc} 
                                multiline = {true}
                                placeholder = {item.desc}
                                placeholderTextColor = "#000"
                                value = {this.state.desc}
                                onChangeText={desc => this.setState({desc})} 
                            />
                        </View>
                    )}
                    style={styles.container}
                    keyExtractor={item => item.toString()} 
                /> 
                <TouchableOpacity 
                    style = {styles.Button}
                    onPress = {() => {
                        this.addToDB();
                        alert('You have successfully edited the offer!')
                    }}
                >
                    <Text style = {styles.buttonText}> Done </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default EditOffer;

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
        marginTop: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    backbutton: {
        zIndex: 1,
        width: 20,
        height: 20,
        resizeMode: 'stretch',
        position: 'absolute',
        marginTop: 2
    },
    titles: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 20
    },
    data: {
        alignItems: 'stretch',
        marginBottom: 18,
        fontSize: 18,
        marginLeft: 2
    },
    autopost: {
        alignItems: 'stretch',
        marginBottom: 25,
        fontWeight: 'bold',
        fontSize: 20,
    },
    progressText: {
        color: '#ffffff',
        position: 'absolute',
        marginTop: 415,
        zIndex: 1,
        alignSelf: 'center'
    },
    Button: {
        borderColor: '#000000',
        borderWidth: 1,
        alignSelf: 'stretch',
        paddingVertical: 8,
        marginTop: 10,
        marginBottom: 33,
        backgroundColor: '#000000',
        marginHorizontal: 35
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'stretch',
        textAlign: 'center',
        fontWeight: '600'
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
        borderRadius: 5,
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
        textAlign: 'center'
    },
    switch: {
        alignSelf: 'flex-end',
        marginTop: -50,
        marginBottom: 20
    },
});
