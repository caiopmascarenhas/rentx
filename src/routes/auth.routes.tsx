import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Confirmation } from "../screens/Confirmation";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import { Splash } from "../screens/Splash";
import { SignUpSecondFirstStep } from "../screens/SignUp/SignUpSecondFirstStep";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondFirstStep" component={SignUpSecondFirstStep} / >
    </Navigator>
  );
}
