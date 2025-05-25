import bannerSvc from "@/pages/banner/banner.service";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick";
const TypedSlider = Slider as unknown as React.ComponentType<any>;


const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
};
const BannerSlider = () => {
    const [bannerData, setBannerData] = useState<any[]>([]);

    const loadHomeBanner = async () => {
        try {
            const result = await bannerSvc.getHomeBannerList();
            setBannerData(result.data.detail || []);

        } catch (exception) {
            console.log(exception);
        }
    }
    useEffect(() => {
        loadHomeBanner();

    }, [])

    console.log(bannerData)
    return (<>
        <TypedSlider {...settings}>
            {
                bannerData && bannerData.map((banner: any, i: number) => (
                    <div className=" flex item-center justify-center" key={i}>
                        <a href={banner.link} target="_banner">
                            <img src={banner.image} alt={banner.title} />
                        </a>
                    </div>

                ))
            }


        </TypedSlider>
    </>
    )
}
export default BannerSlider