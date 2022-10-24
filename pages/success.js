import React from 'react'
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import Image from 'next/image';
import shiba from '../public/shiba.png';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const stripe = Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default function Success({ order }) {
  const route = useRouter();
  return (
    <Wrapper>
        <Card
            initial={{opacity:0, scale:.75}}
            animate={{opacity:1, scale:1}}
            transition={{duration: .75}}
        >
            <h1>Thank you for your order!</h1>
            <h2>A confirmatin email has been sent to</h2>
            <h2>{order.customer_details.email}</h2>
            <InfoWrapper>
                <Address>
                    <h3>Address</h3>
                    {Object.entries(order.customer_details.address).map(
                        ([key, val])=>(
                            <p key={key}>
                                {key}: {val}    
                            </p>
                        )
                    )}
                </Address>
                <OrderInfo>
                    <h3>Products</h3>
                    {order.line_items.data.map((item)=>(
                        <div key={item.id}>
                            <p>Product: {item.description}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {item.price.unit_amount}</p>
                        </div>
                    ))}
                </OrderInfo>
            </InfoWrapper>
            <button onClick={()=> route.push('/')}>Continue Shopping</button>
            <Image src={shiba} alt='shiba-inu'/>
        </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    margin: 5em 15em;
`;

const Card = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 2rem;
    padding: 3em;
    h2{
        margin-bottom: 1em 0;
    }
    button{
        color: white;
        background: var(--primary);
        font-size: 1.2rem;
        font-weight: 500;
        padding: 1em 2em;
        cursor: pointer;
    }
`;

const Address = styled.div`
    font-size: 1rem;
    width: 100%;
`;

const OrderInfo = styled.div`
    font-size: 1rem;
    width: 100%;
    div{
        padding-bottom: 1em;
    }
`;

const InfoWrapper = styled.div`
    display: flex;
    margin: 1em 0;
`;

export async function getServerSideProps(params){
    const order = await stripe.checkout.sessions.retrieve(
        params.query.session_id,
        {
            expand: ['line_items'],
        }
    );
    return {props: {order}};
}