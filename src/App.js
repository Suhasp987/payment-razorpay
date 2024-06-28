import React from 'react';
import './App.css';
import axios from 'axios'
import { useState } from 'react';

function App() {

const [responseId,setResponseId]=React.useState("");
const [resposneState,setResposneState]=useState([])

const loadScript=(src)=>{
  return new Promise((resolve)=>{
    const script=document.createElement("script");
    script.src=src;

    script.onload=()=>{
            resolve(true)
    }
    script.onerror=()=>{
      resolve(false)
    }

    document.body.appendChild(script)


  })
}

const createRazorpayOrder=(amount)=>{
  let data=JSON.stringify({
    amount:amount*100,
    currency:'INR'
  })

  let config={
    method:"post",
    maxBodyLength:Infinity,
    url:"https://tech-cart-one.vercel.app/order",
    headers:{
            'Content-Type':'application/json'
    },
    data:data
  }

  axios.request(config)
  .then((response)=>{
    console.log(JSON.stringify(response.data));
     handleRazorpayScreen(response.data.amount)
  })
  .catch((error)=>{
    console.log("error",error)
  })
}

const handleRazorpayScreen=async(amount)=>{
  console.log("started Screen")
  const res =await loadScript("https:/checkout.razorpay.com/v1/checkout.js")
  console.log(res)
  if(!res){
    alert("some error at razorpay")
    return
  }
  else{
    console.log("Scrren not able to display")
  }
  const options={
    key:"rzp_test_L1JPeGnZbS2ffv",
    amount:amount,
    currency:'INR',
    name:"Tech Cart",
    description:"payment to tech cart",
    image:"image",
    handler:function(response){
      setResponseId(response.razorpay_payment_id)
    },
    prefil:{
      name:"Suhas",
      email:"suhas123.p@mail.com"
    },
    theme:{
      color:"#F4C430"
    }
  }

  console.log("open")
  const paymentObject=new window.Razorpay(options)
  console.log(paymentObject)
  paymentObject.open();
  console.log(responseId);
}


  return (
    <div>Welcome to the Payment 
      <button onClick={()=>createRazorpayOrder(100)}>Payment</button>


      <form>
      
      </form>
    </div>
  );
}

export default App;
