import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);

  const { y: scrollY } = useWindowScroll();

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if ( scrollY === 0) {
        setIsNavbarVisible(true);
        navContainerRef.current?.classList.remove("floating-nav");
    } else if (scrollY > lastScrollY) {
        setIsNavbarVisible(false);
        navContainerRef.current?.classList.add("floating-nav");
    } else if (scrollY < lastScrollY) {
        setIsNavbarVisible(true);
        navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(scrollY);
  }, [scrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
        y: isNavbarVisible ? 0 : -100,
        opacity: isNavbarVisible ? 1 : 0,
        duration: 0.2,
    })
  }, [isNavbarVisible]);

  useEffect(() => {
    if (isAudioPlaying) {
        audioElementRef.current?.play()
    }else {
        audioElementRef.current?.pause();
    }
  }, [isAudioPlaying])

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5 cursor-pointer"
              onClick={toggleAudio}
            >
              <audio
                ref={audioElementRef}
                src="/audio/loop.mp3"
                className="hidden"
                loop
              />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
