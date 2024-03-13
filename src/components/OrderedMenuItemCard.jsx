import axios from "axios";
import React, { useContext, useState } from "react";
import { context } from "../AppState";

// used at profile
function OrderedMenuItemCard({ order, fetchOrders }) {
  const [qtyMore, setQtyMore] = useState(1);
  const { appData } = useContext(context);
  return (
    <article>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 0,
        }}
      >
        <img
          src={`http://localhost:8080/images/${order.image_url}`}
          className="menu-img img-fluid col-lg-4 menu-item"
          alt=""
        />
        <p style={{ display: "grid", gridRow: 1, gap: 15 }}>
          <span>Name : {order.item_name}</span>
          <span>Price : &#x20b9;{order.price}</span>
          <span>Quantity : {order.qty}</span>
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await axios.post("/trn_order", {
              ...order,
              qty: qtyMore,
              entry_by: appData?.auth?.customer_id,
              entry_by_role: 5,
            });
            if (res.statusText === "OK") {
              alert("Menu Item Added to Current Order Successfully");
              setQtyMore(1);
              fetchOrders();
            }
          }}
        >
          <input
            data-theme="light"
            type="number"
            min={1}
            value={qtyMore}
            style={{ width: 50, padding: 0, margin: 0, height: 30 }}
            onChange={(e) => {
              setQtyMore(e.target.value);
            }}
            required
          />{" "}
          <button style={{ borderRadius: 5 }} type="submit">
            &#43; order {qtyMore} more
          </button>
          <p>Order Status : {order.order_status}</p>
        </form>
      </header>
    </article>
  );
}

export default OrderedMenuItemCard;
