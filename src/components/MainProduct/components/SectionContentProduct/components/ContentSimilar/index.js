import React, { useEffect, useState } from "react";
import product1 from "../../../../../../images/product1.webp";
import product2 from "../../../../../../images/product2.webp";
import product3 from "../../../../../../images/product3.webp";
import product4 from "../../../../../../images/product4.webp";
import product5 from "../../../../../../images/product5.webp";
import product6 from "../../../../../../images/product6.webp";
import { Link, useParams } from "react-router-dom";
import Container from "../../../../../Container";
import { ToastContainer, toast } from "react-toastify";
import Slider from "react-slick/lib/slider";
import axiosClient from "../../../../../../api/axiosClient";

const ContentSimilar = (props) => {
  const { addcart2 } = props;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let id = useParams();
  useEffect(() => {
    getData();
  }, [id]);

  let [data, setData] = useState([]);
  async function getData() {
    let result = await fetch(
      "http://localhost:8000/api/similar-Medicines/" + id.id
    );
    result = await result.json();
    setData(result);
    console.log(id);
  }

  async function addCart(id) {
    const formData = new FormData();
    if (localStorage.getItem("user-info-people-DN") == null) {
      formData.append("user_id", "");
    } else {
      formData.append(
        "user_id",
        JSON.parse(localStorage.getItem("user-info-people-DN")).id
      );
    }

    formData.append("medicines_id", id);
    formData.append("medicines_qty", 1);

    axiosClient.post("/add-cartMedicines", formData).then((res) => {
      if (res.data.status === 205) {
        getData1();
        toast.success("Thêm sản phẩm thành công vào giỏ hàng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.data.status === 201) {
        getData1();
        toast.error("Thêm sản phẩm thất bại vào giỏ hàng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (res.data.status === 202) {
        getData1();
        toast.error("Cần phải đăng nhập để thêm vào giỏ hàng", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }

  const [data1, setData1] = useState([]);
  useEffect(() => {
    getData1();
  }, []);

  async function getData1() {
    let result = await fetch(
      "http://localhost:8000/api/get-cartMedicines/" +
        JSON.parse(localStorage.getItem("user-info-people-DN")).id
    );
    result = await result.json();
    setData1(result);
  }

  function totalmoney() {
    let test = 0;
    if (document.getElementById("soluongsanpham") != null)
      document.getElementById("soluongsanpham").textContent = data1.length;
    data1.forEach((item) => {
      let ct = document.getElementById(item.name);
      if (ct != null) ct.textContent = `${item.subtotal} VND`;
      test += item.medicines_qty * (item.price - item.discount);
    });
    let tam = document.querySelectorAll(".totalmoney");

    if (tam != null) {
      tam.forEach((item) => (item.textContent = `${test} VND`));
    }
  }
  totalmoney();

  return (
    <div class="contentProduct_Similar">
      <h1 class="nameSimilar">Sản phẩm tương tự</h1>
      <div class="productSimilar">
        {window.innerWidth <= 1200 ? (
          <Slider {...settings}>
            {data.map((name) => (
              <div class="ItemCategory" key={name.id}>
                <Link to={"/medicines/" + name.id}>
                  {name.discount ? (
                    <div class="discountPos">
                      <p>{name.discount}</p>
                    </div>
                  ) : null}
                  <div class="imageItemCategory">
                    <img src={"http://localhost:8000/" + name.image} />
                  </div>
                  <div class="nameItemCategory">
                    <h1>{name.name}</h1>
                  </div>
                  <div class="priceItemCategory">
                    <p class="discount">
                      <del>{name.discount}</del>
                    </p>
                    <p>
                      {name.price} / <span>{name.title}</span>
                    </p>
                  </div>
                </Link>
                <div class="cartItemCategory">
                  <button onClick={() => addCart(name.id)}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <Container>
            <div class="row">
              <div class="col-md-12">
                {data.map((name) => (
                  <div class="ItemCategory" key={name.id}>
                    <Link to={"/medicines/" + name.id}>
                      {name.discount ? (
                        <div class="discountPos">
                          <p>-{(name.discount / name.price) * 100}%</p>
                        </div>
                      ) : null}
                      <div class="imageItemCategory">
                        <img src={"http://localhost:8000/" + name.image} />
                      </div>
                      <div class="nameItemCategory">
                        <h1>{name.name}</h1>
                      </div>
                      <div class="priceItemCategory">
                        <p class="discount">
                          <del>{name.discount}</del>
                        </p>
                        <p>
                          {name.price} / <span>{name.title}</span>
                        </p>
                      </div>
                    </Link>
                    <div class="cartItemCategory">
                      <button onClick={() => addCart(name.id)}>
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default ContentSimilar;
