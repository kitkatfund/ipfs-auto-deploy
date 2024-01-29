# IPFS Auto Deploy
This project was born with the idea of creating a simple and fast way to pin new releases of a customisable list of applications on IPFS.

## How it works
The app is a simple Fastify server that runs a cron job every 5 minutes. The cron job checks if there are new releases of the applications listed in the `apps.json` file. If there are new releases, the app will get the Content Identifier (CIDv1 of the release), pin it on IPFS and update the transfrom rule for this application on cloudflare.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
