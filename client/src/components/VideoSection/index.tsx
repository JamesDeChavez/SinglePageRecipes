import { useState, useEffect } from 'react'
import cache from '../../utils/cache'
import './styles.css'

const VideoSection = () => {
    const [title, setTitle] = useState('')
    const [videoId, setVideoId] = useState('')

    useEffect(() => {
        if (cache) {
            setTitle(cache.User.recipes[0].title)
            setVideoId(cache.User.recipes[0].video.videoId)
        }
    }, [cache])

    const className = 'VideoSection'
    return (
        <div className={className}>
            <div className={`${className}_header`}>{`Recipe: ${title}`}</div>
            <iframe
                title='recipeVideo' 
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                className={`${className}_iframe`}
            />
        </div>
    )
}

export default VideoSection