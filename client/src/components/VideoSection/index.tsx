import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import './styles.css'

interface Props {
    title: string,
    videoId: string
}

const VideoSection: React.FC<Props> = ({ title, videoId }) => {
    const root = useRef(null)


    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_iframe`,{x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'VideoSection'
    return (
        <div className={className} ref={root} >
            <p className={`${className}_header`}>{`Recipe: ${title}`}</p>
            <iframe
                title='recipeVideo' 
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                className={`${className}_iframe`}
            />
        </div>
    )
}

export default VideoSection