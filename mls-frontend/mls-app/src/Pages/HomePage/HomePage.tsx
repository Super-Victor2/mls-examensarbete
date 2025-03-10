import HomeTop from "../../Components/HomeComps/HomeTopContent/HomeTop"
import HomeInfo from "../../Components/HomeComps/HomeInfoContent/HomeInfo"
import HomeWashing from "../../Components/HomeComps/HomeWashingContent/HomeWashing"
import HomePolishing from "../../Components/HomeComps/HomePolishingContent/HomePolishing"
import FooterComp from "../../Components/FooterComps/FooterComp"


function HomePage() {
    return (
        <>
            <HomeTop />
            <HomeInfo />
            <HomeWashing />
            <HomePolishing />
            <FooterComp />
        </>
    )
}

export default HomePage