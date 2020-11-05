# Getting started

## Run the Remote

Just head over to [the remote link](https://outfit-voting.herokuapp.com/).

## Concurrently

To run both projects, make sure you have `npm i` in both root and `backend/`, then use `npm run start`. It will be running on `localhost:3000`.

## Front-End

To run only the frontend, run `npm run start:local` from root. Follow directions below to run a backend.

## Back-End

In another terminal, cd into `backend/`. Run `npm i` then `npm run server:prod`. Keep both of these running,
and visit `localhost:3000`. Register and log in and get to work.

### To Run a Local DB

If you wish to work on a local database, run a local MongoDB, then in the `backend/` run `npm run server:dev`.

You may run local concurrently with `npm run start:dev` from root.

__Note:__ If you have your local mongodb set to somewhere other than the defaults, update the data in
`backend/config/dev.env`.
