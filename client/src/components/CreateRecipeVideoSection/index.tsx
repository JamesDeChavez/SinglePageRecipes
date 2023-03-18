import './styles.css'

const CreateRecipeVideoSection = () => {
    const className = 'CreateRecipeVideoSection'
    return (
        <div className={className}>
            <div className={`${className}_titleInputContainer`}>
                <p className={`${className}_text`}>Recipe:</p>
                <input type="text" name="title" id="title" placeholder='Input Recipe Title Here' className={`${className}_titleInput`}/>
            </div>
            <iframe
                title='recipeVideo' 
                src="https://www.youtube.com/embed/ZrR0VbqNdW8?enablejsapi=1&version=3&playerapiid=ytplayer"
                className={`${className}_iframe`}
            />
        </div>
    )
}

export default CreateRecipeVideoSection