import weightImage from "../Assets/excersisepng.png";
import undoImage from "../Assets/undo.png";
import tableImage from "../Assets/table.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PressableImage from "../Components/pressableImage";
import {
  initializeDatabase,
  getFavouriteWorkout,
  getExercises,
  FavouriteWorkout,
  Excersise,
  saveFavouriteWorkoutSet,
  saveFavouriteWorkoutExcersise,
  getRecord,
  WorkoutTable,
  Workout,
} from "../Utility/database";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { fontstyles } from "../Styles/fonts";

type NavigationStackParamList = {
  HomePage: undefined;
  WorkoutEditor: undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList, "HomePage">;

export default function HomePage({ route, navigation }: Props) {
  const [favWorkoutInfo, setFavWorkoutInfo] = useState<FavouriteWorkout | null>(
    null
  );
  const [currentExcersise, setCurrentExercise] = useState<Excersise | null>(
    null
  );
  const [ExcersisesList, setExcersisesList] = useState<Excersise[]>([]);
  const [currentSet, setCurrentSet] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      loadFavouriteWorkout();
    }, [])
  );
  const finishWorkout = () => {
    updateFavouriteWorkoutSet(favWorkoutInfo, 0);
    updateFavouriteWorkoutExcersise(favWorkoutInfo, 0);
    setCurrentExercise(ExcersisesList[0]);
  };
  type Increment = 1;
  type Decrement = -1;

  const updateFavouriteWorkoutSet = (
    currentInfo: FavouriteWorkout | null,
    setNum: number
  ) => {
    if (currentInfo == null) return;
    var a = currentInfo;
    a.CurrentSet = setNum;

    setFavWorkoutInfo(a);
    setCurrentSet(setNum);
    saveFavouriteWorkoutSet(setNum);
  };

  const updateFavouriteWorkoutExcersise = (
    currentInfo: FavouriteWorkout | null,
    excersise: number
  ) => {
    if (currentInfo == null) return;
    var a = currentInfo;
    a.CurrentExcersise = excersise;
    setFavWorkoutInfo(a);
    saveFavouriteWorkoutExcersise(excersise);
  };

  const switchExcersise = (direction: Increment | Decrement) => {
    if (favWorkoutInfo == null) return;
    if (direction < 0 && favWorkoutInfo.CurrentExcersise == 0) {
      return;
    } else if (
      direction > 0 &&
      favWorkoutInfo.CurrentExcersise + 1 == ExcersisesList.length
    ) {
      finishWorkout();
      return;
    } else {
      if (direction > 0) {
        updateFavouriteWorkoutSet(favWorkoutInfo, 0);
      } else {
        updateFavouriteWorkoutSet(
          favWorkoutInfo,
          ExcersisesList[favWorkoutInfo.CurrentExcersise + direction].Sets - 1
        );
      }

      setCurrentExercise(
        ExcersisesList[favWorkoutInfo.CurrentExcersise + direction]
      );

      updateFavouriteWorkoutExcersise(
        favWorkoutInfo,
        favWorkoutInfo.CurrentExcersise + direction
      );
    }
  };

  const switchSet = (direction: Increment | Decrement) => {
    if (currentExcersise == null || favWorkoutInfo == null) return;
    if (
      direction > 0 &&
      favWorkoutInfo.CurrentSet + 1 >= currentExcersise.Sets
    ) {
      switchExcersise(1);
    } else if (direction < 0 && favWorkoutInfo.CurrentSet == 0) {
      switchExcersise(-1);
    } else {
      updateFavouriteWorkoutSet(
        favWorkoutInfo,
        favWorkoutInfo.CurrentSet + direction
      );
    }
  };

  const setFavouriteWorkoutInfoNull = () => {
    setExcersisesList([]);
    setCurrentExercise(null);
  };

  const loadFavouriteWorkout = async () => {
    const fav: FavouriteWorkout | null = await getFavouriteWorkout();
    if (fav == null) {
      setFavouriteWorkoutInfoNull();
    } else {
      setFavWorkoutInfo(fav);
      const wrkt: Workout = await getRecord(WorkoutTable, fav.WorkoutId);
      const Excersises: Excersise[] = await getExercises(wrkt.FavouriteDay);
      setExcersisesList(Excersises);
      setCurrentExercise(Excersises[fav.CurrentExcersise]);
      setCurrentSet(fav.CurrentSet)
    }
  };

  const loadDataBase = async () => {
    initializeDatabase().then(() => {
      loadFavouriteWorkout();
    });
  };

  useEffect(() => {
    loadDataBase();
  }, []);

  const outputExcersiseInfo = (
    info: Excersise | null,
    property: "Name" | "Reps" | "Sets"
  ) => {
    if (info == null) return <Text></Text>;
    var value: number | string = "";
    switch (property) {
      case "Name":
        value = info.Name;
        break;
      case "Reps":
        value = info.Reps;
        break;
      case "Sets":
        value = info.Sets;
        break;
    }
    return value;
  };

  const outputFavouriteWorkoutInfo = (
    info: FavouriteWorkout | null,
    property: "Name"
  ) => {
    if (info == null) return <Text></Text>;
    var value: number | string = "";
    switch (property) {
      case "Name":
        value = info.WorkoutName;
        break;
    }
    return value;
  };

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
      <View style={{ top: "5%" }}>
        <Text style={fontstyles.homePageTitle}>
          {outputFavouriteWorkoutInfo(favWorkoutInfo, "Name")}
        </Text>
      </View>
      <View
        style={{ position: "absolute", bottom: "50%", alignSelf: "center" }}
      >
        <PressableImage
          onpress={() => {
            switchSet(1);
          }}
          imageSize={230}
          img={weightImage}
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: "25%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={fontstyles.homePageTitle}>
          {outputExcersiseInfo(currentExcersise, "Name")}
        </Text>

        <Text style={fontstyles.homePage}>
          {" "}
          Set: {currentSet} / {outputExcersiseInfo(currentExcersise, "Sets")}{" "}
        </Text>
        <Text style={fontstyles.homePage}>
          {" "}
          Reps: {outputExcersiseInfo(currentExcersise, "Reps")}{" "}
        </Text>
      </View>

      <View
        style={{ position: "absolute", flexDirection: "row", bottom: "10%" }}
      >
        <View style={{ alignSelf: "flex-start", flex: 1 }}>
          <PressableImage
            onpress={() => navigation.navigate("WorkoutEditor")}
            img={tableImage}
            imageSize={140}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }} />
        <View style={{ alignSelf: "flex-end", flex: 1 }}>
          <PressableImage
            onpress={() => {
              switchSet(-1);
            }}
            img={undoImage}
            imageSize={140}
          />
        </View>
      </View>

      <StatusBar style="auto" />
    </LinearGradient>
  );
}
