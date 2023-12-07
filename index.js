import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/payment', async (req, res) => {
    const { price } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: 'http://localhost:5173/success',
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        unit_amount: price,
                        currency: 'usd',
                        product_data: {
                            name: 'Test',
                            description: 'AI marketing tool Test Payment\n use 4242424242424242 as card number, 04/24 as expiry date and 242 as CVC',
                        },
                    },
                    quantity: 1,
                },
            ],
            cancel_url: 'http://localhost:5173/',
            //customer_email: email,
        });
        res.json({ url: session.url });
    } catch (error) {
        
        res.status(500).json({ error: 'Something went wrong' });
    }
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})