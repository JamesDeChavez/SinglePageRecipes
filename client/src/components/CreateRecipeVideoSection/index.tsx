import gsap from 'gsap'
import { useContext, useRef, useLayoutEffect } from 'react'
import { CreateRecipeRenderContext } from '../../branches/CreateRecipe'
import './styles.css'

interface Props {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

const CreateRecipeVideoSection: React.FC<Props> = ({ title, setTitle }) => {
    const { videoSelected } = useContext(CreateRecipeRenderContext)
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_iframe`, { x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'CreateRecipeVideoSection'
    return (
        <div className={className} ref={root} >
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