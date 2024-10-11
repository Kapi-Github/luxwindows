import { useContext } from "react";
import { GlobalContext } from "../../../App";

const Contact = () => {
    const { data } = useContext(GlobalContext);

    return (
        <div className="box flex flex-col items-center w-full gap-[24px]">
            <div className="w-full relative">
                <div className="absolute top-0 flex justify-center items-center w-full h-full bg-opacity-50 bg-black">
                    <span className="text-white text-[68px] tracking-[4px] font-light">
                        {data.contact.title}
                    </span>
                </div>
                <img
                    src={data.contact.img}
                    alt={data.contact.title}
                    className="w-full object-cover h-[350px]"
                />
            </div>
            <div className="w-4/5">
                <div className="w-full flex flex-col items-center gap-[36px]">
                    <span className="text-[44px] font-light">
                        {data.contact.owners.title}
                    </span>
                    <div className="flex flex-wrap flex-col lg:flex-row gap-y-[128px]">
                        {data.contact.owners.people.map((person: Person) => (
                            <div
                                className="w-full flex-1 basis-1/2 flex flex-col items-center sm:flex-row gap-[24px] px-[36px]"
                                key={`person-list-item-${person.name}`}
                            >
                                <img
                                    src={person.img}
                                    alt={person.name}
                                    className="rounded-full w-[140px]"
                                />
                                <div className="flex flex-col justify-center gap-[12px] h-full">
                                    <span className="text-[28px] font-normal whitespace-nowrap">
                                        {person.name}
                                    </span>
                                    <a
                                        className="text-[20px] font-light whitespace-nowrap text-center sm:text-left"
                                        href="phone"
                                    >
                                        {person.phone}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
