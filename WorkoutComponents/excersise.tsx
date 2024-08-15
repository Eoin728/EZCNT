import React from "react";
import { Text, Button, View } from "react-native";
import { Card } from "@rneui/themed";
import QuantitySelector from "../Components/quantitySelector";
import {
    deleteRecord,
    Excersise,
    ExcersiseTable,
    updateExcersisesRepCount,
    updateExcersisesSetCount,
} from "../Utility/database";
import { maxRepsOrSetsAllowed } from "../Utility/global_consts";

export type ExcersiseProps = {
    info: Excersise;
    updatePar: Function;
};

const ExcersiseComponent = ({ info, updatePar }: ExcersiseProps) => {
    const updateRepCount = async (newRepCount: number) => {
        updateExcersisesRepCount(info.Id, newRepCount);
    };

    const updateSetCount = async (newSetCount: number) => {
        updateExcersisesSetCount(info.Id, newSetCount);
    };

    return (
        <Card>
            <View
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <Text> {info.Name}</Text>
                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text> reps: </Text>
                        <QuantitySelector
                            updateCnt={updateRepCount}
                            value={info.Reps}
                            minQuantity={1}
                            maxQuantity={maxRepsOrSetsAllowed}
                        />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Text> sets: </Text>
                        <QuantitySelector
                            updateCnt={updateSetCount}
                            value={info.Sets}
                            minQuantity={1}
                            maxQuantity={maxRepsOrSetsAllowed}
                        />
                    </View>

                    <Button
                        title="del"
                        onPress={() => {
                            deleteRecord(ExcersiseTable, info.Id);
                            updatePar();
                        }}
                    ></Button>
                </View>
            </View>
        </Card>
    );
};

export default ExcersiseComponent;
