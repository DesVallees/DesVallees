import type { RequestHandler } from "./$types";
import Stripe from "stripe";

const SECRET_STRIPE_KEY = "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";
const stripe = new Stripe(SECRET_STRIPE_KEY, {
    apiVersion: "2023-10-16"
})

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const items = data.items;

    let lineItems: any = [];
    items.forEach((item: any) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        })
    });

    // Get URL to checkout
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "https://desvallees.me/PGM",
        cancel_url: "https://desvallees.me/PGM/checkout",
    });

    return new Response(
        JSON.stringify({
            url: session.url // URL to Checkout


        }),
        {
            status: 200,
            headers: {
                'content-type': 'application/json'
            }
        }
    )
}