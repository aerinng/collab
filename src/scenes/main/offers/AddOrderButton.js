import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Switch } from 'react-native';
import { DropDown } from "react-native-material-dropdown"
import { TouchableHighlight } from "react-native-gesture-handler";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated from "react-native-reanimated";


export default class AddOrder extends React.Component {
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);

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
        
        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 45]
        });

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };
        
        return (
            <View>
                <Animated.View style = {[styles.tabButton, sizeStyle]}>
                    <TouchableHighlight onPress = {() => this.handlePress} underlayColor = "#7F58FF">
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome5 name = "plus" size = {24} color = "#000000"/>
                        </Animated.View>
                    </TouchableHighlight>
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
    scrollView: {
        marginHorizontal: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        textAlign: 'center',
    },
    titles: {
        alignItems: 'stretch',
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 15
    },
    TextInput: {
        alignSelf: 'stretch',
        height: 40,
        color: '#fff',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15
    },
    Button: {
        borderColor: '#000000',
        borderWidth: 1,
        alignSelf: 'stretch',
        paddingVertical: 8,
        marginTop: 10,
        backgroundColor: '#000000'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingHorizontal: 125,
        fontWeight: 'bold'
    },
    tabButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 36,
        backgroundColor: "#266E7D",
        marginTop: -50,
        shadowColor: "#266E7D",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    }
  });