import React from 'react';
import { View, StyleSheet, Text, FlatList ,ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native";
import firebase from 'firebase';
 

class OfferDetails extends React.Component{
    state = {
        users:null
    }

    render(){
        //Displaying the order details --> but causes warning 
        // var user = firebase.auth().currentUser; 
        // firebase.firestore().collection('info').doc(user.uid).get()
        // .then(sth => {
        //         const results = []
        //         results.push(sth.data())
        //         this.setState({
        //             users: results
        //         })
        //     }
        // )
        // .catch(err => console.error(err))


        return (
            // // <SafeAreaView style = {styles.container}>
            //     // <ScrollView style={styles.scrollView}>
                
            // <FlatList
            // ListHeaderComponent={
            //     <>
            //     <TouchableOpacity  
            //             style = {styles.backbutton}
            //             onPress={() => this.props.navigation.goBack()}
            //         >     
            //              <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
            //         </TouchableOpacity>
            //         <Text style = {styles.header} > Offer Details </Text>
            //         </>
            // }
            // data={this.state.users}
            // renderItem={({item}) => (
            // <View style={styles.itemContainer}>
            // <Text style = { styles.titles }> Store Promotion </Text>
            // <Text style = { styles.data }>Fairprice - Free delivery with purchase above $79</Text>
            // <Text>{item.promo}</Text>
            // <Text style = { styles.titles }> My Location </Text>
            // <Text style ={ styles.data}>{item.location}</Text>  
            // <Text style = { styles.titles }> Category </Text>
            // <Text style ={ styles.data }>{item.category}</Text>
            // <Text style = { styles.titles }> Current Total </Text>
            // <Text style ={ styles.data }>{item.total}</Text>
            // <Text style = { styles.titles }> Estimated Order Date </Text>
            // <Text style ={ styles.data }>{item.date}</Text>
            // <Text style = { styles.titles }> Description </Text>           
            // <Text style ={ styles.data }>{item.desc}</Text>
            //     </View>)}
            // style={styles.container}
            // keyExtractor={item => item.email} />
            //     //  {/* </ScrollView> */}
            // //  </SafeAreaView>




            <SafeAreaView style = {styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity  
                        style = {styles.backbutton}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image source = {require('../../../../assets/arrow.png')} style = {styles.backbutton}/>
                    </TouchableOpacity>
                    <Text style = {styles.header} > Offer Details </Text>
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
        fontSize: 15,
        padding:5
    },
});
