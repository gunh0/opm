import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "OPM API",
      version: "1.0.0",
      description: "설명이 필요한가",
    },
    host: "localhost:8080",
    basePath: "/api",

    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ jwt: [] }],
  },
  apis: ["./routes/*.yaml", "./swagger/*.yaml"],
};

export const specs = swaggerJsdoc(options);
