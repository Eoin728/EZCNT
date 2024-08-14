import React, { useEffect, useState } from "react";
import { Button, View, Text, TouchableHighlight } from "react-native";
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
                content={
                    <ListItem.Content>
                        <ListItem.Title>{info.Name} </ListItem.Title>
                        <ListItem.Subtitle></ListItem.Subtitle>
                        <Button
                            title="delete"
                            onPress={() => {
                                deleteRecord(WorkoutTable, info.Id);
                                updatePar();
                            }}
                        ></Button>
                        <Button
                            title="set as curr(should be star icon)"
                            onPress={async () => {
                                setNewFavouriteWorkout(info.Id, info.Name);
                            }}
                        ></Button>
                    </ListItem.Content>
                }
                isExpanded={expanded}
                onPress={() => {
                    setExpanded(!expanded);
                }}
            >
                <AddSomethingPopup
                    needsCounter={false}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    onSave={addWorkoutDayToSpecificWorkout}
                />
                <View style={{ flexDirection: "row" }}>
                    {workoutDays.map((workoutDay, index) => (
                        <View key={index} style={{ width: "15%" }}>
                            <Button
                                onPress={() => {
                                    setCurrentWorkoutDay(index);
                                }}
                                title={workoutDay.Day}
                            ></Button>
                        </View>
                    ))}

                    <View style={{ width: "15%" }}>
                        <Button
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            title="add nw"
                        ></Button>
                    </View>
                </View>
                {workoutDays.length == 0 ? (
                    <Text>Press the plus to add workoutDay</Text>
                ) : (
                    <WorkoutDayComponent
                        key={workoutDays[currentWorkoutDay].Id}
                        info={workoutDays[currentWorkoutDay]}
                        updatePar={AfterDeleteDay}
                    />
                )}
            </ListItem.Accordion>
        </View>
    );
};

export default WorkoutComponent;
