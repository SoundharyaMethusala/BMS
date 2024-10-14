import {useNavigate,Link} from 'react-router-dom'
import {message, Button, Form,Input} from "antd";
import { useEffect } from 'react';
import { forgotPassword } from '../api/user';

function Forgot(){
    const navigate = useNavigate();
    const onFinish = async (values)=>{
     //   console.log(values);
        try{
            const response = await forgotPassword(values);
            if(response.success){
                message.success(response.message);
                navigate('/reset-password');
            }
            else{
                message.error(response.message);
            }
        }
        catch(err){
            message.error(err.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[]);

    return(
        <header className='App-header'>
            <meta className='main-area mx-500 text-center px-3'></meta>
            <section className='left-section'>
                <h1>Forgot Password</h1>
            </section>
            <section className='right-section'>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" htmlFor="email" className="d-block"
                    rules={[{required:true,message:"Email is required"}]}>
                        <Input id="email" type="text" placeholder="Enter your email"/>
                    </Form.Item>
                    <Form.Item className="d-block">
                        <Button type="primary" block htmlType="submit"
                        style={{fontSize:"1rem",fontWeight:"600"}}>
                            SEND OTP
                        </Button>
                    </Form.Item>
                </Form>
                <div>
                    <p>
                        Existing User ? <Link to="/login">Login Here</Link>
                    </p>
                </div>
            </section>
        </header>
    )
}

export default Forgot;