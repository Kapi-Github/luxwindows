import { useContext } from "react";
import { GlobalContext } from "../../../../App";
import useScrollAnimate from "../../../../Hooks/useScrollAnimate";

const Windows = () => {
    const { data, moveToPage } = useContext(GlobalContext);
    const createInViewRef = useScrollAnimate();

    return (
        <div className="w-full flex flex-col gap-[40px] box">
            <div className="relative">
                <img
                    className="w-full object-cover h-[400px]"
                    src={data.windows.img}
                    alt={data.windows.title}
                />
                <span className="w-full h-full flex items-center justify-center bg-black text-center text-white font-light tracking-[2px] absolute left-1/2 top-0 -translate-x-1/2 bg-opacity-30 text-[48px] sm:text-[84px] pointer-events-none ">
                    {data.windows.title}
                </span>
            </div>
            <span className="text-center text-[24px] p-[20px] lg:px-0">
                {data.windows.description}
            </span>
            <hr className="w-[90%] mx-auto border-black" />
            <div className="flex flex-col gap-[40px]">
                {data.windows.subtabs.map((item: any, index: number) => {
                    const [ref, inView] = createInViewRef();
                    return (
                        <div
                            ref={ref}
                            className={`flex flex-col gap-[40px] ${
                                inView
                                    ? "opacity-1 translate-y-0"
                                    : "opacity-0 translate-y-[25px]"
                            } transition-all duration-500 ease-in-out`}
                            key={`windows-subtab-${index}`}
                        >
                            <div className="flex flex-col gap-[28px]">
                                <div className="flex justify-center">
                                    <span
                                        className="relative text-center text-[56px] font-light cursor-pointer after:w-0 after:h-[1px] after:bg-sky-400 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
                                        onClick={() => moveToPage(item.key)}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                                <p className="text-center text-[24px] font-light">
                                    {item.description}
                                </p>
                            </div>
                            {data.windows.subtabs.length > 1 &&
                            index + 1 !== data.windows.subtabs.length ? (
                                <hr className="w-3/4 mx-auto border-slate-400" />
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Windows;
