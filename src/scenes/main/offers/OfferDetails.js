import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import * as Progress from 'react-native-progress';

class OfferDetails extends React.Component{
    render(){
        //const {name} = this.props.route.params;
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <Text style = {styles.header}> Offer Details </Text>
                    <Text style = { styles.titles }> Store Promotion </Text>
                    <Text style = { styles.data }>Fairprice - Free delivery with purchase above $79</Text>
                    <Text style = { styles.titles }> My Location </Text>
                    <Text style = { styles.data }>Block 123 Choa Chu Kang Avenue 10 S123456 </Text>
                    <Text style = { styles.titles }> Category </Text>
                    <Text style = { styles.data }>Groceries</Text>
                    <Text style = { styles.titles }> Current Total </Text>
                    <Text style = { styles.data }>$10</Text>
                    <Text style = { styles.titles }> Progress </Text>
                    <Text style = {styles.progressText}>33% of $79.00</Text>
                    <Progress.Bar 
                        progress={0.33} width={330} height ={30} borderRadius = {15} 
                        color = '#93D17D' borderColor = '#ffffff' unfilledColor = '#C4C4C4' 
                        style = {{marginBottom: 15, alignSelf: 'center'}}
                    />
                    <Text style = { styles.titles }> Estimated Order Date </Text>
                    <Text style = { styles.data }>20 July 2020</Text>
                    <Text style = { styles.titles }> Description </Text>
                    <Text style = { styles.data }>Will be buying very soon!</Text>
                    <TouchableOpacity style = {styles.Button}>
                        <Text style = {styles.buttonText}> Edit </Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
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
