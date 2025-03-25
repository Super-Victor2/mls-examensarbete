import HomeTop from "../../Components/HomeComps/HomeTopContent/HomeTop"
import HomeInfo from "../../Components/HomeComps/HomeInfoContent/HomeInfo"
import FooterComp from "../../Components/FooterComps/FooterComp"
import HomeCards from "../../Components/HomeComps/HomeCards/HomeCards"


function HomePage() {
    return (
        <>
            <HomeTop />
            <HomeInfo />
            <HomeCards />
            <FooterComp />
        </>
    )
}

export default HomePage