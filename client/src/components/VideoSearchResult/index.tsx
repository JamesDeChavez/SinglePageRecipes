import gsap from "gsap"
import { useContext, useLayoutEffect } from "react"
import { CreateRecipeRenderContext } from "../../branches/CreateRecipe"
import { Video } from "../../utils/interfaces"
import './styles.css'

interface Props {
    video: Video,
    root: React.MutableRefObject<null>,
    searchResults: Video[]
}

const VideoSearchResult: React.FC<Props> = ({ video, root, searchResults }) => {
    const { setVideoSelected } = useContext(CreateRecipeRenderContext)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}`, { x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [searchResults, root])

    const handleVideoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setVideoSelected(video)
    }

    const className = 'VideoSearchResult'
    return (
        <div className={className} onClick={handleVideoClick} >
            <img src={video.thumbnail} alt="youtubeThumbnail" className={`${className}_thumbnail`}/>
            <div className={`${className}_textOverlay`}>
                <p className={`${className}_title`}>{video.title}</p>
                <p className={`${className}_channel`}>{`Channel: ${video.channel}`}</p>
            </div>
        </div>
    )
}

export default VideoSearchResult