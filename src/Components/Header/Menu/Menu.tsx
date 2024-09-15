import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext } from "react";
import LanguageSelection from "./LanguageSelection";
import FirstTierList from "./FirstTierList";
import { MenuContext } from "../Header";

interface Props {
    data: Tab[];
}

const Menu = ({ data }: Props) => {
    const { setOpen, setClose, handleListElementClick, openedTabs } =
        useContext(MenuContext);

    return (
        <div className="flex-1 flex justify-end">
            <div className="lg:flex hidden gap-[36px]">
                {data &&
                    data.map((tab) => (
                        <div
                            key={`tab-item-${tab.name}`}
                            className="relative"
                            onMouseEnter={() => setOpen(tab, "name")}
                            onMouseLeave={() => setClose()}
                        >
                            <div
                                className="flex flex-1 h-full items-center gap-[4px] cursor-pointer px-[8px]"
                                onClick={() => handleListElementClick(tab.key)}
                            >
                                <span>{tab.name}</span>
                                {tab.subtabs.length > 0 && (
                                    <Icon
                                        icon="mingcute:right-fill"
                                        className={`transition-all duration-300 ease-in-out ${
                                            openedTabs.name === tab.name
                                                ? "rotate-90"
                                                : "rotate-0"
                                        }`}
                                    />
                                )}
                            </div>
                            {tab.subtabs && <FirstTierList tab={tab} />}
                        </div>
                    ))}
                <LanguageSelection />
            </div>
        </div>
    );
};

export default Menu;
