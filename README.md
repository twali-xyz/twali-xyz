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

Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Once installed verfiy that AWS is in the system's `PATH`, use the following commands [Non Mac Commands found here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

```
$ which aws
/usr/local/bin/aws
$ aws --version
aws-cli/2.4.5 Python/3.8.8 Darwin/18.7.0 botocore/2.4.5
```

Run command in terminal to configure with the provided API keys: &nbsp;

```
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

## **Local Development** &nbsp;

Make sure you have Docker downloaded and installed [Download Docker](https://www.docker.com/products/docker-desktop). You will need to use a local DynamoDB table for development.

Start up the local Dynamo table instance that is already set in `docker-compose.yml` by simply running: &nbsp;

```
docker-compose up
```

In a separate terminal lets provision our table for local development by running: &nbsp;

```
npm run dev:infra
```

Confirm table was created by running: &nbsp;

```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

Then run the development server locally: &nbsp;

```
npm run dev
```

## **Production** &nbsp;

## \***\*Deploying\*\*** &nbsp;

To deploy to production to the cloud run:

```
npx serverless
```

## **Before opening a PR** &nbsp;

Please run Prettier to format your files:

```
npx prettier --ignore-path .gitignore --write .
```
