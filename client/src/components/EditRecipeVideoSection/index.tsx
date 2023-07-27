import { useRef, useLayoutEffect } from 'react'
import { Recipe } from '../../utils/interfaces'
import gsap from 'gsap'
import './styles.css'

interface Props {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    recipeSelected: Recipe | null
}

const EditRecipeVideoSection: React.FC<Props> = ({ title, setTitle, recipeSelected }) => {
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_iframe`, { x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'EditRecipeVideoSection'
    return (
        <div className={className} ref={root} >
            <div className={`${className}_titleInputContainer`}>
                <p className={`${className}_header`}>RECIPE:</p>
                <input type="text" name="title" id="title" value={title} placeholder='Input Recipe Title Here' onChange={e => setTitle(e.target.value)} className={`${className}_titleInput`}/>
            </div>
            {recipeSelected ?
                <iframe
                    title='recipeVideo' 
                    src={`https://www.youtube.com/embed/${recipeSelected.video.videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`}
                    className={`${className}_iframe`}
                />
            : <></> }
        </div>
    )
}

export default EditRecipeVideoSection