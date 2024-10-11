import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useState } from "react";
import { GlobalContext } from "../../../App";
import languages from "./../../../data/languages.json";

const LanguageSelection = () => {
    const [isLanguagesOpen, setIsLanguagesOpen] = useState<boolean>(false);
    const { defaultLanguage, setDefaultLanguage } = useContext(GlobalContext);

    return (
        <div className="">
            <div className="cursor-pointer relative">
                <div
                    className="flex gap-[4px] items-center"
                    onMouseEnter={() => setIsLanguagesOpen(true)}
                    onMouseLeave={() => setIsLanguagesOpen(false)}
                >
                    <img
                        className="w-[25px]"
                        src={defaultLanguage.source}
                        alt={defaultLanguage.name}
                    />
                    <span>{defaultLanguage.name}</span>
                    <Icon
                        icon="mingcute:right-fill"
                        className={`${
                            isLanguagesOpen ? "rotate-[90deg]" : "rotate-0"
                        } transition-all duration-300 ease-in-out`}
                    />
                </div>
                <ul
                    className={`absolute w-full top-full overflow-hidden z-[100000] shadow-[0_0_12px_rgb(127,127,127)] bg-white ${
                        isLanguagesOpen
                            ? "max-h-[120px] opacity-100 pointer-events-auto"
                            : "max-h-0 opacity-0 pointer-events-none"
                    } transition-all duration-300 ease-in-out`}
                    onMouseEnter={() => setIsLanguagesOpen(true)}
                    onMouseLeave={() => setIsLanguagesOpen(false)}
                >
                    {languages.map(
                        (language, index) =>
                            language.name !== defaultLanguage.name && (
                                <li
                                    className={`flex justify-start gap-[4px] items-center cursor-pointer hover:bg-slate-200 transition-all duration-200 ease-in-out px-[2px]`}
                                    key={`language-select-${index}`}
                                    onClick={() => {
                                        setDefaultLanguage(language);
                                        setIsLanguagesOpen(false);
                                    }}
                                >
                                    <img
                                        className="w-[25px]"
                                        src={language.source}
                                        alt={language.name}
                                    />
                                    <span>{language.name}</span>
                                </li>
                            )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default LanguageSelection;
