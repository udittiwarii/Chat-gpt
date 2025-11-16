const OrbLoader = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-14 h-14 flex items-center justify-center">
                {/* Glowing outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-500/20 animate-[ping_1.3s_linear_infinite]"></div>

                {/* Rotating orb */}
                <div className="absolute w-full h-full rounded-full border-4 border-t-gray-500 border-l-transparent border-r-transparent border-b-gray-300 animate-spin"></div>

                {/* Core glow */}
                <div className="w-5 h-5 bg-gray-500 rounded-full shadow-[0_0_20px_6px_rgba(59,130,246,0.5)] animate-pulse"></div>
            </div>
        </div>
    );
};

export default OrbLoader;
