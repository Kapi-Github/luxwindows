import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../../../../App";
import React from "react";
import useWindowWidth from "../../../../../Hooks/useWindowWidth";
import NotFound from "../../../../../Assets/NotFound/NotFound";

const AluplastItem = () => {
    const width = useWindowWidth();
    const { data } = useContext(GlobalContext);
    const { category, item } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [itemData, setItemData] = useState<any>();
    const [itemCategory, setItemCategory] = useState<string>();
    const [openedTab, setOpenedTab] = useState<number>(1);
    const [openedKey, setOpenedKey] = useState<string>("");
    const [left, setLeft] = useState(0);
    const tabRefs = useRef<any[]>([]);
    const [tabs, setTabs] = useState<any[]>(data.aluplast.tabnames);

    useEffect(() => {
        setTabs(data.aluplast.tabnames);
    }, [data.aluplast]);

    useEffect(() => {
        setOpenedKey(tabs[0].tab);
    }, [tabs]);

    useEffect(() => {
        if (width <= 768) {
            setLeft(0);
            setOpenedTab(1);
            setOpenedKey(data.aluplast.tabnames[0].tab);
        }
    }, [width]);

    useEffect(() => {
        setOpenedTab(1);
        setTabs([...data.aluplast.tabnames]);
        const findedCategory = data.aluplast.subtabs.find(
            (item: any) => item.path === category
        );

        if (findedCategory) {
            setItemCategory(findedCategory.title);
            const findedItem = findedCategory.subtabs.find(
                (temp: any) => temp.path === item
            );

            if (findedItem) {
                setItemData(findedItem);
                Object.entries(findedItem.details).map((item: any) => {
                    if (
                        (Array.isArray(item[1]) && item[1].length === 0) ||
                        (typeof item[1] === "object" &&
                            item[1] !== null &&
                            !Array.isArray(item[1]) &&
                            Object.keys(item[1]).length === 0) ||
                        typeof item[1] === "string"
                    ) {
                        setTabs((prev) => {
                            return prev.filter((tab) => {
                                if (tab.tab !== item[0]) {
                                    return tab;
                                }
                            });
                        });
                    }
                });
            }
        }
    }, [category, item, data.aluplast]);

    useEffect(() => {
        if (tabRefs.current[openedTab - 1]) {
            const { offsetLeft } = tabRefs.current[openedTab - 1];
            setLeft(offsetLeft);
        }
    }, [openedTab]);

    const navigateToItem = (newCategory: string, newItem: string) => {
        const newPath = pathname.replace(
            /\/aluplast\/[^\/]+\/[^\/]+/,
            `/aluplast/${newCategory}/${newItem}`
        );
        navigate(newPath);
        window.scrollTo(0, 0);
    };

    if (!itemData) {
        return <NotFound />;
    }

    return (
        <div className="box w-full flex flex-col gap-[40px]">
            <React.Fragment>
                <div className="relative box">
                    <img
                        className="w-full object-cover h-[300px]"
                        src={data.aluplast.img}
                        alt="Okna"
                    />
                    <span className="w-full h-full flex items-center justify-center bg-black text-center text-white font-light tracking-[2px] absolute left-1/2 top-0 -translate-x-1/2 bg-opacity-30 text-[48px] sm:text-[84px] hover:bg-opacity-50 transition-all duration-300 ease-in-out pointer-events-none">
                        {data.aluplast.title}
                    </span>
                </div>
                <div className="flex xl:flex-row xl:gap-x-[24px] flex-col max-xl:items-center gap-[64px] box">
                    <div className="xl:flex-1 max-xl:w-full flex xl:flex-row flex-col-reverse items-center xl:items-start">
                        <div className="flex flex-col">
                            <img
                                src={itemData.img}
                                alt={itemData.title}
                                className="w-[250px]"
                            />
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-[12px]">
                            <span className="text-[20px] font-light max-xl:text-center">
                                {itemCategory}
                            </span>
                            <span className="text-[32px] max-xl:text-center">
                                {itemData.title}
                            </span>
                            <div className="relative">
                                {width > 768 ? (
                                    <div
                                        className="absolute h-[48px] w-[160px] bg-gray-600 transition-all duration-300 ease-in-out"
                                        style={{
                                            left: `${left}px`,
                                        }}
                                    >
                                        <div className="relative w-full h-full after:bg-gray-600 after:absolute after:w-[12px] after:h-[12px] after:rotate-45 after:left-1/2 after:-translate-x-1/2 after:top-full after:-translate-y-1/2"></div>
                                    </div>
                                ) : null}
                                <div className="w-full flex flex-col gap-[48px]">
                                    <div className="border-b-[1px] border-b-gray-600 flex flex-wrap relative z-10">
                                        {tabs.map((tab, index) => (
                                            <div
                                                key={`aluplast-tab-${index}`}
                                                className={`cursor-pointer max-md:flex-1 max-md:basis-[160px] flex justify-center md:w-[160px] py-[12px] transition-all duration-150 ease-in-out ${
                                                    openedTab === index + 1
                                                        ? "text-white max-md:bg-gray-600 max-md:hover:bg-gray-400"
                                                        : "hover:bg-gray-400"
                                                }`}
                                                onClick={() => {
                                                    setOpenedTab(index + 1);
                                                    setOpenedKey(tab.tab);
                                                }}
                                                ref={(el) =>
                                                    (tabRefs.current[index] =
                                                        el)
                                                }
                                            >
                                                <span className="font-light tracking-wider whitespace-nowrap">
                                                    {tab.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-[16px]">
                                        {openedKey === "features" && (
                                            <ul className="list-disc pl-[24px]">
                                                {itemData.details.features.map(
                                                    (
                                                        feature: string,
                                                        index: number
                                                    ) => (
                                                        <li
                                                            key={`aluplast-item-list-item-${index}`}
                                                            className="font-light text-[18px]"
                                                        >
                                                            {feature}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                        {openedKey === "description" && (
                                            <div className="flex flex-col gap-[24px]">
                                                <span className="font-medium text-[24px]">
                                                    {
                                                        itemData.details
                                                            .description.title
                                                    }
                                                </span>
                                                <div className="flex flex-col gap-[24px]">
                                                    {itemData.details.description.paragraphs.map(
                                                        (
                                                            paragraph: string,
                                                            index: number
                                                        ) => (
                                                            <span
                                                                key={`aluplast-item-paragraph-${index}`}
                                                                className="font-light text-[18px]"
                                                            >
                                                                {paragraph}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {openedKey === "color" && (
                                            <div>Kolory</div>
                                        )}
                                        {openedKey === "download" && (
                                            <div>Materiały do pobrania</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:w-[1px] max-xl:w-[90%] max-xl:h-[1px]  bg-gray-600"></div>
                    <div className="flex flex-col gap-[48px] max-xl:w-[60%]">
                        {data.aluplast.subtabs.map(
                            (header: any, index: number) => (
                                <div
                                    className={`w-full flex flex-col gap-[20px]`}
                                    key={`list-category-${index}`}
                                >
                                    <span className="text-[24px] max-xl:text-center font-medium xl:pr-[24px]">
                                        {header.title}
                                    </span>
                                    <div className="flex flex-col gap-[16px]">
                                        {header.subtabs.map(
                                            (tab: any, index: number) => (
                                                <React.Fragment
                                                    key={`list-category-item-${index}`}
                                                >
                                                    {index !== 0 ? (
                                                        <hr className="border-gray-600" />
                                                    ) : null}
                                                    <span
                                                        onClick={() =>
                                                            navigateToItem(
                                                                header.path,
                                                                tab.path
                                                            )
                                                        }
                                                        className="text-[20px] max-xl: text-center font-light xl:hover:pl-[8px] pl-0 transition-all duration-200 ease-in-out cursor-pointer"
                                                    >
                                                        {tab.title}
                                                    </span>
                                                </React.Fragment>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
};

export default AluplastItem;
