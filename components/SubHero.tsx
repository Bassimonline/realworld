import { useState } from "react";

const SubHero = () => {
  const videos = [
    "https://iframe.cloudflarestream.com/45e03b48ec5dc2caf27e99193761f26f?muted=true&preload=metadata&loop=true&controls=false",
    "https://iframe.cloudflarestream.com/de951a6359bed8df49031d7ae2c2acb1?muted=true&preload=metadata&loop=true&controls=false",
    "https://iframe.cloudflarestream.com/5363cd2b78d0ddce2398996221b15574?muted=true&preload=metadata&loop=true&controls=false",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleLeftArrowClick = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <section
        className="hidden lg:block relative px-4 reviews mt-12 lg:mt-28 z-10"
        id="reviews"
      >
        <div style={{ opacity: 1, transform: "translateY(20px)" }}>
          <div className="w-full lg:w-[46vw] mx-auto">
            <div className="flex gap-8 justify-center bg-background relative">
              <div className="relative w-full border-[1px] border-[#3B3B3B] rounded-[25px]">
                <div className="relative">
                  <div className="w-full relative">
                    <div className="relative max-w-[100%]">
                      <div
                        className="w-full h-full hidden lg:block undefined"
                        style={{
                          position: "relative",
                          paddingTop: "56.25%",
                        }}
                      >
                        <video
                          src={videos[currentVideoIndex]}
                          muted
                          autoPlay
                          loop
                          controls={false}
                          style={{
                            position: "absolute",
                            inset: "0px",
                            height: "100%",
                            width: "100%",
                          }}
                        ></video>
                      </div>
                      <div className="absolute top-0 left-0 h-full w-full bg-top bg-cover bg-[rgba(0,0,0,.6)] opacity-100">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          className="absolute h-[65px] w-[65px] lg:h-[83px] lg:w-[83px] cursor-pointer text-white"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            top: "calc(50% - 32px)",
                            left: "calc(50% - 32px)",
                          }}
                        >
                          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Left Arrow */}
                <div
                  className="hidden right-10 lg:flex z-30 text-4xl duration-500 transition-all text-white hover:scale-105 cursor-pointer absolute border-[1px] border-white hover:text-[#ffbb38] rounded-full h-[84px] w-[84px] items-center justify-center"
                  style={{ top: "calc(50% - 21px)" }}
                  onClick={handleLeftArrowClick}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"></path>
                  </svg>
                </div>

                {/* Right Arrow */}
                <div
                  className="hidden left-10 lg:flex z-30 text-4xl duration-500 transition-all text-white hover:scale-105 cursor-pointer absolute border-[1px] border-white hover:text-[#ffbb38] rounded-full h-[84px] w-[84px] items-center justify-center"
                  style={{ top: "calc(50% - 21px)" }}
                  onClick={handleRightArrowClick}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubHero;