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
    saveFavouriteWorkoutSet,
    saveFavouriteWorkoutExcersise,
} from "../Utility/database";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type NavigationStackParamList = {
    HomePage: undefined;
    WorkoutEditor: undefined;
};

type Props = NativeStackScreenProps<NavigationStackParamList, "HomePage">;

export default function HomePage({ route, navigation }: Props) {
    const [favWorkoutInfo, setFavWorkoutInfo] =
        useState<FavouriteWorkout | null>(null);
    const [currentExcersise, setCurrentExercise] = useState<Excersise | null>(
        null,
    );
    const [ExcersisesList, setExcersisesList] = useState<Excersise[]>([]);
    const [workoutDays, setworkoutDays] = useState<WorkoutDay[]>([]);
    const [currentSet, setCurrentSet] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            loadFavouriteWorkout();
        }, []),
    );
    const finishWorkout = () => {
        console.log("finished");
    };
    type Increment = 1;
    type Decrement = -1;

    const updateFavouriteWorkoutSet = (
        currentInfo: FavouriteWorkout | null,
        setNum: number,
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
        excersise: number,
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
        } else {
            if (direction > 0) {
                updateFavouriteWorkoutSet(favWorkoutInfo, 0);
            } else {
                updateFavouriteWorkoutSet(
                    favWorkoutInfo,
                    ExcersisesList[favWorkoutInfo.CurrentExcersise + direction]
                        .Sets - 1,
                );
            }

            setCurrentExercise(
                ExcersisesList[favWorkoutInfo.CurrentExcersise + direction],
            );

            updateFavouriteWorkoutExcersise(
                favWorkoutInfo,
                favWorkoutInfo.CurrentExcersise + direction,
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
                favWorkoutInfo.CurrentSet + direction,
            );
        }
    };

    const setFavouriteWorkoutInfoNull = () => {
        setworkoutDays([]);
        setExcersisesList([]);
        setCurrentExercise(null);
    };

    const loadFavouriteWorkout = async () => {
        const fav: FavouriteWorkout | null = await getFavouriteWorkout();
        if (fav == null) {
            setFavouriteWorkoutInfoNull();
        } else {
            setFavWorkoutInfo(fav);
            const workoutDays: WorkoutDay[] = await getWorkoutDays(
                fav.WorkoutId,
            );
            setworkoutDays(workoutDays);
            const Excersises: Excersise[] = await getExercises(
                workoutDays[fav.CurrentDay].Id,
            );
            setExcersisesList(Excersises);
            setCurrentExercise(Excersises[fav.CurrentExcersise]);
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
        property: "Name" | "Reps" | "Sets",
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
        property: "Name",
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
        <View style={styles.container}>
            <Text>
                workout: {outputFavouriteWorkoutInfo(favWorkoutInfo, "Name")}
            </Text>
            <Text>
                {" "}
                excersise: {outputExcersiseInfo(currentExcersise, "Name")}
            </Text>
            <Text>
                {" "}
                Set: {currentSet} /{" "}
                {outputExcersiseInfo(currentExcersise, "Sets")}{" "}
            </Text>
            <Text> Reps: {outputExcersiseInfo(currentExcersise, "Reps")} </Text>
            <PressableImage
                onpress={() => {
                    switchSet(1);
                }}
                img={weightImage}
            />
            <PressableImage
                onpress={() => {
                    switchSet(-1);
                }}
                img={undoImage}
            />
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
