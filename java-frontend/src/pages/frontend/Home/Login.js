import axios from "axios";
import { useState } from "react";
import UserService from "../../../service/UserService";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
    
        try {
          // Gửi yêu cầu POST đến đối tượng Spring Boot
          const response = await UserService.login({
            username: username,
            password: password, 
          });
          console.log("1234"+response)
    
          if (response.status === 200) {
            // Lưu thông tin người dùng vào Local Storage
            const user =  response.data;

            // Lưu ID người dùng vào Local Storage
            localStorage.setItem('userId', user.id);
            alert("Đăng nhập thành công");
            navigate("/");
            window.location.reload();
           
          } else {
            // Xử lý lỗi đăng nhập thất bại
            console.error('Login failed');
          }
        } catch (error) {
          // Xử lý lỗi khi gọi API
          document.getElementById("errorlogin").innerText = "Tài khoản hoặc mật khẩu không đúng";

        }
      };
    return (
        <div className="sec-80">
            <div className="form__wrap con">
                <h2 className="sec-title form__title">Đăng nhập</h2>
                <form action id="mona-login-form" onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="form__txt">Bạn chưa có tài khoản?                            
                        <a href="" className="form__link">
                            Đăng ký                          
                        </a>
                        </div>
                                       
                        <input type="text" name="username" value={username}
                    onChange={(e) => setUsername(e.target.value)}  required className="rs-form form__inp" placeholder="Email hoặc Số điện thoại" />
                        <input type="password" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}  required className="rs-form form__inp" placeholder="Mật khẩu" />
                        {/* <div className="form__check">
                            <label htmlFor="user_remember" className="fl-con">
                                <input type="checkbox" name="user_remember" defaultValue="yes" id="user_remember" className="dp-none" />
                                <div className="form__cbox" />
                                <div className="form__ctxt hov-df">
                                    Ghi nhớ tài khoản                              </div>
                            </label>
                        </div> */}
                        <div className="fl-wrap aln-ct form__bot form__mb">
                            <a href="" className="dp-block form__link">
                                Quên mật khẩu ?
                            </a>
                            <button type="submit"    className="rs-form btn-pri c-whi form__submit-small m-btn-loading">
                                Đăng nhập                          </button>
                           
                        </div>
                        <div id="response-login">
                        <p className='text-danger' id='errorlogin'></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;