import { useRef, useEffect, useLayoutEffect } from 'react'
import gsap from 'gsap'
import './styles.css'

interface Props {
    ingName: string, setIngName: React.Dispatch<React.SetStateAction<string>>, 
    ingAmount: string, setIngAmount: React.Dispatch<React.SetStateAction<string>>
}

const AddItemForm: React.FC<Props> = ({ 
    ingName, setIngName, 
    ingAmount, setIngAmount 
}) => {
    
    const inputRef = useRef<HTMLInputElement | null>(null)
    const root = useRef(null)
    
    useEffect(() => {
        inputRef.current && inputRef.current.focus()
    }, [inputRef])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_nameInput`, { x: -1000 }, { duration: 0.5, x: 0 })
            gsap.fromTo(`.${className}_amountInput`, { x: -1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const handleIngNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!ingName.length) setIngName(e.target.value.toUpperCase())
        else if (ingName.charAt(ingName.length - 1) === ' ' && e.target.value.length >= ingName.length) setIngName(e.target.value.substring(0, e.target.value.length - 1).concat(e.target.value.charAt(e.target.value.length - 1).toUpperCase()))
        else setIngName(e.target.value)        
    }
    const className = 'AddItemForm'
    return (
        <form className={className} ref={root} >
            <h2 className={`${className}_header`}>Add Ingredient</h2>
            <input type="text" name='ingName' id='ingName' placeholder='Ingredient Name' value={ingName} autoComplete='off' maxLength={25} onChange={handleIngNameChange} className={`${className}_nameInput`} ref={inputRef} />
            <input type="text" name='ingAmount' id='ingAmount' placeholder='Amount' value={ingAmount} autoComplete='off' maxLength={9} onChange={e => setIngAmount(e.target.value)} className={`${className}_amountInput`} />
        </form>
    )
}

export default AddItemForm