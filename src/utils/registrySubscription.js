const axios = require("axios");

module.exports = {
    subscribeToApiGateway: async() => {
        // try {
            const response = await axios({
                method: "POST",
                baseURL: `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}`,
                url: `/registry/services`,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    serviceIdentifier: "account-service",
                    serviceLabel: "Service Account",
                    host: process.env.HOST,
                    port: process.env.PORT,
                    entrypointUrl: "/api/accounts",
                    redirectUrl: "/api/accounts",
                    routeProtections: [
                        { methods: ["POST"], route: "/mentor/:code", roles: [] },
                        { methods: ["POST"], route: "/:id/suspend", roles: [] },
                        { methods: ["POST"], route: "/:id/activate", roles: ["admin", "salesman"] },
                        { methods: ["GET"], route: "/:id", roles: [] },
                        { methods: ["PATCH"], route: "/:id", roles: [] },
                        { methods: ["GET"], route: "/", roles: ["admin", "salesman"] }
                    ]
                }
            });
        // } catch (error) {
        //     console.log(error);
        // }
    }
}