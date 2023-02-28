import MapView from "react-native-maps";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { parameters, textOptions } from "../components/GlobalStyles";
import { authentication } from "../firebase/firebase-config";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { getFunctions, httpsCallable } from "firebase/functions";

export default function HomeScreen() {
  const [locationResult, setLocation] = useState("");
  const [mapRegion, setRegion] = useState(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState("");
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const functions = getFunctions();
  const navigation = useNavigation();

  useEffect(() => {
    CheckIfLocationEnabled();
    askPermission();
  }, []);

  useEffect(() => {
    setButtonPressed(false);
  }, [buttonPressed]);

  //shows alert before user's location is logged
  const showAlert = () => {
    if (buttonPressed === false) {
      Alert.alert(
        "Do you want to check-in?",
        "Selecting confirm will share your current location with friends.",
        [
          { text: "confirm", onPress: () => setButtonPressed(true) },
          { text: "cancel" },
        ],
        { cancelable: false }
      );
    }
  };
  //checks if location services have been enabled on the device
  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    console.log(enabled);
    if (enabled === false) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services in settings to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else if (enabled === true) {
      setLocationPermission(enabled);
    }
  };

  //asks location permissions if not already given, returns user's current location in address form
  const askPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
    if (status === "granted" && user.displayName === null) {
      Alert.alert(
        "Welcome, amigo!",
        "Set up your profile to start using Viaja.",
        [
          {
            text: "set up profile",
            onPress: () =>
              navigation.navigate("ProfileTab", {
                screen: "EditProfileScreen",
              }),
          },
        ],
        {
          cancelable: false,
        }
      );
    } else if (status && user.displayName) {
      let { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        for (let item of response) {
          let address = `${item.streetNumber} ${item.street} \n${item.region} ${item.postalCode}`;
          setDisplayCurrentAddress(address);
          console.log(displayCurrentAddress);
        }
        setLocation(JSON.stringify({ latitude, longitude }));
        console.log(locationResult);
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else if (coords === null || coords === "") {
        console.log("can not find current location");
      }
    }
  };

  //function to call API and add location information to firestore on button click
  const logLocation = httpsCallable(functions, "addLocation");
  const user = authentication.currentUser;
  if (
    displayCurrentAddress !== null &&
    displayCurrentAddress !== "" &&
    buttonPressed === true
  ) {
    logLocation({
      location: displayCurrentAddress,
      uid: user.uid,
      username: user.displayName,
    }).catch((error) => {
      console.log(error);
    });
  } else {
    console.log("No new location to record.");
  }
  //function to determine if the current user has set up a profile. If not, the user
  //is alerted and navigated to the edit profile screen to finish set up
  // const setUpProfile = async () => {
  //   if (user.displayName === null) {
  //     Alert.alert(
  //       "Welcome, amigo!",
  //       "Set up your profile to start using Viaja.",
  //       [
  //         {
  //           text: "set up profile",
  //           onPress: () =>
  //             navigation.navigate("ProfileTab", {
  //               screen: "EditProfileScreen",
  //             }),
  //         },
  //       ],
  //       {
  //         cancelable: false,
  //       }
  //     );
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.openDrawer()} />
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={mapRegion}
          onRegionChangeComplete={(region) => setRegion(region)}
          style={styles.mapStyle}
          customMapStyleId={"375f3b09bd66623a"}
          zoom={30}
          userLocationUpdateInterval={50000}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          loadingEnabled={true}
        ></MapView>
      </View>
      <View style={styles.textContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={textOptions.locationHeadingText}>
            My Current Location
          </Text>
        </View>
        <View>
          <Text style={textOptions.locationText}>{displayCurrentAddress}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={showAlert}>
          <Text style={styles.buttonTxt}>check in</Text>
        </TouchableOpacity>
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

  textContainer: {
    flex: 2,
    justifyContent: "center",
    resizeMode: "contain",
    alignContent: "center",
  },

  button: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#05B479",
    borderRadius: 25,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },

  buttonTxt: {
    fontSize: 16,
    color: "white",
    letterSpacing: 2,
    fontWeight: "bold",
  },

  buttonContainer: {
    paddingHorizontal: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  mapContainer: {
    flex: 8,
  },

  mapStyle: {
    height: "100%",
    alignSelf: "stretch",
  },
});
