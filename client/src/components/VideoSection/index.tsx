import './styles.css'

interface Props {
    title: string,
    videoId: string
}

const VideoSection: React.FC<Props> = ({ title, videoId }) => {

    const className = 'VideoSection'
    return (
        <div className={className}>
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