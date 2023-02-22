const RecipeFooter = () => {
    const className = 'RecipeFooter'
    return (
        <div className={className}>
            <div className={`${className}_button`}>Instructions</div>
            <div className={`${className}_button`}>Ingredients</div>
        </div>
    )
}

export default RecipeFooter