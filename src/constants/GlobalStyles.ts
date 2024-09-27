import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161616",
        // alignItems: "center",
        // justifyContent: "center",
    },
    text: {
        fontSize: moderateScale(15),
        color:"#ffffff",
        fontWeight:"300"


    },
    BigText:{
        fontSize: moderateScale(30),
        color:"#ffffff",
        fontWeight:"700"
    }
})

export default GlobalStyles