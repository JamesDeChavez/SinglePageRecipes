import React, { Suspense, lazy, useState } from 'react'
import SuspenseLoad from '../../components/SuspenseLoad'

const ProfilePage = lazy(() => import('../../pages/Profile'))
const RecipeBookPage = lazy(() => import('../../pages/RecipeBook'))
const CreateRecipePage = lazy(() => import('../../pages/CreateRecipe'))

export const AuthRenderContext = React.createContext<[string[], React.Dispatch<React.SetStateAction<string>>, string]>([[], () => {}, ''])

const AuthBranch = () => {
    const RENDERS = ['RECIPE_BOOK', 'NEW_RECIPE', 'PROFILE']
    const [render, setRender] = useState(RENDERS[0])

    return (
    <AuthRenderContext.Provider value={[RENDERS, setRender, render]}>
        <Suspense fallback={<SuspenseLoad/>} >
            {{
                [RENDERS[0]]: <RecipeBookPage/>,
                [RENDERS[1]]: <CreateRecipePage/>,
                [RENDERS[2]]: <ProfilePage/>
            }[render]}
        </Suspense>
    </AuthRenderContext.Provider>
    )
}

export default AuthBranch