import React, { useState } from 'react'
import ContentsPage from '../../pages/Contents'
import CreateRecipePage from '../../pages/CreateRecipe'
import IngredientsPage from '../../pages/Ingredients'
import RecipeBookPage from '../../pages/RecipeBook'

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>]>([[], () => {}])

const AuthBranch = () => {
    const RENDERS = ['CONTENTS', 'NEW_RECIPE', 'RECIPE_BOOK', 'INGREDIENTS']
    const [render, setRender] = useState(RENDERS[0])

    return (
    <AuthRenderContext.Provider value={[RENDERS, setRender]}>
        {{
            [RENDERS[0]]: <ContentsPage/>,
            [RENDERS[1]]: <CreateRecipePage/>,
            [RENDERS[2]]: <RecipeBookPage/>,
            [RENDERS[3]]: <IngredientsPage/>,
        }[render]}
    </AuthRenderContext.Provider>
    )
}

export default AuthBranch