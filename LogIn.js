import React, { useState } from 'react'

import { Form, Input, Button, Checkbox } from 'antd';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, auth } from "./Firebase"
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from './Firebase';




const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  let navigate = useNavigate();


  const handleLogin = () => {
    if ((email.length && password.length) === 0) {
      alert("Fill form Correctly")
    } else if(email.indexOf("@") === -1 ){
      alert("Need Correct email")
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          localStorage.setItem('currentUser', JSON.stringify(user))
          console.log(user)
          navigate("/");
        })
        .catch((error) => {
          console.log("error", error.code)
          if (error.code === "auth/user-not-found") {
            alert("user Not found")
          } else if (error.code === "auth/wrong-password") {
            alert("Wrong Password")
          } else {
            alert("Something went wrong please fix error")
          }
        });
    }

  }


  async function loginUser() {


    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);

  }





  return (

    <div className="signup-form  formset">

      <h1 >Log In</h1>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 5 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" onChange={(e) => setEmail(e.target.value)} className="input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input onChange={(e) => setPassword(e.target.value)} className="input" />

        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 11, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
          <Button onClick={handleLogin} className="btn" type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};



export default Login;