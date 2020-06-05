import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";

class OfferDetails extends React.Component{
    render(){
        const {docID} = this.props.route.params;
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
                    <Text style = { styles.titles }> Category </Text>
                    <Text style = { styles.titles }> Current Total </Text>
                    <Text style = { styles.titles }> Estimated Order Date </Text>
                    <Text style = { styles.titles }> Description </Text>
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
        fontSize: 15
    },
    data: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontSize: 15
    },
});
