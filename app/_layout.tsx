import { Slot } from "expo-router";
import { Provider, useDispatch } from "react-redux";

import store from "../src/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
