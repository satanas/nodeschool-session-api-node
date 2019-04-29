# NodeSchool Focused Session - How to build an API with Node.js, Mongo and Express

# Agenda
In this focused session we will see:

* [What is an API and why we need it?]()
* [Dependencies: Installation and setup]()
* [Our first endpoint]()
* [What is REST and why we should care about it?]()
* [How to organize our code]()
* [Building an API for a To-Do list]()

# What is an API and why we need it?

## What?
* Technically, API stands for **Application Programming Interface**
* We will refer in this session to RESTful APIs
* An API is just a chunk of software
* Software-to-software interface
* Contract between two applications

## Why?
* Expose functionalities
* Allow interaction between disparate systems
* DRY (Don't Repeat Yourself) - delegate responsibilities
* Consistent coding in stable environments
* Reliability and predictability of functions

## API examples
* Twitter and Facebook API
* Payments (PayPal, Square, Stripe)
* AWS (functions, gaming, database)

# Dependencies: Installation and setup

1. Check your node and npm versions:
```
npm -v
node -v
```

2. Setting up
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

4. Download and install [Postman](https://www.getpostman.com/downloads/)

## References
* https://money.howstuffworks.com/business-communications/how-to-leverage-an-api-for-conferencing1.htm
* https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82
* https://nordicapis.com/what-is-the-difference-between-an-api-and-an-sdk/
