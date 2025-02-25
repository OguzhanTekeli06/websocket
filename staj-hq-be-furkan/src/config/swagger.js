const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Staj Yönetim Sistemi API",
            version: "1.0.0",
            description: "Stajyer, mentör ve admin için API uç noktaları.",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./src/routes/*.js"], // Tüm route dosyalarını dahil et
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

module.exports = setupSwagger;
