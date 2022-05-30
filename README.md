# Sun Circumference
## Calculate Value of Pi algorithmically and calculate circumference of the Sun using the Pi value.

## Pre-requisite
- node version >= 16.x
- npm version >= 8.5

## Installation

Install the dependencies and start the server.

```sh
git clone https://github.com/JunIanChin/Sun_Circumference
```

- For server
```sh
cd Sun_Circumference 
```
```sh
npm install 
```
```sh
npm run start
```

- For UI
```sh
cd client 
```
```sh
npm install
```
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

## Deploying to AWS Lambda
- zip get-pi and reset-pi folder in aws-lambda
- Create 2 functions: 1 for get-pi , another for reset-pi and upload the folder respectively
- Change the endpoints in the file to reflect to your own endpoint 
- Change the bucket and key as well to reflect to your own AWS S3

## Limitations
- There will be a race-condition currently, moving forward can enhance using queue system. 
- Due to ES6 Number type ceiling, there can only be that much, thus for Sun Circumference, post certain value of pi precision the value will be the same.
- Load testing
