import React from 'react';
import { View, StatusBar, StyleSheet, Text } from "react-native";

export default Search = ({ name }) => (
    <View style = {styles.container}>
        <View>
            <Text>
                Search
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
