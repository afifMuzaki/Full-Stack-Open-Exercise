import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notificat// eslint-disable-next-line no-unused-varsion",
    initialState: "",
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },

        removeNotification(state, action) {
            return action.payload;
        }
    }
});

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer;