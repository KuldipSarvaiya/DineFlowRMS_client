import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { context } from "../AppState";

function GenretedBill() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const { appData } = useContext(context);

  useEffect(() => {
    fetchData();
  }, []);
  // queary string
  const queryParams = Object.fromEntries(searchParams);
  console.log(queryParams);

  async function fetchData() {
    const res = await axios.get("/order/get_bill/" + id);
    console.log(res.data);
    if (res.data) setData(res.data);
  }

  async function submitFeedback(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const feedback = formdata.get("feedback");
    const rating = formdata.get("rating");

    console.log(feedback, rating);

    const res = await axios.post("/feedback", {
      feedback,
      order_id: id,
      customer_id: appData?.auth?.customer_id,
      rating,
      entry_by: appData?.auth?.customer_id,
      entry_by_role: 5,
    });

    if (!res?.statusText === "OK")
      return alert("Your Feedback is not Submited.\nPlease Try again.");

    if (res?.data?.code === "ER_DUP_ENTRY")
      return alert("Feedback For This Order is already Submited");

    alert("THANK YOU 🎉\nYour Feedback is Submitted Successfully.");
    console.log(res);
  }

  return (
    <section
      id="book-a-table"
      className="book-a-table"
      style={{ width: window.innerWidth - 300, margin: "15px auto" }}
    >
      <div className="col-12">
        <div className="card recent-sales overflow-auto">
          <div className="card-body">
            <h5 className="card-title">Order Summary &nbsp;</h5>

            {/* order details */}
            <hr />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                justifyContent: "space-evenly",
              }}
            >
              <span>
                <b>ORDER ID : </b>
                {queryParams?.order_id}
              </span>
              <span>
                <b>CUSTOMER NAME : </b>
                {queryParams?.name}
              </span>
              <span>
                <b>TABLE NO. :</b> {queryParams?.table_no}
              </span>
              <span>
                <b>BILL DATE :</b>{" "}
                {new Date(queryParams?.bill_date).toLocaleDateString()}
              </span>
            </div>
            <hr />

            {/* table */}
            <table className="table table-borderless datatable" border={2}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>IMAGE</th>
                  <th>MENU ITEM NAME</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                </tr>
              </thead>
              <tbody>
                {data?.trn_orders?.map((item, i) => {
                  return (
                    <tr key={i}>
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
                  <th>SERVICE CHARGES : {data?.order?.[0]?.charges}</th>
                  <th>DISCOUNT : {data?.order?.[0]?.discount}</th>
                  <th>NET TOTAL : {data?.order?.[0]?.net_total}</th>
                </tr>
              </tbody>
            </table>
            <hr style={{ margin: "30px 0px" }} />
            <form onSubmit={submitFeedback}>
              <div
                style={{
                  width: 500,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  margin: "auto",
                }}
              >
                <span>
                  <i>share your experience as</i>{" "}
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 30,
                      textDecoration: "underline",
                    }}
                  >
                    FeedBack
                  </span>{" "}
                  here...
                </span>
                {/* rating */}
                <div className="star-rating">
                  <div className="stars">
                    <label className="number">
                      <input type="radio" name="rating" value="0" />
                    </label>
                    <label className="star">
                      <input type="radio" name="rating" value="1" />
                    </label>
                    <label className="star">
                      <input type="radio" name="rating" value="2" />
                    </label>
                    <label className="star">
                      <input type="radio" name="rating" value="3" checked />
                    </label>
                    <label className="star">
                      <input type="radio" name="rating" value="4" />
                    </label>
                    <label className="star">
                      <input type="radio" name="rating" value="5" />
                    </label>
                    <div className="number-rating"></div>
                  </div>
                </div>
                {/* feedback */}
                <textarea
                  name="feedback"
                  required
                  rows={5}
                  cols={4}
                  className="form-control"
                  placeholder="Please Give Your Honest Feedback Here..."
                ></textarea>
                {/* submit btn */}
                <div style={{ width: 230 }}>
                  <button className="btn btn-primary" type="submit">
                    <i className="bi bi-check"></i> Submit Feedback
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenretedBill;
