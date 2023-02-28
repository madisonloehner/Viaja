import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { parameters, textOptions } from "../components/GlobalStyles";
import SearchHeader from "../components/SearchHeader";
import { Divider } from "react-native-elements";
import AcceptedFriends from "../components/AcceptedFriends";
import { getDoc, doc } from "firebase/firestore";
import { db, authentication } from "../firebase/firebase-config";

const SearchFriendsScreen = ({navigation}) => {
    const [friends, setFriends] = useState([]);
    const user = authentication.currentUser

    //function to retrieve all of a user's friends 
    const getFriends = async () => {
        const docRef = doc(db, 'friends', user.uid)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) {
            const response = docSnap.data().friendslist
            setFriends(response)
        } else {
            console.log('no such document')
        }
    }
      const itemDivider = () =>{
        return (
        <Divider orientation="vertical" />
        )};
      
        useEffect(() => {
          getFriends();
        });
      
      const renderItem = ({item}) => (
        <AcceptedFriends 
            username = {item.username}
            uid = {item.uid}/>
      );

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader onPress = {()=> navigation.navigate('FriendsScreen')}/>
      <View style = {{padding: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style = {textOptions.empahsistText}>My Friends</Text>   
      </View>   
      <View>
        <FlatList
          data = {friends}
          ItemSeparatorComponent = {itemDivider}
          refreshing = {true}
          renderItem = {(renderItem)}
          keyExtractor = {(item) => { return item.uid}}
          />
        </View>
    </SafeAreaView>
  );
};

export default SearchFriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
    headerShown: false,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
  },
});
