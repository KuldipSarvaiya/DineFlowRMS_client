import React, { useEffect, useState } from "react";
import axios from "axios";

function Menu() {
  const [data, setData] = useState([]);
  const [currCat, setCurrCat] = useState("");
  useEffect(() => {
    fetchData(currCat);
  }, [currCat]);

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

  const linkStyle = {
    border: "none",
    backgroundColor: "transparent",
    color: "grey",
  };

  return (
    <section id="menu" className="menu">
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

            <div className="row gy-5">
              {data.map((item, i) => {
                return (
                  <div className="col-lg-4 menu-item" key={item.item_name + i}>
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
                  </div>
                );
              })}

              {/* if no category selected */}
              {currCat === "" && (
                <div className="tab-pane fade active show" id="menu-starters">
                  <div className="row gy-5">
                    <div className="col-lg-4 menu-item">
                      <a
                        href="assets/img/menu/menu-item-1.png"
                        className="glightbox"
                      >
                        <img
                          src="assets/img/menu/menu-item-1.png"
                          className="menu-img img-fluid"
                          alt=""
                        />
                      </a>
                      <h4>Magnam Tiste</h4>
                      <p className="ingredients">
                        Lorem, deren, trataro, filede, nerada
                      </p>
                      <p className="price">$5.95</p>
                    </div>

                    <div className="col-lg-4 menu-item">
                      <a
                        href="assets/img/menu/menu-item-2.png"
                        className="glightbox"
                      >
                        <img
                          src="assets/img/menu/menu-item-2.png"
                          className="menu-img img-fluid"
                          alt=""
                        />
                      </a>
                      <h4>Aut Luia</h4>
                      <p className="ingredients">
                        Lorem, deren, trataro, filede, nerada
                      </p>
                      <p className="price">$14.95</p>
                    </div>

                    <div className="col-lg-4 menu-item">
                      <a
                        href="assets/img/menu/menu-item-3.png"
                        className="glightbox"
                      >
                        <img
                          src="assets/img/menu/menu-item-3.png"
                          className="menu-img img-fluid"
                          alt=""
                        />
                      </a>
                      <h4>Est Eligendi</h4>
                      <p className="ingredients">
                        Lorem, deren, trataro, filede, nerada
                      </p>
                      <p className="price">$8.95</p>
                    </div>

                    <div className="col-lg-4 menu-item">
                      <a
                        href="assets/img/menu/menu-item-4.png"
                        className="glightbox"
                      >
                        <img
                          src="assets/img/menu/menu-item-4.png"
                          className="menu-img img-fluid"
                          alt=""
                        />
                      </a>
                      <h4>Eos Luibusdam</h4>
                      <p className="ingredients">
                        Lorem, deren, trataro, filede, nerada
                      </p>
                      <p className="price">$12.95</p>
                    </div>

                    <div className="col-lg-4 menu-item">
                      <a
                        href="assets/img/menu/menu-item-5.png"
                        className="glightbox"
                      >
                        <img
                          src="assets/img/menu/menu-item-5.png"
                          className="menu-img img-fluid"
                          alt=""
                        />
                      </a>
                      <h4>Eos Luibusdam</h4>
                      <p className="ingredients">
                        Lorem, deren, trataro, filede, nerada
                      </p>
                      <p className="price">$12.95</p>
                    </div>

                    <div className="col-lg-4 menu-item">
                      <a
                        href="assets/img/menu/menu-item-6.png"
                        className="glightbox"
                      >
                        <img
                          src="assets/img/menu/menu-item-6.png"
                          className="menu-img img-fluid"
                          alt=""
                        />
                      </a>
                      <h4>Laboriosam Direva</h4>
                      <p className="ingredients">
                        Lorem, deren, trataro, filede, nerada
                      </p>
                      <p className="price">$9.95</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
