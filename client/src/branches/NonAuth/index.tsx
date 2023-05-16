import React, { Suspense, lazy, useState } from "react"
import LandingPage from "../../pages/Landing"
// import SamplePage from "../../pages/Sample"
import SuspenseLoad from "../../components/SuspenseLoad"

const SamplePage = lazy(() => import("../../pages/Sample"))

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
                <SamplePage/> 
            </Suspense> 
        :
            <LandingPage/>
        }
    </NonAuthRenderContext.Provider>
    )
}

export default NonAuthBranch