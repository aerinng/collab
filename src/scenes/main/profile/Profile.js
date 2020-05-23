import React from 'react';
import { View, StatusBar, StyleSheet, Text } from "react-native";

export default Profile = ({ name }) => (
    <View style = {styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
            <Text>
                Profile
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
