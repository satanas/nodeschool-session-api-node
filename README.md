# How to build an API with Node.js, Mongo and Express

In this focused session we will create a RESTful API from scratch. We will start with a Hello World endpoint and continue
iterating over that code until we get our API with the CRUD (Create, Retrieve, Update and Destroy) methods. In order for
you to track the progress easily, I have divided the whole development process in step and, each step has its own folder
with the source code expected at that point. That way you have "snapshots" and can see the state of the source
throughout the different stages of development.

So far the stages are:
* [step_1_setup](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_1_setup): initial
configuration for the application (package.json, setup, etc).
* [step_2_first_endpoint](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_2_first_endpoint): Hello
World endpoint.
* [step_3_create](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_3_create): POST resource to
create elements.
* [step_4_retrieve](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_4_retrieve): GET resource
to retrieve a single element and a collection.
* [step_5_reorg](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_5_reorg): code reorganization.
* [step_6_update](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_6_update): PUT resource to
update existing elements.
* [step_7_destroy](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_7_destroy): DELETE resource
to remove elements from the database.
* [step_8_middleware](https://github.com/satanas/nodeschool-session-api-node/tree/master/step_8_middleware): how to
create a function that will log useful information about each request.

# Agenda
In this focused session we will see:

* [What is an API and why we need it?]()
* [Dependencies: Installation and setup]()
* [Our first endpoint]()
* [What is REST and why we should care about it?]()
* [Let's code!]()

# What is an API and why we need it?

## What?
* Technically, API stands for **Application Programming Interface**
* We will refer in this session to RESTful APIs
* An API is just a chunk of software
* Software-to-software interface
* Contract between two applications

## Why?
* Expose functionalities
* DRY (Don't Repeat Yourself) - delegate responsibilities
* Consistent coding in stable environments
* Reliability and predictability of functions

## Example

https://jsonplaceholder.typicode.com
vs.
https://jsonplaceholder.typicode.com/todos/1

## More APIs
* Twitter and Facebook API
* Payments (PayPal, Square, Stripe)
* AWS (functions, gaming, database)
* [ProgrammableWeb](https://www.programmableweb.com/)

# Dependencies: Installation and setup

1. Check your node and npm versions and make sure you have installed node >= 8.0.0. If not, we recommend installing it
via [NVM (node version manager)](https://nodesource.com/blog/installing-node-js-tutorial-using-nvm-on-mac-os-x-and-ubuntu/).
```
npm -v
node -v
```

2. Setting our node application up:
```
npm init
```

3. Install dependencies
```
npm install --save express mongodb body-parser
```

3.1. Install development dependencies (optional)
```
npm install --save-dev nodemon
```

3.2. Set up nodemon
```
// package.json
"scripts": {
  "dev": "nodemon server.js"
}
```

4. Install MongoDB
* Download the right MongoDB version from [MongoDB](https://www.mongodb.org/downloads)
* Create a database directory where you want to store the database files:
```
mkdir data
```
* Install and start a `mongod` process pointing to the directory you just created:
```
mongod --dbpath=data
```

5. Download and install [Postman](https://www.getpostman.com/downloads/)

# Our first endpoint

```javascript
// server.js

const express = require('express');

const port = 8000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

# What is REST and why we should care about it?

## What?
* REST stands for REpresentational State Transfer
* Standard for web communications
* REST-compliant systems are known as RESTful

## How?
* Separation of client and server
* Stateless
* Requests and responses via HTTP protocol

## Why?
* High reliability, performance and scalability
* Predictability (same actions receive same responses)
* Allow interaction between disparate systems

## Requests
* It's the way the clients ask for information to the server
* Must provide:
  * An HTTP verb
  * A header
  * A path
  * An optional body with data

### HTTP Verbs
* GET: retrieve a specific resource or a collection of resources
* POST: create new resource
* PUT: update a specific resource
* DELETE: remove a specific resource

### Headers
* Define operating parameters of an HTTP transaction
* Accept, Content-Type, Authorization, Cache-Control, User-Agent, etc

### Path
* Uniform Resource Identifier (URI) or Uniform Resource Locator (URL)
* Unambiguously identifies a particular resource
* Represent nested resources
* First part should be the plural form of the resource (convention)
* If retrieving specific element, an id should be provided

In the URL https://myawesomeapp.com/customers/123456/orders/1, the path is:
```
/customers/123456/orders/1
```

## Responses

### Content type
* Header included by the server when sending data back to the client

### Status Code
* 1xx: informational
* 2xx: successful
* 3xx: redirection
* 4xx: client error
* 5xx: server error

Some of the most common status codes are:
* 200 OK
* 201 Created
* 301 Moved Permanently
* 400 Bad request
* 401 Unauthorized
* 404 Not Found
* 500 Internal Server Error

Full list of status codes on [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

### Payload
* Data sent back from the server

# How an API looks like (aka DEMO TIME!)

## Examples of requests and responses

### Get a collection
GET https://jsonplaceholder.typicode.com/posts

### Get a specific element
GET https://jsonplaceholder.typicode.com/posts/1

### Create new element
POST https://jsonplaceholder.typicode.com/posts
```
{
"userId": 1,
"title": "Test from NodeSchool Seattle",
"body": "Hello NodeSchool Seattle"
}
```

### Update existing element
PUT https://jsonplaceholder.typicode.com/posts/{id}
```
{
"userId": 1,
"title": "Hello from NodeSchool Seattle",
"body": "Hello World"
}
```

### Delete existing element
DELETE https://jsonplaceholder.typicode.com/posts/{id}

# CODE, CODE, CODE

This is where we code the API!

# Howmework
* Create a config file to store db and port variables and use it in `server.js`
* Implement a PATCH endpoint to allow partial edition
* Improve POST endpoint to avoid inserting duplicates. Hint: you can avoid duplicates in two ways:
  * Using one of the existing fields (let's say name) as a primary key in MongoDB
  * Writing a code validation that searches in the database and checks if the record exists before inserting
* Enhance POST and PUT validations (more robust validations, better error messages, etc)
* Implement a search endpoint. Hints:
  * Use GET verb
  * Filter by name and/or association
  * Return a collection of elements

# Follow-up questions
* What happens if we have thousands of records in the database and we want to fetch them all? (hint: pagination)
* How can we prevent our API being abused? (hint: rate limiting)
* What if we have millions of users hitting our API concurrently? (hint: scaling)
* How can we document our API? (hint: OpenAPI)
* Is there a standard for the JSON responses? (hint: check HATEOAS)
* What if some resources can only be accessed by certain users? (hint: authentication and authorization)

# References
* https://docs.npmjs.com/files/package.json
* https://docs.mongodb.com/manual/reference/
* https://expressjs.com/
* https://money.howstuffworks.com/business-communications/how-to-leverage-an-api-for-conferencing1.htm
* https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82
* https://nordicapis.com/what-is-the-difference-between-an-api-and-an-sdk/
* https://www.codecademy.com/articles/what-is-rest
* https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
* https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
* https://en.wikipedia.org/wiki/URL
* https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
* https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2
* https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
