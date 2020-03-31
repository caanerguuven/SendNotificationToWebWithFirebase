import fetch from "isomorphic-fetch";

class Request {
    constructor() {
        this._doGetParam.bind(this);
        this._doPostParam.bind(this);

        this.firebaseHeaders = {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAeDuB0-w:APA91bEibwUXvHDDsDNkBJIl3rLVWwNspjoVUFnkyFQL9zq_Nu9eK9Hp2_L4G4QflYuXVdehXG4FzIvjQHpnyO11TEIvk93hTpUbSfxPaJd65T6NWJ3N6G0vfTa7HFEeIGGBS-0UG_gU'
        };
    }


    _doGetParam(headers) {
        var params = {
            method: 'GET',
            dataType: 'JSON',
            headers: headers
        };

        return params;
    }

    _doDeleteParam(headers, requestBody) {
        var params = {
            method: 'DELETE',
            dataType: 'JSON',
            headers: headers,
            body: JSON.stringify(requestBody)
        };

        return params;
    }

    _doPostParam(headers, requestBody) {
        var params = {
            method: 'POST',
            dataType: 'JSON',
            headers: headers,
            body: JSON.stringify(requestBody)
        };

        return params;
    }

    doGetFirebase(url) {
        var param = this._doGetParam(this.firebaseHeaders);
        return fetch(url, param);
    }

    doPostFirebase(url, body) {
        var params = this._doPostParam(this.firebaseHeaders, body);
        return fetch(url, params);
    }
}

var request = new Request();

export default request;


