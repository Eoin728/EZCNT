import React from "react";
import { Alert, Modal, Pressable, Text, View, TextInput } from "react-native";
import QuantitySelector from "./quantitySelector";
import popupStyles from "../Styles/popupStyles";

export type AddSomethingPopupProp = {
    onSave: Function;
    setModalVisible: any;
    modalVisible: any;
    needsCounter: boolean;
};

const AddSomethingPopup = ({
    onSave,
    setModalVisible,
    modalVisible,
    needsCounter,
}: AddSomethingPopupProp) => {
    const [text, onChangeText] = React.useState("placeholder");

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

                        {needsCounter && (
                            <QuantitySelector
                                value={0}
                                minQuantity={0}
                                maxQuantity={56}
                            />
                        )}
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
                                onSave(text);
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

export default AddSomethingPopup;
