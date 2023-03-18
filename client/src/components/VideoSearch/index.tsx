import AuthFooter from '../AuthFooter'
import Navbar from '../Navbar'
import VideoSearchBar from '../VideoSearchBar'
import VideoSearchResult from '../VideoSearchResult'
import './styles.css'

const VideoSearch = () => {
    const className = 'VideoSearch'
    return (
        <div className={className}>
            <Navbar/>
            <VideoSearchBar/>
            <VideoSearchResult/>
            <VideoSearchResult/>
            <VideoSearchResult/>
            <AuthFooter/>
        </div>
    )
}

export default VideoSearch