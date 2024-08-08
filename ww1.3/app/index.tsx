import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform } from "react-native";
import { store } from "./store";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, AuthContext, AuthContextType } from './context/AuthContext';
import BottomTabNavigator from './navigator/BottomTabNavigator';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';


import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from './screens/Start';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ActionSheetProvider>
          <App />
        </ActionSheetProvider>
      </AuthProvider>
    </Provider>
  );
}

function App() {
  const Stack = createStackNavigator();
  const authContext = useContext(AuthContext) as AuthContextType;
  const { user } = authContext;
  const navigatorRef = React.useRef(null);

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
        <Stack.Navigator
          initialRouteName={user ? "UserTabs" : "StartScreen"}
          screenOptions={{ headerShown: false }}
        >
          {
            !user ? (
              <>
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen
                  name="ResetPasswordScreen"
                  component={ResetPasswordScreen}
                />
              </>
            ) : (
              <Stack.Screen
                name="UserTabs"
                component={BottomTabNavigator}
              />
            )
          }
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}
