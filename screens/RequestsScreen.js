import { View, Text, FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Divider } from 'react-native-elements';
import { FriendItem } from '../components/FriendItem';
import { authentication, db } from '../firebase/firebase-config';
import { getDoc, doc} from 'firebase/firestore';
import SubHeader from '../components/SubHeader';
import { parameters, textOptions } from '../components/GlobalStyles';

export default function RequestsScreen ({navigation}) {
  const [ isLoading, setLoading ] = useState(true);
  const [requestArray, setRequestArray] = useState([]);
  const user = authentication.currentUser;

  const itemDivider = () => {
  return (
  <Divider orientation="vertical" />
  )};

  const renderItem = ({item}) => (
    <FriendItem username = {item.username}
    uid = {item.uid}/>
  );

  //hook to retrieve the friend requests from the database for the logged-in user
  useEffect(() => {
      getRequests();
  });

//function to retrieve array of friend requests sent to the logged in user
const getRequests = async () => {
  setLoading(false)
  const docRef = doc(db, 'users', user.uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const response = docSnap.data().pendingRequest
    setRequestArray(response)
  } else {
    console.log('No such document')
  }
}

  return (
    <SafeAreaView style = {styles.container}>
      <SubHeader onPress = {()=> navigation.goBack()}/>
      <View style = {{paddingLeft: 20, paddingTop: 20}}>
        <Text style = {textOptions.empahsistText}>Friend Requests</Text>
        <View>
          <Text style = {textOptions.usernameText}>confirm requests to allow users to view your last location.</Text>
        </View>
        </View>
       <View>
        <FlatList 
          data = {requestArray}
          ItemSeparatorComponent = {itemDivider}
          refreshing = {true}
          renderItem = {(renderItem)}
          keyExtractor = {(item) => { return item.uid}}
          />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
    headerShown: false,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
  },
});