import { useContext } from "react";
import { GlobalContext } from "../../../../App";

const AboutCompany = () => {
    const { data } = useContext(GlobalContext);

    return (
        <div className="box flex flex-col items-center gap-[24px] w-full">
            <div className="w-full relative">
                <div className="absolute top-0 flex justify-center items-center w-full h-full bg-opacity-50 bg-black">
                    <span className="text-white text-[68px] tracking-[4px] font-light">
                        O firmie
                    </span>
                </div>
                <img
                    src={data.ourCompany.img}
                    alt="O firmie"
                    className="w-full object-cover h-[350px]"
                />
            </div>
            <div className="w-4/5 flex flex-col gap-[40px]">
                <span className="text-center text-[20px] font-normal">
                    {data.ourCompany.title}
                </span>
                {data.ourCompany.text.map(
                    (paragraph: string, index: number) => (
                        <p
                            key={`about-company-paragraph-${index}`}
                            className="text-[18px] font-light"
                        >
                            {paragraph}
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default AboutCompany;
