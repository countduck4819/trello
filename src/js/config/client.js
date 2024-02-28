import { config } from "./config";
const { SERVER_API } = config;

export const client = {
    apiKey: null,
    setApiKey: function (apiKey) {
        this.apiKey = apiKey;
    },
    send: async function (path, method = "GET", body = null) {
        const url = `${SERVER_API}${path}`;
        const headers = {
            "Content-Type": "application/json",
        }
        if (this.apiKey) {
            headers["X-Api-Key"] = `${this.apiKey}`
        }
        const options = {
            headers,
            method
        }
        if (body) {
            options["body"] = JSON.stringify(body)
        }
        try {
            const res = await fetch(url,options);
            const data = await res.json();
            return {res,data}
        }catch(e) {
            throw new Error(e);
        }
    },
    get: function (url) {
        return this.send(url)
    },
    post: function (url,body) {
        return this.send(url, "POST", body)
    },
    put: function (url, body) {
        return this.send(url, "PUT", body)
    },
    patch: function (url, body) {
        return this.send(url, "PATCH", body)
    },
    delete: function (url) {
        return this.send(url, "DELETE")
    }
}