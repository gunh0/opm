import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    info: {
      title: "OPM API",
      version: "1.0.0",
      description: "설명이 필요한가",
    },
    host: "http://49.50.166.140:8080",
    basePath: "/",

    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [{ jwt: [] }],
  },
  apis: ["./swagger/*.yaml"],
};

export const specs = swaggerJsdoc(options);
