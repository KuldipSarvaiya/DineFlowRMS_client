import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { context } from "../AppState";

function GenretedBill() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { appData } = useContext(context);

  useEffect(() => {
    fetchData();
  }, []);

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
      entry_by: 5,
    });

    if(!res?.statusText === "OK") return alert("Your Feedback is not Submited.\nPlease Try again.")

    if(res?.data?.code === "ER_DUP_ENTRY") return alert("Feedback For This Order is already Submited")

    alert("THANK YOU 🎉\nYour Feedback is Submitted Successfully.");
    console.log(res);
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
                <div class="star-rating">
                  <div class="stars">
                    <label class="number">
                      <input type="radio" name="rating" value="0" />
                    </label>
                    <label class="star">
                      <input type="radio" name="rating" value="1" />
                    </label>
                    <label class="star">
                      <input type="radio" name="rating" value="2" />
                    </label>
                    <label class="star">
                      <input type="radio" name="rating" value="3" checked />
                    </label>
                    <label class="star">
                      <input type="radio" name="rating" value="4" />
                    </label>
                    <label class="star">
                      <input type="radio" name="rating" value="5" />
                    </label>
                    <div class="number-rating"></div>
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
