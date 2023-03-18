import { useContext } from "react"
import { CreateRecipeRenderContext } from "../../branches/CreateRecipe"
import './styles.css'

const VideoSearchResult = () => {
    const [RENDERS, setRender] = useContext(CreateRecipeRenderContext)

    const selectVideo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRender(RENDERS[1])
    }

    const className = 'VideoSearchResult'
    return (
        <div className={className}>
            <iframe
                title='recipeVideo' 
                src="https://www.youtube.com/embed/ZrR0VbqNdW8?enablejsapi=1&version=3&playerapiid=ytplayer"
                className={`${className}_iframe`}
            />
            <div className={`${className}_titleContainer`}>
                <div className={`${className}_textContainer`}>
                    <h2 className={`${className}_title`}>{`Babish Chicken Parm Recipe Video Title Name`}</h2>
                    <p className={`${className}_channel`}>Babish Channel Name</p>
                </div>
                <button className={`${className}_button`} onClick={selectVideo}>Select</button>
            </div>
        </div>
    )
}

export default VideoSearchResult