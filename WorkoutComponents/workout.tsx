import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { ListItem } from "@rneui/themed";
import {
    setNewFavouriteWorkout,
    deleteRecord,
    getWorkoutDays,
    WorkoutTable,
    WorkoutDay,
} from "../Utility/database";
import WorkoutDayComponent from "../WorkoutComponents/workoutDay";

export type workoutProp = {
    id: number;
    name: string;
    updatePar: Function;
};

const Workout = ({ id, name, updatePar }: workoutProp) => {
    const [expanded, setExpanded] = useState(false);
    const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);

    const loadWorkoutDays = async () => {
        const a: WorkoutDay[] = await getWorkoutDays(id);
        setWorkoutDays(a);
    };

    useEffect(() => {
        loadWorkoutDays();
    }, []);

    return (
        <View>
            <ListItem.Accordion
                content={
                    <ListItem.Content>
                        <ListItem.Title>{name} </ListItem.Title>
                        <ListItem.Subtitle></ListItem.Subtitle>
                        <Button
                            title="delete"
                            onPress={() => {
                                deleteRecord(WorkoutTable, id);
                                updatePar();
                            }}
                        ></Button>
                        <Button
                            title="set as curr(should be star icon)"
                            onPress={async () => {
                                setNewFavouriteWorkout(id, name);
                            }}
                        ></Button>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                <View style={{ width: "15%" }}>
                    <Button onPress={() => {}} title="shudberound"></Button>
                </View>

                {workoutDays.map((workoutDay) => (
                    <WorkoutDayComponent
                        key={workoutDay.Id}
                        info={workoutDay}
                    />
                ))}
            </ListItem.Accordion>
        </View>
    );
};

export default Workout;
