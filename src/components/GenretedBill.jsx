import React, { useEffect, useState } from "react";
// import "../styles/menuitem.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function GenretedBill() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/order/get_bill/" + id);
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  return (
    <section id="book-a-table" class="book-a-table" style={{ marginTop: 10 }}>
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">Ordered Menu Items &nbsp;</h5>

            <table className="table table-borderless datatable" border={2}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>IMAGE</th>
                  <th>MENU ITEM NAME</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>QUENTITY</th>
                </tr>
              </thead>
              <tbody>
                {data?.trn_orders?.map((item, i) => {
                  return (
                    <tr>
                      <th>{i + 1}</th>
                      <td>
                        <img
                          className="menuitem-image"
                          src={`http://localhost:8080/images/${item.image_url}`}
                          alt={"."}
                        />
                      </td>
                      <td>{item.item_name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan={6}>
                    <hr width={"100%"} />
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <th>TOTAL &rarr;</th>
                  <th>SUB TOTAL : {data?.order?.[0]?.sub_total}</th>
                  <th>CHARGES : {data?.order?.[0]?.charges}</th>
                  <th>DISCOUNT : {data?.order?.[0]?.discount}</th>
                  <th>NET TOTAL : {data?.order?.[0]?.net_total}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenretedBill;
