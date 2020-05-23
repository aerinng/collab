import React from 'react';
import { View, StatusBar, StyleSheet, Text } from "react-native";

export default Groups = ({ name }) => (
    <View style = {styles.container}>
        <View>
            <Text>
                Groups
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
    },
});
