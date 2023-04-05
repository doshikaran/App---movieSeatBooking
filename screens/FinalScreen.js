import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import SvgQRCode from "react-native-qrcode-svg";
import { MovieCard } from "../Context";

const FinalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const back = () => navigation.goBack();
  const home = () => navigation.navigate("Home");

  const { ticket } = useContext(MovieCard);
  const ticketDetails = route.params;
  useEffect(() => {
    const loadTicket = () => {
      ticket.push(ticketDetails);
    };
    loadTicket();
  }, []);

  return (
    <SafeAreaView>
      <View className=" h-full bg-white p-5">
        <View className=" h-[95%] bg-gray-100">
          {/* name */}
          <View className=" p-5 flex-row items-center justify-between">
            <View>
              <Text className=" uppercase text-sm tracking-wide font-extrabold">
                {route.params.name}
              </Text>
              <Text className=" text-[10px] text-gray-700 font-light tracking-widest">
                {route.params.genre}
              </Text>
            </View>
            <Text className=" text-xs uppercase">
              No. of tickets : {route.params.numberOfSeats.length}
            </Text>
          </View>

          {/* mall */}
          <View className=" mt-2 px-5">
            <Text className=" tracking-widest">{route.params.mall}</Text>
          </View>
          <View className=" border-[0.5px] border-zinc-800 mx-5 mb-3 mt-5 "></View>

          {/* container for date, time, image */}
          <View className=" p-5">
            <View className=" flex-row justify-between items-center">
              <View className=" gap-y-2">
                <Text className=" uppercase tracking-widest text-xs font-semibold">
                  Date and Time
                </Text>
                <Text className=" text-gray-700 text-[12px]">
                  {route.params.time}
                </Text>
                <Text className=" text-gray-700 text-[12px]">
                  {moment(route.params.selectedDate).utc().format("MM/DD/YYYY")}
                </Text>
              </View>
              <View>
                <Image
                  style={{ aspectRatio: 4 / 2, height: 80, borderRadius: 10 }}
                  source={{ uri: route.params.image }}
                />
              </View>
            </View>
            <View className=" border-[0.5px] border-zinc-800  mb-3 mt-5 "></View>
          </View>

          {/* tickets and seats*/}
          <View className=" px-5">
            <View className=" flex-row items-center justify-around">
              <View className=" gap-y-1">
                <Text className=" text-sm uppercase font-medium tracking-widest underline">
                  Ticket/s
                </Text>
                <Text className=" font-bold">
                  {route.params.numberOfSeats.length}
                </Text>
              </View>
              <View className=" items-center gap-y-1">
                <Text className=" text-sm uppercase font-medium tracking-widest underline">
                  Seats
                </Text>
                <View className=" flex-row gap-x-1">
                  {route.params.numberOfSeats.map((item, index) => (
                    <Text className=" font-bold" key={index}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
            <View className=" border-[0.5px] border-zinc-800  mb-3 mt-5 "></View>
          </View>

          {/* summary */}
          <View className=" p-5">
            <View className=" bg-cyan-400 h-48 rounded-md p-5 justify-between">
              <View>
                <Text className=" text-sm text-center tracking-widest uppercase font-extrabold mb-1">
                  Summary
                </Text>
              </View>
              <View className=" flex-row items-center justify-between mb-2">
                <Text className=" text-sm uppercase font-semibold">
                  {route.params.numberOfSeats.length} classic seat/s
                </Text>
                <Text className=" text-xs font-light">
                  $ {route.params.total}
                </Text>
              </View>
              <View className=" flex-row items-center justify-between mb-2">
                <Text className=" text-sm uppercase font-semibold">
                  Tax and services
                </Text>
                <Text className=" text-xs font-light">$ 7</Text>
              </View>
              <View className=" flex-row items-center justify-between mb-2">
                <Text className=" text-sm uppercase font-semibold">
                  Final total
                </Text>
                <Text className=" text-xs font-light">
                  $ {route.params.finalTotal}
                </Text>
              </View>
              <View className=" flex-row items-center justify-between mb-2">
                <Text className=" text-sm uppercase font-semibold">
                  ID Number
                </Text>
                <Text className=" text-xs font-light">JSJFSJ113JSFJ</Text>
              </View>
            </View>
          </View>

          {/* qrcode */}
          <View className=" px-5">
            <View className=" items-center">
              <SvgQRCode className=" h-32 w-32" value={route.params.name} />
            </View>
            <View className=" border-[0.5px] border-zinc-800  mb-3 mt-5 "></View>
          </View>
        </View>

        {/* back to home */}
        <View className=" items-center mt-2">
          <Pressable onPress={home} className=" bg-black p-2 rounded-xl">
            <Text className=" text-white uppercase tracking-widest text-sm">
              Back to home
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FinalScreen;

const styles = StyleSheet.create({});
