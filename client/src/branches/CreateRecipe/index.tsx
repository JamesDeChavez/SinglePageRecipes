import React, { useState } from "react"
import CreateRecipeForm from "../../components/CreateRecipeForm"
import VideoSearch from "../../components/VideoSearch"
import { Video } from "../../utils/interfaces"

export const CreateRecipeRenderContext = React.createContext<{
    videoSelected: Video | undefined
    setVideoSelected: React.Dispatch<React.SetStateAction<Video | undefined>>
}>({
    videoSelected: undefined,
    setVideoSelected: () => {}
})

const CreateRecipeBranch = () => {
    const [videoSelected, setVideoSelected] = useState<Video | undefined>()

    return (
    <CreateRecipeRenderContext.Provider value={{ videoSelected, setVideoSelected }}>
        {videoSelected ?
            <CreateRecipeForm />
        :
            <VideoSearch/>
        }   
    </CreateRecipeRenderContext.Provider>
    )
}

export default CreateRecipeBranch