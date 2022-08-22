
'use strict'

const STRIPE_API_KEY = 'sk_live_.........' // Copy paste a Secret key from https://dashboard.stripe.com/apikeys
const CODE_LENGTH = 40 // Coupon code length (including prefix). Must be between 3 and 200
const NB_COUPONS = 10000 // Number of coupons to generate. Must be between 100 and 10000
const PREFIX = 'TaCoS' // Optional prefix for codes
const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890' // List of characters to generate code from
const fileName = `AppSumo-${NB_COUPONS}-codes.csv`

const fs = require('fs')
const stripe = require('stripe')(STRIPE_API_KEY)

async function createCodes() {
  const stream = fs.createWriteStream(fileName)
  const coupon = await stripe.coupons.create({
    name: 'AppSumo Lifetime Deal',
    percent_off: 100,
    duration: 'forever'
  })
  for (let i = 0; i < NB_COUPONS; i++) {
    const code = await createPromo(coupon.id)
    stream.write(`${code}\r\n`)
    console.log(`${i + 1}/${NB_COUPONS} - ${code}`)
  }
  stream.end()
  console.log(`✨✨✨ ${NB_COUPONS} coupon have been created on Stripe & saved in a csv file ${fileName}`)
}

function generateRandomCode () {
  return PREFIX + Array.from(
    { length: CODE_LENGTH - PREFIX.length },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
}

async function createPromo (coupon) {
  const code = generateRandomCode()
  try {
    await stripe.promotionCodes.create({
      coupon,
      code,
      max_redemptions: 1
    })
 } catch (e) {
   console.log(e)
 }
  return code
}

createCodes()
