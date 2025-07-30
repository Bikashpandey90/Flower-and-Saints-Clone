import { get } from "@/config/axios.config";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogoLarge, LogoSmall } from "@/components/Logo/logo";
import { setLoggedInUser } from "@/reducer/chat-reducer";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const dispatch = useDispatch();

    // const {data,isLoading,error}=useGetLoggedInUser() as {data:any,isLoading:boolean,error:any};
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useIsMobile()

    const getLoggedInUser = async () => {
        try {
            const token = localStorage.getItem('token') || null;
            if (token) {


                const response = await get('/me', {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')
                    }
                }) as any
                setData(response.data.detail)

                dispatch(setLoggedInUser(response.data.detail))  // setting logged in user via reducer
            }

        } catch (exception) {
            console.error("Error fetching user:", exception);
        }

        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getLoggedInUser()
    }, [])

    // useEffect(()=>{
    //     //token set => user populate

    // },[])

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

    if (isLoading)
        return (
            <div id="splash-screen" className="fixed top-0 left-0 w-full h-full flex flex-col z-[9999]">
                <div
                    id="top-layout"
                    className="w-full h-1/2 bg-neutral-900 flex justify-center items-end  absolute transition-transform duration-1000 ease-in-out top-0 pb-[2%]"
                >
                    <div className="sm:w-[12vw] sm:h-[12vw] h-[16vw] w-[16vw] max-w-[300px] max-h-[300px] overflow-hidden mb-[0%] justify-center items-center">
                        {/* <img className="w-full h-full rounded-full" src="/src/context/image.png" alt="Logo" /> */}
                        {isMobile?<>
                        <LogoLarge color="white" className="p h-full w-full  justify-center items-center" />
                        </>:<>
                        <LogoSmall  className="p h-full w-full  justify-center items-center" />
                        </>}
                    </div>
                </div>
                <div
                    id="bottom-layout"
                    className="w-full h-1/2 bg-neutral-900 flex justify-center items-start absolute transition-transform duration-1000 ease-in-out bottom-0 pt-[2%]"
                >
                    <div className="w-2/5 h-3 sm:h-6 bg-neutral-700 rounded-xl overflow-hidden mt-[3%]">
                        <div id="loading-progress" className="w-0 h-full bg-white transition-[width] duration-[150ms] linear"></div>
                    </div>
                </div>
            </div>
        );


    return (<>

        <AuthContext.Provider
            value={{
                loggedInUser: data || null,
                setLoggedInUser: setData
            }}>
            {children}

        </AuthContext.Provider>
    </>)
}

