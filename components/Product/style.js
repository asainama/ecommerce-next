import styled from 'styled-components';

export const ProductStyle = styled.div`
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1.5em;
    img{
        width: 100%;
        height: 350px;
        object-fit: cover;
        cursor: pointer;
    }
    h2{
        padding: .5em 0;
    }
`;