import React from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";

class OfferDetails extends React.Component{
    render(){
        const {docID} = this.props.route.params;
        return (
            <SafeAreaView style = {styles.container}>
                <ScrollView>
                    <View style = {styles.container}>
                        <View>
                            <Text style = {styles.header}> Offer Details </Text>
                        </View>
                    </View>
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
    header: {
        fontSize: 24,
        marginBottom: 18,
        marginTop: 0,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
});
