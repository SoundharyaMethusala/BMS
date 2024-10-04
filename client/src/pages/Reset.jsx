import { resetPassword } from "../api/user";
import { useNavigate } from "react-router-dom";
import {Button, Form, Input, message} from "antd";
import { useEffect } from "react";

function Reset(){
    const navigate = useNavigate();

    const onFinish = async(values)=>{
        try{
            const response = await resetPassword(values);
            if(response.success){
                message.success(response.message);
                navigate("/login");
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
},[])

return(
    <>
        <header className="App-header">
            <main className="main-area mw-500 text-center px-3">
                <section className="left-section">
                    <h1>Reset Password</h1>
                </section>
            </main>
            <section className="right-section">
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="OTP" htmlFor="otp" name="otp" className="d-block" 
                    rules={[{required:true,message:"OTP is required"}]}>
                        <Input id="otp" type="number" placeholder="Enter your OTP"/>
                    </Form.Item>
                    <Form.Item label="Password" htmlFor="password" name="password" className="d-block"
                    rules={[{required:true,message:"Password is required"}]}>
                        <Input id="password" type="password" placeholder="Enter your password"/>
                    </Form.Item>
                    <Form.Item className="d-block">
                        <Button type="primary" block htmlType="submit" 
                        style={{fontSize:"1rem",fontWeight:"600"}}>
                            RESET PASSWORD
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </header>
    </>
)
}

export default Reset;