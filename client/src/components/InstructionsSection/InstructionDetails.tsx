import React from "react"

interface Props {
    setDetailsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const InstructionDetails: React.FC<Props> = ({setDetailsActive}) => {
    const action = 'PREPARE'
    const items = ['Chicken', 'Onion']
    const time = '5 min.'
    const description = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown'
    const ingredients = [
        {
            name: 'Chicken',
            amount: '2 lbs'
        },
        {
            name: 'Onion',
            amount: '1/4 units'
        },
        {
            name: 'Chicken',
            amount: '2 lbs'
        },
        {
            name: 'Onion',
            amount: '1/4 units'
        },
        {
            name: 'Onion',
            amount: '1/4 units'
        },
        {
            name: 'Oil',
            amount: '2 tbsp'
        },
        {
            name: 'Salt',
            amount: '2 tbsp'
        },
        {
            name: 'Pepper',
            amount: '2 tbsp'
        }
    ]

    const className = 'InstructionDetails'
    return (
        <div className={className}>
            <div className={`${className}_topRow`}>
                <span>{`[  ] ${action}: ${items.map(item => item).join(', ')}`}</span>
                <span>{`[  ] ${time}`}</span>
            </div>
            <div className={`${className}_descriptionContainer`}>
                <span>[  ]</span>
                <span className={`${className}_description`}>{description}</span>
            </div>
            <div className={`${className}_ingredientsContainer`}>
                <span>[  ]</span>
                <div className={`${className}_itemsContainer`}>
                    {ingredients.map(item => <span className={`${className}_item`}>{`${item.name} - ${item.amount}`}</span>)}
                </div>
            </div>
        </div>
    )
}

export default InstructionDetails