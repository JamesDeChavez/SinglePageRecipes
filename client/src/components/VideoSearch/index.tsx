import { useState, useRef, useLayoutEffect } from 'react'
import { Video } from '../../utils/interfaces'
import AuthFooter from '../AuthFooter'
import Navbar from '../Navbar'
import VideoSearchForm from '../VideoSearchForm'
import VideoSearchResult from '../VideoSearchResult'
import backgroundImage from '../../assets/background.jpg'
import gsap from 'gsap'
import './styles.css'

const VideoSearch = () => {
    const [searchResults, setSearchResults] = useState<Video[]>([])
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_main`, { x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'VideoSearch'
    return (
        <div className={className} ref={root} >
            <div className={`${className}_imageContainer`}>
                <img className={`${className}_image`} src={backgroundImage} alt="background" />
            </div>
            <Navbar/>
            <div className={`${className}_main`}>
                <VideoSearchForm setSearchResults={setSearchResults} />                
                <div className={`${className}_resultsContainer`}>
                    {searchResults.length ?
                        searchResults.map((video, i) => {
                            return <VideoSearchResult video={video} key={i} root={root} searchResults={searchResults} />
                        })                
                    : 
                        <p className={`${className}_text`}>Learn a new recipe by searching for a youtube video above</p>                    
                    }
                </div>
            </div>            
            <AuthFooter/>
        </div>
    )
}

export default VideoSearch