import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import locations from "../data/locations";

const MovieScreen = () => {
  const route = useRoute();
  console.log("====================================");
  console.log(route.params);
  console.log("====================================");
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  const sharedPressed = () => console.warn("share");
  const [selectedDate, setSelectedDate] = useState("");
  const [malls, setMalls] = useState([]);
  const [seats, setSeats] = useState([]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" bg-white h-full p-5"
    >
      <View className=" flex-row items-center justify-between">
        {/* top ie logo , name */}
        <View className=" flex-row items-center gap-x-5">
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={goBack}
          />
          <Text className=" text-[17px] font-bold uppercase tracking-widest">
            {route.params.name}
          </Text>
        </View>

        {/* search and fliter */}
        <View className=" flex-row items-center gap-x-2">
          <EvilIcons name="search" size={24} color="black" />
          <Ionicons name="ios-filter-outline" size={24} color="black" />
          <EvilIcons
            onPress={sharedPressed}
            name="share-apple"
            size={24}
            color="black"
          />
        </View>
      </View>
      <View className=" mt-4 flex-row items-center gap-x-2">
        <AntDesign name="Safety" size={20} color="black" />
        <Text className=" text-yellow-400">Your safety is our priority</Text>
      </View>

      {/* date picker */}
      <View className=" mt-10">
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-04-04")}
          endDate={new Date("2023-04-31")}
          initialSelectedDate={new Date("2023-04-04")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="black"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
      </View>

      {/* mall locations */}
      <View>
        {locations.map((item, index) => (
          <Pressable
            onPress={() => {
              setMalls(item.name);
              setSeats(item.tableData);
            }}
            key={index}
            className=" my-8"
          >
            <Text className=" font-bold text-lg tracking-widest">
              {item.name}
            </Text>
            {malls.includes(item.name) ? (
              <FlatList
                numColumns={3}
                data={item.showtimes}
                renderItem={({ item }) => (
                  <Pressable
                    className=" p-5 border border-green-500 m-5 items-center justify-center rounded-md"
                    onPress={() =>
                      navigation.navigate("Theatre", {
                        malls: malls,
                        name: route.params.name,
                        image: route.params.image,
                        genre: route.params.genre,
                        date: selectedDate,
                        time: item,
                        seats: seats,
                      })
                    }
                  >
                    <Text className=" text-center font-bold text-green-500">
                      {item}
                    </Text>
                  </Pressable>
                )}
              />
            ) : null}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
