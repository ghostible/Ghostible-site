"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { Swiper as SwiperClass } from "swiper";
import Image from "next/image";

// ✅ Declare the custom property on window
declare global {
  interface Window {
    testimonialSwiper: SwiperClass;
  }
}

const testimonials = [
  {
    quote: "❝ I kept getting banned on Hinge and they’d block my number every time. Ghostible let me get a fresh number instantly and I was back swiping within minutes. Total lifesaver.❞ ",
    name: "Jordan R.",
    avatar:
      "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote:"❝ Needed to verify a crypto wallet but didn’t want to give out my real number. Ghostible worked perfectly. Got the SMS, verified it, and moved on. Easy. ❞",
    name: "Aiden W.",
    avatar:
      "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote: "❝ Tried to sign up for a promo but it required a phone number and I knew it would spam me after. Used Ghostible, got the code instantly, and never got a single follow-up message. Worth every cent. ❞",
    name: "Emily F.",
    avatar:
      "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote:"❝ Dating apps kept linking my real number even after I deleted the account. Now I just use a burner from Ghostible every time. If I ghost someone, they can’t track me down 😅 ❞",
    name: "Sophie L.",
    avatar:
      "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote:"❝ I use Ghostible anytime I need to sign up for a free trial or sketchy site. Burner number + temp email = no spam, no risk. ❞",
    name: "Matt T.",
    avatar:
      "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote: "❝ Tried to sign up for a promo but it required a phone number and I knew it would spam me after. Used Ghostible, got the code instantly, and never got a single follow-up message. Worth every cent. ❞",
    name: "Emily F.",
    avatar:
      "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
];

export default function TestimonialSection() {
  return (
    <section
      className="text-white px-4 md:py-10 py-6"
      data-aos="fade-up"
      data-aos-duration="5000"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4 text-[#46edd5] text-sm font-semibold uppercase tracking-wider">
          ✴ Testimonials
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Testimonials About Us
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={2000}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 3.5 },
          }}
          onSwiper={(swiper) => {
            window.testimonialSwiper = swiper;
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-zinc-900 border border-gray-800 rounded-lg p-6 text-left shadow-md hover:shadow-lg transition flex flex-col justify-between h-full min-h-[260px] md:min-h-[300px] cursor-pointer"
                onMouseEnter={() => window?.testimonialSwiper?.autoplay?.stop()}
                onMouseLeave={() => window?.testimonialSwiper?.autoplay?.start()}
              >
                <p className="text-sm text-gray-300 mb-4">{item.quote}</p>

                <div className="flex items-center space-x-3 mt-auto pt-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                    width={50}
                    height={50}
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">{item.name}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
