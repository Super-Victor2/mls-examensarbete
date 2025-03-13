import HomeTop from "../../Components/HomeComps/HomeTopContent/HomeTop"
// import HomeInfo from "../../Components/HomeComps/HomeInfoContent/HomeInfo"
// import HomeWashing from "../../Components/HomeComps/HomeWashingContent/HomeWashing"
// import HomePolishing from "../../Components/HomeComps/HomePolishingContent/HomePolishing"
import FooterComp from "../../Components/FooterComps/FooterComp"
import HomeCards from "../../Components/HomeComps/HomeCards/HomeCards"


function HomePage() {
    return (
        <>
            <HomeTop />
            {/* <HomeInfo /> */}
            <HomeCards />
            {/* <HomeWashing />
            <HomePolishing /> */}
            <FooterComp />
        </>
    )
}

export default HomePage