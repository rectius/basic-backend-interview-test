# A observer for near earth objects

### Node.js implementation for McMackler Basic Backend Developer Interview.

# Instructions

## How to install?

Clone the repo:
```sh
git clone https://github.com/rectius/basic-backend-interview-test.git
cd basic-backend-interview-test
```

Install tools:
```js
npm install -g nodemon babel-node
```

Install dependencies:
```sh
npm install
```

Prepare environment variables:
```sh
# configure MONGODB variable to connect to the database
mv .env.example .env
```

## How to import NeoWS data?

Import NeoWS data into MongoDB:
```sh
npm run-script feed
```

## How to start?

Run server:
```sh
npm start
```

## How to test?

Run tests:
```sh
npm test
```

## How to deploy?

Compile to ES5 into dist folder:
```sh
npm build
```
