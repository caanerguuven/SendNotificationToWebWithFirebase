import React from "react";
import { messaging } from "./initFirebase";
import { compose, lifecycle, withHandlers, withState } from "recompose";

const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

const registerPushListener = pushNotification =>
    navigator.serviceWorker.addEventListener("message", ({ data }) => {

        var notification = data.data
            ? data.data.Notification
            : data["firebaseMessagingData"].data.Notification;

        pushNotification(notification);
    });

const App = ({ token, notifications }) => (
    <ul>
        Notifications List:
            {notifications.map(renderNotification)}
    </ul>
);

export default compose(
    withState("token", "setToken", ""),
    withState("notifications", "setNotifications", []),
    withHandlers({
        pushNotification: ({
            setNotifications,notifications
        }) => newNotification =>
                setNotifications(notifications.concat(newNotification))
    }),
    lifecycle({
        async componentDidMount() {
            const { pushNotification, setToken } = this.props;

            messaging
                .requestPermission()
                .then(async function () {
                    const token = await messaging.getToken();
                    console.log(token);
                    setToken(token);
                })
                .catch(function (err) {
                    console.log("Unable to get permission to notify.", err);
                });

            registerPushListener(pushNotification);
        }
    })
)(App);
