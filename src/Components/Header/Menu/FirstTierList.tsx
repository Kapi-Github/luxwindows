import { Icon } from "@iconify/react/dist/iconify.js";
import SecondTierList from "./SecondTierList";
import { useContext } from "react";
import { MenuContext } from "../Header";

interface Props {
    tab: Tab;
}

const FirstTierList = ({ tab }: Props) => {
    const { handleListElementClick, setOpen, setClose, openedTabs } =
        useContext(MenuContext);

    return (
        <div className={`absolute top-full flex flex-col`}>
            <div
                className={`w-full transition-all duration-300 ease-in-out ${
                    openedTabs.name === tab.name ? "h-[12px]" : "h-0"
                }`}
            ></div>
            <div
                className={`bg-slate-100 shadow-[0_0_12px_rgb(127,127,127)] transition-all duration-300 ease-in-out ${
                    openedTabs.name === tab.name
                        ? "z-[100000] pointer-events-auto"
                        : "z-0 pointer-events-none"
                }`}
                style={{
                    height:
                        openedTabs.name === tab.name
                            ? `${tab.subtabs.length * 50}px`
                            : "0px",
                }}
            >
                {tab.subtabs &&
                    tab.subtabs.map((firstTierTabs) => (
                        <div
                            key={`first-tier-item-${firstTierTabs.name}`}
                            className={`flex flex-1 relative items-center cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out ${
                                openedTabs.name === tab.name
                                    ? "h-[50px] opacity-100"
                                    : "h-0 opacity-0"
                            }`}
                            onMouseEnter={() => setOpen(firstTierTabs, "first")}
                            onMouseLeave={() => setClose("first")}
                        >
                            <div
                                className="flex flex-1 h-full items-center gap-[4px] px-[16px] hover:bg-slate-200 transition-all duration-300 ease-in-out"
                                onClick={() =>
                                    handleListElementClick(firstTierTabs.key)
                                }
                            >
                                <span>{firstTierTabs.name}</span>
                                {firstTierTabs.subtabs &&
                                    firstTierTabs.subtabs.length > 0 && (
                                        <Icon
                                            icon="mingcute:right-fill"
                                            className={`transition-all duration-300 ease-in-out ${
                                                openedTabs.first ===
                                                firstTierTabs.name
                                                    ? "rotate-0"
                                                    : "rotate-90"
                                            }`}
                                        />
                                    )}
                            </div>
                            {firstTierTabs.subtabs.length > 0 &&
                                firstTierTabs.subtabs && (
                                    <SecondTierList tab={firstTierTabs} />
                                )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FirstTierList;
