import HomeFooter from "@/components/footer/home-footer.component";
import HomeHeaderNew from "@/components/header/new-homeheader";
import { Outlet } from "react-router-dom";

const HomePageLayout = () => {
    return <>
        <HomeHeaderNew />
        <Outlet />
        <HomeFooter />
    </>;


}
export default HomePageLayout;