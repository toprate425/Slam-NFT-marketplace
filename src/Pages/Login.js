import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import logo from "../assets/img/Slam.png";
import logo_white from "../assets/img/Slam_white(big).png";
import sm_bg from "../assets/img/smbg.png";
import login_image from "../assets/img/login.png";
import "../assets/styles/login.scss";
import { HeaderContext } from "../context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import http from '../http';
import "react-toastify/dist/ReactToastify.css";


function Login() {
	const { isDark ,setUser} = useContext(HeaderContext);
	const history = useHistory();

	const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        buttonText: 'Submit'
    });


	useEffect(() =>{
		sessionStorage.setItem('isVisited',true)
	},[])

	useEffect(() => {
		let len = document.getElementsByClassName("ant-input-password-icon").length;
		for (let i = 0; i < len; i++) {
			if (isDark)
				document.getElementsByClassName("ant-input-password-icon")[
					i
				].style.color = "white";
			else
				document.getElementsByClassName("ant-input-password-icon")[
					i
				].style.color = "#a9adbd";
		}

		len = document.querySelectorAll(".ant-form-item-label > label").length;
		for (let i = 0; i < len; i++) {
			if (isDark)
				document.querySelectorAll(".ant-form-item-label label")[i].style.color =
					"white";
			else
				document.querySelectorAll(".ant-form-item-label label")[i].style.color =
					"#1b1b1b";
		}
	}, [isDark]);

	const onSign = (values) => {

		axios.post(http+'auth/signin',values).then((res) =>{
			sessionStorage.setItem('user' ,res.data.user)
			sessionStorage.setItem('id' ,res.data.id)
		 	sessionStorage.setItem('jwt', JSON.stringify(res.data.token));
		  history.push('/category')
	
		}).catch(err =>{
		  history.push('/login')
		  toast.error("Login failed", {
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
		  });
		})
	  };

	const onFinishFailed = (errorInfo) => { };

	const registerAction = () => {
		history.push("/register");
	};

	const {role, name, email, buttonText} = values;

	return (
		<div className="login-container" style={{ overflow: "hidden" }}>
			<div className="small-back">
				<img src={sm_bg} />
			</div>
			<div className="container-left">
				<div className={`login-text Sp36 SPFontB  ${isDark && "text-white"}`}>
					Log in
				</div>
				<div className="sm-text Inter18 font-grey-light sm-Inter9">
					Log in with your data that you entered during your registration.
				</div>
				<Form
					name="basic"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={onSign}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					className={` ${isDark && "text-white"}`}
				>
					<Form.Item
						label="E-mail"
						name="email"
						value={email}
						rules={[
							{
								type: "email",
								message: "Please input your email!",
							},
						]}
					>
						<Input size="large" placeholder="Enter your email" className ={`${isDark&&'text-white'}`}  defaultValue= {name}/>
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								min: 8,
								message: "Use 8 characters or more for your password",
							},
						]}
					>
						<Input.Password placeholder="At least 8 characters"  className ={`${isDark&&'text-white'}`}/>
					</Form.Item>
					<Form.Item name="remember" valuePropName="checked">
						<Checkbox />{" "}
						<span
							className={`ml-10 Inter18 sm-Inter9  ${isDark && "text-white"}`}
						>
							Keep me logged in
						</span>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							style={{ background: "#216AF5" }}
							htmlType="submit"
						>
							Log in
						</Button>
					</Form.Item>
				</Form>
				<div
					className={`Inter18 text-center mt-20 sm-Inter9 ${isDark && "text-white"
						}`}
				>
					Don’t have an acoount yet ?
					<span
						className="font-blue"
						onClick={registerAction}
						style={{ cursor: "pointer" }}
					>
						&nbsp; Register
					</span>
				</div>
				<div
					className="Inter18 font-blue text-center mt-10 sm-Inter9 mt-sm5"
					style={{ cursor: "pointer" }}
				>
					Forgot Password ?
				</div>
			</div>

			<div className="w-50">
				<img
					src={login_image}
					className="login-back"
					style={{ objectFit: "cover" }}
				/>
			</div>
			<ToastContainer />
		</div>
	);
}

export default Login;
