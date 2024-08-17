import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import WorkoutComponent from "../WorkoutComponents/workout";
import AddSomethingPopup from "../Components/addSomethingPopup";
import {
  getWorkouts,
  Workout,
  addWorkout,
  addWorkoutDay,
} from "../Utility/database";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-elements";
import { fontstyles } from "../Styles/fonts";
import add from "../Assets/add.png";
import PressableImage from "../Components/pressableImage";

type NavigationStackParamList = {
  HomePage: undefined;
  WorkoutEditor: undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList, "WorkoutEditor">;

const firstWorkoutDayName = "1";

const WorkoutEditor = ({ route, navigation }: Props) => {
  const [workoutArray, setWorkoutArray] = useState<Workout[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  const addWorkoutToWorkoutEditor = async (Name: string) => {
    await addWorkout(Name).then((just_added_workout_id) => {
      if (just_added_workout_id != null)
        addWorkoutDay(firstWorkoutDayName, just_added_workout_id);
    });
    loadWorkouts();
  };

  const loadWorkouts = async () => {
    var arr: Workout[] = [];
    //this loads workout names from database
    var b: Workout[] = await getWorkouts();
    for (const i of b) {
      arr.push(i);
    }
    setWorkoutArray(arr);
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <LinearGradient
      colors={["#121212", "#2a2a2a", "#424242", "#5a5a5a", "#727272"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <AddSomethingPopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSave={addWorkoutToWorkoutEditor}
        keyboardNumberOnly={false}
      />
      {workoutArray.length > 0 ? (
        <View style={{ top: "5%" }}>
          <ScrollView style={{ top: "22%" }} decelerationRate={0.0}>
            {workoutArray.map((workout) => (
              <WorkoutComponent
                key={workout.Id}
                info={workout}
                updatePar={loadWorkouts}
              />
            ))}

            <Button
              buttonStyle={{ backgroundColor: "#58636D" }}
              title="ADD WORKOUT"
              titleStyle={fontstyles.permanentAddExcersise}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            ></Button>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            top: "30%",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <PressableImage
            imageSize={250}
            img={add}
            onpress={() => {
              setModalVisible(!modalVisible);
            }}
          ></PressableImage>
        </View>
      )}
    </LinearGradient>
  );
};

export default WorkoutEditor;
