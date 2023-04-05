import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import movietypes from "../data/movietypes";

const Header = () => {
  return (
    <View>
      <View>
        {/* image */}
        <ImageBackground
          className=" aspect-auto h-96"
          source={{
            uri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aa454069-1f38-4db1-a9e3-75d6b00c42e8/dfrh5vf-55593bef-cce4-4a5a-a38f-c02ab047788d.jpg/v1/fill/w_1280,h_1829,q_75,strp/creed_3_poster_by_akithefull_dfrh5vf-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgyOSIsInBhdGgiOiJcL2ZcL2FhNDU0MDY5LTFmMzgtNGRiMS1hOWUzLTc1ZDZiMDBjNDJlOFwvZGZyaDV2Zi01NTU5M2JlZi1jY2U0LTRhNWEtYTM4Zi1jMDJhYjA0Nzc4OGQuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.y672tdOWLps40OpMLzzdC8vyMW3CmmAJuL6w620lruU",
          }}
        >
          <Pressable className=" absolute h-[130px] bg-white px-10 py-5 top-80 left-10 rounded-lg w-[82%]">
            <Text className=" text-center text-red-700 font-bold text-lg uppercase">
              Releasing Soon
            </Text>

            <View className=" flex-row justify-between items-center mt-5">
              <View>
                <Text className=" uppercase font-bold tracking-widest">
                  Creed III
                </Text>
                <Text className=" text-xs tracking-widest text-gray-700">
                  Drama/Sport
                </Text>
              </View>
              <Pressable className=" bg-cyan-500 p-2 rounded-lg">
                <Text className=" uppercase font-medium text-xs">Book</Text>
              </Pressable>
            </View>
          </Pressable>
        </ImageBackground>

        <View className=" mt-20 px-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=" space-x-5 "
          >
            {movietypes.map((item, index) => (
              <View
                className="bg-white p-2 rounded-md items-center"
                key={index}
              >
                <Text className=" text-xs tracking-wider font-medium">
                  {item.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
