## Generate Stripe coupons for AppSumo Lifetime Deal

This is a script to quickly generate Stripe coupon codes for AppSumo Lifetime Deal and generate a csv file you can upload directly on AppSumo

## How to run the script

Install dependencies using `npm install` or `yarn`

Customize the script in `index.js` and run it with `npm start`

## Configuration

You can customize the following options in `index.js`

- STRIPE_API_KEY: Copy-paste a Secret key from https://dashboard.stripe.com/apikeys
- CODE_LENGTH: Coupon code length (including prefix). Must be between 3 and 200
- NB_COUPONS: Number of coupons to generate. Must be between 100 and 10000
- PREFIX: Optional prefix for codes
- chars: List of characters to generate code from
- fileName: Name of the csv file created
