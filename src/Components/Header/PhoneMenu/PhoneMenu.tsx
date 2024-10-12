import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../Header";
import PhoneFirstTierList from "./PhoneFirstTierList";
import useWindowWidth from "../../../Hooks/useWindowWidth";
import { GlobalContext } from "../../../App";
import languages from "./../../../data/languages.json";
import { useLocation } from "react-router-dom";

interface Props {
    data: Tab[];
}

const PhoneMenu = ({ data }: Props) => {
    const windowWidth = useWindowWidth();
    const { pathname } = useLocation();
    const {
        setOpen,
        setClose,
        openedTabs,
        setOpenedTabs,
        handleListElementClick,
    } = useContext(MenuContext);
    const { defaultLanguage, setDefaultLanguage } = useContext(GlobalContext);
    const [isLanguagesOpen, setIsLanguagesOpen] = useState<boolean>(false);
    const [isMenuOpened, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (windowWidth === 1024) {
            setIsLanguagesOpen(false);
            setIsMenuOpen(false);
        }
    }, [windowWidth]);

    const handleElementClick = (tab: Tab, key: keyof TabOpened) => {
        if (tab.subtabs && tab.subtabs.length > 0) {
            if (openedTabs[key]) {
                if (openedTabs[key] === tab.name) {
                    handleListElementClick(tab.key);
                    handleMenuClick();
                    setIsMenuOpen(false);
                }

                if (openedTabs[key] === tab.name) {
                    setClose(key);
                } else {
                    setOpen(null, key);
                    setTimeout(() => setOpen(tab, key), 700);
                }
                if (key === "name")
                    setOpenedTabs((prev: TabOpened) => ({
                        ...prev,
                        first: null,
                        second: null,
                        third: null,
                    }));

                if (key === "first")
                    setOpenedTabs((prev: TabOpened) => ({
                        ...prev,
                        second: null,
                        third: null,
                    }));

                if (key === "second")
                    setOpenedTabs((prev: TabOpened) => ({
                        ...prev,
                        third: null,
                    }));
            } else {
                setIsLanguagesOpen(false);
                setOpen(tab, key);
            }
        } else {
            handleListElementClick(tab.key);
            setIsMenuOpen(false);
        }
    };

    const handleMenuClick = () => {
        setIsLanguagesOpen(false);
        setIsMenuOpen((prev) => !prev);
        setOpenedTabs({
            name: null,
            first: null,
            second: null,
            third: null,
        });
    };

    useEffect(() => {
        setIsMenuOpen(false);
        setClose();
        setIsLanguagesOpen(false);
    }, [pathname]);

    return (
        <div className="flex-1 relative justify-end">
            <div className="w-[28px] h-[28px]">
                {isMenuOpened ? (
                    <Icon
                        icon="maki:cross"
                        cursor="pointer"
                        onClick={() => handleMenuClick()}
                        width="100%"
                    />
                ) : (
                    <Icon
                        icon="ri:menu-fill"
                        cursor="pointer"
                        onClick={() => handleMenuClick()}
                        width="100%"
                    />
                )}
            </div>
            <div
                className={`absolute top-[calc(100%+20px)] w-screen -right-[16px] bg-slate-100 shadow-[0_0_12px_rgb(127,127,127)] flex flex-col transition-[max-height,opacity] duration-700 overflow-hidden z-[100000] ${
                    isMenuOpened
                        ? "max-h-[800px] opacity-100 ease-[cubic-bezier(0.2,0.1,1,1)]"
                        : "max-h-0 opacity-100 ease-[cubic-bezier(0,0.99,0.01,1)]"
                }`}
            >
                {data &&
                    data.map((tab) => (
                        <div
                            key={`phone-menu-item-${tab.name}`}
                            className={`transition-all duration-700 w-full flex flex-col border-black border-b-[3px]
                            `}
                        >
                            <button
                                className={`w-full flex items-center justify-center border-black h-[50px]`}
                                onClick={() => {
                                    handleElementClick(tab, "name");
                                }}
                            >
                                <span className="font-medium text-[18px]">
                                    {tab.name}
                                </span>
                                {tab.subtabs && tab.subtabs.length ? (
                                    <Icon
                                        icon="mingcute:right-fill"
                                        className={`transition-all duration-500 ease-in-out ${
                                            openedTabs.name === tab.name
                                                ? "rotate-90"
                                                : "rotate-0"
                                        }`}
                                    />
                                ) : null}
                            </button>
                            <PhoneFirstTierList
                                tab={tab}
                                handleElementClick={handleElementClick}
                            />
                        </div>
                    ))}
                <div
                    key={`phone-menu-item-${defaultLanguage.name}`}
                    className={`transition-all duration-700 w-full flex flex-col border-black`}
                >
                    <button
                        className={`w-full flex items-center justify-center border-black h-[50px]`}
                        onClick={() => {
                            setIsLanguagesOpen(!isLanguagesOpen);
                            setOpenedTabs({
                                name: null,
                                first: null,
                                second: null,
                                third: null,
                            });
                        }}
                    >
                        <div className="flex gap-[4px] items-center">
                            <img
                                className="h-[16px]"
                                src={defaultLanguage.source}
                                alt={defaultLanguage.name}
                            />
                            <span className="font-medium text-[18px]">
                                {defaultLanguage.name}
                            </span>
                        </div>
                        {languages && languages.length ? (
                            <Icon
                                icon="mingcute:right-fill"
                                className={`transition-all duration-500 ease-in-out ${
                                    isLanguagesOpen ? "rotate-90" : "rotate-0"
                                }`}
                            />
                        ) : null}
                    </button>
                    {languages &&
                        languages.map((lang) => (
                            <React.Fragment
                                key={`phone-menu-item-${lang.name}`}
                            >
                                {lang.name !== defaultLanguage.name && (
                                    <div
                                        className={`transition-all duration-700 w-full flex flex-col justify-center overflow-hidden ${
                                            isLanguagesOpen
                                                ? "max-h-[450px] opacity-100 ease-[cubic-bezier(0.6,0.1,1,1)]"
                                                : "max-h-0 opacity-80 ease-[cubic-bezier(0,0.99,0.01,1)]"
                                        }`}
                                    >
                                        <button
                                            className="w-full flex items-center justify-center h-[50px]"
                                            onClick={() => {
                                                setDefaultLanguage(lang);
                                                setIsLanguagesOpen(false);
                                                setIsMenuOpen(false);
                                            }}
                                        >
                                            <div className="flex gap-[4px] items-center">
                                                <img
                                                    className="h-[16px]"
                                                    src={lang.source}
                                                    alt={lang.name}
                                                />
                                                <span className="font-medium text-[18px]">
                                                    {lang.name}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PhoneMenu;
