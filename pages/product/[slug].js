import React,{useContext, useEffect} from 'react'
import { useQuery } from 'urql';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import { useRouter } from 'next/router';
import { Buy, DetailsStyle, ProductInfo, Quantity } from '../../styles/ProductDetails';
import {AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useStateContext } from '../../lib/context';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const {qty,increaseQty, decreaseQty, onAdd, setQty} = useStateContext();
  useEffect(()=>{
    setQty(1);
  },[])
  const router = useRouter();
  const { slug } = router.query;

  const [results] =  useQuery({
    query: GET_PRODUCT_QUERY,
    variables: {
      slug,
    },
  })
  const { data , fetching, error } = results;
  if(fetching) return <p>Loading...</p>
  if(error) return <p>Oh no... {error.message}</p>

  const product = data.products.data[0].attributes;
  const {title, description, image} = product;

  // Create a toast
  const notify = () =>{
    toast.success(`${title} added to your cart`,{ duration: 1500});
  }

  

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title}/>
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}><AiFillMinusCircle/></button>
          <p>{qty}</p>
          <button onClick={increaseQty}><AiFillPlusCircle/></button>
        </Quantity>
        <Buy onClick={()=>{
          onAdd(product, qty);
          notify();
        }}>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  )
}
