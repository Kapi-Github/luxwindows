import { useContext } from "react";
import { GlobalContext } from "../../../App";

const HomePage = () => {
    const { data } = useContext(GlobalContext);

    return (
        <div className="box w-full h-full">
            <div className="w-full relative">
                <div className="absolute top-0 flex justify-center items-center w-full h-full bg-opacity-50 bg-black">
                    <span className="text-white text-[48px] sm:text-[68px] tracking-[4px] font-light text-center">
                        {data.homepage.title}
                    </span>
                </div>
                <img
                    className="w-full h-[450px] object-cover"
                    src={data.homepage.img}
                    alt="Homepage image"
                />
            </div>
        </div>
    );
};

export default HomePage;
