const VideoSearchBar = () => {
    const className = 'VideoSearchBar'
    return (
        <div className={className}>
            <form className={`${className}_form`}>
                <label htmlFor="search">Video Search:</label>
                <input type="text" name="search" id="search" />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}

export default VideoSearchBar