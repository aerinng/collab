import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Image, View, TextInput } from "react-native";
import * as Progress from 'react-native-progress';
import firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { diff } from 'react-native-reanimated';

class JoinOffer extends React.Component {
    state = {
        users: [],
        unsubscribe: '',
        currOrderID: '',
        currTotal: 0.0,
        total: 0.0,
        diff: 0.0
    }

    // fetch offer details data from Cloud Firestore database
    componentDidMount() {
        const {orderID} = this.props.route.params;
        this.setState({currOrderID: orderID})
        console.log(orderID)
        this.state.unsubscribe = firebase.firestore()
                                         .collection("offers")
                                         .doc(orderID)
                                         .get()
                                        . then(snapshot => {
                                                const results = []
                                                results.push(snapshot.data())
                                                this.setState({
                                                    users: results
                                                })
                                        }).catch(err => console.error(err));
    }    

    // unsubscribe from fetching of data from database
    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

        findDiff =() =>{
            firebase.firestore()
            .collection("offers")
            .doc(this.state.currOrderID)
            .get()
            .then(doc => {
                this.setState({
                    diff:((doc.data().max) - (doc.data().total))                   
                }) 
                console.log("diffin JO, ", this.state.diff )
            })

        }

        validateAmount = () => {
            if (this.state.diff < this.state.currTotal){
                alert("Please enter an amount less than the remaining amount!")
            } else {
                if (this.state.currTotal == 0) {
                    alert("Please fill in all mandatory fields!");
                } else if (!this.validateAmt(this.state.currTotal)) {
                    alert("Please input a valid Current Total!");
                } else {
                    this.addToDB();
                    alert('You have successfully joined the offer!');
                }
            }
        }
    //ALTERNATIVELY
        addToDB = () => {
        firebase.firestore()
                .collection("offers")
                .doc(this.state.currOrderID)
                .get()
                .then(doc => {
                    this.setState({total:doc.data().total})
                        firebase.firestore()
                        .collection("offers")
                        .doc(this.state.currOrderID)
                        .update({
                            userJoined: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email),
                            total: parseInt(this.state.total) + parseInt(this.state.currTotal)
                    })
                })

        }

    // validate current total to be only integers
    validateAmt = (amt) => {
        var re = /^\d+(\.\d{1,2})?$/;
          return re.test(amt);
    };

    render(){
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
                            <Text style = {styles.header} > Join Offer </Text>
                        </>
                    }
                    data={this.state.users}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Text style = { styles.titles }> Store Promotion </Text>
                            <Text style = { styles.data }>{item.data}</Text>
                            <Text style = { styles.titles }> Category </Text>
                            <Text style ={ styles.data }>{item.category}</Text>
                            <Text style = { styles.titles }> Remaining Amount </Text>
                            <Text style ={ styles.data }> {this.findDiff()} ${this.state.diff} </Text>                            
                            <Text style = { styles.titles }> Your Current Total ($) </Text>
                            <TextInput 
                                style ={ styles.TextInput }
                                keyboardType = {'numeric'} 
                                onChangeText = {text => this.setState({currTotal: text})}
                            />
                        </View>
                    )}
                    style={styles.container}
                    keyExtractor={item => item.toString()} 
                /> 
                <TouchableOpacity 
                    style = {styles.Button}
                    onPress = {() => {
                        //this.setTotalRequest();
                        this.validateAmount();
                    }}
                >
                    <Text style = {styles.buttonText}> Done </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default JoinOffer;

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
});