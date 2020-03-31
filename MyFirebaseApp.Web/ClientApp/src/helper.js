import "firebase/messaging";
import { messaging } from "./initFirebase";
import request from './requestUtils';
import API_ENDPOINT from './api-endpoints';

const helper = ()=>{

    let handleTokenRefresh = function (token) {
        window.firebaseToken = token;
        return request.doGetFirebase(API_ENDPOINT.formatUrl(API_ENDPOINT.firebaseTokenDetails,
            window.firebaseToken))
            .then((resp) => resp.json())
            .then((res) => { checkSubscription(res) })
            .catch(e => console.log("handleRefreshToken Error :" + e.message));
    };

    let checkSubscription = function (resp) {
        if (resp) {
            if (resp.status !== 200 || !resp.authorizedEntity || !resp.rel) {
                var reqBody = {
                    "to": "/topics/global",
                    "registration_tokens": [`${window.firebaseToken}`]
                };

                return request.doPostFirebase(API_ENDPOINT.firebaseBatchAddApi, reqBody)
                    .then((res) => relateAppInstanceWithTopic(res))
                    .catch(e => console.log("checkSubscription Error : " + e.message));

            }
        }
    };

    let relateAppInstanceWithTopic = function (res) {
        if (res.status === 200 && !res.results) {
            let params = [
                window.firebaseToken,
                "global"
            ];

            return request.doPostFirebase(API_ENDPOINT
                .formatUrl(API_ENDPOINT.mapTopicWithFirebaseInstance, ...params))
                .then((response) => {
                    if (response.status === 200) {
                        console.log('User is subscribed for push notification');
                    }
                    else {
                        console.log('User is not subscribed for push notification');
                    }
                })
                .catch(e => console.log(e.message));
        }
    };

    let logoutFirebase = function () {
        messaging.getToken().then((token) => {
            var fbToken = token;
            messaging.deleteToken(token);
            return fbToken;
        })
            .then((fbToken) => {
                var reqBody = {
                    "to": "/topics/global",
                    "registration_tokens": [`${fbToken}`]
                };

                return request.doPostFirebase(API_ENDPOINT.firebaseBatchRemove, reqBody)
                    .then((res) => {
                        if (res.status !== 200) {
                            console.log(res.results.error);
                        }
                    })
                    .catch(e => console.log("logoutFirebase Error : " + e.message));
            })
            .catch((err) => {
                console.log("error deleting token. Err Content :" + err.message);
            });
    };
};

export { helper };