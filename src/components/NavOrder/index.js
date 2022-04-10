import React, { useEffect, useState } from "react";
import Nav from "../Nav";
import "../../scss/NavFull.scss";
import Nav__Top from "../Nav__Top";
import avatar from "../../images/avatar.jpg";
import Container from "../Container";
import listTable from "../Configs/listTable";

const NavOrder = () => {
  const [activeMenu, setActiveMenu] = useState(4);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let result = await fetch("http://localhost:8000/api/order-all");
    result = await result.json();
    setData(result);
  }
  return (
    <div class="navFull">
      <Nav
        checkActiveMenu={() => setActiveMenu(activeMenu)}
        activeMenu={activeMenu}
      ></Nav>
      <div class="nav__Left">
        <Nav__Top nameNav="Orders" avatar={avatar}></Nav__Top>
        <div class="nav__Order">
          <Container>
            <div class="row">
              <div class="col-md-12">
                <div class="Order__Name">
                  <h1>Danh sách đơn đặt hàng vừa nhận</h1>
                </div>
                <div class="Order__Table">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Receiver</th>
                        <th>Address Booking</th>
                        <th>Total</th>
                        <th>Date Booking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((name) => (
                        <tr>
                          <th>{name.id}</th>
                          <th>{name.name}</th>
                          <th>{name.receiver}</th>
                          <th>{name.address_booking}</th>
                          <th>{name.total}</th>
                          <th>{name.date_booking}</th>
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

export default NavOrder;
