import { createContext, useContext, useReducer } from "react";
import notificationReducer from "../reducers/notification";

const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null);

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext);
    return notificationAndDispatch[1];
};

export default NotificationContextProvider;