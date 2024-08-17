import React from "react";
import { Text, View } from "react-native";
import { Card } from "@rneui/themed";
import QuantitySelector from "../Components/quantitySelector";
import {
  deleteRecord,
  Excersise,
  ExcersiseTable,
  updateExcersisesRepCount,
  updateExcersisesSetCount,
} from "../Utility/database";
import { buttonColour, maxRepsOrSetsAllowed } from "../Utility/global_consts";
import { Button } from "react-native-elements";
import { fontstyles } from "../Styles/fonts";

export type ExcersiseProps = {
  info: Excersise;
  updatePar: Function;
};

const ExcersiseComponent = ({ info, updatePar }: ExcersiseProps) => {
  const updateRepCount = async (newRepCount: number) => {
    updateExcersisesRepCount(info.Id, newRepCount);
  };

  const updateSetCount = async (newSetCount: number) => {
    updateExcersisesSetCount(info.Id, newSetCount);
  };

  return (
    <Card containerStyle={{ backgroundColor: "#30363d", borderRadius: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <Text style={fontstyles.permanentMarker}> {info.Name}</Text>

          <Button
            buttonStyle={{
              backgroundColor: buttonColour,
              borderCurve: "circular",
              alignSelf: "flex-end",
            }}
            titleStyle={fontstyles.permanentSmaller}
            title="DELETE"
            onPress={() => {
              deleteRecord(ExcersiseTable, info.Id);
              updatePar();
            }}
          ></Button>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={fontstyles.permanentSmaller}> reps: </Text>
            <QuantitySelector
              updateCnt={updateRepCount}
              value={info.Reps}
              minQuantity={1}
              maxQuantity={maxRepsOrSetsAllowed}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={fontstyles.permanentSmaller}> sets: </Text>
            <QuantitySelector
              updateCnt={updateSetCount}
              value={info.Sets}
              minQuantity={1}
              maxQuantity={maxRepsOrSetsAllowed}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

export default ExcersiseComponent;
