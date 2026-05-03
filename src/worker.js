export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname !== "/") {
            url.pathname = "/";
            request = new Request(url, request);
        }

        return env.ASSETS.fetch(request);
    }
};
