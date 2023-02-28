import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";
import Viaja from "../assets/fullViaja.png";
import { textOptions } from "../components/GlobalStyles";
import GreenButton from "../components/buttons/GreenButton";
import LightButton from "../components/buttons/LightButton";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const signUp = "sign up now for safer travel.";
  const createAccountTxt = "create account";
  const loginTxt = "login";

  //navigates to new account screen on button press
  const onCreateAccountPressed = () => {
    navigation.push("NewAccount");
  };

  //navigates to login screen on button press
  const onLoginPressed = () => {
    navigation.push("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={{
            width: height * 0.3,
            height: height * 0.3,
            resizeMode: "cover",
          }}
          source={Viaja}
          resizeMode="contain"
        />
      </View>
      <Text style={textOptions.mediumBoldText}>{signUp}</Text>
      <View style={styles.buttonContainer}>
        <GreenButton text={createAccountTxt} onPress={onCreateAccountPressed} />
        <LightButton text={loginTxt} onPress={onLoginPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  imageContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 50,
  },

  logo: {
    height: 100,
    width: "60%",
    maxHeight: 200,
    maxWidth: 300,
    marginBottom: 20,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default WelcomeScreen;
