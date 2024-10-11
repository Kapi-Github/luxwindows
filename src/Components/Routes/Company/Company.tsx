import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../App";
import { useLocation, useNavigate } from "react-router-dom";

const Company = () => {
    const navigate = useNavigate();
    const { data } = useContext(GlobalContext);
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const div = document.querySelector(hash);
            if (div) {
                setTimeout(() => {
                    div.scrollIntoView({ behavior: "smooth" });
                }, 500);
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }
        }
    }, [hash]);

    useEffect(() => {
        const handleScroll = () => {
            navigate(window.location.pathname);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="box flex flex-col items-center gap-[24px] w-full">
            <div className="w-full relative">
                <div className="absolute top-0 flex justify-center items-center w-full h-full bg-opacity-50 bg-black">
                    <span className="text-white text-[68px] tracking-[4px] font-light">
                        {data.company.title}
                    </span>
                </div>
                <img
                    src={data.company.img}
                    alt={data.company.title}
                    className="w-full object-cover h-[350px]"
                />
            </div>
            <div className="w-4/5 flex flex-col gap-[40px]">
                <span className="text-center text-[20px] font-normal">
                    {data.company.header}
                </span>
                {data.company.text.map((paragraph: string, index: number) => (
                    <p
                        key={`about-company-paragraph-${index}`}
                        className="text-[18px] font-light"
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
            <div id="about"></div>
            <div id="career"></div>
        </div>
    );
};

export default Company;
