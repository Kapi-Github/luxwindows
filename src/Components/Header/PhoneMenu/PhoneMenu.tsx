import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../Header";
import PhoneFirstTierList from "./PhoneFirstTierList";
import useWindowWidth from "../../../Hooks/useWindowWidth";

interface Props {
    data: Tab[];
}

const PhoneMenu = ({ data }: Props) => {
    const windowWidth = useWindowWidth();
    const {
        setOpen,
        setClose,
        openedTabs,
        setOpenedTabs,
        handleListElementClick,
    } = useContext(MenuContext);
    const [isMenuOpened, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (windowWidth === 1024) {
            setIsMenuOpen(false);
        }
    }, [windowWidth]);

    const handleElementClick = (tab: Tab, key: keyof TabOpened) => {
        if (tab.subtabs && tab.subtabs.length > 0) {
            if (openedTabs[key]) {
                if (openedTabs[key] === tab.name) {
                    handleListElementClick(tab.key);
                    handleClose();
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
                setOpen(tab, key);
            }
        } else {
            handleListElementClick(tab.key);
            setIsMenuOpen(false);
        }
    };

    const handleClose = () => {
        setIsMenuOpen((prev) => !prev);
        setOpenedTabs({
            name: null,
            first: null,
            second: null,
            third: null,
        });
    };

    return (
        <div className="flex-1 relative justify-end">
            <div className="w-[28px] h-[28px]">
                {isMenuOpened ? (
                    <Icon
                        icon="maki:cross"
                        cursor="pointer"
                        onClick={() => handleClose()}
                        width="100%"
                    />
                ) : (
                    <Icon
                        icon="ri:menu-fill"
                        cursor="pointer"
                        onClick={() => handleClose()}
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
                    data.map((tab, index) => (
                        <div
                            key={`phone-menu-item-${tab.name}`}
                            className={`transition-all duration-700 w-full flex flex-col border-black ${
                                index !== 0 ? "border-t-[3px]" : "border-none"
                            }`}
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
            </div>
        </div>
    );
};

export default PhoneMenu;
