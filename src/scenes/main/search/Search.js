import React from 'react';
import { View, StatusBar, Text } from "react-native";

export default Search = ({ name }) => (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar barStyle="light-content" />
        <Text>Search</Text>
    </View>
);