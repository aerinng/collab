import React from 'react';
import { View, StatusBar, StyleSheet, Text } from "react-native";

export default Chat = ({ name }) => (
    <View style = {styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
            <Text>
                Chat
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
