import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import  BasicHeader from '../components/BasicHeader';
import { useEffect, useState } from 'react'
import { Avatar} from 'react-native-elements';
import { textOptions } from '../components/GlobalStyles';
import { Divider } from 'react-native-elements';
import { authentication, db } from '../firebase/firebase-config';
import { getDoc, doc} from 'firebase/firestore';
import moment from 'moment';

export default function ProfileScreen ({navigation}) {
const user = authentication.currentUser;
const moment = require('moment');
const [ isLoading, setLoading ] = useState(true);
const [checkin, setCheckin]= useState(false)
const [location, setLocation] = useState('');
const [ time, setTime ] = useState('');
const [ date, setDate ] = useState('');
const [fromNow, setFromNow] = useState('');

//function to retrieve location information about the logged in user
const getLocations = async () => {
  try {
const docfRef = doc(db, 'locations', user.uid)
const docSnap = await getDoc(docfRef)
  if(docSnap.exists()){
  setLoading(false)
  setCheckin(true)
  const l = docSnap.data().location;
  const t = docSnap.data().time.toDate().toString();
  const formatTime = moment(t).format("hh:mm A")
  const date = moment(t).format("MMMM DD, YYYY")
  const f = moment(t).fromNow()
    setLocation(l)
    setTime(formatTime)
    setDate(date)
    setFromNow(f)
    return
  }  else {
  console.log('no location data to record')
  }
} catch(error){
  console.log(error)
}
};

//hook to mount component each time the screen is navigated to
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getLocations();
  })
  return unsubscribe
}, [navigation])

return (
    <SafeAreaView style = {styles.container}>
      <BasicHeader onPress={() => navigation.navigate('RequestsScreen')}/>
      <View style = {styles.bottomContainer}>
        <Avatar
          size = {150}
          rounded 
          containerStyle = {{paddingTop: 10}}
          source = {require('../assets/profile.png')}/>
          <Text style = {textOptions.usernameText}>{user.displayName}</Text>
      </View>
      <View style = {{paddingLeft: 20, flexDirection: 'row'}}>
        <Text style = {textOptions.empahsistText}>My Last Check-In</Text>
      </View>
      <Divider/>
      <View style = {{padding: 20}}>
      <Text style = {textOptions.nameText}>{date}</Text>
        <Text style = {textOptions.checkIn}>{location}</Text>
        <Text style = {textOptions.nameText}>{fromNow}</Text>
      </View>
      <Divider/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }, 
  bottomContainer: {
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },

  headerStyle: {
    backgroundColor: 'white', 
    alignItems: 'flex-start', 
    marginTop: 10,
    padding: 10, 
    width: '70%', 
    borderTopRightRadius: 25, 
    borderBottomRightRadius: 25
  }
})