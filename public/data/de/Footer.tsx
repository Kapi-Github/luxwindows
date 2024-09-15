import { useContext } from "react";
import "./Footer.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GlobalContext } from "../../App";

const Footer = () => {
    const { data } = useContext(GlobalContext);

    return (
        <div className="w-full bg-sky-400 py-[16px] flex flex-col gap-[36px] text-black">
            <div className="flex w-full flex-wrap gap-[48px]">
                <div className="flex-1 basis-[200px] flex flex-col items-center gap-[28px]">
                    <div className="text-center">
                        <p className="text-[24px] font-normal">
                            {data && data.footer.contact}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col     gap-[12px] text-[16px] font-extralight">
                        <p>+48 XXXXXXXXX</p>
                        <p>mailto@gmail.com</p>
                    </div>
                </div>
                <div className="flex-1 basis-[200px] flex flex-col items-center gap-[28px]">
                    <div className="text-center">
                        <p className="text-[24px] font-normal">Social media</p>
                    </div>
                    <div className="flex flex-col items-center gap-[12px] font-light text-[18px]">
                        <div className="social cursor-pointer flex items-center">
                            <div className="social-img px-[6px] transition-all duration-200 ease-in-out">
                                <Icon
                                    icon="ic:baseline-facebook"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <span className="social-text">Facebook</span>
                        </div>
                        <div className="social cursor-pointer flex items-center">
                            <div className="social-img px-[6px] transition-all duration-200 ease-in-out">
                                <Icon
                                    icon="mdi:instagram"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <span className="social-text">Instagram</span>
                        </div>
                        <div className="social cursor-pointer flex items-center">
                            <div className="social-img px-[6px] transition-all duration-200 ease-in-out">
                                <Icon
                                    icon="mdi:youtube"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <span className="social-text">Youtube</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-[12px] font-light tracking-[0.5px]">
                    Copyright © luxwindows.eu
                </p>
            </div>
        </div>
    );
};

export default Footer;
