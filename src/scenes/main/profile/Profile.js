import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from "react-native";

const DATA = [
    {
      id: '1',
      name: 'My Offers',
    },
    {
      id: '2',
      name: 'Settings',
    },
  ];

  function Item({ id, name, image, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[ styles.item, { backgroundColor: selected ? '#77AABA' : '#ffffff' } ]}
      >
        <Text style={styles.detailsTitle}>{name}</Text>
        <Image source = {require('../../../../assets/arrowright.png')} style = {styles.arrow} />
      </TouchableOpacity>
    );
  }

const Profile = ({navigation}) => {
    const [selected, setSelected] = React.useState(null);
    const onSelect = (id) => {
        setSelected(id);
    }
    return (
        <SafeAreaView style = {styles.container}>
            <Image source = {require('../../../../assets/userMask.png')} style = {styles.userIcon}/>
            <Text style = {styles.header}> username </Text>
            <TouchableOpacity style = {styles.Button}>
                <Text style = {styles.buttonTexts}> Edit Profile</Text>
            </TouchableOpacity>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                <Item
                    id={item.id}
                    name={item.name}
                    selected={item.id == selected}
                    onSelect={onSelect}
                />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />
        </SafeAreaView>
    )
};

export default class ProfileScreen extends React.Component {
    render() {
        const {docID} = this.props.route.params;
        return <Profile navigation = {this.props.navigation} />
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      padding: 35,
      flex: 1,
    },
    header: {
        fontSize: 35,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userIcon: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: 70
    },
    Button: {
        backgroundColor: "#fff",
        padding: 10,
        marginHorizontal: 135,
        marginBottom: 20,
        borderRadius: 10,
    },
    buttonTexts: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    item: {
        marginVertical: 10,
        marginHorizontal: 40,
        borderRadius: 15,
    },
    detailsTitle: {
        marginBottom: 0,
        fontSize: 25,
        fontWeight: '600',
        justifyContent: 'center',
        zIndex: 1,
        padding: 25
    },
    arrow: {
        width: 20,
        height: 20,
        position: 'absolute',
        alignSelf: 'flex-end',
        marginTop: 32,
        zIndex: 1,
    },
});
