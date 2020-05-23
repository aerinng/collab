import 'react-native-gesture-handler';
import * as React from 'react';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View, Button, Image, Animated } from 'react-native';
import AddOrderButton from './src/scenes/main/offers/AddOrderButton';
import AddOrder from './src/scenes/main/offers/AddOrder';
import Profile from './src/scenes/main/profile/Profile';
import Groups from './src/scenes/main/groups/Groups';
import Search from './src/scenes/main/search/Search';
import Chat from './src/scenes/main/chat/Chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TabNavigator = createBottomTabNavigator ({
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-search" color={color} size={26} />
        ),
      }
    },
    Groups: {
      screen: Groups,
      navigationOptions: {
        tabBarIcon: ({ color }) => (
          <FontAwesome name="group" color={color} size={26} />
        ),
      }
    },
    AddOrder: {
      screen: AddOrder,
      navigationOptions: {
        tabBarIcon: <AddOrderButton/> 
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        tabBarIcon: ({ color }) => (
          <AntDesign name="message1" color={color} size={26} />
        ),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#000000",
      inactiveTintColor:  "#C4C4C4",
      labelStyl: { fontSize: 12 },
      tabStyle: { backgroundColor: '#ffffff' }
    }
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
