import axios from "axios";
import React, { useContext, useEffect } from "react";
import OrderedMenuItemCard from "./OrderedMenuItemCard";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../AppState";

function Profile() {
  const [bookings, setBookings] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [currOrder, setCurrOrder] = React.useState([]);
  const [oldOrders, setOldOrders] = React.useState([]);
  const navigate = useNavigate();
  const { appData, Dispatch } = useContext(context);
  console.log(appData);

  useEffect(() => {
    if (!appData.auth) return navigate("/signin");
    fetchBookings();
    fetchOrders();
    fetchOldOrders();
    fetchCurrOrder();
  }, []);

  async function fetchCurrOrder() {
    const res = await axios.get(
      "/order/my_current_orders/" + appData?.auth?.customer_id
    );
    console.log(res);
    if (res.data.length >= 1) setCurrOrder(res.data);
  }

  async function fetchBookings() {
    const res = await axios.get(
      "/booking/my_bookings/" + appData?.auth?.customer_id
    );
    console.log(res);
    if (res.data.length >= 1) setBookings(res.data);
  }

  async function fetchOldOrders() {
    const res = await axios.get(
      "/order/my_orders/" + appData?.auth?.customer_id
    );
    console.log("\n*****old orders == ", res.data);

    if (res.statusText === "OK") return setOldOrders(res.data);
  }

  async function fetchOrders() {
    const res = await axios.get(
      "/trn_order/get_my_trn_orders/" + appData?.auth?.customer_id
    );
    console.log(res);
    if (res.data.length >= 1) setOrders(res.data);
  }
  async function cancelBooking(id) {
    alert(`cancel booking ${id}`);
    const res = await axios.delete("/booking/" + id);
    if (res.status === 200) return fetchBookings();
    alert("Cannot Cancel Booking. Please try again later.");
  }

  //   async function generateBill() {
  // const charges = prompt("Enter Charges Applied on this Order");
  // const discount = prompt("Enter Discount Applied on this Order");

  // return if values not properly entered
  // if (!charges || !discount) return;
  // alert("generating bill")
  //     const res = await axios.put(
  //       `/order/generate_bill/${orders?.[0]?.order_id}`,
  //       {
  //         ...orders,
  //         charges: 0,
  //         discount: 0,
  //         updated_by:appData?.auth.customer_id,
  //         updated_by_role: 5,
  //       }
  //     );
  //     console.log(res.data);
  //     if (res.data) navigate("/bill/" + orders?.[0]?.order_id);
  //   }

  return (
    <section
      id="hero"
      className="hero"
      style={{
        // marginTop: 30,
        maxWidth: 1000,
        margin: "auto",
      }}
    >
      <h1>Hello👋, {appData.auth.name}</h1>

      {/* bookinngs */}
      <details
        style={{ border: "1px dashed grey", borderRadius: 8, padding: 5 }}
      >
        <summary role="button" className="secondary">
          My Bookings
        </summary>
        <p
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
          }}
        >
          {bookings.length < 1 && (
            <h5>
              No Bookings found.{" "}
              <Link to={"/booktable"}>
                <i style={{ color: "blueviolet" }}>Book Your Table Here</i>
              </Link>
            </h5>
          )}
          {bookings?.map((item, i) => {
            return (
              <article
                key={i + item.booking_id}
                style={{ border: "2px dotted grey", width: "450px" }}
              >
                <header>
                  Booking Date:{" "}
                  {new Date(item.booking_date).toLocaleDateString()}
                </header>
                <p>Booking Time : {item.booking_time}</p>
                {/* <p>Occupied Duration : {item.duration} minutes</p> */}
                <p>Total Persons : {item.person_count} Person(s)</p>
                <p>
                  Booking Status :{" "}
                  <mark
                    style={{
                      borderRadius: 5,
                      backgroundColor:
                        item.is_accepted.toUpperCase() === "ACCEPTED" &&
                        "green",
                    }}
                  >
                    {item.is_accepted.toUpperCase()}
                  </mark>
                </p>
                {new Date(item.booking_date) > new Date() && (
                  <footer>
                    Cancel Your Booking :{" "}
                    <button
                      style={{ borderRadius: 5 }}
                      onClick={() => cancelBooking(item.booking_id)}
                    >
                      CANCEL
                    </button>
                  </footer>
                )}
              </article>
            );
          })}
        </p>
      </details>

      {/* orders */}
      <details
        style={{ border: "1px dashed grey", borderRadius: 8, padding: 5 }}
      >
        <summary role="button" className="secondary">
          Menu Orders
        </summary>
        <p>
          {/* {"Haven't placed any orders yet"} */}
          {currOrder.length > 0 && currOrder[0].allow_orders ? (
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 5,
              }}
            >
              <h4>Order Id : {currOrder?.[0]?.customer_order_id}</h4>
              <button
                style={{ borderRadius: 5 }}
                onClick={() => navigate("/menu")}
              >
                Show Menu
              </button>
            </span>
          ) : (
            <p>No Active Orders</p>
          )}
          {orders.map((order, i) => {
            return (
              <OrderedMenuItemCard
                key={order.image_url}
                order={order}
                fetchOrders={fetchOrders}
              />
            );
          })}
        </p>
        {/* <footer>
          {orders.length > 0 && (
            <button style={{ borderRadius: 6 }} onClick={generateBill}>
              Ask For Bill
            </button>
          )}
        </footer> */}
      </details>

      {/* old orders */}
      <details
        style={{ border: "1px dashed grey", borderRadius: 8, padding: 5 }}
      >
        <summary role="button" className="secondary">
          Old Orders
        </summary>
        <p>
          <table className="striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">ORDER&nbsp;ID</th>
                {/* <th scope="col">CUSTOMER</th> */}
                <th scope="col">DATE</th>
                <th scope="col">TABLE</th>
                {/* <th scope="col">CHARGES</th> */}
                <th scope="col">DISCOUNT</th>
                <th scope="col">TOTAL AMOUNT</th>
                <th scope="col">VIEW</th>
              </tr>
            </thead>
            <tbody data-theme="light" style={{ fontSize: "medium" }}>
              {oldOrders.map((order, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{order.customer_order_id}</td>
                    {/* <td>{order.name}</td> */}
                    <td>{new Date(order.update_date).toLocaleDateString()}</td>
                    <td>{order.table_no}</td>
                    {/* <td>{order.charges}</td> */}
                    <td>{order.discount}</td>
                    <td>{order.net_total}</td>
                    <td>
                      <a
                        href={`/bill/${order.order_id}?order_id=${order.customer_order_id}&name=${order.name}&table_no=${order.table_no}&bill_date=${order.update_date}`}
                      >
                        <svg
                          width="30px"
                          height="30px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M17 7H8M17 7V16"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              {oldOrders.length === 0 && (
                <tr>
                  <td colSpan={10}>NO OREDERS TO DISPLAY</td>
                </tr>
              )}
            </tfoot>
          </table>
        </p>
      </details>
      <h6>
        Are You Done !!{" "}
        <button
          style={{ borderRadius: "10px", padding: 10 }}
          onClick={() => {
            const ask = confirm("Are you sure you want to sign out ??");
            if (ask) {
              localStorage.removeItem("id");
              Dispatch({ type: "setAuth", payload: false });
              navigate("/");
            }
          }}
        >
          Sign Out
        </button>
      </h6>
    </section>
  );
}

export default Profile;
