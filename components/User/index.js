import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';

export default function User() {
    const {user} = useUser();
    const route = useRouter();
    if(user){
        return (
            <Profile onClick={()=> route.push('/profile')}>
                <img src={user.picture} alt={user.name}/>
                <h3>{user.name}</h3>
            </Profile>
        )
    }
  return (
    <div
        onClick={() => route.push('/api/auth/login')}
    >
        <FaUserCircle/>
        <h3>Profile</h3>
    </div>
  )
}

const Profile = styled.div`
    img{
        border-radius: 50%;
        width: 30px;
        height: 30px;
        object-fit: cover;
    }
`;
