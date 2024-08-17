import React from "react";
import { Alert, Modal, Pressable, Text, View, TextInput } from "react-native";
import popupStyles from "../Styles/popupStyles";

export type AddSomethingPopupProp = {
    onSave: Function;
    setModalVisible: any;
    modalVisible: any;
    keyboardNumberOnly:boolean;
};

const AddSomethingPopup = ({
    onSave,
    setModalVisible,
    modalVisible,
    keyboardNumberOnly,
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
                        inputMode={keyboardNumberOnly? "numeric":"text"}
                            onChangeText={onChangeText}
                            underlineColorAndroid={'grey'} 
                            placeholderTextColor={'transparent'}
                            placeholder="aaaaaaaa"
                        />

<View style= {{flexDirection:'row'}}>
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
                </View>
            </Modal>
        </View>
    );
};

export default AddSomethingPopup;
