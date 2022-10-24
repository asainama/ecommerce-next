import styled from 'styled-components';

export const NavStyles = styled.nav`
    min-height: 15vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    a{
        font-size: 1.2rem;
    }
`;

export const NavItems =  styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    div{
        margin-left: 3em;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    h3{
        font-size: 1rem;
        padding: .25em;
    }
    svg{
        font-size: 1.5rem;
    }
    span{
        background: #ff2626;
        color: white;
        width: 1.3em;
        height: 1.3em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: absolute;
        font-size: .75rem;
        right: 0%;
        top: -15%;
        pointer-events: none;
    }
`;