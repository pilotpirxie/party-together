import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";

export type ConfigState = {
  stompClient: Client | null;
  sockClient: WebSocket | null;
  isSocketConnected: boolean;
};

const initialState: ConfigState = {
  stompClient: null,
  sockClient: null,
  isSocketConnected: false,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setStompClient: (state, { payload }: PayloadAction<Client | null>) => {
      state.stompClient = payload;
    },
    setIsSocketConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.isSocketConnected = payload;
    },
    setSockClient: (state, { payload }: PayloadAction<WebSocket | null>) => {
      state.sockClient = payload;
    },
  },
});

export const { setStompClient, setIsSocketConnected, setSockClient } =
  configSlice.actions;
export const configReducer = configSlice.reducer;
