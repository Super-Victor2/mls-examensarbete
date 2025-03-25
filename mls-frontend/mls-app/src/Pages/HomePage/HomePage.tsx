import HomeTop from "../../Components/HomeComps/HomeTopContent/HomeTop"
import HomeInfo from "../../Components/HomeComps/HomeInfoContent/HomeInfo"
import HomeCards from "../../Components/HomeComps/HomeCards/HomeCards"
import FooterComp from "../../Components/FooterComps/FooterComp"


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