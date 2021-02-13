export default class Api {
    constructor() {
        this._baseUrl = 'http://localhost:4000';
    }

    _resultsProcessing (res) {
        if (res.ok) {
            return res.json()
        } else {return Promise.reject(res)}
    }

    getBtnState () {
        return fetch(`${this._baseUrl}/button`, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => this._resultsProcessing(res))
    }

    setBtnState (state) {
        return fetch(`${this._baseUrl}/button`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                state
            })
        })
        .then(res => this._resultsProcessing(res))
    }
}