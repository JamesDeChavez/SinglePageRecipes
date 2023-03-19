import { useContext } from 'react'
import { CreateRecipeRenderContext } from '../../branches/CreateRecipe'
import './styles.css'

interface Props {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

const CreateRecipeVideoSection: React.FC<Props> = ({ title, setTitle }) => {
    const { videoSelected } = useContext(CreateRecipeRenderContext)

    const className = 'CreateRecipeVideoSection'
    return (
        <div className={className}>
            <div className={`${className}_titleInputContainer`}>
                <p className={`${className}_text`}>Recipe:</p>
                <input type="text" name="title" id="title" value={title} placeholder='Input Recipe Title Here' onChange={e => setTitle(e.target.value)} className={`${className}_titleInput`}/>
            </div>
            {videoSelected ?
                <iframe
                    title='recipeVideo' 
                    src={`https://www.youtube.com/embed/${videoSelected.videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                    className={`${className}_iframe`}
                />
            : <></> }
        </div>
    )
}

export default CreateRecipeVideoSection