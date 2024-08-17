import React from "react";
import { Pressable, View, Image, ImageSourcePropType } from "react-native";

export type PressableImageProp = {
  img: ImageSourcePropType;
  onpress: Function;
  imageSize: number;
};

const PressableImage = ({ img, onpress, imageSize }: PressableImageProp) => {
  return (
    <View>
      <Pressable
        onPress={onpress}
        style={({ pressed }) => {
          return { opacity: pressed ? 0 : 1 };
        }}
      >
        <Image source={img} style={{ height: imageSize, width: imageSize }} />
      </Pressable>
    </View>
  );
};
export default PressableImage;
