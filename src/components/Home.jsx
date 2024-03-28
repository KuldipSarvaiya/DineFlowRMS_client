import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Menu from "./Menu";
import ContactUs from "./ContactUs";

function Home() {
  return (
    <>
      {/* hero section */}
      <section id="hero" class="hero d-flex align-items-center section-bg">
        <div class="container">
          <div class="row justify-content-between gy-5">
            <div class="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
              <h2 data-aos="fade-up">
                Enjoy Your Healthy
                <br />
                Delicious Food
              </h2>
              <p data-aos="fade-up" data-aos-delay="100">
                Sed autem laudantium dolores. Voluptatem itaque ea consequatur
                eveniet. Eum quas beatae cumque eum quaerat.
              </p>
              <div class="d-flex" data-aos="fade-up" data-aos-delay="200">
                <a href="#book-a-table" class="btn-book-a-table">
                  Book a Table
                </a>
                <a
                  href="https://youtu.be/NC9KlaxtfLg?si=ow7gG_toqMCfbsr4"
                  class="glightbox btn-watch-video d-flex align-items-center"
                >
                  <i class="bi bi-play-circle"></i>
                  <span>Watch Video</span>
                </a>
              </div>
            </div>
            <div class="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
              <img
                src="assets/img/hero-img.png"
                class="img-fluid"
                alt=""
                data-aos="zoom-out"
                data-aos-delay="300"
              />
            </div>
          </div>
        </div>
      </section>
      {/* hero section over */}

      <main id="main">
        {/* <!-- ======= About Section ======= --> */}
        <section id="about" class="about">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>About Us</h2>
              <p>
                Learn More <span>About Us</span>
              </p>
            </div>

            <div class="row gy-4">
              <div
                class="col-lg-7 position-relative about-img"
                style={{ backgroundImage: "url(assets/img/about.jpg)" }}
                data-aos="fade-up"
                data-aos-delay="150"
              >
                <div class="call-us position-absolute">
                  <h4>Book a Table</h4>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
              <div
                class="col-lg-5 d-flex align-items-end"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="content ps-0 ps-lg-5">
                  <p class="fst-italic">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <ul>
                    <li>
                      <i class="bi bi-check2-all"></i> Ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i> Duis aute irure dolor in
                      reprehenderit in voluptate velit.
                    </li>
                    <li>
                      <i class="bi bi-check2-all"></i> Ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate trideta storacalaperda mastiro
                      dolore eu fugiat nulla pariatur.
                    </li>
                  </ul>
                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident
                  </p>

                  <div class="position-relative mt-4">
                    <img
                      src="assets/img/about-2.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <a
                      href="https://youtu.be/NC9KlaxtfLg?si=ow7gG_toqMCfbsr4"
                      class="glightbox play-btn"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End About Section --> */}

        {/* Menu */}
        <Menu />
        {/* Menu end */}

        {/* <!-- ======= Testimonials Section ======= --> */}
        <section id="testimonials" class="testimonials section-bg">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>Testimonials</h2>
              <p>
                What Are They <span>Saying About Us</span>
              </p>
            </div>

            <div
              class="slides-1 swiper"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <CarouselProvider
                naturalSlideWidth={500}
                naturalSlideHeight={70}
                totalSlides={4}
                isPlaying
                infinite
                interval={5000}
                visibleSlides={1}
              >
                {/* <div class="swiper-wrapper"> */}
                <Slider>
                  <Slide index={0}>
                    <div class="swiper-slide">
                      <div class="testimonial-item">
                        <div class="row gy-4 justify-content-center">
                          <div class="col-lg-6">
                            <div class="testimonial-content">
                              <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                Proin iaculis purus consequat sem cure digni
                                ssim donec porttitora entum suscipit rhoncus.
                                Accusantium quam, ultricies eget id, aliquam
                                eget nibh et. Maecen aliquam, risus at semper.
                                <i class="bi bi-quote quote-icon-right"></i>
                              </p>
                              <h3>Saul Goodman</h3>
                              <h4>Ceo &amp; Founder</h4>
                              <div class="stars" style={{ height: "3rem" }}>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-2 text-center">
                            <img
                              src="assets/img/testimonials/testimonials-1.jpg"
                              class="img-fluid testimonial-img"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={1}>
                    <div class="swiper-slide">
                      <div class="testimonial-item">
                        <div class="row gy-4 justify-content-center">
                          <div class="col-lg-6">
                            <div class="testimonial-content">
                              <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                Export tempor illum tamen malis malis eram quae
                                irure esse labore quem cillum quid cillum eram
                                malis quorum velit fore eram velit sunt aliqua
                                noster fugiat irure amet legam anim culpa.
                                <i class="bi bi-quote quote-icon-right"></i>
                              </p>
                              <h3>Sara Wilsson</h3>
                              <h4>Designer</h4>
                              <div class="stars">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-2 text-center">
                            <img
                              src="assets/img/testimonials/testimonials-2.jpg"
                              class="img-fluid testimonial-img"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={2}>
                    <div class="swiper-slide">
                      <div class="testimonial-item">
                        <div class="row gy-4 justify-content-center">
                          <div class="col-lg-6">
                            <div class="testimonial-content">
                              <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                Enim nisi quem export duis labore cillum quae
                                magna enim sint quorum nulla quem veniam duis
                                minim tempor labore quem eram duis noster aute
                                amet eram fore quis sint minim.
                                <i class="bi bi-quote quote-icon-right"></i>
                              </p>
                              <h3>Jena Karlis</h3>
                              <h4>Store Owner</h4>
                              <div class="stars">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-2 text-center">
                            <img
                              src="assets/img/testimonials/testimonials-3.jpg"
                              class="img-fluid testimonial-img"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                  <Slide index={3}>
                    <div class="swiper-slide">
                      <div class="testimonial-item">
                        <div class="row gy-4 justify-content-center">
                          <div class="col-lg-6">
                            <div class="testimonial-content">
                              <p>
                                <i class="bi bi-quote quote-icon-left"></i>
                                Quis quorum aliqua sint quem legam fore sunt
                                eram irure aliqua veniam tempor noster veniam
                                enim culpa labore duis sunt culpa nulla illum
                                cillum fugiat legam esse veniam culpa fore nisi
                                cillum quid.
                                <i class="bi bi-quote quote-icon-right"></i>
                              </p>
                              <h3>John Larson</h3>
                              <h4>Entrepreneur</h4>
                              <div class="stars">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-2 text-center">
                            <img
                              src="assets/img/testimonials/testimonials-4.jpg"
                              class="img-fluid testimonial-img"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slide>
                </Slider>
                {/* </div> */}
              </CarouselProvider>
              <div class="swiper-pagination"></div>
            </div>
          </div>
        </section>
        {/* <!-- End Testimonials Section --> */}

        {/* <!-- ======= Chefs Section ======= --> */}
        <section id="chefs" class="chefs section-bg">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>Chefs</h2>
              <p>
                Our <span>Proffesional</span> Chefs
              </p>
            </div>

            <div class="row gy-4">
              <div
                class="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div class="chef-member">
                  <div class="member-img">
                    <img
                      src="assets/img/chefs/chefs-1.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Walter White</h4>
                    <span>Master Chef</span>
                    <p>
                      Velit aut quia fugit et et. Dolorum ea voluptate vel
                      tempore tenetur ipsa quae aut. Ipsum exercitationem iure
                      minima enim corporis et voluptate.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="chef-member">
                  <div class="member-img">
                    <img
                      src="assets/img/chefs/chefs-2.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>Sarah Jhonson</h4>
                    <span>Patissier</span>
                    <p>
                      Quo esse repellendus quia id. Est eum et accusantium
                      pariatur fugit nihil minima suscipit corporis. Voluptate
                      sed quas reiciendis animi neque sapiente.
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-4 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div class="chef-member">
                  <div class="member-img">
                    <img
                      src="assets/img/chefs/chefs-3.jpg"
                      class="img-fluid"
                      alt=""
                    />
                    <div class="social">
                      <a href="">
                        <i class="bi bi-twitter"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-facebook"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-instagram"></i>
                      </a>
                      <a href="">
                        <i class="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                  <div class="member-info">
                    <h4>William Anderson</h4>
                    <span>Cook</span>
                    <p>
                      Vero omnis enim consequatur. Voluptas consectetur unde qui
                      molestiae deserunt. Voluptates enim aut architecto porro
                      aspernatur molestiae modi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Chefs Section --> */}

        {/* <!-- ======= Gallery Section ======= --> */}
        <section id="gallery" class="gallery section-bg">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h2>gallery</h2>
              <p>
                Check <span>Our Gallery</span>
              </p>
            </div>

            <div class="gallery-slider swiper">
              <div class=" align-items-center">
                <CarouselProvider
                  naturalSlideWidth={80}
                  naturalSlideHeight={100}
                  totalSlides={8}
                  isPlaying={true}
                  infinite={true}
                  interval={2000}
                  visibleSlides={3}
                >
                  <Slider>
                    <Slide index={0}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-1.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={1}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-2.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={2}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-3.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={3}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-4.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={4}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-5.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={5}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-6.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={6}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-7.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                    <Slide index={7}>
                      <img
                        width="400"
                        src="assets/img/gallery/gallery-8.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </Slide>
                  </Slider>
                </CarouselProvider>
                {/* <div class="swiper-slide">
                  <a
                    class="glightbox"
                    data-gallery="images-gallery"
                    href="assets/img/gallery/gallery-1.jpg"
                  >
                    <img
                      src="assets/img/gallery/gallery-1.jpg"
                      class="img-fluid"
                      alt=""
                    />
                  </a>
                </div> */}
              </div>
              {/* <div class="swiper-pagination"></div> */}
            </div>
          </div>
        </section>
        {/* <!-- End Gallery Section --> */}

        {/* <!-- ======= Contact Section ======= --> */}
        <ContactUs />
        {/* <!-- End Contact Section --> */}

        <a
          href="#"
          class="scroll-top d-flex align-items-center justify-content-center"
        >
          <i class="bi bi-arrow-up-short"></i>
        </a>
      </main>
    </>
  );
}

export default Home;
