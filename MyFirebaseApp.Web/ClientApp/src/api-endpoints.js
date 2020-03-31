let firebaseService = 'https://iid.googleapis.com/iid/';

var API_ENDPOINT = {
    firebaseTokenDetails: `${firebaseService}info/{0}?details=true`,
    firebaseBatchAddApi: `${firebaseService}v1:batchAdd`,
    mapTopicWithFirebaseInstance: `${firebaseService}v1/{0}/rel/topics/{1}`,
    firebaseBatchRemove: `${firebaseService}v1:batchRemove`,
    formatUrl: function (url) {
        var args = Array.prototype.slice.call(arguments, 1);
        return url.replace(/{(\d+)}/g, function (match, number) {
            return args[number] ? args[number] : match;
        });
    }
};

export default API_ENDPOINT;