import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { context } from "../AppState";

function BookTable() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const model = useRef(null);
  const { appData } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!appData.auth) return navigate("/signin");
  }, []);

  async function handleFormSubmit(formdata) {
    // send additional data {customer_id:1,entry_by:1,entry_by_role:1}
    try {
      const res = await axios.post("/booking", {
        ...formdata,
        customer_id: appData?.auth?.customer_id,
        entry_by: appData?.auth?.customer_id,
        entry_by_role: 5,
      });
      reset();
      model.current.showModal();
      setTimeout(() => {
        model.current.close();
      }, 5000);
    } catch (e) {
      console.log(e.message);
      setError("message", {
        type: "NETWORK",
        message: "Network Error in submitting your table booking.",
      });
    }
    console.log(formdata);
  }

  return (
    <section id="book-a-table" class="book-a-table" style={{ marginTop: 10 }}>
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Book A Table</h2>
          <p>
            Book <span>Your Stay</span> With Us
          </p>
        </div>

        <div class="row g-0">
          <div
            class="col-lg-4 reservation-img"
            style={{ backgroundImage: "url(assets/img/reservation.jpg)" }}
            data-aos="zoom-out"
            data-aos-delay="200"
          ></div>

          <div class="col-lg-8 d-flex align-items-center reservation-form-bg">
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              class="php-email-form"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div
                class="row gy-4"
                style={{
                  display: "flex",
                  // flexDirection: "column",
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div class="col-lg-8 col-md-8">
                  <input
                    {...register("booking_date", {
                      required: "Please enter table booking date",
                      validate: (value) => {
                        if (new Date(value) < new Date()) return false;
                        return true;
                      },
                    })}
                    type="date"
                    class="form-control"
                    id="date"
                    placeholder="Date"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div class="validate" style={{ color: "red" }}>
                    {errors?.booking_date?.message}
                  </div>
                </div>
                <div class="col-lg-8 col-md-8">
                  <input
                    {...register("booking_time", {
                      required: "please select Time for table reservation",
                    })}
                    type="time"
                    class="form-control"
                    id="time"
                    onChange={(e) => console.log(e.target.value)}
                    placeholder="Time"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div class="validate" style={{ color: "red" }}>
                    {errors?.booking_time?.message}
                  </div>
                </div>
                <div class="col-lg-8 col-md-8">
                  <input
                    {...register("person_count", {
                      required:
                        "Please Enter Count of persons to be arrived at booked table",
                      min: 1,
                    })}
                    type="number"
                    class="form-control"
                    id="people"
                    placeholder="# of people"
                    data-rule="minlen:1"
                    data-msg="Please enter at least 1 chars"
                  />
                  <div class="validate" style={{ color: "red" }}>
                    {errors?.person_count?.message}
                  </div>
                </div>
                <div class="col-lg-8 col-md-8">
                  <input
                    {...register("duration", {
                      required:
                        "Please Enter The duration  of your stay in minutes.",
                      min: 15,
                      max: 120,
                    })}
                    type="number"
                    class="form-control"
                    id="people"
                    placeholder="Duration to Hold table"
                    data-rule="minlen:1"
                    data-msg="Please enter at least 1 chars"
                  />
                  <div style={{ color: "red" }}>
                    {errors?.duration?.message}
                  </div>
                </div>
              </div>
              <div class="text-center" style={{ margin: 10, display: "block" }}>
                <button type="submit">Book a Table</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* success message */}
      <dialog ref={model}>
        <div>
          <h1>ThankYou for Booking Table</h1>
          <span>
            <p>
              your Table Booking Status will reflacet on your account very soon.
            </p>
            <p>Stay In Touch...</p>
          </span>
        </div>
      </dialog>
    </section>
  );
}

export default BookTable;
