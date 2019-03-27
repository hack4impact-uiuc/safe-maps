# C2TC Spring 2019[![CircleCI](https://circleci.com/gh/hack4impact-uiuc/c2tc-spring-2019.svg?style=svg)](https://circleci.com/gh/hack4impact-uiuc/c2tc-spring-2019)

**Goal:** To create a mobile application that makes the students of UIUC feel safer on campus.

## Product Resources

- [Product Requirements Document](https://docs.google.com/document/d/1ZJVwFBKqaSK1ENXhDKrxS_6lCu60Nlf_htJgafS6m0w/edit?usp=sharing)

## Design Resources

- [Wireframes](https://sketch.cloud/s/45Dzo)
- [Prototype](https://sketch.cloud/s/AJ9Ky/PrjlrQ/play)

## Backend Resources

- [Database Schema](https://github.com/hack4impact-uiuc/c2tc-spring-2019/blob/master/docs/api_docs.md)

## Tech Stack

We split this application into Frontend and Backend services. The backend is [Flask](http://flask.pocoo.org/) server using python 3.7 and pipenv with [MongoDB](https://docs.mongodb.com/), a NoSQL database, as our choice of data store. The Frontend is built with React Native and Expo, which enables our app to run on any type of mobile device.

## Application Structure

- `c2tc-mobile`: frontend top directory
- `backend`: backend top directory

Specific Documentation is given inside the `c2tc-mobile` and `backend` folders.

## Development Setup

### Dependencies

- Node.js 8.x.x
- Python 3.7
- Pipenv

To run the flask server in the backend

```bash
cd backend
pipenv install           # install dependencies
pipenv shell
python manage.py runserver
```

To run the frontend

```bash
cd c2tc-mobile
yarn                         # install dependencies
yarn global add expo-cli     # do this step if you have never used expo before.
# Install the Expo Mobile App on phone if you have never used expo before.
expo start
# Scan QR code with phone (use camera if you have an iphone and use expo app if you have an android.)
```

Note: if you prefer using npm, use `npm` instead of `yarn` in commands provided above

## Team

- Product Manager - Shreyas Mohan ([@shreyshrey1](https://github.com/shreyshrey1))
- Technical Lead - Megha Mallya ([@meghatron3000](https://github.com/meghatron3000))

### Software Devs

- Neeraj Aggarwal ([@n3a9](https://github.com/n3a9))
- Daniel Choi ([@choiboy98](https://github.com/choiboy98))
- Josh Burke ([@JoshBurke](https://github.com/JoshBurke))
- Anooj Lal([@anoojlal](https://github.com/anoojlal))

### Designers

- Philip Kuo ([@pkgamma](https://github.com/pkgamma))
- Annie Wu
