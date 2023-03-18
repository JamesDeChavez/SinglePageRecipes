import './styles.css'

const RecipeOption = () => {
    const className = 'RecipeOption'
    return (
        <div className={className}>
            <img src="https://i.ytimg.com/vi/ZrR0VbqNdW8/mqdefault.jpg" alt="youtubeThumbnail" className={`${className}_thumbnail`}/>
            <div className={`${className}_textOverlay`}>
                <p className={`${className}_text`}>Recipe: Babish Chicken Parm</p>
                <p className={`${className}_text`}>Video: Chicken Parmesan | Basics with Babish</p>
                <p className={`${className}_text`}>Channel: Babish Culinary Universe</p>
            </div>
        </div>
    )
}

export default RecipeOption