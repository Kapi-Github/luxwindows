import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const moveBack = () => {
        navigate(-1);
    };

    return (
        <div className="box w-full flex flex-col items-center gap-[48px] py-[24px]">
            <p className="font-bold text-[32px]">404 - nie znaleziono strony</p>
            <button
                className="text-[20px] font-light"
                onClick={() => moveBack()}
            >
                Wróc do poprzedniej strony
            </button>
        </div>
    );
};

export default NotFound;
