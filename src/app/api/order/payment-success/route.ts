import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  );

  if (event.type === "checkout.session.completed") {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );

    const lineItems = sessionWithLineItems.line_items;
    console.log(lineItems);

    //Criar pedido.
    //Obs: O stripe tem que estar escutando a rota: stripe listen --forward-to localhost:300/api/order/payment-success
    //Obs: Criar a tabela de order na schema.prisma
    // await prismaClient.order.create({
    //   data: {
    //     name: "Mouses",
    //     slug: "mouses",
    //     imageUrl: "https://fsw-store.s3.sa-east-1.amazonaws.com/mouses.png",
    //   },
    // });
  } else {
    console.log("Outro evento -> event type: " + event.type);
  }

  return NextResponse.json({ received: true });
};
