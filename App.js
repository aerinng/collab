import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddOrderButton from './src/scenes/main/offers/AddOrderButton';
import AddOrder from './src/scenes/main/offers/AddOrder';
import Login from './src/scenes/login/Login';
import Signup from './src/scenes/login/Signup';
>>>>>>> Redid Bottom Tab Navigators and Added Stack Navigators, Pending Navigation Logic
>>>>>>> Redid Bottom Tab Navigators and Added Stack Navigators, Pending Navigation Logic
>>>>>>> Redid Bottom Tab Navigators and Added Stack Navigators, Pending Navigation Logic
import Profile from './src/scenes/main/profile/Profile';
import Groups from './src/scenes/main/groups/Groups';
import Search from './src/scenes/main/search/Search';
import Chat from './src/scenes/main/chat/Chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

// if user has account, navigate to Login page,
// else, navigate to Signup page
const Root = createStackNavigator();
const RootScreen = ({gotAccount}) => (
  <Root.Navigator 
    screenOptions = {{
      gestureEnabled: true,
      headerShown: false 
    }}
  > 
    { false ? (
      <Root.Screen name = "App" component = {StackNavigator} />
    ) : (
      <Root.Screen name = "Signup" component = {Signup} />
    )}
  </Root.Navigator>
);

// if user has logged in successfully, navigate to Home page with bottom tabs,
// else, navigation to Login page
const Stack = createStackNavigator();
const StackNavigator = ({isSignedIn}) => (
  <Stack.Navigator
    screenOptions = {{
      gestureEnabled: true,
      headerShown: false 
    }}
  > 
    { true ? (
      <Stack.Screen name = "Tabs" component = {TabNavigator} />
    ) : (
      <Stack.Screen name = "Login" component = {Login} />
    )}
  </Stack.Navigator>
);

// bottom tabs with Search, Groups, Offer, Chat, Profile
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator
      screenOptions = {({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name == 'Search') {
            iconName = focused ? "search" : "search";
          } else if (route.name == 'Groups') {
            iconName = focused ? "group" : "group";
          } else if (route.name == 'Offer') {
            return <AddOrderButton/>;
          } else if (route.name == 'Chat') {
            return <AntDesign name="message1" color={color} size={26} />;
          } else if (route.name == 'Profile') {
            return <MaterialCommunityIcons name="account" color={color} size={26} />;
          } 
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions = {{
        showLabel: true,
        activeTintColor: "#266E7D",
        inactiveTintColor:  "#C4C4C4",
        labelStyle: { fontSize: 12 },
        tabStyle: { backgroundColor: '#ffffff' }
      }}
      >
      <Tab.Screen name = "Search" component = {Search} />
      <Tab.Screen name = "Groups" component = {Groups} />
      <Tab.Screen name = "Offer" component = {AddOrder} />
      <Tab.Screen name = "Chat" component = {Chat} />
      <Tab.Screen name = "Profile" component = {Profile} />
  </Tab.Navigator>
);

const Navigation = () => {
  // need check how use this
  // const [isSignedIn, setSignedIn] = React.useState(true);
  // const [hasAccount, setAccount] = React.useState(true);
  return (
    <NavigationContainer>
      <RootScreen gotAccount = {'false'} /> 
    </NavigationContainer>
  );
};;

export default Navigation;
