import { useCallback } from "react";
import { useInView } from "react-intersection-observer";

const useScrollAnimate = () => {
    return useCallback(() => {
        return useInView({
            threshold: 0.1,
            triggerOnce: true,
            delay: 300,
        });
    }, []);
};

export default useScrollAnimate;
