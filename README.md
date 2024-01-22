# Serverless CRUD API (TypeScript + DynamoDB)

## Overview

This project is a Serverless CRUD API built with TypeScript and DynamoDB, utilizing the Serverless Framework for Infrastructure as Code (IaC). It follows best practices for serverless development and leverages a modern tech stack.

## Prerequisites

Ensure you have the following installed:

- Docker (for local testing)
- Node.js v16+
- AWS CLI

## Getting Started

1. **Clone the Repository:**

    ```bash
   git clone https://github.com/snarjun98/serverless_crud_api.git

    cd serverless_crud_api
    ```

2. **Install Dependencies:**

    ```bash
    npm install 
    ```

3. **Install Serverless Framework:**

     ```bash  
     npm install -g serverless
     ```

## Tech Stack

- **Serverless:** Infrastructure as Code (IaC)
- **Node.js:** Runtime for AWS Lambda functions
- **TypeScript:** Empowers Lambda function code
- **esbuild:** Efficient bundling
- **middy:** Middleware for AWS Lambda functions
- **zod:** Streamlined request validation
- **dynamodb-toolbox:** Simplifies data modeling and offers useful helpers
- **Jest:** Facilitates unit testing
- **Prettier and ESLint:** Ensures code consistency through linting
- **Husky:** Enforces pre-commit hooks for better code quality

## Serverless Plugins

- **serverless-add-api-key:** Creates API keys and usage plans for rate limiting
- **serverless-esbuild:** Efficient bundling for optimal performance
- **serverless-offline:** Enables local invocation for testing
- **serverless-dynamodb:** Facilitates local testing of DynamoDB interactions

## CI/CD using Serverless CI/CD

  Below Image shows the config in serverlessCI/CD

## Deployment

1. **Configure AWS CLI:**

   Set up AWS CLI with the desired profile.

2. **Customize Serverless Configuration:**

   Modify organization and app names as needed.

3. **Deploy to AWS:**

   ```bash
   serverless deploy -s stageName
   ```

   or

   ```bash
   npm run deploy
   ```

## Local Testing

For local testing and invocation:

```bash
npm run offline 
```

Ensure a `.env` file is created based on the provided `.env.example`.
