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
        color:"black",
        fontWeight:"300"


    },
    BigText:{
        fontSize: moderateScale(30),
        color:"#000000",
        fontWeight:"700"
    }
})

export default GlobalStyles