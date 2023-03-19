import { useState } from 'react'
import { Video } from '../../utils/interfaces'
import AuthFooter from '../AuthFooter'
import Navbar from '../Navbar'
import VideoSearchForm from '../VideoSearchForm'
import VideoSearchResult from '../VideoSearchResult'
import './styles.css'

const VideoSearch = () => {
    const [searchResults, setSearchResults] = useState<Video[]>([])

    const className = 'VideoSearch'
    return (
        <div className={className}>
            <Navbar/>

            <div className={`${className}_main`}>

                <VideoSearchForm setSearchResults={setSearchResults} />
                
                <div className={`${className}_resultsContainer`}>
                    {searchResults.length ?
                        searchResults.map((video, i) => {
                            return <VideoSearchResult video={video} key={i} />
                        })                
                    :
                        <></>
                    }
                </div>

            </div>
            
            <AuthFooter/>
        </div>
    )
}

export default VideoSearch