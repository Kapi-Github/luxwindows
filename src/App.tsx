import { createContext, useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import languages from "./data/languages.json";
import Contact from "./Components/Routes/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import axios from "axios";
import Loading from "./Assets/Loading.tsx/Loading";
import Location from "./Components/Routes/Location/Location";
import Products from "./Components/Routes/Products/Products";
import Company from "./Components/Routes/Company/Company";
import Windows from "./Components/Routes/Products/Windows/Windows";
import Aluplast from "./Components/Routes/Products/Windows/Aluplast/Aluplast";
import Aluminum from "./Components/Routes/Products/Aluminum/Aluminum";
import Aluprof from "./Components/Routes/Products/Aluminum/Aluprof/Aluprof";
import "./index.css";
import AluplastItem from "./Components/Routes/Products/Windows/Aluplast/AluplastItem";
import HomePage from "./Components/Routes/HomePage/HomePage";

export const GlobalContext = createContext<GlobalContextDef>(
    {} as GlobalContextDef
);

function App() {
    const [defaultLanguage, setDefaultLanguage] = useState<Language>(() => {
        const lang = localStorage.getItem("language");
        return lang ? JSON.parse(lang) : languages[0];
    });
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(
                `/data/${defaultLanguage.name.toLowerCase()}/site.json`
            );
            setData(data);
        };
        fetchData();

        localStorage.setItem("language", JSON.stringify(defaultLanguage));
    }, [defaultLanguage]);

    const moveToPage = async (key: string) => {
        const { data } = await axios.get("/data/routes.json?url");
        const finded: Route = data.find((item: Route) => item.key === key);
        navigate(finded.name);
        window.scrollTo(0, 0);
    };

    return (
        <div className="w-full min-h-screen flex flex-col justify-between gap-[28px] relative box">
            {data ? (
                <GlobalContext.Provider
                    value={{
                        defaultLanguage,
                        setDefaultLanguage,
                        data,
                        moveToPage,
                    }}
                >
                    <div className="max-w-[1260px] w-full mx-auto flex flex-col gap-[18px] bg-white font-[Poppins]">
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            {/* Produkty */}
                            {/* Okna */}
                            <Route path="/produkty" element={<Products />} />
                            <Route
                                path="/produkty/okna"
                                element={<Windows />}
                            />
                            <Route
                                path="/produkty/okna/aluplast"
                                element={<Aluplast />}
                            />
                            <Route
                                path="/produkty/okna/aluplast/:category/:item"
                                element={<AluplastItem />}
                            />
                            {/* Drzwi zewnetrzne */}
                            <Route path="/produkty/drzwi-zewnetrzne" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-dostepne-od-reki" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-dostepne-od-reki/pelne" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-dostepne-od-reki/przeszklone-inox" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-dostepne-od-reki/z-ramka-pcv" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-dostepne-od-reki/z-aplikacja" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-dostepne-od-reki/techniczne" />
                            <Route path="/produkty/drzwi-zewnetrzne/drzwi-na-zamowienie" />
                            {/* Aluminium */}
                            <Route
                                path="/produkty/aluminium"
                                element={<Aluminum />}
                            />
                            <Route
                                path="/produkty/aluminium/aluprof"
                                element={<Aluprof />}
                            />
                            {/* Nasza firma */}
                            <Route
                                path="nasza-firma"
                                element={<Company />}
                            />
                            {/*  */}
                            {/* Kontakt */}
                            <Route path="kontakt" element={<Contact />} />
                            {/*  */}
                            {/* Lokalizacja */}
                            <Route path="lokalizacja" element={<Location />} />
                            <Route path="*" element={<div>Źle trafiłeś</div>} />
                        </Routes>
                    </div>
                    <Footer />
                </GlobalContext.Provider>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default App;
