import { StyleSheet } from "react-native";
import { buttonColour } from "../Utility/global_consts";

const popupStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: "#30363d",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: buttonColour,
    },
    buttonClose: {
        backgroundColor: buttonColour,
    },
    textStyle: {
    fontSize:15,
    fontFamily: "PermanentMarker_400Regular",
    color:'white',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default popupStyles;
