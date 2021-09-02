import React, { useState } from 'react';
import {Link} from 'react-router-dom';

export default function SigninScreen(props){
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
    const submitHandler=(e)=>{
        e.preventDefault();
        //TODO : sigin action
    }
  return(
      <div>
          <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Sign In</h1>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                 placeholder="Enter mail"
                 required
                 onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password">Email</label>
                <input type="password" id="password"
                 placeholder="Enter password"
                 required
                 onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
                <label />
                <button className="primary" type="button">
                    Sign In
                </button>
            </div>
            <div>
                <label />
                <div >
                    New customer
                    <Link to="/register" className="space">Create your acconut</Link>
                </div>
            </div>
          </form>
      </div>
  )
}