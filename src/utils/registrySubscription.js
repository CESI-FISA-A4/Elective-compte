const axios = require("axios");

module.exports = {
    subscribeToApiGateway: async() => {
        try {
            const response = await axios({
                method: "POST",
                baseURL: `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}`,
                url: `/registry/services`,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    serviceLabel: "Service Account",
                    host: process.env.HOST,
                    port: process.env.PORT,
                    entrypointUrl: "/api/accounts",
                    redirectUrl: "/api/accounts",
                    routeProtections: [
                        { route: "/", roles: ["admin"] }
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}