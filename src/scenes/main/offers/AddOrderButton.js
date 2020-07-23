import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated from "react-native-reanimated";

export default class AddOrderButton extends React.Component {
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);

    // animation for the button
    handlePress = () => {
        Animated.sequence([
            Animated.timing(this.buttonSize, {
                toValue: 0.95,
                duration: 200
            }),
            Animated.timing(this.buttonSize, {
                toValue: 1
            }),
            Animated.timing(this.mode, {
                toValue: this.mode._value === 0 ? 1 : 0
            })
        ]).start();
    };

    render() {
        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };
        
        return (
            <View>
                <Animated.View style = {[styles.tabButton, sizeStyle]}>
                    <TouchableOpacity onPress = {() => this.handlePress} underlayColor = "#266E7D">
                        <Animated.View>
                            <FontAwesome5 name = "plus" size = {24} color = "#ffffff"/>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    AddOrder: {
      alignSelf: 'stretch',
      padding: 30
    },
    tabButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 36,
        backgroundColor: "#266E7D",
        marginTop: -35,
        shadowColor: "#266E7D",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    }
  });