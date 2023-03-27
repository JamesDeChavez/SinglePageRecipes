import React, { useRef, useLayoutEffect, useContext } from "react"
import { Ingredient, Instruction } from "../../utils/interfaces"
import { ReactComponent as StickNoteSVG } from '../../assets/note-sticky-regular.svg'
import { ReactComponent as ClockSVG } from '../../assets/clock-regular.svg'
import { ReactComponent as FileLinesSVG } from '../../assets/file-lines-regular.svg'
import { ReactComponent as CarrotSVG } from '../../assets/carrot-solid.svg'
import gsap from "gsap"
import './styles.css'
import { CreateRecipeFormContext } from "../CreateRecipeForm"

interface Props {
    instructions: Instruction[], setInstructions?: React.Dispatch<React.SetStateAction<Instruction[]>>,
    selectedStep: Instruction | undefined, setEditStepActive?: React.Dispatch<React.SetStateAction<boolean>>,
    setAction?: React.Dispatch<React.SetStateAction<string>>,
    setItems?: React.Dispatch<React.SetStateAction<string[]>>,
    setTime?: React.Dispatch<React.SetStateAction<string>>,
    setDescription?: React.Dispatch<React.SetStateAction<string>>,
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>,
    setRecipeIngredients?: React.Dispatch<React.SetStateAction<Ingredient[]>>
}

const InstructionDetails: React.FC<Props> = ({ 
    instructions, setInstructions, 
    selectedStep, setEditStepActive,
    setAction, setItems, 
    setTime, setDescription,
    setRecipeIngredients, setDetailsActive 
}) => {

    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_topRow`,{ x: 1000 }, { duration: 0.5, x: 0 })
            gsap.fromTo(`.${className}_descriptionContainer`,{x: 1000 }, { duration: 0.5, x: 0 })
            gsap.fromTo(`.${className}_ingredientsContainer`,{x: 1000 }, { duration: 0.5, x: 0 })
            return () => gsapContext.revert()
        }, root)
    }, [])
    
    const handleReturnToTableClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setDetailsActive(false)
    }

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!setInstructions || !selectedStep || !setEditStepActive || !setAction || !setItems || !setDescription || !setTime || !setRecipeIngredients) return
        setAction(selectedStep.summary.action)
        setItems(selectedStep.summary.items)
        setDescription(selectedStep.description)
        setTime(selectedStep.time)
        setRecipeIngredients(selectedStep.ingredients)
        setEditStepActive(true)
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!setInstructions) return
        const index = instructions.findIndex(step => step.description === selectedStep?.description)
        const newInstructions = [...instructions.slice(0, index), ...instructions.slice(index + 1)]
        setInstructions(newInstructions)
        setDetailsActive(false)
    }

    const className = 'InstructionDetails'
    return (
        <div className={className} ref={root}>
            <h2 className={`${className}_header`}>{`Step ${instructions.findIndex(step => step.description === selectedStep?.description) + 1} Details`}</h2>
            {selectedStep ?
            <>
                <div className={`${className}_topRow`}>
                    
                    <div className={`${className}_summaryContainer`}>
                        <StickNoteSVG className={`${className}_svgIcon`} />
                        <p className={`${className}_summary`}>
                            {`${selectedStep.summary.action}: ${selectedStep.summary.items.map(item => item).join(', ')}`}
                        </p>
                    </div>
                    <div className={`${className}_timeContainer`}>
                        <ClockSVG className={`${className}_svgIcon`} />
                        <p className={`${className}_time`}>{`${selectedStep.time}`}</p>
                    </div>
                </div>
                <div className={`${className}_descriptionContainer`}>
                    <FileLinesSVG className={`${className}_svgIcon`} />
                    <p className={`${className}_description`}>{selectedStep.description}</p>
                </div>
                <div className={`${className}_ingredientsContainer`}>
                    <CarrotSVG className={`${className}_svgIcon`} />
                    <div className={`${className}_itemsContainer`}>
                        {selectedStep.ingredients.map((item, i) => 
                            <p className={`${className}_item`} key={i} >
                                {`${item.name} - ${item.amount}`}
                            </p>
                        )}
                    </div>
                </div>
            </>
            :
                <></>
            }
            <div className={`${className}_pageButtonsContainer`}>
                <button className={`${className}_pageButton`} onClick={handleReturnToTableClick}>
                    {`< `}<span style={{textDecoration: 'underline'}}>Return to table</span>
                </button>
                <div className={`${className}_editDeleteContainer`} style={{ display: setInstructions ? 'flex' : 'none'}}>
                    <button className={`${className}_editButton`} onClick={handleEditClick} >Edit Step</button>
                    <button className={`${className}_deleteButton`} onClick={handleDeleteClick} >Delete Step</button>
                </div>
            </div>
        </div>
    )
}

export default InstructionDetails