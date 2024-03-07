import { useState } from "react";
import UserService from "../../../service/UserService";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState ("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [roles, setRoles] = useState("");
    const [forceUpdateTimestamp, setForceUpdateTimestamp] = useState(Date.now());
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          setRoles("customer");
          // Tạo một đối tượng người dùng với dữ liệu từ biểu mẫu
          const newUser = {
            name,
            username,
            password,
            email,
            roles,
            address,
            phone,
          };
    
          // Gửi yêu cầu POST đến đối tượng Spring Boot
          const response = await UserService.register(newUser);
    
          console.log(response);
    
          if (response.status === 200||response.status===201) {
            try {
              // Kiểm tra nếu phản hồi có định dạng JSON
              const user = response.data;
    
              // Lưu ID người dùng vào Local Storage
              localStorage.setItem("userId", user.id);
              const storedUserId = localStorage.getItem("userId");
              console.log("storedUserId: " + storedUserId);
    
              // Kích hoạt việc làm lại bằng cách cập nhật forceUpdateTimestamp
              alert("Đăng ký thành công");
              navigate("/");
              window.location.reload();
              
            } catch (jsonError) {
              console.error("Response is not in JSON format:", jsonError);
            }
          } else {
            console.error("Registration failed");
          }
        } catch (error) {
          document.getElementById("errorregister").innerText = "Tên đăng nhập hoặc email đã tồn tại!";
    
        }
      };
    return (
        <div className="sec-80">
            <div className="form__wrap con">
                <h2 className="sec-title form__title">Tạo tài khoản</h2>
                <form onSubmit={handleSubmit}  action id="mona-register-popup">
                    <div className="form">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" required className="rs-form form__inp" placeholder="Họ và tên" />
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="rs-form form__inp" placeholder="Tên người dùng" />
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rs-form form__inp" placeholder="Email" />
       
                        <input type="password"  name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="rs-form form__inp" placeholder="Mật khẩu" />
                        <input type="number" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}  required className="rs-form form__inp" placeholder="Số điện thoại" />
                        <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="rs-form form__inp" placeholder="Địa chỉ" />
                        <div className="form__bot form__mb m-cus-btn-f-register">
                            <button type="submit" className="rs-form btn-pri c-whi form__submit-small m-btn-loading disabled">
                                Tạo                          </button>
                        </div>
                        <span className="dp-block form__bot m-cus-text-regis">
                            Nếu sdt hoặc email của bạn báo đã tồn tại, bấm <a href="https://levents.asia/my-account/login/" className> vào đây </a> và login với sdt hoặc email đó với một mật khẩu bất kì để kích hoạt tài khoản hoặc liên hệ với bộ phận cskh của Levents để được hỗ trợ                      </span>
                        <div id="response-register">

                          <p className='text-danger' id='errorregister'></p>
                        </div>
                    </div>
                </form>

            </div>
        </div>

    );
}

export default Register;