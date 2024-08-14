import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import ExcersiseComponent from "../WorkoutComponents/excersise";
import {
    addExcersise,
    Excersise,
    getExercises,
    deleteRecord,
    WorkoutDayTable,
} from "../Utility/database";
import AddExcersisePopup from "../Components/addExcersisePopup";

export type workoutDayProp = {
    info: any;
    updatePar: Function;
};

const WorkoutDay = ({ info, updatePar }: workoutDayProp) => {
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
        if (arr.length > 0)
            setMaxExcersiseOrder(arr[arr.length - 1].OrderNumber);
        setExcersises(arr);
        setLoadingExcersises(false);
    };
    useEffect(() => {
        loadExcersises(info.Id);
    }, []);

    const addExcersiseToSpecificDay = async (
        Name: string,
        Reps: number,
        Sets: number,
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
                        title="add excersise"
                        onPress={() => setModalVisible(true)}
                    ></Button>
                </View>

                <View style={{ width: "45%", margin: "auto" }}>
                    <Button
                        title="delete this day"
                        onPress={() => {
                            deleteRecord(WorkoutDayTable, info.Id);
                            updatePar();
                        }}
                    ></Button>
                </View>
            </View>
        </View>
    );
};

export default WorkoutDay;
