# **Twali** &nbsp;  

## **Setting up for local development** &nbsp;  

Clone the repo locally: &nbsp;  

```
git clone https://github.com/twali-xyz/twali-xyz.git
cd twali-xyz
```

Ensure your node version is at least `v16.13.0`, to check your node version, run: `node -v` &nbsp;   

Install all your node packages: `npm install` &nbsp;  

Add `.env` and `.env.local` files to the root folder with the API keys needed for the repo (reach out to @nagmak or @NickGonzalez04) &nbsp;  

## **Local Development** &nbsp; 

Make sure you have Docker downloaded and installed [Download Docker](https://www.docker.com/products/docker-desktop). You will need to use a local DynamoDB table for development.

Start up the local Dynamo table instance that is already set in `docker-compose.yml` by simply running: &nbsp;  
```
docker-compuse up
```
In a separate terminal lets provision our table for local development by running: &nbsp;  
```
npm run dev:infra
```
Then run the development server locally: &nbsp;  
```
npm run dev
```
## **Production** &nbsp;

## ****Deploying**** &nbsp;

To deploy to production to the cloud run:
```
npx serverless
```
