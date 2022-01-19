import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingCar from '../../assets/loading_car.json';
import { Container } from './styles';

export function LoadingAnimation() {
  return (
    <Container>
      <LottieView
        source={LoadingCar}
        style={{height: 200}}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}