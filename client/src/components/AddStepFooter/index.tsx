import './styles.css'

const AddStepFooter = () => {
    const className = 'AddStepFooter'
    return (
        <div className={className}>
            <button className={`${className}_button`} onClick={() => {}}>Add Step</button>
            <button className={`${className}_button`} onClick={() => {}}>Cancel</button>
        </div>
    )
}

export default AddStepFooter