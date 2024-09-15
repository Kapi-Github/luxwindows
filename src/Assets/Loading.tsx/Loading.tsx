const Loading = () => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div
                className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"
                style={{ animationDelay: "-.3s" }}
            ></div>
            <div
                className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"
                style={{ animationDelay: "-.5s" }}
            ></div>
        </div>
    );
};

export default Loading;
