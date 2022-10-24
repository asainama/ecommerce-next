import React from 'react'
import { useStateContext } from '../../lib/context';
import { Card, CardInfo, CartStyle, CartWrapper, EmptyStyle, Checkout, Cards } from './Cart.style';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { Quantity } from '../../styles/ProductDetails';
import getStripe from '../../lib/getStripe';


// Animation Variants
const card = {
    hidden:{opacity:0, scale: .8},
    show:{opacity:1, scale: 1},
}

const cards = {
    hidden: { opacity: 0},
    show: {
        opacity: 1,
        transition: {
            delayChildren: .5,
            staggerChildren: .2,
        }
    }
}

// Payment

export default function Cart() {
    const {
        cartItems,
        setShowCart,
        onAdd,
        onRemove,
        totalPrice
    } = useStateContext();
    
    const handleCheckout = async()=> {
        const stripe =  await getStripe();
        const response = await fetch('/api/stripe',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(cartItems),
        });
        const data = await response.json();
        console.log(data);
        await stripe.redirectToCheckout({ sessionId: data.id });
    }
  return (
    <CartWrapper
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity: 0}}
        onClick={()=> setShowCart(false)}>
        <CartStyle
            initial={{x: '50%'}}
            animate={{x: '0%'}}
            exit={{x: '50%'}}
            transition={{type: 'tween'}}
            onClick={(e)=> e.stopPropagation()}
        >
            {cartItems.length < 1 && (
                <EmptyStyle
                initial={{opacity:0, scale: .8}}
                animate={{opacity:1, scale: 1}}
                exit={{opacity:0, scale: .8}}
                transition={{delay: .2}}
                >
                    <h1>You have more shopping to do 🤭 </h1>
                    <FaShoppingCart/>
                </EmptyStyle>
            )}
            <Cards
                variants={cards}
                initial='hidden'
                animate='show'
                layout
            >
                {cartItems.length >= 1 && (
                    cartItems.map((item)=> {
                        return (
                        <Card
                        variants={card}
                        layout
                            key={item.slug}
                        >
                            <img 
                                src={item.image.data.attributes.formats.thumbnail.url} 
                                alt={item.title}
                            />
                            <CardInfo>
                                <h3>{item.title}</h3>
                                <h3>{item.price} $</h3>
                                <Quantity>
                                    <span>Quantity</span>
                                    <button onClick={()=> onRemove(item)}>
                                        <AiFillMinusCircle/>
                                    </button>
                                    <p>{item.quantity}</p>
                                    <button onClick={()=> onAdd(item, 1)}>
                                        <AiFillPlusCircle/>
                                    </button>
                                </Quantity>
                            </CardInfo>
                        </Card>
                        )
                    })
                )}
            </Cards>
            {cartItems.length >= 1 && (
                <Checkout>
                    <h3>Subtotal: {totalPrice}$</h3>
                    <button onClick={handleCheckout}>Purchase</button>
                </Checkout>
            )}
        </CartStyle>
    </CartWrapper>
  )
}
