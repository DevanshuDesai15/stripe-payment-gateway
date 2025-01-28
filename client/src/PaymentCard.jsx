import { useState } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';

export default function PaymentCard() {

    const [amount, setAmount] = useState(0);

    const makePayment = async () => {
        try {
            const stripe = await loadStripe('pk_test_51PyHVdP2LtWyRlyOiY95INrQSPcjRUH4R5N4cPaI7eqATzb1KBVWH4pvlXUHwlPPEUIzUjshQ92nmLAtOTS2609N00nEhErcLI');
            console.log(import.meta.env.STRIPE_SECRET_KEY);
            const body = {
                amount: parseFloat(amount) // Ensure amount is a number
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const response = await fetch(`http://localhost:8282/checkout-session`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Payment</h1>
            {/* <StripeCheckout stripeKey='pk_test_51PyHVdP2LtWyRlyOiY95INrQSPcjRUH4R5N4cPaI7eqATzb1KBVWH4pvlXUHwlPPEUIzUjshQ92nmLAtOTS2609N00nEhErcLI'
            token={makePayment}
            name='Pay Now'
            amount={amount * 100}
            > */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                <input
                    type='text'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '300px',
                        padding: '12px 15px',
                        marginBottom: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px',
                        transition: 'border-color 0.3s ease'
                    }} />
                <button
                    onClick={makePayment}
                    style={{
                        padding: '12px 24px',
                        border: '0',
                        borderRadius: '4px',
                        backgroundColor: '#6772e5',
                        color: '#fff',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                >Pay Now</button>
            </div>
        </div>
    )
}
