import React from 'react';
import { View, StyleSheet, Image } from "react-native";

export default Splash = () => (
    <View style = {styles.container}>
        <Image 
            style = {styles.image}
            source = {require('../../assets/collab.png')}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      backgroundColor: '#ffffff',
      flex: 1
    },
    image: {
        resizeMode: 'contain',
        width: 200,
        height: 200,
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1
    },
  
});