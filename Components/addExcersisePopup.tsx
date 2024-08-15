import React from "react";
import { Alert, Modal, Pressable, Text, View, TextInput } from "react-native";
import QuantitySelector from "./quantitySelector";
import popupStyles from "../Styles/popupStyles";
import { maxRepsOrSetsAllowed } from "../Utility/global_consts";

export type AddExcersisePopupProp = {
    onSave: Function;
    setModalVisible: any;
    modalVisible: any;
};

const AddExcersisePopup = ({
    onSave,
    setModalVisible,
    modalVisible,
}: AddExcersisePopupProp) => {
    const [text, onChangeText] = React.useState("placeholder");
    const [repsNum, setrepsNum] = React.useState(0);
    const [setsNum, setSetsNum] = React.useState(0);

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={popupStyles.centeredView}>
                    <View style={popupStyles.modalView}>
                        <TextInput
                            placeholder="Enter name"
                            onChangeText={onChangeText}
                        />

                        <QuantitySelector
                            updateCnt={setrepsNum}
                            value={1}
                            minQuantity={1}
                            maxQuantity={maxRepsOrSetsAllowed}
                        />
                        <QuantitySelector
                            updateCnt={setSetsNum}
                            value={1}
                            minQuantity={1}
                            maxQuantity={maxRepsOrSetsAllowed}
                        />
                        <Pressable
                            style={[
                                popupStyles.button,
                                popupStyles.buttonClose,
                            ]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={popupStyles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[
                                popupStyles.button,
                                popupStyles.buttonClose,
                            ]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                onSave(text, repsNum, setsNum);
                            }}
                        >
                            <Text style={popupStyles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddExcersisePopup;
