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



### Rates
- **Endpoint:** `GET /fx-rates`
- **Description:** Fetches live FX conversion rates from memory stored in the cache.
- **Response:** Returns a quote ID along with the expiration time and the rates.

*Implementation Details*

- **Cache Handling:** The controller uses a `cacheService` to handle caching of FX rates and quote IDs.
- **Quote ID Generation:** It tracks the last time a quote ID was requested and generates a new quote ID if 60 seconds have passed since the last request or if no existing quote ID is available.
- **Expiration:** The quote ID expires after 60 second*s, and the expiration time is included in the response.
- **Throttling:** Throttling is applied to limit the number of requests to the endpoint.



### FX Conversion API

- **Endpoint:** `POST /fx-conversion`
- **Description:** Fetches specified amounts from one currency to another if not found in cache memory. Performs an FX conversion using the provided quote ID and converts the specified amount from one currency to another.
- **Request Body:** 
  ```json
  {
    "quoteId": "12345",
    "from": "USD",
    "to": "EUR",
    "amount": 100
  }
  ```
- **Response:** Returns the converted amount along with the quote ID, source currency, target currency, and the original amount.

*Implementation Details*

- **Throttling:** Throttling is applied to limit the number of requests to the endpoint.
- **Handling Quote ID:** The controller fetches the latest quote ID from the `fx-rates` endpoint and compares it with the provided quote ID.
- **Currency Conversion:** It calculates the conversion using the latest exchange rate fetched from the cache or the external API (if not found in the cache).
- **Caching:** The converted amount is cached to improve performance and avoid redundant API calls for the same conversion.
