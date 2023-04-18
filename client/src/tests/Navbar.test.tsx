import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { UserLoggedInContext } from '../App'
import Navbar from '../components/Navbar'



describe('Navbar', () => {
    it('should render logo img, and login/register nav buttons if logged out', () => {        
        render(
            <UserLoggedInContext.Provider value={{
                userLoggedIn: false, setUserLoggedIn: () => {},
                userId: '', setUserId: () => {},
                windowSize: []
              }} >
                <Navbar/>
            </UserLoggedInContext.Provider>
        )
        const logoElement = screen.getByRole('img')
        const loginButton = screen.getByRole('button', { name: /Log In/i })
        const registerButton = screen.getByRole('button', { name: /Register/i })

        expect(logoElement).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
        expect(registerButton).toBeInTheDocument()
    })
    it('should render logout navbutton if logged in', () => {        
        render(
            <UserLoggedInContext.Provider value={{
                userLoggedIn: true, setUserLoggedIn: () => {},
                userId: '', setUserId: () => {},
                windowSize: []
              }} >
                <Navbar/>
            </UserLoggedInContext.Provider>
        )        
        const logoutButton = screen.getByRole('button', { name: /Log Out/i })
        expect(logoutButton).toBeInTheDocument()
    })
})