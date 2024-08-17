import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/themed";
import {
  setNewFavouriteWorkout,
  deleteRecord,
  getWorkoutDays,
  WorkoutTable,
  WorkoutDay,
  addWorkoutDay,
  Workout,
} from "../Utility/database";
import WorkoutDayComponent from "../WorkoutComponents/workoutDay";
import AddSomethingPopup from "../Components/addSomethingPopup";
import { LinearGradient } from "expo-linear-gradient";
import PressableImage from "../Components/pressableImage";
import deleteIcon from "../Assets/delete.png";
import bookmark from "../Assets/bookmark.png";
import { buttonColour } from "../Utility/global_consts";
import add from "../Assets/add.png";
import { Icon } from "@rneui/themed";
import { fontstyles } from "../Styles/fonts";

export type workoutProp = {
  info: Workout;
  updatePar: Function;
};

const WorkoutComponent = ({ info, updatePar }: workoutProp) => {
  const [expanded, setExpanded] = useState(false);
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentWorkoutDay, setCurrentWorkoutDay] = useState(0);

  const loadWorkoutDays = async () => {
    const a: WorkoutDay[] = await getWorkoutDays(info.Id);
    setWorkoutDays(a);
  };

  const addWorkoutDayToSpecificWorkout = async (day: string) => {
    addWorkoutDay(day, info.Id);
    loadWorkoutDays();
  };

  const AfterDeleteDay = async () => {
    setCurrentWorkoutDay(0);
    loadWorkoutDays();
  };

  useEffect(() => {
    loadWorkoutDays();
  }, []);

  return (
    <View>
      <ListItem.Accordion
        icon={
          <Icon
            color={"white"}
            name={"chevron-down"}
            type="material-community"
          />
        }
        containerStyle={{ borderCurve: "circular" }}
        linearGradientProps={{
          colors: ["#2a2f34", "#30363d", "#37424d"],
          start: { x: 1, y: 1 },
          end: { x: 0, y: 0 },
        }}
        bottomDivider={true}
        ViewComponent={LinearGradient}
        content={
          <ListItem.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ListItem.Title style={fontstyles.permanentMarker}>
              {info.Name}{" "}
            </ListItem.Title>
            <View
              style={{ alignSelf: "flex-end", flexDirection: "row", gap: 10 }}
            >
              <PressableImage
                img={deleteIcon}
                imageSize={50}
                onpress={() => {
                  deleteRecord(WorkoutTable, info.Id);
                  updatePar();
                }}
              ></PressableImage>
              <PressableImage
                img={bookmark}
                imageSize={50}
                onpress={() => {
                  setNewFavouriteWorkout(
                    info.Id,
                    info.Name,
                    workoutDays[currentWorkoutDay].Id
                  );
                }}
              ></PressableImage>
            </View>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <AddSomethingPopup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSave={addWorkoutDayToSpecificWorkout}
          keyboardNumberOnly={true}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {workoutDays.map((workoutDay, index) => (
            <View key={index} style={{ width: "15%" }}>
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  backgroundColor: buttonColour,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setCurrentWorkoutDay(index);
                }}
              >
                <Text style={fontstyles.workoutDay}>{workoutDay.Day}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={{ width: "15%" }}>
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                backgroundColor: buttonColour,
                borderRadius: 30,
                justifyContent: "center",
                zIndex: 1,
                alignItems: "center",
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Image source={add} style={{ height: 40, width: 40 }}></Image>
            </TouchableOpacity>
          </View>
        </View>
        {workoutDays.length > 0 ? (
          <WorkoutDayComponent
            key={workoutDays[currentWorkoutDay].Id}
            info={workoutDays[currentWorkoutDay]}
            updatePar={AfterDeleteDay}
          />
        ) : (
          <View></View>
        )}
      </ListItem.Accordion>
    </View>
  );
};

export default WorkoutComponent;
