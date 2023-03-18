import React, { useState } from 'react'
import CreateRecipePage from '../../pages/CreateRecipe'
import ProfilePage from '../../pages/Profile'
import RecipeBookPage from '../../pages/RecipeBook'

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>, string]>([[], () => {}, ''])

const AuthBranch = () => {
    const RENDERS = ['RECIPE_BOOK', 'NEW_RECIPE', 'PROFILE']
    const [render, setRender] = useState(RENDERS[0])

    return (
    <AuthRenderContext.Provider value={[RENDERS, setRender, render]}>
        {{
            [RENDERS[0]]: <RecipeBookPage/>,
            [RENDERS[1]]: <CreateRecipePage/>,
            [RENDERS[2]]: <ProfilePage/>
        }[render]}
    </AuthRenderContext.Provider>
    )
}

export default AuthBranch