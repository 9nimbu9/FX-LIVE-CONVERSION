# FX Conversion

Implementing several APIs that allow users to top up their account, fetch live FX conversion rates, perform FX conversions, and check their account balances via alphavantage.co, and in Nest.js.
The FX rate syncing application retrieves real-time currency exchange rates from alphavantage.co and maintains them in memory. These rates are updated regularly, with each rate remaining valid for 30 seconds. The system intelligently manages the stored rates, ensuring that the most relevant and up-to-date FX rates are readily available for use.

### Installation

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
   

### Running the Application

1. Start the development server:

   ```bash
   npm run start
   ```


2. Open your web browser and navigate to http://localhost:3000/api. This is working through Swagger.
