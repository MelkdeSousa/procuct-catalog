# Specs

## The Challenge

Your task is to develop an API using Node.js for a product catalog management system in a marketplace application. You should analyze and convert the following user stories into routes for the application:

## User Stories:

- [x] As a user, I want to register a product with its owner, so that I can access its data in the future (title, description, price, category, owner ID).
- [x] As a user, I want to register a category with its owner, so that I can access its data in the future (title, description, owner ID).
- [x] As a user, I want to associate a product with a category.
- [ ] As a user, I want to update the data of a
  - [x] product; or
  - [x] category.
- [ ] As a user, I want to delete a
  - [ ] product; or
  - [ ] category from my catalog.
- [x] A product can only be associated with one category at a time.
- [x] Assume that products and categories belong only to one owner.
- [x] Keep in mind that this is an online product catalog, which means there will be multiple requests for editing items/categories per second, as well as accessing the catalog search endpoint.
- [x] Consider the product catalog as a JSON compilation of all available categories and items owned by a user. This way, the catalog search endpoint does not need to fetch information from the database.
- [x] Whenever there is a change in the product catalog, publish this change to the "catalog-emit" topic in the AWS SQS service.
- [x] Implement a consumer that listens to catalog changes for a specific owner.
- [x] When the consumer receives a message:
  - [x] search the database for that owner's catalog;
  - [x] generate the catalog JSON; and
  - [x] publish it to an AWS S3 service bucket.

![final diagram](/docs/procuct-catalogarch-challenge.png)

## You need to develop this test using the following technologies:

- MongoDB for the database.
- AWS SQS for the catalog change notifications (Redis as alternative).
- AWS S3 for storing the catalog JSON (Cloudflare R2 as alternative).
- Node.js for the backend.
- Express.js as the web framework.

> [Challenge Repository](https://github.com/githubanotaai/new-test-backend-nodejs)
