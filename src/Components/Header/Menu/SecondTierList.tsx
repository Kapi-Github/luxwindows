import { Icon } from "@iconify/react/dist/iconify.js";
import ThirdTierList from "./ThirdTierList";
import { useContext } from "react";
import { MenuContext } from "../Header";

interface Props {
    tab: Tab;
}

const SecondTierList = ({ tab }: Props) => {
    const { setOpen, setClose, handleListElementClick, openedTabs } =
        useContext(MenuContext);

    return (
        <div className={`absolute top-[12px] left-full flex flex-col`}>
            <div
                className={`bg-slate-100 shadow-[0_0_12px_rgb(127,127,127)] transition-all duration-300 ease-in-out ${
                    openedTabs.first === tab.name
                        ? "z-[100000] pointer-events-auto"
                        : "z-0 pointer-events-none"
                }`}
                style={{
                    height:
                        openedTabs.first === tab.name
                            ? `${tab.subtabs.length * 50}px`
                            : "0px",
                }}
            >
                {tab.subtabs &&
                    tab.subtabs.map((secondTierTabs) => (
                        <div
                            key={`first-tier-item-${secondTierTabs.name}`}
                            className={`flex flex-1 relative items-center cursor-pointer whitespace-nowrap transition-all duration-300 ease-in-out ${
                                openedTabs.first === tab.name
                                    ? "h-[50px] opacity-100"
                                    : "h-0 opacity-0"
                            }`}
                            onMouseEnter={() =>
                                setOpen(secondTierTabs, "second")
                            }
                            onMouseLeave={() => setClose("second")}
                        >
                            <div
                                className="flex flex-1 h-full items-center gap-[4px] px-[16px] hover:bg-slate-200 transition-all duration-300 ease-in-out"
                                onClick={() =>
                                    handleListElementClick(secondTierTabs.key)
                                }
                            >
                                <span>{secondTierTabs.name}</span>
                                {secondTierTabs.subtabs &&
                                    secondTierTabs.subtabs.length > 0 && (
                                        <Icon
                                            icon="mingcute:right-fill"
                                            className={`transition-all duration-300 ease-in-out ${
                                                openedTabs.second ===
                                                secondTierTabs.name
                                                    ? "rotate-0"
                                                    : "rotate-90"
                                            }`}
                                        />
                                    )}
                            </div>
                            {secondTierTabs.subtabs &&
                                secondTierTabs.subtabs.length > 0 && (
                                    <ThirdTierList tab={secondTierTabs} />
                                )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SecondTierList;
