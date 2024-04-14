Certainly! Here's how you can structure the README for your GitHub repository:

---

# FX Rate Syncing Application

Implement several APIs allowing users to top up their accounts, fetch live FX conversion rates, perform FX conversions, and check their account balances via alphavantage.co. This FX rate syncing application provides a set of APIs for managing account balances and performing FX conversions. It integrates with alphavantage.co to fetch live FX conversion rates and stores them in memory for efficient access. The application also prevents API routes from being overloaded by requests, hence preventing them from attacks, and FX rates are cached in memory.


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



## Endpoints

### Top Up Account API

- **Endpoint:** `POST /accounts/topup`
- **Description:** Allows users to top up their account with a specified amount in a given currency.
- **Request Body:**
  ```json
  {
    "amount": 100,
    "currency": "USD"
  }
  ```

### Deduct Account Balance API

- **Endpoint:** `POST /accounts/low`
- **Description:** Allows users to deduct funds from their account with a specified amount in a given currency. If the deduction amount exceeds the available balance, a `BAD_REQUEST` error is thrown.
- **Request Body:**
  ```json
  {
    "amount": 50,
    "currency": "USD"
  }
  ```

### Get Account Balance API

- **Endpoint:** `GET /accounts/balance`
- **Description:** Retrieves the balances in all currencies for the user's account.


- **Endpoint:** `GET /fx-rates`
- **Description:** Fetches live FX conversion rates from memory stored in the cache.
- **Response:** Returns a quote ID along with the expiration time and the rates.

*Implementation Details*

- **Cache Handling:** The controller uses a `cacheService` to handle caching of FX rates and quote IDs.
- **Quote ID Generation:** It tracks the last time a quote ID was requested and generates a new quote ID if 60 seconds have passed since the last request or if no existing quote ID is available.
- **Expiration:** The quote ID expires after 60 second*s, and the expiration time is included in the response.
- **Throttling:** Throttling is applied to limit the number of requests to the endpoint.



## Rate Limiting

All endpoints are rate-limited to prevent abuse. The default rate limit is set to 30 requests per minute.

## Technologies Used

- NestJS for building the API
- Swagger for API documentation
- Throttler for rate limiting
