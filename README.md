Certainly! Here's how you can structure the README for your GitHub repository:

---

# FX Rate Syncing Application

## Overview

Implementing several APIs that allow users to top up their account, fetch live FX conversion rates, perform FX conversions, and check their account balances via alphavantage.co. This FX rate syncing application provides a set of APIs for managing account balances and performing FX conversions. It integrates with alphavantage.co to fetch live FX conversion rates and stores them in memory for efficient access.

## Features

1. **Top Up Account API**
   - **Endpoint:** `POST /accounts/topup`
   - **Request body:** `{ "currency": "USD", "amount": 100 }`
   - **Description:** Allows users to top up their account with a specified amount in a given currency.

2. **FX Rate API**
   - **Endpoint:** `GET /fx-rates`
   - **Description:** Fetches live FX conversion rates from memory stored in Step 1.
   - **Response:** `{ "quoteId": "12345", "expiry_at": "12345"}`

3. **FX Conversion API**
   - **Endpoint:** `POST /fx-conversion`
   - **Request body:** `{ "quoteId": "12345", "fromCurrency": "USD", "toCurrency": "EUR", "amount": 100 }`
   - **Description:** Performs an FX conversion using the provided `quoteId` and converts the specified amount from one currency to another.
   - **Response:** `{ "convertedAmount": 90.53, "currency": "EUR"}`

4. **Balance API**
   - **Endpoint:** `GET /accounts/balance`
   - **Description:** Retrieves the balances in all currencies for the user's account.
   - **Response:** `{ "balances": { "USD": 1000, "EUR": 500, "GBP": 300 } }`


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/9nimbu9/FX-LIVE-CONVERSION.git
   ```

2. Navigate to the project directory:

   ```bash
   cd FX-LIVE-CONVERSION
   ```

3. Install dependencies:

   ```bash
   npm install
   ```
   

## Running the Application

1. Start the development server:

   ```bash
   npm run start
   ```


2. Open your web browser and navigate to http://localhost:3000/api. This is working through Swagger.
