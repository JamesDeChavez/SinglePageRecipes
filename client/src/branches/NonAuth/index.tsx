import React, { Suspense, lazy, useState } from "react"
import LandingPage from "../../pages/Landing"
import Loading from "../../components/Loading"
import SuspenseLoad from "../../components/SuspenseLoad"

const Sample = lazy(() => import('../../pages/Sample'))

export const NonAuthRenderContext = React.createContext<{
    RENDERS: string[],
    render: string,
    setRender: React.Dispatch<React.SetStateAction<string>>
}>({
    RENDERS: [],
    render: '',
    setRender: () => {}
})

const NonAuthBranch = () => {
    const RENDERS = ['LANDING', 'LOGIN', 'REGISTER', 'SAMPLE']
    const [render, setRender] = useState(RENDERS[0])

    return (
    <NonAuthRenderContext.Provider value={{RENDERS, render, setRender}}>
        {render === RENDERS[3] ?
            <Suspense fallback={<SuspenseLoad/>} >
                <Sample/>
            </Suspense>        
        :
            <LandingPage/>
        }
    </NonAuthRenderContext.Provider>
    )
}

export default NonAuthBranch