# au-vehicle

## School project in Javascript subject

# Backend is from Distributed systems and ASP.NET subjects shared project
## Backend git link: https://github.com/kossar/delivery

Homework description:

# Homework 03 - Frontend client against your own backend api

Framework: Aurelia with typescript.


Code in subdirectory in the git repository named ***icd0006-2020s***  

## Leg 01
***Deadline 2021-04-21 23:59***

Write in Aurelia2 the js client against your own backend.  
Implement authorization (register/login/logout) and minimal one api endpoint in full (crud).  
If your UI need to change according to roles - unpack the jwt and get the role claims from it.  

If you do not participate in Distributed course - please contact the teacher for course provided backend.



This project is bootstrapped by [aurelia/new](https://github.com/aurelia/new).

## Start dev web server

    npm start

## Build the app in production mode

    npm run build

It builds all files to dist folder. To deploy to production server, copy all the `dist/*` files to production root folder.

For example
```
dist/index.html
dist/foo.12345.js
```
Copy to production root folder
```
root_folder/index.html
root_folder/foo.12345.js
```

## Unit Tests

    npm run test

Run unit tests in watch mode.

    npm run test:watch


## Analyze webpack bundle

    npm run analyze
