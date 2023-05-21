import { useState } from "react"
import { Ingredient, Instruction } from "../../utils/interfaces"
import EditStepForm from "../EditStepForm"
import InstructionDetails from "../InstructionDetails"
import InstructionsTable from "../InstructionsTable"
import './styles.css'
import classNames from "classnames"

interface Props {
    instructions: Instruction[],
    ingredientName?: string, setIngredientName?: React.Dispatch<React.SetStateAction<string>>,
    ingredientAmount?: string, setIngredientAmount?: React.Dispatch<React.SetStateAction<string>>,
    setAction?: React.Dispatch<React.SetStateAction<string>>,
    setItems?: React.Dispatch<React.SetStateAction<string[]>>,
    setTime?: React.Dispatch<React.SetStateAction<string>>,
    setDescription?: React.Dispatch<React.SetStateAction<string>>,
    setRecipeIngredients?: React.Dispatch<React.SetStateAction<Ingredient[]>>,
    sectionVisible: string, currentView: string
}

const InstructionsSection: React.FC<Props> = ({ instructions, setAction, setItems, setTime, setDescription, ingredientName, setIngredientName, ingredientAmount, setIngredientAmount, setRecipeIngredients, sectionVisible, currentView  }) => {
    const [detailsActive, setDetailsActive] = useState(false)
    const [editStepActive, setEditStepActive] = useState(false)
    const [selectedStep, setSelectedStep] = useState<Instruction>()

    const className = 'InstructionsSection'
    return (
        <div className={classNames(
            className,
            {[`${className}_hidden`]: sectionVisible !== 'INSTRUCTIONS'}
        )} >            
            {!detailsActive ?
                <InstructionsTable setDetailsActive={setDetailsActive} setSelectedStep={setSelectedStep} instructions={instructions} currentView={currentView} />
            : selectedStep && !editStepActive ?
                <InstructionDetails setDetailsActive={setDetailsActive} selectedStep={selectedStep} instructions={instructions} setEditStepActive={setEditStepActive} />
            : selectedStep &&
                <EditStepForm 
                    action={selectedStep.summary.action} setAction={setAction!}
                    items={selectedStep.summary.items} setItems={setItems!}
                    time={selectedStep.time} setTime={setTime!}
                    description={selectedStep.description} setDescription={setDescription!}
                    ingredientName={ingredientName!} setIngredientName={setIngredientName!}
                    ingredientAmount={ingredientAmount!} setIngredientAmount={setIngredientAmount!}
                    recipeIngredients={selectedStep.ingredients} setRecipeIngredients={setRecipeIngredients!}
                />
            }
        </div>
    )
}

export default InstructionsSection