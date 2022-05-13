import React, { useContext } from 'react'
import { Context } from '../../context/Context'

export default function MyAccount() {
    
    const { user } = useContext(Context)

    console.log(user)



  return (
    <>
    <div className='myAccount'>
        <div className='personalInfos'>
            <span>Welcome {user.username}</span>
        </div>
    </div>
    </>
  )
}
