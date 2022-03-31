import React, { useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import logo from "../assets/img/Slam.png";
import logo_white from "../assets/img/Slam_white(big).png";
import sm_bg from "../assets/img/smbg.png";
import login_image from "../assets/img/login.png";
import "../assets/styles/login.scss";
import { HeaderContext } from "../context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import http from '../http';
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

function Register() {
	const { isDark } = useContext(HeaderContext);

	const history = useHistory();

	useEffect(() => {
		let len = document.getElementsByClassName('ant-input-password-icon').length;
		for (let i = 0; i < len; i++) {
			if (isDark) document.getElementsByClassName('ant-input-password-icon')[i].style.color = 'white';
			else document.getElementsByClassName('ant-input-password-icon')[i].style.color = '#a9adbd';
		}

		len = document.querySelectorAll('.ant-form-item-label > label').length;
		for (let i = 0; i < len; i++) {
			if (isDark) document.querySelectorAll('.ant-form-item-label label')[i].style.color = 'white';
			else document.querySelectorAll('.ant-form-item-label label')[i].style.color = '#1b1b1b';
		}

	}, [isDark]);

	const onRegister = (values) => {
		axios
		  .post(http + "api/users", values)
		  .then((res) => {
			sessionStorage.setItem('id' ,res.data.id)
			sessionStorage.setItem('user' ,res.data.user)
			sessionStorage.setItem('jwt', JSON.stringify(res.data.token));
			history.push("/category");
		  })
		  .catch((err) => {
	
			toast.error("Register failed", {
			  autoClose: 2000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: false,
			});
	
		  });
	  };


	const onFinishFailed = (errorInfo) => { };
	const goLogin = () => {
		history.push("/login");
	};
	return (
		<div className="register-container ">
			<div className="small-back">
				<img src={sm_bg} />
			</div>
			<div className="container-left">
				<div className={`login-text Sp36 SPFontB  ${isDark && "text-white"}`}>
					Registration
				</div>

				<div className="sm-text Inter18 font-grey-light sm-Inter9">
					Type in your email and pasword to get access to{" "}
					<span className="font-blue">NFT Marketplace</span>
				</div>
				<Form
					name="basic"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={onRegister}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<div className="d-flex flex-row w-100 justify-content-between">
						<div style={{ width: "48%" }}>
							<Form.Item
								name="name"
								rules={[
									{
										type: "string",
										min: 3,
										message: "Use 3 characters or more for your first name",
									},
								]}
							>
								<Input size="small" placeholder="Your Name"  className ={`${isDark&&'text-white'}`}  />
							</Form.Item>
						</div>
						<div style={{ width: "48%" }}>
							<Form.Item
								name="surName"
								rules={[
									{
										type: "string",
										min: 3,
										message: "Use 3 characters or more for your last name",
									},
								]}
							>
								<Input placeholder="Your Surname"  className ={`${isDark&&'text-white'}`} />
							</Form.Item>
						</div>
					</div>
					<Form.Item
						name="nickName"
						rules={[
							{
								type: "string",
								min: 3,
								message: "Use 3 characters or more for your name",
							},
						]}
					>
					<Input placeholder="Your Nickname"  className ={`${isDark&&'text-white'}`} />
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{
								type: "email",
								message: "Please input your email",
							},
						]}
					>
						<Input placeholder="Your Email"  className ={`${isDark&&'text-white'}`} />
					</Form.Item>

					<Form.Item
						name="phone"
						rules={[
							{
								min: "string",
								message: "Please input your phone",
							},
						]}
					>
						<Input size="small" placeholder="Your Phone"  className ={`${isDark&&'text-white'}`} />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								min: 8,
								message: "Use 8 characters or more for your password",
							},
						]}
					>
						<Input.Password size="small" placeholder="Your Password"  className ={`${isDark&&'text-white'}`} />
					</Form.Item>
					<Form.Item
						name="repeat-password"
						dependencies={["password"]}
						rules={[
							{
							  min: 8,
							},
							({ getFieldValue }) => ({
							  validator(_, value) {
								if (!value || getFieldValue("password") === value) {
								  return Promise.resolve();
								}
								return Promise.reject(
								  new Error(
									"The two passwords that you entered do not match!"
								  )
								);
							  },
							}),
						  ]}
					>
						<Input.Password size="small" placeholder="Repeat Your Password"  className ={`${isDark&&'text-white'}`} />
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							size="small"
							htmlType="submit"
							style={{ background: "#216AF5" }}
						>
							Register
						</Button>
					</Form.Item>
				</Form>
				<p className={`Inter18 text-center mt-20 sm-Inter9  ${isDark && 'text-white'}`}>
					Already have an account ?
					<span
						className="font-blue"
						style={{ cursor: "pointer" }}
						onClick={goLogin}
					>
						&nbsp;Log in
					</span>
				</p>
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

export default Register;
