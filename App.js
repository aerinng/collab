import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

// scenes imports
import AddOrderButton from './src/scenes/main/offers/AddOrderButton';
import Login from './src/scenes/login/Login';
import Signup from './src/scenes/login/Signup';
import SignupGoogle from './src/scenes/login/SignupGoogle';
import PreferenceGoogle from './src/scenes/login/PreferenceGoogle';
import Preference from './src/scenes/login/Preference';
import ForgetPassword from './src/scenes/login/ForgetPassword';
import Profile from './src/scenes/main/profile/Profile';
import Groups from './src/scenes/main/groups/Groups';
import GroupsDetails from './src/scenes/main/groups/GroupsDetails';
import Search from './src/scenes/main/search/Search';
import Chat from './src/scenes/main/chat/Chat';
import ChatRoom from './src/scenes/main/chat/ChatRoom';
import StorePromo from './src/scenes/main/offers/StorePromo'
import AddOrder from './src/scenes/main/offers/AddOrder'
import Splash from './src/components/Splash';
import OfferDetails from './src/scenes/main/offers/OfferDetails';
import EditOffer from './src/scenes/main/offers/EditOffer';
import OfferDetailsJoin from './src/scenes/main/offers/OfferDetailsJoin';
import JoinOffer from './src/scenes/main/offers/JoinOffer';
import EditProfile from './src/scenes/main/profile/EditProfile';
import MyOffers from './src/scenes/main/profile/MyOffers';
import MyOffersReceived from './src/scenes/main/profile/MyOffersReceived';
import OfferDetailsCancel from './src/scenes/main/profile/OfferDetailsCancel';
import OfferDetailsReceived from './src/scenes/main/profile/OfferDetailsReceived';
import Settings from './src/scenes/main/profile/Settings';
import ChangePassword from './src/scenes/main/profile/ChangePassword';
import AddGroups from './src/scenes/main/groups/AddGroups';

// icons imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// firebase
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode } 

//API key for configuration
var firebaseConfig = {
    apiKey: "AIzaSyCjbiA-yf0xWjpk2EjnIMlDxOdq2RsKSug",
    authDomain: "collab-8af51.firebaseapp.com",
    databaseURL: "https://collab-8af51.firebaseio.com",
    projectId: "collab-8af51",
    storageBucket: "collab-8af51.appspot.com",
    messagingSenderId: "688778678705",
    appId: "1:688778678705:web:97a9bcc682a22bd4512d90",
    measurementId: "G-B2P2PYGRCX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

//User navigated to Login page by default
const Root = createStackNavigator();
const RootScreen = () => (
<Root.Navigator 
  screenOptions = {{
    gestureEnabled: true,
    headerShown: false 
  }}
>    
  <Root.Screen name = "Login" component = {Login} />
  <Root.Screen name = "Tabs" component = {TabNavigator} />
  <Root.Screen name = "ForgetPassword" component = {ForgetPassword}/>
  <Root.Screen name = "SignUpScreen" component = {SignUpScreens}/>
  <Root.Screen name = "SignUpGoogleScreens" component = {SignUpGoogleScreens}/>
</Root.Navigator>
);

const SignUpStack = createStackNavigator();
function SignUpScreens(props) {
  return (
    <SignUpStack.Navigator
      initialRouteName = "Signup"
      screenOptions = {{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <SignUpStack.Screen name = "Signup" component = {Signup} initialParams={props.route.params}/>
      <SignUpStack.Screen name = "Preferences" component = {Preference} initialParams={props.route.params}/> 
    </SignUpStack.Navigator>
  )
}

const SignUpGoogleStack = createStackNavigator();
function SignUpGoogleScreens(props) {
  return (
    <SignUpGoogleStack.Navigator
      initialRouteName = "SignupGoogle"
      screenOptions = {{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <SignUpGoogleStack.Screen name = "SignupGoogle" component = {SignupGoogle} initialParams={props.route.params}/>
      <SignUpGoogleStack.Screen name = "PreferenceGoogle" component = {PreferenceGoogle} initialParams={props.route.params}/> 
    </SignUpGoogleStack.Navigator>
  )
}

// bottom tabs with Search, Groups, Offer, Chat, Profile
const Tab = createBottomTabNavigator();
const TabNavigator = (props) => (
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
      <Tab.Screen name = "Search" component = {OfferDetailsScreen} initialParams={props.route.params}/>
      <Tab.Screen name = "Groups" component = {GroupsScreens} initialParams={props.route.params}/>
      <Tab.Screen name = "Offer" component = {Offers} initialParams={props.route.params}/>
      <Tab.Screen name = "Chat" component = {ChatStackScreen} initialParams={props.route.params}/>
      <Tab.Screen name = "Profile" component = {ProfileScreen} initialParams={props.route.params}/>
  </Tab.Navigator>
);
//^ initialParams to pass over the docID to these pages 

const GroupsStack = createStackNavigator();
function GroupsScreens(props) {
  return (
    <GroupsStack.Navigator
      initialRouteName = "GroupsScreen"
      screenOptions = {{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <GroupsStack.Screen name = "GroupsScreen" component = {Groups} initialParams={props.route.params}/>
      <GroupsStack.Screen name = "AddGroups" component = {AddGroups} initialParams={props.route.params}/>
      <GroupsStack.Screen name = "GroupsDetails" component = {GroupsDetails} initialParams={props.route.params}/>
      <GroupsStack.Screen name = "OfferDetails" component = {OfferDetails} initialParams={props.route.params} />
      <GroupsStack.Screen name = "EditOffer" component = {EditOffer} initialParams={props.route.params} />
      <GroupsStack.Screen name = "OfferDetailsJoin" component = {OfferDetailsJoin} initialParams={props.route.params} />
      <GroupsStack.Screen name = "JoinOffer" component = {JoinOffer} initialParams={props.route.params} />
    </GroupsStack.Navigator>
  )
}

const OffersStack = createStackNavigator();
function Offers(props) {
  return (
    <OffersStack.Navigator
      initialRouteName = "StorePromo"
      screenOptions = {{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <OffersStack.Screen name = "StorePromo" component = {StorePromo} initialParams={props.route.params}/>
      <OffersStack.Screen name = "AddOrder" component = {AddOrder} initialParams={props.route.params}/>
    </OffersStack.Navigator>
  );
}

const OfferDetailsStack = createStackNavigator();
const OfferDetailsScreen = (props) => (
  <OfferDetailsStack.Navigator
    initialRouteName = "Search"
    screenOptions = {{
      gestureEnabled: true,
      headerShown: false
    }}
  >
    <OfferDetailsStack.Screen name = "Landing" component = {Search} initialParams={props.route.params} />
    <OfferDetailsStack.Screen name = "OfferDetails" component = {OfferDetails} initialParams={props.route.params} />
    <OfferDetailsStack.Screen name = "EditOffer" component = {EditOffer} initialParams={props.route.params} />
    <OfferDetailsStack.Screen name = "OfferDetailsJoin" component = {OfferDetailsJoin} initialParams={props.route.params} />
    <OfferDetailsStack.Screen name = "JoinOffer" component = {JoinOffer} initialParams={props.route.params} />
  </OfferDetailsStack.Navigator>
);

const ProfileScreenStack = createStackNavigator();
function ProfileScreen(props) {
  return (
    <ProfileScreenStack.Navigator
      initialRouteName = "Profile"
      screenOptions = {{
        gestureEnabled: true,
      }}
    >
      <ProfileScreenStack.Screen name = "Profile" component = {Profile} options = {{headerShown: false}}initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "EditProfile" component = {EditProfile} options = {{headerShown: false}} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "MyOffers" component = {MyOffersScreen} 
        options = {{title: "My Offers", headerTitleStyle: {fontSize: 24, fontWeight: 'bold'}, headerTintColor: "#000"}} 
        initialParams={props.route.params}
      />
      <ProfileScreenStack.Screen name = "OfferDetailsCancel" component = {OfferDetailsCancel} options = {{headerShown: false}} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "OfferDetailsReceived" component = {OfferDetailsReceived} options = {{headerShown: false}} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "Settings" component = {Settings} options = {{headerShown: false}} initialParams={props.route.params}/>
      <ProfileScreenStack.Screen name = "ChangePassword" component = {ChangePassword} options = {{headerShown: false}} initialParams={props.route.params}/>
    </ProfileScreenStack.Navigator>
  );
}
const MyOffersScreenStack = createMaterialTopTabNavigator();
function MyOffersScreen(props) {
  return (
    <MyOffersScreenStack.Navigator
      initialRouteName = "Requested"
      tabBarOptions = {{
        showLabel: true,
        activeTintColor: "#266E7D",
        inactiveTintColor:  "#C4C4C4",
        indicatorStyle: { backgroundColor: "#266E7D", },
        labelStyle: { fontSize: 18, fontWeight: '500' },
        tabStyle: { marginTop: 0 },
      }}
    >
      <MyOffersScreenStack.Screen name = "Requested" component = {MyOffers} initialParams={props.route.params}/>
      <MyOffersScreenStack.Screen name = "Received" component = {MyOffersReceived} initialParams={props.route.params}/>
    </MyOffersScreenStack.Navigator>
  );
}

const ChatStack = createStackNavigator();
function ChatStackScreen(props) {
  return (
    <ChatStack.Navigator
      initialRouteName = "ChatScreen"
      screenOptions = {{
        gestureEnabled: true,
      }}
    >
      <ChatStack.Screen 
        name = "ChatScreen" 
        component = {Chat} 
        options = {{headerShown: false, title: "Chats"}} 
        initialParams={props.route.params}
      />
      <ChatStack.Screen 
        name = "ChatRoom" 
        component = {ChatRoom} 
        initialParams={{route: props.route.params}}
        options={({route}) => ({title: route.params.threads.name,
          headerTitleStyle: {fontSize: 24, fontWeight: 'bold'}, 
          headerTintColor: "#000"})}
      />
    </ChatStack.Navigator>
  )
}

//onStateChange for own debugging purposes, not required for the application
function Navigation() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer 
      //onStateChange={(state) => console.log('New state is', state)}
    >
      <RootScreen/> 
    </NavigationContainer>
  );
};;

export default Navigation;