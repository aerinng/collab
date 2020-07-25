import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, Image, View} from "react-native";
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';

class OfferDetails extends React.Component {
    state = {
        users:null,
        unsubscribe:''
    }

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
                                                this.setState({
                                                    users: results
                                                })
                                        })
                                        .catch(err => console.error(err));
    }    

    // unsubscribe from fetching data from database
    componentWillUnmount() {
        var unsubscribe = this.state.unsubscribe;
        unsubscribe;
    }

    render(){
        const {orderID} = this.props.route.params;
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
                            <Text style = {styles.header} > Offer Details </Text>
                        </>
                    }
                    data={this.state.users}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Text style = { styles.titles }> Store Promotion </Text>
                            {/* <Text style = { styles.data }>Fairprice - Free delivery with purchase above $79</Text> */}
                            <Text style = { styles.data }>{item.data}</Text>
                            <Text style = { styles.titles }> My Location </Text>
                            <Text style ={ styles.data}>{item.location}</Text>  
                            <Text style = { styles.titles }> Category </Text>
                            <Text style ={ styles.data }>{item.category}</Text>
                            <Text style = { styles.titles }> Current Total ($)</Text>
                            <Text style ={ styles.data }>{item.total}</Text>
                            <Text style = { styles.titles }> Progress </Text>
                            <Progress.Bar 
                                progress={0.33} width={330} height ={30} borderRadius = {15} 
                                color = '#93D17D' borderColor = '#ffffff' unfilledColor = '#C4C4C4' 
                                style = {{marginBottom: 15, alignSelf: 'center'}}
                            />
                            <Text style = { styles.titles }> Estimated Order Date </Text>
                            <Text style ={ styles.data }>{item.date.toString()}</Text>
                            <Text style = { styles.titles }> User </Text>           
                            <Text style ={ styles.data }>{item.user}</Text>  
                            <Text style = { styles.titles }> Description </Text>           
                            <Text style ={ styles.data, {marginBottom: 50} }>{item.desc}</Text>
                        </View>
                    )}
                    style={styles.container}
                    keyExtractor={item => item.toString()} 
                /> 
                <TouchableOpacity 
                    style = {styles.Button}
                    onPress = {() => this.props.navigation.navigate('EditOffer', {orderID: orderID, result: result})}
                >
                    <Text style = {styles.buttonText}> Edit </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default OfferDetails;

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
    scrollView: {
        padding: 30,
        marginVertical: 10,
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
});
