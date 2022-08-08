# Sun Circumference for Naluri assignment

## Calculate Value of Pi algorithmically and calculate circumference of the Sun using the Pi value.

## Pre-requisite

- node version >= 16.x
- npm version >= 8.5
- A File uploaded already in your S3 Bucket
- .env File in your root folder eg:

```sh
S3_BUCKET_NAME=<redacted>
S3_BUCKET_KEY=<redacted>
AWS_ACCESS_KEY=<redacted>
AWS_SECRET_KEY=<redacted>
```

## Installation

First Clone the repo

```sh
git clone https://github.com/JunIanChin/Sun_Circumference
```

For server

```sh
cd Sun_Circumference
```

Installing required modules

```sh
npm install
```

Starting local server

```sh
npm run start
```

For UI

```sh
cd client
```

Installing required modules

```sh
npm install
```

Starting local server

modify client/src/utils/constants.js value and point to your own endpoint

```sh
npm run start
```

For production

```sh
cd client
```

```sh
npm run build
```

```sh
serve -s build -l 3000
```

## Trying it out

- Getting next pi precision

```sh
curl -X GET "http://127.0.0.1:4000/getPiPrecision"
```

- Reset Pi Precision

```sh
curl -X GET "http://127.0.0.1:4000/resetPiPrecision"
```

- For UI

```sh
Open http://127.0.0.1:3000 on browser
```

- Or you can visit here (p/s: might be slow at connecting)

```sh
http://junian-c.tech:4000
```

## Deploying to AWS Lambda

- zip get-pi and reset-pi folder in aws-lambda
- Create 2 functions: 1 for get-pi , another for reset-pi and upload the folder respectively
- Change the endpoints in the file to reflect to your own endpoint
- Change the bucket and key as well to reflect to your own AWS S3

## Limitations and future improvements

- There will be a race-condition currently, moving forward can enhance using queue system.
- Due to ES6 Number type ceiling, there can only be that much, thus for Sun Circumference, post certain value of pi precision the value will be the same.
- Load testing
