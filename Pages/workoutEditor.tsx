import React, { useState, useEffect } from "react";
import { ScrollView, Button, Text } from "react-native";
import WorkoutComponent from "../WorkoutComponents/workout";
import AddSomethingPopup from "../Components/addSomethingPopup";
import {
    getWorkouts,
    Workout,
    addWorkout,
    addWorkoutDay,
} from "../Utility/database";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

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
        <ScrollView decelerationRate={0.0}>
            {workoutArray != null ? (
                workoutArray.map((workout) => (
                    <WorkoutComponent
                        key={workout.Id}
                        info={workout}
                        updatePar={loadWorkouts}
                    />
                ))
            ) : (
                <Text> Add workout here</Text>
            )}
            <AddSomethingPopup
                needsCounter={false}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onSave={addWorkoutToWorkoutEditor}
            />
            <Button
                title="ADD WORKOUT"
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
            ></Button>
        </ScrollView>
    );
};

export default WorkoutEditor;
