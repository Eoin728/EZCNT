import React from "react";
import { Pressable, View, Image } from "react-native";

export type PressableImageProp = {
    img: any;
    onpress: any;
};

const PressableImage = ({ img, onpress }: PressableImageProp) => {
    return (
        <View>
            <Pressable
                onPress={onpress}
                style={({ pressed }) => {
                    return { opacity: pressed ? 0 : 1 };
                }}
            >
                <Image source={img} />
            </Pressable>
        </View>
    );
};
export default PressableImage;
