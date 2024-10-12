import { useContext } from "react";
import { GlobalContext } from "../../../../../App";
import { useLocation, useNavigate } from "react-router-dom";
import useScrollAnimate from "../../../../../Hooks/useScrollAnimate";

const Aluplast = () => {
    const { data } = useContext(GlobalContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const createInViewRef = useScrollAnimate();

    const navigateToItem = (category: string, item: string) => {
        navigate(`${pathname}/${category}/${item}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className="w-full flex flex-col gap-[40px] box">
            <div className="relative">
                <img
                    className="w-full object-cover h-[400px]"
                    src={data.aluplast.img}
                    alt="Okna"
                />
                <span className="w-full h-full flex items-center justify-center bg-black text-center text-white font-light tracking-[2px] absolute left-1/2 top-0 -translate-x-1/2 bg-opacity-30 text-[48px] sm:text-[84px] hover:bg-opacity-50 transition-all duration-300 ease-in-out pointer-events-none">
                    {data.aluplast.title}
                </span>
            </div>
            <span className="text-center text-[24px] p-[20px] lg:px-0">
                {data.windows.description}
            </span>
            <hr className="w-[90%] mx-auto border-black" />
            <div className="flex flex-col gap-[96px]">
                {data.aluplast.subtabs.map((category: any, index: number) => {
                    const [ref, inView] = createInViewRef();
                    return (
                        <div
                            ref={ref}
                            key={`aluplast-${index}`}
                            className={`flex flex-col items-center gap-[36px] ${
                                inView ? "opacity-1" : "opacity-0"
                            } transition-all duration-500 ease-in-out`}
                        >
                            <span className="text-[40px] text-center font-medium tracking-wide">
                                {category.title}
                            </span>
                            <div className="w-full flex justify-center gap-[44px] flex-wrap">
                                {category.subtabs.map(
                                    (item: any, index: number) => {
                                        const [ref, inView] = createInViewRef();
                                        return (
                                            <div
                                                ref={ref}
                                                className={`flex flex-col items-center gap-[20px] ${
                                                    inView
                                                        ? "opacity-1 translate-y-0"
                                                        : "opacity-0 translate-y-[25px]"
                                                } transition-all duration-500 ease-in-out`}
                                                style={{
                                                    transitionDelay: `${
                                                        (index + 1) * 100
                                                    }ms`,
                                                }}
                                                key={`aluplast-item-${index}`}
                                            >
                                                <span
                                                    className="relative cursor-pointer font-light text-center text-[28px] after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
                                                    onClick={() =>
                                                        navigateToItem(
                                                            category.path,
                                                            item.path
                                                        )
                                                    }
                                                >
                                                    {item.title}
                                                </span>
                                                <img
                                                    className="w-[200px] hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out"
                                                    src={item.img}
                                                    alt={item.title}
                                                    onClick={() =>
                                                        navigateToItem(
                                                            category.path,
                                                            item.path
                                                        )
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Aluplast;
