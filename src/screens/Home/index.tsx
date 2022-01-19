import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animeted from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { LoadingAnimation } from "../../components/LoadingAnimation";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCards,
} from "./styles";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigate("CardDetails", { car });
  }

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCards>Total de {cars.length} carros</TotalCards>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
