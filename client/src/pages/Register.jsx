import {Form, Input, Button, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../api/user';

export default function Register(){
    const navigate=useNavigate();
    const handleFinish = async (values)=>{
        try{
        console.log(values);
        const res = await RegisterUser(values);
        console.log(res);
        const data=res.data;
        if(res.success){
            message.success(res.message);
            navigate('/login');
        }
        else{
            message.error(res.message);
        }
        }
        catch(err){
            message.error(err.message);
        }
    }
    return (
        <>
        <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Register to BookmyShow</h1>
                    </section>
                    <section className="right-section">
                        <Form layout="vertical" onFinish={handleFinish}>
                            <Form.Item label="Name" htmlFor="name" name="name" className="d-block" 
                            rules={[{ required: true,message:"Name is required"}]}>
                                <Input id="name" type="text" placeholder="Enter your Name"/>
                            </Form.Item>
                            <Form.Item label="Email" htmlFor="email" name="email" className="d-block"
                            rules={[{required:true,message:"Email is required"}]}>
                                <Input id="email" type="email" placeholder="Enter your Email"/>
                            </Form.Item>
                            <Form.Item label="Password" htmlFor="password" name="password" className="d-block"
                            rules={[{required:true,message:"Password is required"}]}>
                                <Input id="password" type="password" placeholder="Enter your Password"/>
                            </Form.Item>
                            <Form.Item className="d-block">
                                <Button type="primary" block htmlType="submit"
                                style={{fontsize:"1rem",fontWeight:"600"}}>
                                    Register
                                </Button>
                            </Form.Item>
                    </Form>
                    <div>
                        <p>Already a user? 
                            <Link to="/login">Login now</Link>
                        </p>
                    </div>
                    </section>
                </main>
            </header>
        </>
    )
}