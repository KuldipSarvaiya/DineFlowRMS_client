import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isLoading },
  } = useForm();
  const model = useRef(null);

  async function handleFormSubmit(formdata) {
    try {
      const res = await axios.post("/contact_us", formdata);
      reset();
      model.current.showModal();
      setTimeout(() => {
        model.current.close();
      }, 5000);
    } catch (e) {
      console.log(e.message);
      setError("message", {
        type: "NETWORK",
        message: "Network Error in submitting your message.",
      });
    }
  }
  return (
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">
        <div class="section-header">
          <h2>Contact</h2>
          <p>
            Need Help? <span>Contact Us</span>
          </p>
        </div>

        <div class="mb-3">
          <iframe
            style={{ border: 0, width: "100%", height: "350px" }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="row gy-4">
          <div class="col-md-6">
            <div class="info-item  d-flex align-items-center">
              <i class="icon bi bi-map flex-shrink-0"></i>
              <div>
                <h3>Our Address</h3>
                <p>A108 Adam Street, New York, NY 535022</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-item d-flex align-items-center">
              <i class="icon bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-item  d-flex align-items-center">
              <i class="icon bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 5589 55488 55</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="info-item  d-flex align-items-center">
              <i class="icon bi bi-share flex-shrink-0"></i>
              <div>
                <h3>Opening Hours</h3>
                <div>
                  <strong>Mon-Sat:</strong> 11AM - 23PM;
                  <strong>Sunday:</strong> Closed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <form
          class="php-email-form p-3 p-md-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div class="row">
            <div class="col-xl-6 form-group">
              <input
                {...register("name", {
                  required: "Please Enter Your Name",
                  maxLength: 100,
                })}
                type="text"
                class="form-control"
                id="name"
                placeholder="Your Name"
              />
              {errors?.name?.message ? <p>{errors.name.message}</p> : ""}
            </div>
            <div class="col-xl-6 form-group">
              <input
                {...register("contact_number", {
                  required: "Contact Nummber is Required",
                  pattern: {
                    value: /[1-9|0]{10}/,
                    message: "Please Enter Valid Contact",
                  },
                  max: 9999999999,
                  min: 1000000000,
                })}
                type="tel"
                class="form-control"
                id="contact"
                placeholder="Your Contact"
              />
              {errors?.contact_number?.message ? (
                <p>{errors.contact_number.message}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="form-group">
            <input
              {...register("email", {
                required: "Email is Required",
              })}
              type="email"
              class="form-control"
              id="email"
              placeholder="Your Email"
            />
            {errors?.email?.message ? <p>{errors.email.message}</p> : ""}
          </div>
          <div class="form-group">
            <textarea
              {...register("message", {
                required: "Please Write Your Message down...",
              })}
              class="form-control"
              rows="5"
              placeholder="Message"
            ></textarea>
            {errors?.message?.message ? <p>{errors.message.message}</p> : ""}
          </div>
          <div class="my-3">
            <div class="loading">Loading</div>
            <div class="error-message"></div>
            <div class="sent-message">
              Your message has been sent. Thank you!
            </div>
          </div>
          <div class="text-center">
            <button type="submit" disabled={isLoading}>
              Send Message
            </button>
          </div>
        </form>

        {/* success message */}
        <dialog ref={model}>
          <div>
            <h1>ThankYou for Contact</h1>
            <span>
              <p>We will reach you out soon.</p>
            </span>
          </div>
        </dialog>
      </div>
    </section>
  );
}

export default ContactUs;
