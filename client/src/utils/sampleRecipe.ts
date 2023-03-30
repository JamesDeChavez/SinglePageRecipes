const sampleRecipe = {
    title: 'Babish Chicken Parm',
    video: {
        title: 'Chicken Parmesan | Basics with Babish',
        thumbnail: 'https://i.ytimg.com/vi/ZrR0VbqNdW8/mqdefault.jpg',
        channel: 'Babish Culinary Universe',
        videoId: 'ZrR0VbqNdW8'
    },
    instructions: [
        {
            summary: {
                action: 'COOK',
                items: ['Onion']
            },
            time: '3 min.',
            description: 'Sauté 1/4 chopped onion in a sauce pan for 3 minutes or until translucent',
            ingredients: [
                { name: 'Onion', amount: '1/4 units' }
            ]
        },
        {
            summary: {
                action: 'ADD',
                items: ['Garlic']
            },
            time: '30 sec.',
            description: 'Add 2 cloves of garlic to the sauce pan and sauté for about 30 seconds',
            ingredients: [
                { name: 'Garlic', amount: '2 cloves' }
            ]
        },
        {
            summary: {
                action: 'ADD',
                items: ['Tomato Paste', 'Red Chili Flakes']
            },
            time: '1 min.',
            description: 'Add 2-3 tablespoons of tomato paste and a shake of red chili flakes to the sauce pan and sauté for about 1 minute',
            ingredients: [
                { name: 'Tomato Paste', amount: '3 tbsp.' },
                { name: 'Red Chili Flakes', amount: 'To Taste' }
            ]
        },
        {
            summary: {
                action: 'ADD',
                items: ['Crushed Whole Tomatoes']
            },
            time: '3 min.',
            description: 'Add 28 ounce can of whole crushed tomatoes to sauce pan and mix. Then reduce to medium heat and bring to a simmer',
            ingredients: [
                { name: 'Crushed Whole Tomatoes', amount: '28 oz.' }
            ]
        },
        {
            summary: {
                action: 'ADD',
                items: ['Oregano', 'Basil', 'Water']
            },
            time: '45 min.',
            description: 'Add 1 tablespoon of oregano, 2 stems of basil, and 1 cup of water to sauce pan. Simmer for about 45 minutes',
            ingredients: [
                { name: 'Oregano', amount: '1 tbsp.' },
                { name: 'Basil', amount: '2 stems' },
                { name: 'Water', amount: '1 cup' }
            ]
        },
        {
            summary: {
                action: 'PREP',
                items: ['Chicken Breast', 'Salt', 'Pepper']
            },
            time: '5 min.',
            description: 'Butterfly 4 chicken breasts and then flatten them out using a meat pounder. Then season with salt and pepper',
            ingredients: [
                { name: 'Chicken Breast', amount: '2 lbs' },
                { name: 'Salt', amount: 'To Taste' },
                { name: 'Pepper', amount: 'To taste' },
            ]
        },
        {
            summary: {
                action: 'PREP',
                items: ['Eggs, Flour, Black Pepper, Garlic Powder, Oregano, Basil, Panko Bread Crumbs, Parmesan Cheese']
            },
            time: '5 min.',
            description: 'Beat 4 eggs in one bowl. In another bowl, mix flour, black pepper, garlic powder, oregano and basil. On a baking sheet, spread out panko bread crumbs with parmesan cheese',
            ingredients: [
                { name: 'Eggs', amount: '4 units' },
                { name: 'Flour', amount: '1 cup' },
                { name: 'Black Pepper', amount: '1/2 tsp' },
                { name: 'Garlic Powder', amount: '1/2 tsp' },
                { name: 'Oregano', amount: '1/2 tsp' },
                { name: 'Basil', amount: '1/2 tsp' },
                { name: 'Panko Bread Crumbs', amount: '2 cups' },
                { name: 'Parmesan Cheese', amount: '1/4 cup' }
            ]
        },
        {
            summary: {
                action: 'BREAD',
                items: ['Chicken Breast']
            },
            time: '5 min.',
            description: 'Dip the chicken breast into the flour, then into the egg, then into the panko bread crumbs. Double coat for extra crispy chicken.',
            ingredients: [
                { name: 'Chicken Breast', amount: '2 lbs' }
            ]
        },
        {
            summary: {
                action: 'COOK',
                items: ['Chicken Breast', 'Peanut Oil']
            },
            time: '5 min.',
            description: 'Fry chicken breasts in about 4 cups of peanut oil on high heat for about 5 minutes, or until golden brown',
            ingredients: [
                { name: 'Chicken Breast', amount: '2 lbs' },
                { name: 'Peanut Oil', amount: '4 cups' }
            ]
        },
        {
            summary: {
                action: 'PREP',
                items: ['Chicken Breast', 'Basil', 'Mozzarella Cheese', 'Parmesan Cheese']
            },
            time: '2 min.',
            description: 'Place chicken breast on baking sheet and top with basil, mozzarella cheese, and parmesan cheese',
            ingredients: [
                { name: 'Chicken Breast', amount: '2 lbs.' },
                { name: 'Basil', amount: '4 stems' },
                { name: 'Mozzarella Cheese', amount: '4 oz.' },
                { name: 'Parmesan Cheese', amount: '2 oz.' },
            ]
        },
        {
            summary: {
                action: 'BROIL',
                items: ['Chicken Breast']
            },
            time: '2 min.',
            description: 'Broil chicken for a few minutes, until cheese is melted and golden brown',
            ingredients: [
                { name: 'Chicken Breast', amount: '2 lbs' }
            ]
        },
        {
            summary: {
                action: 'COOK',
                items: ['Pasta']
            },
            time: '10 min.',
            description: 'Boil pasta for about 7 minutes. When near done, add pasta to a seperate sauce pan with pasta sauce and pasta water and mix well',
            ingredients: [
                { name: 'Pasta', amount: '1 cup' }
            ]
        },
        {
            summary: {
                action: 'ADD',
                items: ['Basil', 'Parmesan Cheese', 'Butter']
            },
            time: '1 min.',
            description: 'Once pasta is done, turn off the heat and add basil, parmesan cheese and butter and then mix well',
            ingredients: [
                { name: 'Basil', amount: 'To taste' },
                { name: 'Parmesan Cheese', amount: 'To taste' },
                { name: 'Butter', amount: '2 tbsp.' }
            ]
        }
    ],
    ingredients: [
        { name: 'Onion', amount: '1/4 units' },
        { name: 'Garlic', amount: '2 cloves' },
        { name: 'Tomato Paste', amount: '3 tbsp.' },
        { name: 'Crushed Whole Tomatoes', amount: '28 oz.' },
        { name: 'Oregano', amount: '1 tbsp.' },
        { name: 'Basil', amount: '8 stems' },
        { name: 'Chicken Breast', amount: '2 lbs' },
        { name: 'Salt', amount: '1 tbsp.' },
        { name: 'Black Pepper', amount: '2 tbsp.' },
        { name: 'Eggs', amount: '4 units' },
        { name: 'Flour', amount: '1 cup' },
        { name: 'Garlic Powder', amount: '1/2 tsp' },
        { name: 'Panko Bread Crumbs', amount: '2 cups' },
        { name: 'Parmesan Cheese', amount: '1 cup' },
        { name: 'Peanut Oil', amount: '4 cups' },
        { name: 'Mozzarella Cheese', amount: '4 oz.' },
        { name: 'Pasta', amount: '1 cup' },
        { name: 'Butter', amount: '2 tbsp.' }
    ]
}
  

export default sampleRecipe