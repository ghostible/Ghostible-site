import Image from "next/image";

export default function TemBannerSection() {

  const handleScroll = () => {
    const section = document.getElementById('next-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-full">
        <section
          className=" "
          style={{
            backgroundImage: "url('/')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between p-3 sm:px-8 md:py-16 py-4 w-full lg:max-w-7xl mx-auto">
            <div className="md:w-3xl space-y-6 image_responsive_mobeile_viwe">
             <div className="flex md:justify-start text-center w-72">
               <Image
                src="/Ghostible_temp_number.png"
                alt="imagetext"
                width={400}
                height={400}
              />
             </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 md:text-left text-center">
                Temporary Phone
                <br />
                Numbers for Verification
              </h1>
              <p className="text-white text-lg mb-8 md:text-left text-center">
                Never Get Banned Again – Use Private Numbers That Work Everywhere.
              </p>
              <div className="flex flex-col md:flex-row space-y-3 sm:space-y-0 sm:space-x-4 md:text-left text-center ">
                <div className="buy_number md:mt-0 mt-5">
                  <button onClick={handleScroll} className="bg-teal-400 md:w-60 w-full text-black font-semibold py-4 sm:px-8 rounded-full hover:bg-teal-300 transition cursor-pointer">
                    Buy a Phone Number
                  </button>
                </div>
              </div>
            </div>
            <div className="md:w-3xl mt-12 md:mt-0"  data-aos="fade-left">
              <Image
                src="/661-6611451_on-an-ios-or-android-phone-using-the-removebg-preview.png"
                alt="Google"
                width={600}
                height={600}
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
