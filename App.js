import { SafeAreaView, View } from "react-native";
import Navigation from "./navigation/navigation";
import { MovieContext } from "./Context";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <SafeAreaView>
      <View className=" bg-gray-200 h-full">
        <MovieContext>
          <StripeProvider publishableKey="pk_test_51MgDccEQ0sQuoqnG3DdJv9lxwXQ0Ty6s5asWf3xmVPbxsWh47YgYt82W6qdZWBxkoNArajz1Yr3nnHTYlNFo4rb700ubE1DXng">
            <Navigation />
          </StripeProvider>
        </MovieContext>
      </View>
    </SafeAreaView>
  );
}
