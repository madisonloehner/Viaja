import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { parameters } from "../components/GlobalStyles";
import { SearchBar, Divider } from "react-native-elements";
import { Item } from "../components/Item";
import SubHeader from '../components/SubHeader'

export default function FriendsScreen({navigation}) {
  const [userArray, setUserArray] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  //function to retrieve all users from the database
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://us-central1-final-viaja.cloudfunctions.net/user",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setFilteredData(json);
      setUserArray(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

//mounts screen every time the user navigates to it
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers();
    })
    return unsubscribe
  }, [navigation]);

  const itemDivider = () => {
    return <Divider orientation="vertical" />;
  };

  const renderItem = ({ item }) => (
    <Item name={item.name} 
    username={item.username} 
    uid={item.uid} />
  );

  //function to handle the search bar to filter through data in flatlist
  const updateSearch = (text) => {
    if (text) {
      const newData = userArray.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(userArray);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SubHeader onPress = {() => navigation.navigate('SearchFriendsScreen')}/>
        <SearchBar
          containerStyle={{
            backgroundColor: "white",
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
          }}
          inputContainerStyle={{ backgroundColor: "#f3f3f3" }}
          round={true}
          placeholder="Search Users"
          placeholderTextColor="#adadad"
          inputStyle={{ fontSize: 18, color: "#505050" }}
          searchIcon={{ size: 25 }}
          showCancel = {true}
          value={search}
          onChangeText={(text) => updateSearch(text)}
        />
        <View>
          <FlatList
            data={filteredData}
            ItemSeparatorComponent={itemDivider}
            refreshing={true}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
    headerShown: false,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
  },
  listItemContainer: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
