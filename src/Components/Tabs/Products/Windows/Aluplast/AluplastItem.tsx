import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../../../../App";
import "./../../../../../index.css";
import React from "react";

const Tabs = [
    {
        title: "Specyfikacja",
        key: 1,
        tab: "features",
    },
    {
        title: "Opis",
        key: 2,
        tab: "description",
    },
    {
        title: "Kolorystyka",
        key: 3,
        tab: "color",
    },
    {
        title: "Do pobrania",
        key: 4,
        tab: "download",
    },
];

const AluplastItem = () => {
    const { data } = useContext(GlobalContext);
    const { category, item } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [itemData, setItemData] = useState<any>();
    const [itemCategory, setItemCategory] = useState<string>();
    const [openedTab, setOpenedTab] = useState<number>(1);
    const [left, setLeft] = useState(0);
    const tabRefs = useRef<any[]>([]);

    useEffect(() => {
        setOpenedTab(1);
    }, [category, item]);

    useEffect(() => {
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
            }
        }
    }, [category, item]);

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

    return (
        <div className="box w-full flex flex-col gap-[40px]">
            {!itemData ? (
                <div>Nie znaleziono strony</div>
            ) : (
                <React.Fragment>
                    <div className="relative box">
                        <img
                            className="w-full object-cover h-[300px]"
                            src={data.aluplast.img}
                            alt="Okna"
                        />
                        <span className="w-full h-full flex items-center justify-center bg-black text-center text-white font-light tracking-[2px] absolute left-1/2 top-0 -translate-x-1/2 bg-opacity-30 text-[84px] hover:bg-opacity-50 transition-all duration-300 ease-in-out pointer-events-none">
                            {data.aluplast.title}
                        </span>
                    </div>
                    <div className="flex gap-x-[24px] box">
                        <div className="flex-1 flex">
                            <div className="flex flex-col">
                                <img
                                    src={itemData.img}
                                    alt={itemData.title}
                                    className="w-[250px]"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-[12px]">
                                <span className="text-[20px] font-light">
                                    {itemCategory}
                                </span>
                                <span className="text-[32px]">
                                    {itemData.title}
                                </span>
                                <div className="relative">
                                    <div
                                        className="absolute h-[48px] w-[160px] bg-gray-600 transition-all duration-300 ease-in-out"
                                        style={{
                                            left: `${left}px`,
                                        }}
                                    >
                                        <div className="relative w-full h-full after:bg-gray-600 after:absolute after:w-[12px] after:h-[12px] after:rotate-45 after:left-1/2 after:-translate-x-1/2 after:top-full after:-translate-y-1/2"></div>
                                    </div>
                                    <div className="w-full flex flex-col gap-[48px]">
                                        <div className="border-b-[1px] border-b-gray-600 flex relative z-10">
                                            {Tabs.map((tab, index) => (
                                                <div
                                                    key={`aluplast-tab-${index}`}
                                                    className={`cursor-pointer flex justify-center w-[160px] py-[12px] transition-all duration-150 ease-in-out ${
                                                        openedTab === tab.key
                                                            ? "text-white"
                                                            : "hover:bg-gray-400"
                                                    }`}
                                                    onClick={() =>
                                                        setOpenedTab(tab.key)
                                                    }
                                                    ref={(el) =>
                                                        (tabRefs.current[
                                                            index
                                                        ] = el)
                                                    }
                                                >
                                                    <span className="font-light tracking-wider">
                                                        {tab.title}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-[16px]">
                                            {openedTab === 1 && (
                                                <ul className="list-disc pl-[24px]">
                                                    {itemData.features.map(
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
                                            {openedTab === 2 && (
                                                <div className="flex flex-col gap-[24px]">
                                                    <span className="font-medium text-[24px]">
                                                        {
                                                            itemData.description
                                                                .title
                                                        }
                                                    </span>
                                                    <div className="flex flex-col gap-[24px]">
                                                        {itemData.description.paragraphs.map(
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
                                            {openedTab === 1 && <div></div>}
                                            {openedTab === 1 && <div></div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[1px] bg-gray-600"></div>
                        <div className="flex flex-col gap-[48px]">
                            {data.aluplast.subtabs.map(
                                (header: any, index: number) => (
                                    <div
                                        className={`w-full flex flex-col gap-[20px]`}
                                        key={`list-category-${index}`}
                                    >
                                        <span className="text-[24px] font-medium pr-[24px]">
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
                                                            className="text-[20px] font-light hover:pl-[8px] pl-0 transition-all duration-200 ease-in-out cursor-pointer"
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
            )}
        </div>
    );
};

export default AluplastItem;
