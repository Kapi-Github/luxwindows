import { useContext } from "react";
import { GlobalContext } from "../../../App";
import useScrollAnimate from "../../../Hooks/useScrollAnimate";

const Products = () => {
    const { data } = useContext(GlobalContext);
    const createInViewRef = useScrollAnimate();

    return (
        <div className="flex flex-col gap-[36px]">
            <div className="flex justify-center">
                <span className="text-[64px] font-light text-zinc-950 text-center">
                    {data.products.title.toUpperCase()}
                </span>
            </div>
            <div className="flex flex-col gap-[36px]">
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
                                className={`h-full flex ${
                                    index % 2 === 0
                                        ? "lg:flex-row-reverse"
                                        : "lg:flex-row"
                                } flex justify-between items-center overflow-hidden relative`}
                            >
                                <div className="w-full flex justify-center px-[24px] max-lg:absolute max-lg:bottom-0 max-lg:left-1/2 max-lg:-translate-x-1/2 text-white lg:text-zinc-950 max-lg:bg-black max-lg:bg-opacity-50 max-lg:py-[4px]">
                                    <span className="text-[32px] sm:text-[44px] lg:text-[48px] lg:font-light lg:whitespace-normal whitespace-nowrap font-extralight tracking-wider">
                                        {item.title}
                                    </span>
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
