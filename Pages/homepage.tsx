import weightImage from "../Assets/excersisepng.png";
import undoImage from "../Assets/undo.png";
import tableImage from "../Assets/table.png";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PressableImage from "../Components/pressableImage";
import {
    initializeDatabase,
    getFavouriteWorkout,
    getWorkoutDays,
    getExercises,
    FavouriteWorkout,
    Excersise,
    WorkoutDay,
} from "../Utility/database";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type NavigationStackParamList = {
    HomePage: undefined;
    WorkoutEditor: undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList, "HomePage">;

export default function HomePage({ route, navigation }: Props) {
    const noWorkoutMessage =
        "no workouts set as current,press the table icon to change";
    const noExcersisesMessage =
        "current workout has no excersises,press the table icon to add some";

    const [favWorkout, setFavWorkout] = useState(0);
    const [favWorkoutName, setFavWorkoutName] = useState(noWorkoutMessage);
    const [currentExcersise, setCurrentExercise] = useState<Excersise | null>(
        null,
    );
    const [currentExerciseName, setCurrentExcersiseName] =
        useState(noExcersisesMessage);
    const [currentSet, setCurrentSet] = useState(0);
    const [currentSetTotalNum, setCurrentSetTotalNum] = useState(0);
    const [currentRepsNum, setCurrentRepsNum] = useState(0);
    const [ExcersisesList, setExcersisesList] = useState<Excersise[]>([]);
    const [workoutDays, setworkoutDays] = useState<WorkoutDay[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            loadFavouriteWorkout();
        }, []),
    );

    const setFavouriteWorkoutInfoNull = () => {
        setFavWorkout(0);
        setFavWorkoutName(noWorkoutMessage);
        setworkoutDays([]);
        setExcersisesList([]);
        setCurrentExercise(null);
        setCurrentExcersiseName(noExcersisesMessage);
        setCurrentRepsNum(0);
        setCurrentSetTotalNum(0);
    };

    const loadFavouriteWorkout = async () => {
        const fav: FavouriteWorkout | null = await getFavouriteWorkout();
        if (fav == null) {
            setFavouriteWorkoutInfoNull();
        } else {
            setFavWorkout(fav.WorkoutId);
            setFavWorkoutName(fav.WorkoutName);
            const workoutDays: WorkoutDay[] = await getWorkoutDays(
                fav.WorkoutId,
            );
            setworkoutDays(workoutDays);
            const Excersises: Excersise[] = await getExercises(
                workoutDays[fav.CurrentDay].Id,
            );
            setExcersisesList(Excersises);
            setCurrentExercise(Excersises[fav.CurrentExcersise]);
            if (Excersises.length > 0) {
                setCurrentExcersiseName(Excersises[fav.CurrentExcersise].Name);
                setCurrentRepsNum(Excersises[fav.CurrentExcersise].Reps);
                setCurrentSetTotalNum(Excersises[fav.CurrentExcersise].Sets);
            } else {
                setCurrentExcersiseName(noExcersisesMessage);
                setCurrentRepsNum(0);
                setCurrentSetTotalNum(0);
            }
            setCurrentSet(fav.CurrentSet);
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

    return (
        <View style={styles.container}>
            <Text> workout: {favWorkoutName}</Text>
            <Text> Excersise: {currentExerciseName}</Text>
            <Text>
                {" "}
                Set: {currentSet} / {currentSetTotalNum}{" "}
            </Text>
            <Text> Reps: {currentRepsNum} </Text>
            <PressableImage onpress={() => {}} img={weightImage} />
            <PressableImage onpress={() => {}} img={undoImage} />
            <PressableImage
                onpress={() => navigation.navigate("WorkoutEditor")}
                img={tableImage}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
