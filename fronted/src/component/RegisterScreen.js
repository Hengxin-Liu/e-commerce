import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../actions/userAction'
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function RegisterScreen(props){
   const [name,setName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [confirmpassword,setConfirmPassword]=useState('');

   const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
    const userRegister = useSelector((state) => state.userRegister);
    const {userInfo, loading, error} = userRegister;

   const dispatch=useDispatch();
   const submitHandler = (e) => 
   {
        e.preventDefault();
        if(password !== confirmpassword){
            alert('Password and confirm password are not match')
        }else{
        dispatch(register(name,email,password));
        }
   };
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo]);
  return(
      <div>
          <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Create an account</h1>
            </div>
            {loading && <LoadingBox />}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" 
                 id="email"name
                 placeholder="Enter nane"
                 required
                 onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input type="email"
                 id="email"
                 placeholder="Enter email"
                 required
                 onChange={(e)=>setEmail(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" 
                id="password"
                 placeholder="Enter password"
                 required
                 onChange={(e)=>setPassword(e.target.value)}></input>
            </div>
            <div>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input type="password"
                 id="confirmpassword"
                 placeholder="Enter confirm password"
                 required
                 onChange={(e)=>setConfirmPassword(e.target.value)}></input>
            </div>
            <div>
                <label />
                <button className="primary" type="submit">
                    Register
                </button>
            </div>
            <div>
                <label />
                <div >
                    Already have an account ?
                    <Link to={`/signin?redirect=${redirect}`} className="space" >Sign-In</Link>
                </div>
            </div>
          </form>
      </div>
  )
}