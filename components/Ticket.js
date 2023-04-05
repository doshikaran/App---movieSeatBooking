import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { MovieCard } from "../Context";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Ticket = () => {
  const { ticket } = useContext(MovieCard);
  const navigation = useNavigation();

  const finalScreen = () => navigation.navigate("Final");
  return (
    <View>
      {ticket.slice(0, 1).map((item, index) => (
        <ImageBackground
          key={index}
          className=" aspect-auto h-96"
          source={{
            uri: item.image,
          }}
        >
          <Pressable className=" absolute h-[130px] bg-white px-5 py-5 top-80 left-10 rounded-lg w-[82%]">
            <Text className=" text-center text-red-700 font-bold text-lg uppercase">
              Your current booking
            </Text>

            <View className=" flex-row justify-between items-center mt-1">
              <View>
                <Text className=" uppercase font-bold tracking-widest">
                  {item.name}
                </Text>
                <Text className=" text-xs tracking-widest text-gray-700">
                  {item.genre}
                </Text>
                <Text className=" text-xs tracking-widest text-gray-700">
                  {item.mall}
                </Text>
                <View className=" flex-row mt-1 justify-between">
                  <Text className=" text-xs tracking-widest text-gray-700">
                    {item.time}
                  </Text>
                  <Text className=" text-xs tracking-widest text-gray-700">
                    {moment(item.selectedDate).utc().format("MM/DD/YYYY")}
                  </Text>
                </View>
              </View>
              <Pressable
                //  onPress={finalScreen}
                className=" bg-cyan-500 p-2 rounded-lg"
              >
                <Text className=" uppercase font-medium  w-20 text-center text-xs">
                  View your booking
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </ImageBackground>
      ))}
      <View className=" mb-12" />
    </View>
  );
};

export default Ticket;

const styles = StyleSheet.create({});
