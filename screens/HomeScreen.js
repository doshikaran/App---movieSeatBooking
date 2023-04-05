import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import MovieCardd from "../components/MovieCardd";

const HomeScreen = () => {
  return (
    <View>
      {/* <Header /> */}
      <MovieCardd />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
