import './styles.css'

const VideoSection = () => {
    const className = 'VideoSection'
    return (
        <div className={className}>
            <div className={`${className}_header`}>{`Recipe: Babish Chicken Parm`}</div>
            <iframe
                title='recipeVideo' 
                src="https://www.youtube.com/embed/ZrR0VbqNdW8?enablejsapi=1&version=3&playerapiid=ytplayer"
                className={`${className}_iframe`}
            />
        </div>
    )
}

export default VideoSection