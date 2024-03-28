import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { context } from "../AppState";

function OrderMenu() {
  const [data, setData] = useState([]);
  const [currCat, setCurrCat] = useState("?category=Starter");
  const [currOrder, setCurrOrder] = React.useState([]);
  const { appData } = useContext(context);
  useEffect(() => {
    fetchCurrOrder();
    fetchData(currCat);
  }, [currCat]);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  async function fetchCurrOrder() {
    const res = await axios.get(
      "/order/my_current_orders/" + appData?.auth?.customer_id
    );
    console.log("order my_current_orders = ", res.data);
    if (res.statusText === "OK") setCurrOrder(res.data);
  }
  // alert(currOrder);
  async function fetchData() {
    if (currCat === "") return;
    try {
      const res = await axios.get("/menuitem" + currCat);
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e.message);
      alert("Network Error in getting menu details");
    }
  }
  console.log(order);
  const linkStyle = {
    border: "none",
    backgroundColor: "transparent",
    color: "grey",
  };

  async function addToOrder(
    order_id,
    menuitem_id,
    qty,
    price,
    image_url,
    item_name
  ) {
    setOrder((prev) => {
      return [
        ...prev,
        { order_id, menuitem_id, qty, price, image_url, item_name },
      ];
    });
  }

  async function placeOrder() {
    const resProm = order.map(async (item) => {
      console.log(item);
      return await axios.post("/trn_order", {
        ...item,
        entry_by: 1 || 1,
        entry_by_role: 5,
      });
    });

    const res = await Promise.all(resProm);
    console.log(res);
    if (res.length === order.length) {
      navigate("/profile");
    } else {
      alert(`Place Order Again ${res.error}`);
    }
  }

  return (
    <section id="menu" className="menu" style={{ marginTop: 10 }}>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Our Menu</h2>
          <p>
            Check Our <span>World Class Menu</span>
          </p>
        </div>

        {/* select category */}
        <ul
          className="nav nav-tabs d-flex justify-content-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Starter")}
            >
              <a
                className="nav-link show"
                data-bs-toggle="tab"
                data-bs-target="#menu-starters"
              >
                <h4>Starters</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=South-Indian")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-southindian"
              >
                <h4>SouthIndian</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Chinese")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-chinese"
              >
                <h4>Chinese</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Sabzi")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-sabzi"
              >
                <h4>Sabzi</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Chapati")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-chapati"
              >
                <h4>Chapati</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Rise-Dal")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-rizedal"
              >
                <h4>RiseDal</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Fast-Foods")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-fastfood"
              >
                <h4>Fast Food</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Drinks")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-drinks"
              >
                <h4>Drinks</h4>
              </a>
            </button>
          </li>

          <li className="nav-item">
            <button
              style={linkStyle}
              onClick={() => setCurrCat("?category=Dessert")}
            >
              <a
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#menu-dessert"
              >
                <h4>Dessert</h4>
              </a>
            </button>
          </li>
        </ul>

        <div className="tab-content" data-aos="fade-up" data-aos-delay="300">
          <div className="tab-pane fade active show">
            <div className="tab-header text-center">
              <p>Menu</p>
              <h3>{currCat.split("=")[1]}</h3>
            </div>

            {/* menu items */}
            <div className="row gy-5">
              {data.map((item, i) => {
                return (
                  <div
                    className="col-lg-4 menu-item"
                    key={item.item_name + i}
                    style={{
                      border: "1px dashed grey",
                      borderRadius: 8,
                      padding: 5,
                    }}
                  >
                    <a href="#" className="glightbox">
                      <img
                        src={`http://localhost:8080/images/${item.image_url}`}
                        className="menu-img img-fluid"
                        alt=""
                      />
                    </a>
                    <h4>{item.item_name}</h4>
                    {/* <p className="ingredients">
                      Lorem, deren, trataro, filede, nerada
                    </p> */}
                    <p className="price">&#x20b9;{item.price}</p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);
                        addToOrder(
                          currOrder?.[0]?.order_id,
                          item.menuitem_id,
                          +data.get("qty"),
                          item.price,
                          item.image_url,
                          item.item_name
                        );
                      }}
                      role="group"
                      style={{ width: "70%", height: 63 }}
                    >
                      <input
                        type="number"
                        name="qty"
                        min={1}
                        defaultValue={1}
                        style={{ padding: 0, margin: 0, minWidth: 50 }}
                        required
                      />{" "}
                      <button style={{ borderRadius: 5 }} type="submit">
                        &#43;&nbsp;Add&nbsp;to&nbsp;Order
                      </button>
                    </form>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      {/* viewing ordered items */}
      <div style={{ margin: 60, minWidth: "80%" }}>
        <h3>Whats In My Cart !?</h3>
        {order.length === 0 && <p>Empty Cart</p>}
        <div className="row">
          {order.map((order, i) => {
            return (
              <div className="col-lg-2 menu-item" key={order.image_url + i}>
                <img
                  src={`http://localhost:8080/images/${order.image_url}`}
                  className="menu-img img-fluid"
                  alt=""
                />
                <center>
                  Name : {order.item_name}
                  <br />
                  Price : {order.price}
                  <br />
                  Quantity : {order.qty}
                  <br />
                  <button
                    style={{
                      borderRadius: 7,
                      width: "70%",
                      fontSize: "small",
                      padding: 5,
                    }}
                    onClick={() => {
                      setOrder((prev) =>
                        prev.filter(
                          (item) => item.menuitem_id !== order.menuitem_id
                        )
                      );
                    }}
                  >
                    Remove from Cart
                  </button>
                </center>
              </div>
            );
          })}
        </div>
        <center>
          <button
            disabled={order.length === 0 || currOrder.length === 0}
            style={{ borderRadius: 5, margin: 30 }}
            onClick={placeOrder}
          >
            ORDER CART ITEMS &rarr;
          </button>
        </center>
      </div>
    </section>
  );
}

export default OrderMenu;
