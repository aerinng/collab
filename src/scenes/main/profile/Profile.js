import React from 'react';
import { View, StatusBar } from "react-native";

export default Profile = ({ name }) => (
    <View style={{ flex: 1, backgroundColor: "#C5C5C5" }}>
        <StatusBar barStyle="light-content" />
    </View>
);