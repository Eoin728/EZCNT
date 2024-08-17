import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ExcersiseComponent from "../WorkoutComponents/excersise";
import {
  addExcersise,
  Excersise,
  getExercises,
  deleteRecord,
  WorkoutDayTable,
  WorkoutDay,
} from "../Utility/database";
import AddExcersisePopup from "../Components/addExcersisePopup";
import { buttonColour } from "../Utility/global_consts";
import { Button } from "react-native-elements";
import { fontstyles } from "../Styles/fonts";

export type workoutDayProp = {
  info: WorkoutDay;
  updatePar: Function;
};

const WorkoutDayComponent = ({ info, updatePar }: workoutDayProp) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [excersises, setExcersises] = useState<Excersise[]>([]);
  const [loadingExcersises, setLoadingExcersises] = useState(true);
  const [MaxExcersiseOrder, setMaxExcersiseOrder] = useState("0:00");

  const addOnetoExcersiseOrder = (Order: string): string => {
    let o = "";
    let i = 0;
    for (; i < Order.length; i++) {
      if (Order.charAt(i) == ":") break;
      o += Order.charAt(i);
    }

    var n = Number(o);
    n++;
    const re = String(n) + Order.substring(i);
    return re;
  };

  const loadExcersises = async (id: number) => {
    const arr: Excersise[] = await getExercises(id);
    if (arr.length > 0) setMaxExcersiseOrder(arr[arr.length - 1].OrderNumber);
    setExcersises(arr);
    setLoadingExcersises(false);
  };
  useEffect(() => {
    loadExcersises(info.Id);
  }, []);

  const addExcersiseToSpecificDay = async (
    Name: string,
    Reps: number,
    Sets: number
  ) => {
    const order = addOnetoExcersiseOrder(MaxExcersiseOrder);
    addExcersise(Name, info.Id, Reps, Sets, order);
    loadExcersises(info.Id);
  };

  return (
    <View>
      <AddExcersisePopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={addExcersiseToSpecificDay}
      />
      {loadingExcersises ? (
        <Text> Loading excersises</Text>
      ) : (
        excersises.map((excersise) => (
          <ExcersiseComponent
            info={excersise}
            key={excersise.Id}
            updatePar={() => {
              loadExcersises(info.Id);
            }}
          />
        ))
      )}
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "45%", margin: "auto" }}>
          <Button
            buttonStyle={{ backgroundColor: buttonColour }}
            titleStyle={fontstyles.permanentSmaller}
            title="NEW EXCERSISE"
            onPress={() => setModalVisible(true)}
          ></Button>
        </View>

        <View style={{ width: "45%", margin: "auto" }}>
          <Button
            buttonStyle={{ backgroundColor: buttonColour }}
            titleStyle={fontstyles.permanentSmaller}
            title="DELETE"
            onPress={() => {
              if (info.Day != 1) {
                deleteRecord(WorkoutDayTable, info.Id);
                updatePar();
              }
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

export default WorkoutDayComponent;
