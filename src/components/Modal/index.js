import React, { useEffect, useState } from "react";
import "../../scss/Modal.scss";
import banner from "../../images/banner (1).png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";

const Modal = (props) => {
  const { toggleCloseUser } = props;

  const [isMK, setIsMK] = useState(false);
  const toggleMK = () => {
    setIsMK(true);
    setIsDK(false);
    setIsDN(false);
  };

  const [isDK, setIsDK] = useState(false);
  const toggleDK = () => {
    setIsDK(!isDK);
    setIsDN(true);
  };

  const [isDN, setIsDN] = useState(true);
  const toggleDN = () => {
    setIsDN(!isDN);
    setIsDK(true);
    if (localStorage.getItem("user-info-people-DN")) {
      setIsDN(true);
    }
  };

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [random_code, setRandom_code] = useState("");
  const [avatar, setAvatar] = useState("");

  const dangky = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info-people-DK")) {
      dangky("/");
    }
  }, []);

  async function DangKy() {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("random_code", random_code);
    formData.append("avatar", avatar);
    let result = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    localStorage.setItem("user-info-people-DK", JSON.stringify(result));
    dangky("/");
    console.log(avatar);
  }

  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info-people-DN")) {
      history("/user/account");
    }
  }, []);

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    axiosClient.post("/login", formData).then((res) => {
      if (res.data.status === 202) {
        toast.error("????ng nh???p th???t b???i", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        localStorage.setItem("user-info-people-DN", JSON.stringify(result));
        toast.success("????ng nh???p th??nh c??ng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        document.querySelector(".Modal-full").classList.add("falseUser");
        document.querySelector("body").style = null;
        history("/user/account");
      }
    });
  }

  return (
    <div class="Modal-full">
      <div class="Modal-User">
        <div class="Modal-User_left">
          <div class="Modal-User_left-banner">
            <img src={banner} alt={banner} />
          </div>
          <div class="Modal-User_left-body">
            <h1>SbCode xin ch??o !</h1>
            <p>
              H??y ????ng nh???p ????? ???????c h?????ng c??c ?????c quy???n ri??ng d??nh cho
              <svg
                class="Tooltip_icon__3t6rX"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="#112950"
              >
                <g opacity="0.2">
                  <path
                    d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.496 6.033H6.321C6.459 6.033 6.569 5.92 6.587 5.783C6.677 5.127 7.127 4.649 7.929 4.649C8.615 4.649 9.243 4.992 9.243 5.817C9.243 6.452 8.869 6.744 8.278 7.188C7.605 7.677 7.072 8.248 7.11 9.175L7.113 9.392C7.11405 9.45761 7.14085 9.52017 7.18762 9.5662C7.23439 9.61222 7.29738 9.63801 7.363 9.638H8.174C8.2403 9.638 8.30389 9.61166 8.35078 9.56478C8.39766 9.51789 8.424 9.4543 8.424 9.388V9.283C8.424 8.565 8.697 8.356 9.434 7.797C10.043 7.334 10.678 6.82 10.678 5.741C10.678 4.23 9.402 3.5 8.005 3.5C6.738 3.5 5.35 4.09 5.255 5.786C5.25363 5.81829 5.25888 5.85053 5.27043 5.88072C5.28198 5.91091 5.29958 5.93841 5.32216 5.96155C5.34473 5.98468 5.3718 6.00296 5.40169 6.01524C5.43159 6.02753 5.46368 6.03357 5.496 6.033ZM7.821 12.476C8.431 12.476 8.85 12.082 8.85 11.549C8.85 10.997 8.43 10.609 7.821 10.609C7.237 10.609 6.812 10.997 6.812 11.549C6.812 12.082 7.237 12.476 7.822 12.476H7.821Z"
                    fill="inherit"
                  ></path>
                </g>
              </svg>
              <div class="contentTool">
                <h1>Quy???n l???i khi l?? th??nh vi??n</h1>
                <ul>
                  <li>
                    <p>Qu?? t???ng sinh nh???t</p>
                  </li>
                  <li>
                    <p>Mua s???n ph???m th??? 2 gi?? 1k</p>
                  </li>
                  <li>
                    <p>S???n ph???m gi???m gi?? ?????n 50%</p>
                  </li>
                  <li>
                    <p>??u ????i b???t ng???, thi???t k??? ri??ng cho t???ng th??nh vi??n</p>
                  </li>
                  <li>
                    <p>Qu?? t???ng n??ng h???ng VIP</p>
                  </li>
                  <li>
                    <p>T??ch ??i???m ?????n 6% cho kh??ch h??ng VIP</p>
                  </li>
                </ul>
              </div>
            </p>
          </div>
          <div class="Modal-User_left-bottom">
            <p>
              B???n ???? l?? th??nh vi??n SBCode vui l??ng nh???p
              <span onClick={() => setIsMK(toggleMK)}>t???o m???t kh???u</span>
              ????? ti???p t???c s??? d???ng. T???t c??? th??ng tin t??i kho???n v?? ??i???m t??ch l??y
              ?????u kh??ng thay ?????i
            </p>
          </div>
        </div>
        <div class="Modal-User_right">
          <div class="closeModal" onClick={toggleCloseUser}>
            <i class="fa-solid fa-x"></i>
          </div>
          {isMK ? (
            <div class="timmatkhau">
              <h1>?????t m???t kh???u m???i</h1>
              <p>
                Vui l??ng nh???p s??? ??i???n tho???i c???a b???n, SBCode s??? g???i cho b???n m???t
                m?? ????? ?????t m???i m???t kh???u c???a m??nh.
              </p>
              <div class="formUser">
                <form method="" action="">
                  <div class="username_full">
                    <div class="username">
                      <label>
                        <i class="fa-solid fa-user"></i>
                      </label>
                      <input
                        type="text"
                        placeholder="S??? ??i???n tho???i c???a b???n"
                      ></input>
                    </div>
                    <p id="checkUsername"></p>
                  </div>
                  <button type="submit">Ti???p t???c</button>
                </form>
              </div>
            </div>
          ) : null}
          {isDK ? (
            <div class="dangky">
              <h1>????ng k??</h1>
              <div class="formUser">
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-envelope"></i>
                    </label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nh???p Email c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-square-phone"></i>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="S??? ??i???n tho???i c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-user"></i>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nh???p h??? v?? t??n c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-address-card"></i>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nh???p ?????a ch??? c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-code"></i>
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setRandom_code(e.target.value)}
                      placeholder="Nh???p code random c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-globe"></i>
                    </label>
                    <input
                      id="file"
                      type="file"
                      multiple
                      onChange={(e) => setAvatar(e.target.files[0])}
                      placeholder="Click ch???n avatar c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="password_full">
                  <div class="password">
                    <label>
                      <i class="fa-solid fa-lock"></i>
                    </label>

                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="M???t kh???u"
                    ></input>
                  </div>
                  <p id="checkPassowrd"></p>
                </div>
                <label class="checkboxYes" form="checkYes">
                  <input type="checkbox" id="checkYes"></input> T??i ???? ?????c v??
                  ?????ng ?? ??i???u kho???n s??? d???ng{" "}
                  <span>th???a thu???n ng?????i d??ng SBCode, ch??nh s??ch b???o m???t.</span>
                </label>
                <button onClick={DangKy}>????ng k??</button>
                <div class="createUser">
                  <h1>B???n ???? c?? t??i kho???n SBCode?</h1>
                  <p onClick={toggleDK}>????ng nh???p</p>
                </div>
              </div>
            </div>
          ) : null}
          {isDN ? (
            <div class="dangnhap">
              <h1>????ng nh???p</h1>
              <div class="formUser">
                <div class="username_full">
                  <div class="username">
                    <label>
                      <i class="fa-solid fa-user"></i>
                    </label>
                    <input
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="S??? ??i???n tho???i c???a b???n"
                    ></input>
                  </div>
                  <p id="checkUsername"></p>
                </div>
                <div class="password_full">
                  <div class="password">
                    <label>
                      <i class="fa-solid fa-lock"></i>
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="M???t kh???u"
                    ></input>
                  </div>
                  <p id="checkPassowrd"></p>
                </div>
                <div class="forget_password">
                  <a href="#" title="#">
                    Qu??n m???t kh???u?
                  </a>
                </div>
                <button onClick={login}>????ng nh???p</button>
                <div class="createUser">
                  <h1>B???n ch??a c?? t??i kho???n SBCode?</h1>
                  <p onClick={toggleDN}>????ng k?? ngay</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Modal;
