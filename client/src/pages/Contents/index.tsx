import ContentsSection from "../../components/ContentsSection"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import './styles.css'

const ContentsPage = () => {
    const className = 'ContentsPage'
    return (
        <div className={className}>
            <Navbar/>
            <ContentsSection/>
            <Footer/>
        </div>
    )
}

export default ContentsPage