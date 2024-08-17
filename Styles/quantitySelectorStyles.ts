import { StyleSheet } from "react-native";

const quantitySelectorStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 0,
        padding: 0,
        width: "40%",
    },
    actionButton: {},
    icon: {
        marginRight: 0,
        alignSelf: "center",
    },
    quantityInput: {
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        height: 45,
    },
});

export default quantitySelectorStyle;
