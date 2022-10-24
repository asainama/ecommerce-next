import styled from "styled-components";

import {motion} from 'framer-motion';
export const CartWrapper = styled(motion.div)`
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0,0,0,.4);
    z-index: 100;
    display: flex;
    justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
    width: 30%;
    background: #f1f1f1;
    padding: 2em 5em;
    overflow-y: scroll;
    position: relative;
`;

export const Card =  styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    overflow: hidden;
    background: white;
    padding: 2em;
    margin: 2em 0;
    img{
        width: 8rem;
        height: 100px;
        object-fit: cover;
    }
`;

export const CardInfo = styled(motion.div)`
    width: 50%;
    div{
        display: flex;
        flex-direction: space-between;
    }
`;

export const EmptyStyle = styled(motion.div)`
    position:absolute;
    top: 0;
    transform: translate(-50%,0%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80%;
    h1{
        font-size: 2rem;
        padding: 2em;
    }
    svg{
        font-size: 10rem;
        color: var(--secondary);
    }
`;

export const Checkout = styled(motion.div)`
    button{
        background: var(--primary);
        padding: 1em 2em;
        width: 100%;
        color: white;
        margin-top: 2em;
        border: none;
        cursor: pointer;
    }
`;

export const Cards = styled(motion.div)``;