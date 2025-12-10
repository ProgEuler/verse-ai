import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface ChannelStatus {
  whatsapp: boolean;
  facebook: boolean;
  instagram: boolean;
  calendar: boolean;
}

const initialState: ChannelStatus = {
   whatsapp: false,
   facebook: false,
   instagram: false,
   calendar: false
}

const channelSlice = createSlice({
   name: "channel",
   initialState,
   reducers: {
      setChannelStatus: (state, action: PayloadAction<ChannelStatus>) => {
         return action.payload;
      },
      updateChannelItem: (state, action: PayloadAction<{ key: keyof ChannelStatus; value: boolean }>) => {
          state[action.payload.key] = action.payload.value;
      }
   }
})

export const { setChannelStatus, updateChannelItem } = channelSlice.actions;

export const selectChannelStatus = (state: RootState) => state.channel;

export default channelSlice.reducer;
