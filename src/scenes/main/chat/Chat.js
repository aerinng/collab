import React, {useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from "react-native";
import { GorgeousHeader } from "@freakycoder/react-native-header-view";
//import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';

const DATA = [
    {
      id: '1',
      name: 'Jane Doe',
      message: "Thank you! It's a pleasure :D",
      image: require('../../../../assets/female.png'),
      time: "9.05pm"
    },
    {
      id: '2',
      name: 'John Doe',
      message: "Will inform you again :)",
      image: require('../../../../assets/male.png'),
      time: "2.45pm"
    },
  ];


  function Item({ id, name, message, time, image, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[styles.item]}
      >
        <Text style = {styles.detailsTime}>{time}</Text>
        <Text style={styles.detailsTitle}>{name}</Text>
        <Text style={styles.details}>{message}</Text>
        <Image source = {image} style = {styles.icons} />
      </TouchableOpacity>
    );
  }

const Chat = ({navigation}) => {
  const [selected, setSelected] = React.useState(null);
  const onSelect = (id) => {
      setSelected(id);
  }
    return (
        <SafeAreaView style = {styles.container}>
            <GorgeousHeader
                title = "Chats"
                subtitle = ""
                menuImageStyle = {{resizeMode: 'stretch', width: 0, height: 0}}
                profileImageSource = {require('../../../../assets/edit.png')}
                profileImageStyle = {{marginTop: -5, resizeMode: 'stretch', width: 25, height: 25}}
                profileImageOnPress = {() => navigation.navigate('Chat')}
                titleTextStyle = {{fontSize: 30, fontWeight: '600', marginTop: -55, alignSelf: 'center', borderRadius:15}}
                searchBarStyle = {{backgroundColor: '#ffffff', borderRadius: 15, padding: 10}}
                searchInputStyle ={{marginLeft: 30, marginTop: -20}}
            />
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    message = {item.message}
                    image = {item.image}
                    time = {item.time}
                    selected={item.id == selected}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>
    )
}

export default class ChatScreen extends React.Component {
    render() {
        //const {docID} = this.props.route.params;
        return <Chat navigation = {this.props.navigation} />
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1
    },
    header: {
        fontSize: 30,
        marginBottom: 18,
        fontWeight: '600',
        alignItems: 'center',
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 40,
        marginVertical: 8
    },
    detailsTitle: {
        marginLeft: 130,
        marginTop: -10,
        fontSize: 20,
        fontWeight: '500',
        paddingBottom: 5,
        paddingRight: 30
    },
    details: {
        marginLeft: 130,
        fontSize: 15,
        paddingRight: 30,
        marginTop: 5,
        color: '#696969'
    },
    detailsTime: {
        fontSize: 15,
        marginTop: -15,
        marginRight: 15,
        alignSelf: 'flex-end',
        color: '#696969'
    },
    icons: {
        position: 'absolute',
        width: 100,
        height: 100,
        marginTop: 15,
        paddingLeft: 5,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 50,
        marginLeft: 15,
    },
});
