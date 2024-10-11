import Menu from "./Menu/Menu";
import Logo from "./Logo/Logo";
import PhoneMenu from "./PhoneMenu/PhoneMenu";
import axios from "axios";
import { useContext, useState, useEffect, createContext } from "react";
import { GlobalContext } from "../../App";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../Hooks/useWindowWidth";
import Path from "./Path/Path";

export const MenuContext = createContext<MenuContextDef>({} as MenuContextDef);

const Header = () => {
    const windowWidth = useWindowWidth();
    const { defaultLanguage } = useContext(GlobalContext);
    const [data, setData] = useState<Tab[]>([]);
    const navigate = useNavigate();
    const [openedTabs, setOpenedTabs] = useState<TabOpened>({
        name: null,
        first: null,
        second: null,
        third: null,
    });

    const setOpen = (tab: Tab | null, key: string) => {
        setOpenedTabs((prev) => {
            return { ...prev, [key]: tab?.name };
        });
    };

    const setClose = (key?: string) => {
        if (key) {
            setOpenedTabs((prev) => {
                return { ...prev, [key]: null };
            });
        } else {
            setOpenedTabs({
                name: null,
                first: null,
                second: null,
                third: null,
            });
        }
    };

    const handleListElementClick = async (key: string) => {
        const { data } = await axios.get("/data/routes.json?url");
        const finded: Route = data.find((item: Route) => item.key === key);
        if (finded.element && finded.element.includes("#")) {
            navigate(`${finded.name}/${finded.element}`);
        } else {
            navigate(finded.name);
        }
        setClose();
    };

    useEffect(() => {
        setOpenedTabs({
            name: null,
            first: null,
            second: null,
            third: null,
        });
    }, [windowWidth]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `/data/${defaultLanguage.name.toLowerCase()}/tabs.json?url`
            );
            setData(response.data);
        };

        fetchData();
    }, [defaultLanguage]);

    return (
        <MenuContext.Provider
            value={{
                setOpen,
                setClose,
                handleListElementClick,
                openedTabs,
                setOpenedTabs,
            }}
        >
            <div className="flex flex-col gap-[12px]">
                <div className="flex justify-between items-center text-[20px] p-[16px] gap-[8px]">
                    <Logo />
                    <div className="lg:flex hidden">
                        <Menu data={data} />
                    </div>
                    <div className="lg:hidden flex">
                        <PhoneMenu data={data} />
                    </div>
                </div>
                <Path />
            </div>
        </MenuContext.Provider>
    );
};

export default Header;
