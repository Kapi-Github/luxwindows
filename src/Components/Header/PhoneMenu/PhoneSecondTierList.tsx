import { useContext } from "react";
import { MenuContext } from "../Header";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import PhoneThirdTierList from "./PhoneThirdTierList";

interface Props {
    tab: Tab;
    handleElementClick: (tab: Tab, key: keyof TabOpened) => void;
}

const PhoneSecondTierList = ({ tab, handleElementClick }: Props) => {
    const { openedTabs } = useContext(MenuContext);

    return (
        <React.Fragment>
            {tab.subtabs &&
                tab.subtabs.map((subtab) => (
                    <div
                        key={`phone-menu-item-${subtab.name}`}
                        className={`transition-all duration-700 ease-in-out w-full flex flex-col justify-center overflow-hidden ${
                            openedTabs.first === tab.name
                                ? "max-h-[400px] opacity-100 ease-[cubic-bezier(0.6,0.1,1,1)]"
                                : "max-h-0 opacity-80 ease-[cubic-bezier(0,0.99,0.01,1)]"
                        }`}
                    >
                        <button
                            className="w-full flex items-center justify-center h-[50px]"
                            onClick={() => handleElementClick(subtab, "second")}
                        >
                            <span className="font-normal text-[18px]">
                                {subtab.name}
                            </span>
                            {subtab.subtabs && subtab.subtabs.length ? (
                                <Icon
                                    icon="mingcute:right-fill"
                                    className={`transition-all duration-500 ease-in-out ${
                                        openedTabs.second === subtab.name
                                            ? "rotate-90"
                                            : "rotate-0"
                                    }`}
                                />
                            ) : null}
                        </button>
                        <PhoneThirdTierList
                            tab={subtab}
                            handleElementClick={handleElementClick}
                        />
                    </div>
                ))}
        </React.Fragment>
    );
};

export default PhoneSecondTierList;
