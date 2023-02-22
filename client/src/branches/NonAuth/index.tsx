import React, { useState } from "react"
import LandingPage from "../../pages/Landing"
import LoginPage from "../../pages/Login"
import RegisterPage from "../../pages/Register"
import Sample from "../../pages/Sample"

export const NonAuthRenderContext = React.createContext<[string[],React.Dispatch<React.SetStateAction<string>>]>([[], () => {}])

const NonAuthBranch = () => {
    const RENDERS = ['LANDING', 'LOGIN', 'REGISTER', 'SAMPLE']
    const [render, setRender] = useState(RENDERS[0])

    return (
    <NonAuthRenderContext.Provider value={[RENDERS, setRender]}>
        {{
            [RENDERS[0]]: <LandingPage/>,
            [RENDERS[1]]: <LoginPage/>,
            [RENDERS[2]]: <RegisterPage/>,
            [RENDERS[3]]: <Sample/>
        }[render]}
    </NonAuthRenderContext.Provider>
    )
}

export default NonAuthBranch