import { useContext } from "react"
import { CreateRecipeRenderContext } from "../../branches/CreateRecipe"
import { Video } from "../../utils/interfaces"
import './styles.css'

interface Props {
    video: Video
}

const VideoSearchResult: React.FC<Props> = ({ video }) => {
    const { setVideoSelected } = useContext(CreateRecipeRenderContext)

    const handleVideoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setVideoSelected(video)
    }

    const className = 'VideoSearchResult'
    return (
        <div className={className} onClick={handleVideoClick} >
            <img src={video.thumbnail} alt="youtubeThumbnail" className={`${className}_thumbnail`}/>
            <div className={`${className}_textOverlay`}>
                <p className={`${className}_text`}>{`Video: ${video.title}`}</p>
                <p className={`${className}_text`}>{`Channel: ${video.channel}`}</p>
            </div>
        </div>
    )
}

export default VideoSearchResult