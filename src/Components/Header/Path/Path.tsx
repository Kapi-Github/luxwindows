import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../../App";
import React from "react";

const Path = () => {
    const { pathname } = useLocation();
    const { defaultLanguage } = useContext(GlobalContext);
    const [path, setPath] = useState<string[]>([]);
    const [isTitle, setIsTitle] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/data/routes.json?url");
            const temp =
                pathname !== "/" &&
                data.filter((item: Route) => pathname.includes(item.name));

            const { key } = temp[temp.length - 1] || {};

            setPath([]);
            setIsTitle(false);
            const res = await axios.get(
                `/data/${defaultLanguage.name.toLowerCase()}/tabs.json?url`
            );

            if (key) {
                res.data.forEach((item: Tab) => {
                    if (item.key === key.split("-")[0]) {
                        if ("first" in item) {
                            setIsTitle(true);
                        }
                        if (!key.split("-")[1]) {
                            setIsTitle(true);
                        }
                        setPath((prev) => [...prev, item.name]);
                        item.subtabs.map((first) => {
                            if (first.key.split("-")[1] === key.split("-")[1]) {
                                setPath((prev) => [...prev, first.name]);
                                first.subtabs.map((second) => {
                                    if (
                                        second.key.split("-")[2] ===
                                        key.split("-")[2]
                                    ) {
                                        setPath((prev) => [
                                            ...prev,
                                            second.name,
                                        ]);
                                        second.subtabs.map((third) => {
                                            if (
                                                third.key.split("-")[3] ===
                                                key.split("-")[3]
                                            ) {
                                                setPath((prev) => [
                                                    ...prev,
                                                    third.name,
                                                ]);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        };

        fetchData();
    }, [pathname]);

    return (
        <React.Fragment>
            {!isTitle ? (
                <div className="flex flex-wrap items-center gap-[6px] px-[12px]">
                    {path.map(
                        (value, index) =>
                            path && (
                                <React.Fragment key={`path-element-${index}`}>
                                    {index !== 0 && (
                                        <Icon
                                            icon="icon-park-outline:dot"
                                            width={8}
                                        />
                                    )}
                                    <div className="">
                                        <span className="font-normal whitespace-nowrap">
                                            {value}
                                        </span>
                                    </div>
                                </React.Fragment>
                            )
                    )}
                </div>
            ) : null}
        </React.Fragment>
    );
};

export default Path;
