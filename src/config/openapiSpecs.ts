import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API for JSONPlaceholder",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      // contact: {
      // 	name: "JSONPlaceholder",
      // 	url: "https://jsonplaceholder.typicode.com",
      // },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["src/express/controllers/**/*.ts"],
};

export const openapiSpecification = swaggerJSDoc(options);
