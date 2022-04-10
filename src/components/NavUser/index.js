import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import Container from "../Container";
import "../../scss/NavFull.scss";
import Nav__Top from "../Nav__Top";
import avatar from "../../images/avatar.jpg";
import banner from "../../images/banner.png";

const NavUser = () => {
  const [activeMenu, setActiveMenu] = useState(2);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let result = await fetch("http://localhost:8000/api/user-all");
    result = await result.json();
    setData(result);
  }

  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(2)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <Nav__Top nameNav="User Profile" avatar={avatar}></Nav__Top>
        <div class="nav__User">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <div className="user__Name">
                  <h1>Danh sách thành viên đăng ký</h1>
                </div>
                <div class="user__Table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Avatar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((name) => (
                        <tr key={name.id}>
                          <th>{name.id}</th>
                          <th>{name.name}</th>
                          <th>{name.email}</th>
                          <th>{name.address}</th>
                          <th>{name.phone}</th>
                          <th>
                            <img
                              src={"http://localhost:8000/" + name.avatar}
                            ></img>
                          </th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
