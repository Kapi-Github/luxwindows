import { Link } from "react-router-dom";
import logo from "/images/logo.jpg";

const Logo = () => {
    return (
        <div className="w-[140px] sm:w-[180px] lg:w-[220px]">
            <Link to={"/"}>
                <img src={logo} alt="logo" className="w-full" />
            </Link>
        </div>
    );
};

export default Logo;
