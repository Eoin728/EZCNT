import React from "react";
import { Alert, Modal, Pressable, Text, View, TextInput } from "react-native";
import QuantitySelector from "./quantitySelector";
import popupStyles from "../Styles/popupStyles";
import { maxRepsOrSetsAllowed } from "../Utility/global_consts";
import { fontstyles } from "../Styles/fonts";

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
  const [repsNum, setrepsNum] = React.useState(1);
  const [setsNum, setSetsNum] = React.useState(1);

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
              onChangeText={onChangeText}
              underlineColorAndroid={"grey"}
              placeholderTextColor={"transparent"}
              placeholder="aaaaaaaa"
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={fontstyles.popup}> reps</Text>
              <QuantitySelector
                updateCnt={setrepsNum}
                value={1}
                minQuantity={1}
                maxQuantity={maxRepsOrSetsAllowed}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={fontstyles.popup}> sets</Text>
              <QuantitySelector
                updateCnt={setSetsNum}
                value={1}
                minQuantity={1}
                maxQuantity={maxRepsOrSetsAllowed}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[popupStyles.button, popupStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={fontstyles.popup}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[popupStyles.button, popupStyles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  onSave(text, repsNum, setsNum);
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

export default AddExcersisePopup;
