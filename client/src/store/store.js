import { configureStore } from "@reduxjs/toolkit";
import MapReducer from "../MapPage/mapSlice";
import MessengerReducer from "../Messenger/MessengerSlice";

const store = configureStore({
  reducer: {
    map: MapReducer,
    messenger: MessengerReducer,
  },
});

export default store;
