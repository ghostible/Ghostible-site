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
    quote:
      "Saasta has been a game-changer for our team. Its intuitive interface and powerful features have helped us streamline our project management processes and boost productivity. Highly recommended!",
    name: "Michael Brown",
    role: "Project Manager at Global Innovations",
    avatar: "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote:
      "As an IT manager, security is a top priority for me. Saasta`&quot;`s robust security measures and compliance standards give me peace of mind knowing that our data is safe and protected.",
    name: "David Johnson",
    role: "Marketing Director, Sparkle Brands",
    avatar: "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote:
      "Saasta has transformed the way our marketing team operates. Its collaborative features and real-time updates have improved communication and coordination.",
    name: "Sarah Miller",
    role: "Marketing Director at Digital Agency",
    avatar: "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote:
      "I`&quot;`ve tried many tools, but Saasta stands out for its simplicity and effectiveness. Our projects have never been smoother!",
    name: "Emily Johnson",
    role: "Founder of StartUpX",
    avatar: "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  // More duplicates for testing
  {
    quote: "Simple and effective!",
    name: "Emily Johnson",
    role: "Founder of StartUpX",
    avatar: "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
  {
    quote: "We love Saasta!",
    name: "Emily Johnson",
    role: "Founder of StartUpX",
    avatar: "/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.avif",
  },
];

export default function TestimonialSection() {
  return (
    <section
      className="text-white px-4 py-20"
      data-aos="fade-up"
      data-aos-duration="3000"
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
                className="bg-zinc-900 border h-full border-gray-800 rounded-lg p-6 text-left shadow-md hover:shadow-lg transition flex flex-col justify-between cursor-pointer"
                onMouseEnter={() =>
                  window?.testimonialSwiper?.autoplay?.stop()
                }
                onMouseLeave={() =>
                  window?.testimonialSwiper?.autoplay?.start()
                }
              >
                <p className="text-sm text-gray-300 mb-4">{item.quote}</p>
                <div className="flex items-center space-x-3 mt-auto">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                    width={50} height={50} />
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-white">{item.role}</p>
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