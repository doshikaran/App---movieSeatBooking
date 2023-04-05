import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MovieCard } from "../Context";
import { useStripe } from "@stripe/stripe-react-native";

const TheatreScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();
  const sharedPressed = () => console.warn("share");

  const { seats, setSeats, occupied } = useContext(MovieCard);
  const onSeatSelect = (item) => {
    if (seats) {
      const seatSelected = seats.find((seat) => seat === item);
      console.log(seatSelected, "you pressed on");
      if (seatSelected) {
        setSeats(seats.filter((seat) => seat !== item));
      } else {
        setSeats([...seats, item]);
      }
    }
  };

  // basically splitting the seat length here
  const numberOfSeats = [...seats]

  const displaySeats = () => {
    return (
      <View className=" flex-row space-x-1">
        {seats.map((seat, index) => (
          <Text className=" font-bold" key={index}>
            {seat}
          </Text>
        ))}
      </View>
    );
  };

  const tax = 7
  const noOfSeats = seats.length;
  const total = seats.length > 0 ? noOfSeats * 240 : 0;
  const finalTotal = total + tax
  // console.log(total)

  const stripe = useStripe();
  const pay = async () => {
    const response = await fetch("http://localhost:3000/payment", {
      method: "POST",
      body: JSON.stringify({
        amount: Math.floor(total * 100),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (!response.ok) return Alert.alert(data.message);
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (initSheet.error) return Alert.alert(initSheet.error.message);
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    else {
      occupied.push(...seats);
      navigation.navigate("Final", {
        name: route.params.name,
        image: route.params.image,
        genre: route.params.genre,
        date: route.params.date,
        mall: route.params.malls,
        time: route.params.time,
        total: total,
        finalTotal: finalTotal,
        numberOfSeats:numberOfSeats
      });

      setSeats([]);
    }
  };

  return (
    <View className=" h-full bg-white p-5">
      <View>
        {/* name, icons, location */}
        <View className=" flex-row items-center justify-between mt-2">
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            onPress={goBack}
          />
          <View>
            <Text className=" text-lg font-bold tracking-widest uppercase">
              {route.params.name}
            </Text>
            <Text className=" text-gray-500 text-xs">{route.params.malls}</Text>
          </View>
          <EvilIcons
            onPress={sharedPressed}
            name="share-apple"
            size={24}
            color="black"
          />
        </View>

        <Text className=" text-xs mt-3 text-gray-500 text-center">
          CLASSIC (240)
        </Text>

        {/* <View className=" mt-2 text-center">
          <Text className="">{route.params.selectedDate}</Text>
        </View> */}

        {/* time */}
        <Text className=" text-center mt-2 font-bold text-lg">
          {route.params.time}
        </Text>

        {/* seats */}
        <View className=" mt-4">
          <FlatList
            numColumns={7}
            data={route.params.seats}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onSeatSelect(item)}
                // onPress={() => console.warn(item, "pressed")}
                className=" items-center justify-center m-4 border-[0.5px] p-2 rounded-md"
              >
                {
                  seats.includes(item) ?(
                    <Text className=" bg-green-500">{item}</Text>
                  ) : 
                  occupied.includes(item) ? (
                    <Text className=" bg-red-500">{item}</Text>
                  ):(
                    <Text className=" bg-gray-400">{item}</Text>
                  )
                }
              </Pressable>
            )}
          />
        </View>

        {/* seats availabiltity */}
        <View className=" mt-3">
          <View className=" flex-row items-center justify-around bg-gray-200 p-4 rounded-md">
            <View className=" items-center gap-y-1">
              <FontAwesome name="square" size={24} color="green" />
              <Text className=" font-bold text-xs uppercase tracking-wider">
                Selected
              </Text>
            </View>

            <View className=" items-center gap-y-1">
              <FontAwesome name="square" size={24} color="grey" />
              <Text className=" font-bold text-xs uppercase tracking-wider">
                Available
              </Text>
            </View>

            <View className=" items-center gap-y-1">
              <FontAwesome name="square" size={24} color="red" />
              <Text className=" font-bold text-xs uppercase tracking-wider">
                Occupied
              </Text>
            </View>
          </View>
        </View>

        {/* extra text */}
        <View className=" mt-4 flex-row items-center justify-between">
          <View className=" gap-y-1 ">
            <Text className=" text-[10px]">Show ends at xyz</Text>
            {seats.length > 0 ? displaySeats() : <Text>No seats selected</Text>}
          </View>
          <View className=" bg-gray-100 p-2">
            <Text className=" w-28">Now with ticket cancelation</Text>
          </View>
        </View>

        {/* payment */}
        <View>
          <Pressable className=" bg-cyan-500 my-2 p-5 flex-row items-center justify-between ">
            {seats.length > 0 ? (
              <Text className=" uppercase text-xs font-medium">
                {seats.length} seat/s selected
              </Text>
            ) : (
              <Text></Text>
            )}
            <Pressable onPress={pay}>
              <Text className=" uppercase font-semibold">Pay {total}</Text>
            </Pressable>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default TheatreScreen;

const styles = StyleSheet.create({});
