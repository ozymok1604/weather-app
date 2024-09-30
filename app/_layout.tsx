import { Slot } from "expo-router";
import { Provider, useDispatch } from "react-redux";

import store from "../src/store";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function Layout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
