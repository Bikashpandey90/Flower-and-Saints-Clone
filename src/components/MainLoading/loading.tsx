import { useEffect } from "react";

const LoadingScreen = ({
    isLoading
}: { isLoading: boolean }) => {

    useEffect(() => {

        const loadingProgress = document.getElementById("loading-progress");
        const topLayout = document.getElementById("top-layout");
        const bottomLayout = document.getElementById("bottom-layout");
        const splashScreen = document.getElementById("splash-screen");

        setTimeout(() => {
            if (loadingProgress) loadingProgress.style.width = "100%";
        }, 100);

        setTimeout(() => {
            if (topLayout) topLayout.style.transform = "translateY(-100%)";
            if (bottomLayout) bottomLayout.style.transform = "translateY(100%)";
        }, 2000);

        setTimeout(() => {
            if (splashScreen) splashScreen.style.display = "none";
        }, 3000);

    }, [isLoading]);
    return (<>
        <div id="splash-screen" className="fixed top-0 left-0 w-full h-full flex flex-col z-[9999]">
            <div
                id="top-layout"
                className="w-full h-1/2 bg-white flex justify-center items-end absolute transition-transform duration-1000 ease-in-out top-0 pb-[2%]"
            >
                <div className="w-[15vw] h-[15vw] max-w-[180px] max-h-[180px] overflow-hidden mb-[3%]">
                    <img className="w-full h-full rounded-full" src="/src/context/image.png" alt="Logo" />
                </div>
            </div>
            <div
                id="bottom-layout"
                className="w-full h-1/2 bg-white flex justify-center items-start absolute transition-transform duration-1000 ease-in-out bottom-0 pt-[2%]"
            >
                <div className="w-2/5 h-6 bg-gray-100 rounded-xl overflow-hidden mt-[3%]">
                    <div id="loading-progress" className="w-0 h-full bg-yellow-400 transition-[width] duration-[150ms] linear"></div>
                </div>
            </div>
        </div>
    </>)
}
export default LoadingScreen