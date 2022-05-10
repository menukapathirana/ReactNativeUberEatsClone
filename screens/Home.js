import { View, Platform, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";

import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import BottomTabs from "../components/home/BottomTabs";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";

const YELP_API_KEY =
  "48u8J1H_OYCO7DejMh9eZ8spVvx0iKRWh9_nu9HVQosoqSFT__dOJbj8Y_VNcPLOG5WsOFgW97QDEEcMxshWxWyHrg7FIECLAg5_RcrCaoyUiLtwguWANHXJizpyYnYx";

export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("Hollywood");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor: "#eee",
        flex: 1,
      }}
    >
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
