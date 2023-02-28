import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { parameters, textOptions } from "../components/GlobalStyles";
import PlainHeader from "../components/PlainHeader";
import { authentication, db } from "../firebase/firebase-config";
import { getDoc, doc } from "firebase/firestore";
import { Divider } from "react-native-elements";
import { LocationFeedItem } from "../components/LocationFeedItem";
import moment from "moment";

export default function LocationScreen() {
  const user = authentication.currentUser;
  const moment = require("moment");
  const [friends, setFriends] = useState([]);
  const [accessedPosts, setAccessedPosts] = useState([]);

  //function to retrieve user's friend list, iterate through each uid
  //to find location information according to the id
  const getFriendsList = async () => {
    let postsList = [];
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const response = docSnap.data().friends;
        setFriends(response);
        if (friends) {
          for (let i = 0; i < friends.length; i++) {
            const ref = doc(db, "locations", friends[i]);
            const snap = await getDoc(ref);
            if (snap.exists()) {
              postsList.push(snap.data());
            }
          }
          setAccessedPosts(postsList);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //hook to render state, calls function
  useEffect(() => {
    getFriendsList();
  }, [accessedPosts]);

  //using component to separate state. Reformats the timestamp to a more readable format for the location feed.
  const renderItem = ({ item }) => (
    <LocationFeedItem
      location={item.location}
      username={item.username}
      time={moment(item.time.toDate().toString()).format("MMMM DD YYYY")}
      clockTime={moment(item.time.toDate().toString()).fromNow()}
      key={item.uid}
    />
  );

  const itemDivider = () => {
    return <Divider orientation="vertical" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <PlainHeader />
      <View style={{ padding: 20 }}>
        <Text style={textOptions.empahsistText}>Location Feed</Text>
      </View>
      <View>
        <FlatList
          data={accessedPosts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={true}
          ItemSeparatorComponent={itemDivider}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: parameters.statusBarHeight,
    headerShown: false,
  },
});
