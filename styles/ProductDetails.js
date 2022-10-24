import styled from "styled-components";

export const DetailsStyle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5em;
    img{
        width: 60%;
        object-fit: cover;
    }
`;

export const ProductInfo =  styled.div`
    width: 40%;
    margin: 0 2em;
    button{
        font-size: 1rem;
        font-weight: medium;
        padding: .5em 1em;
        cursor: pointer;
    }
`;

export const Quantity = styled.div`
    display: flex;
    align-items: center;
    margin: 1em 0;

    button{
        background: transparent;
        border: none;
        display: flex;
        font-size: 1.5rem;
        padding: 0 .5em;
    }
    p{
        width: 1em;
        text-align: center;
    }
    span{
        color: var(--secondary);
    }
    svg{
        color: #494949;
    }
`;

export const Buy = styled.button`
    width: 100%;
    background: var(--primary);
    color: white;
    font-weight: 500;
`;