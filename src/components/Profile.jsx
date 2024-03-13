import axios from "axios";
import React, { useContext, useEffect } from "react";
import OrderedMenuItemCard from "./OrderedMenuItemCard";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../AppState";

function Profile() {
  const [bookings, setBookings] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [oldOrders, setOldOrders] = React.useState([]);
  const navigate = useNavigate();
  const { appData } = useContext(context);
  console.log(appData);

  useEffect(() => {
    if (!appData.auth) return navigate("/signin");
    fetchBookings();
    fetchOrders();
    fetchOldOrders();
  }, []);

  async function fetchBookings() {
    const res = await axios.get(
      "/booking/my_bookings/" + appData?.auth?.customer_id
    );
    console.log(res);
    if (res.data.length >= 1) setBookings(res.data);
  }

  async function fetchOldOrders() {}

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

  async function generateBill() {
    const charges = prompt("Enter Charges Applied on this Order");
    const discount = prompt("Enter Discount Applied on this Order");

    // return if values not properly entered
    if (!charges || !discount) return;

    const res = await axios.put(
      `/order/generate_bill/${orders?.[0]?.order_id}`,
      {
        ...orders,
        charges: charges || 100,
        discount: discount || 100,
        updated_by: 1 || 1,
        updated_by_role: 5,
      }
    );
    console.log(res.data);
    if (res.data) navigate("/bill/" + orders?.[0]?.order_id);
  }

  return (
    <section
      id="hero"
      class="hero"
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
        <summary role="button" class="secondary">
          My Bookings
        </summary>
        <p>
          {bookings.length < 1 && (
            <h5>
              No Bookings found.{" "}
              <Link to={"/booktable"}>
                <i style={{ color: "blueviolet" }}>Book Your Table Here</i>
              </Link>
            </h5>
          )}
          {bookings?.map((item, i) => {
            // `booking_date`, `booking_time`, `duration`, `is_accepted`,`person_count`
            return (
              <article key={i + item.booking_id}>
                <header>
                  Booking Date:{" "}
                  {new Date(item.booking_date).toLocaleDateString()}
                </header>
                <p>Booking Time : {item.booking_time}</p>
                <p>Occupied Duration : {item.duration} minutes</p>
                <p>
                  Persons Count To Be Present On Table : {item.person_count}{" "}
                  Person(s)
                </p>
                <p>
                  Booking Status :{" "}
                  <mark style={{ borderRadius: 5 }}>
                    {item.is_accepted.toUpperCase()}
                  </mark>
                </p>
                <footer>
                  Cancel Your Booking :{" "}
                  <button
                    style={{ borderRadius: 5 }}
                    onClick={() => cancelBooking(item.booking_id)}
                  >
                    CANCEL
                  </button>
                </footer>
              </article>
            );
          })}
        </p>
      </details>

      {/* orders */}
      <details
        style={{ border: "1px dashed grey", borderRadius: 8, padding: 5 }}
      >
        <summary role="button" class="secondary">
          Order
        </summary>
        <p>
          {/* {"Haven't placed any orders yet"} */}
          {orders.length > 0 ? (
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 5,
              }}
            >
              <h4>Order Id : {orders?.[0]?.customer_order_id}</h4>
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
        <footer>
          {orders.length > 0 && (
            <button style={{ borderRadius: 6 }} onClick={generateBill}>
              Ask For Bill
            </button>
          )}
        </footer>
      </details>

      {/* old orders */}
      {/* <details
        style={{ border: "1px dashed grey", borderRadius: 8, padding: 5 }}
      >
        <summary role="button" class="secondary">
          Old Orders
        </summary>
        <p></p>
      </details> */}
    </section>
  );
}

export default Profile;
