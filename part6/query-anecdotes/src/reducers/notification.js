const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_NOTIFICATION":
            return state = action.payload;
        case "REMOVE_NOTIFICATION":
            return state = "";
        default:
            return state;
    }
};

export default notificationReducer;