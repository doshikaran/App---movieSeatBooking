import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useContext } from "react";
import moviedetails from "../data/moviedetails";
import Header from "./Header";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MovieCard } from "../Context";
import Ticket from "./Ticket";


const MovieCardd = () => {
  const data = moviedetails;
  const navigation = useNavigation();
  const { ticket } = useContext(MovieCard);


  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={ticket.length > 0 ? Ticket : Header}
        data={data}
        renderItem={({ item }) => (
          <Pressable className=" px-5 mt-10 ml-2 bg-white rounded-md">
            <Image
              style={{ aspectRatio: 2 / 3, height: 240 }}
              source={{ uri: item.image }}
            />
            <View className="">
              <Text className=" text-left font-bold tracking-wider w-[150px] text-xs ">
                {item.name}
              </Text>
              <View className=" mt-3 justify-center mb-2">
                <Text className=" text-xs tracking-wide text-gray-700">
                  {item.genre}
                </Text>
                <View className=" flex-row items-center gap-x-2">
                  <AntDesign name="star" size={12} color="red" />
                  <Text className="text-xs text-gray-700">{item.ratings}</Text>
                </View>
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate("Movie", {
                    name: item.name,
                    image: item.image,
                    genre: item.genre
                  })
                }
                className=" bg-cyan-500 p-1 rounded-lg w-12 items-center my-2"
              >
                <Text className=" uppercase font-medium text-xs">Book</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default MovieCardd;

const styles = StyleSheet.create({});
