import React, { useState } from "react"
import CreateRecipeForm from "../../components/CreateRecipeForm"
import VideoSearch from "../../components/VideoSearch"

export const CreateRecipeRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>]>([[], () => {}])

const CreateRecipeBranch = () => {
    const RENDERS = ['VideoSearch', 'CreateRecipeForm']
    const [render, setRender] = useState(RENDERS[0])

    return (
    <CreateRecipeRenderContext.Provider value={[RENDERS, setRender]}>
        {{
            [RENDERS[0]]: <VideoSearch/>,
            [RENDERS[1]]: <CreateRecipeForm/>
        }[render]}   
    </CreateRecipeRenderContext.Provider>
    )
}

export default CreateRecipeBranch