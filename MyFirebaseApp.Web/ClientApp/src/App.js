import React from "react";
import { messaging } from "./initFirebase";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import { helper } from './helper';

const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

const registerPushListener = pushNotification =>
    navigator.serviceWorker.addEventListener("message", ({ data }) => {

        var notification = data.data
            ? data.data.Notification
            : data["firebaseMessagingData"].data.Notification;

        pushNotification(notification);
    });

const App = ({ notifications }) => (
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
            setNotifications, notifications
        }) => newNotification =>
                setNotifications(notifications.concat(newNotification))
    }),
    lifecycle({
        async componentDidMount() {
            const { pushNotification, setToken } = this.props;

            messaging
                .requestPermission()
                .then(() => messaging.getToken())
                .then(token => {
                    console.log("New Token :" + token);
                    helper.handleTokenRefresh(token);
                    setToken(token);
                })
                .catch(function (err) {
                    console.log("Unable to get permission to notify.", err);
                });

            messaging.onTokenRefresh(() => {
                messaging.getToken()
                    .then((refreshedToken) => {
                        console.log("New Token : " + refreshedToken);
                        helper.handleTokenRefresh(refreshedToken);
                        setToken(refreshedToken);
                    })
                    .then((resp) => { helper.checkSubscription(resp); })
                    .catch(function (err) {
                        console.log('Unable to retrieve refreshed token ', err);
                    });
            });

            registerPushListener(pushNotification);
        }
    })
)(App);

