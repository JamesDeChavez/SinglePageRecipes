import CreateRecipeBranch from '../../branches/CreateRecipe'
import './styles.css'

const CreateRecipePage = () => {
    const className = 'CreateRecipePage'
    return (
        <div className={className}>
            <CreateRecipeBranch/>
        </div>
    )
}

export default CreateRecipePage