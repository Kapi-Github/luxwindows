import { useContext } from "react";
import { GlobalContext } from "../../../App";
import useScrollAnimate from "../../../Hooks/useScrollAnimate";
import "./Products.css";
import "./../../../index.css";

const Products = () => {
    const { data, moveToPage } = useContext(GlobalContext);
    const createInViewRef = useScrollAnimate();

    return (
        <div className="flex flex-col gap-[36px] box">
            <div className="flex justify-center">
                <span className="text-[64px] font-extralight text-zinc-950 text-center">
                    {data.products.title.toUpperCase()}
                </span>
            </div>
            <div className="flex flex-col gap-[72px]">
                {data.products.subtabs.map((item: any, index: number) => {
                    const [ref, inView] = createInViewRef();
                    return (
                        <div
                            key={index}
                            ref={ref}
                            className={`h-[400px] ${
                                inView
                                    ? "opacity-1 translate-y-0"
                                    : "opacity-0 translate-y-[25px]"
                            } transition-all duration-500 ease-in-out`}
                        >
                            <div
                                className={`h-full flex cursor-pointer ${
                                    index % 2 === 0
                                        ? "lg:flex-row-reverse"
                                        : "lg:flex-row"
                                } flex justify-between items-center overflow-hidden relative product_tab`}
                                onClick={() => moveToPage(item.key)}
                            >
                                <div className="w-full flex flex-col items-center justify-center lg:gap-[16px] px-[24px] max-lg:absolute max-lg:bottom-0 max-lg:left-1/2 max-lg:-translate-x-1/2 text-white lg:text-zinc-950 max-lg:bg-black max-lg:bg-opacity-60 max-lg:py-[16px] product_text">
                                    <span className="text-center text-[32px] sm:text-[44px] lg:text-[48px] lg:font-light lg:whitespace-normal whitespace-nowrap font-extralight tracking-wider">
                                        {item.title}
                                    </span>
                                    <p className="text-center text-[18px] max-sm:text-[16px] max-lg:font-light">
                                        {item.description}
                                    </p>
                                </div>
                                <img
                                    className="flex-1 object-cover h-full w-full lg:max-w-[750px]"
                                    src={item.img}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
