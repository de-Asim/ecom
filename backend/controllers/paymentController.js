const asyncErr = require('../middleware/asyncErr')

const stripe = require('stripe')('sk_test_51LEKDGSBhHhpECXrcP9FjSYEOfp2av2Hu5VVRF3pRVaLkfxnvd49Xi4LJTdsZWjXyNuhCUTlwwvQnekbg9zNbMUj00Jy1UgwoR')

exports.processPayment = asyncErr(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"deKart"
        }
    })
    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret 
    })
})
exports.sendStripeApiKey = asyncErr(async(req,res,next)=>{
    
    res.status(200).json({
        success:true,
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})

