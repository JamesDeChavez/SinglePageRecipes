export const determineCols = (width: number, view: string = 'DEFAULT') => {
    if (width < 850) return 1

    if (view === 'DEFAULT') return width < 1250 ? 1 : 2
    else if (view === 'HIDE') return width < 1250 ? 2 : 3
    else return 1
}
        
export const determineNumItems_Ing = (width: number, height: number, numCols: number, view: string = 'DEFAULT' ) => {
    if (view === 'DEFAULT') return width < 850
        ? Math.floor((height - (width / 1.8) - 135) / 50)
        : Math.floor((((height - 30) / 2) - 25) / 50) * numCols    
    else if (view === 'HIDE') return width < 850
        ? Math.floor((height - 135) / 50)
        : Math.floor((((height - 30) / 2) - 25) / 50) * numCols
    else return width < 850
        ? Math.floor((height - (width / 1.8) - 135) / 50)
        : Math.floor((((height - 30) / 2) - 25) / 50) * numCols

}

export const determineNumItems_Inst = (width: number, height: number, numCols: number, view: string = 'DEFAULT' ) => {
    if (view === 'DEFAULT') return width < 850
        ? Math.floor((height - (width / 1.8) - 135) / 60)
        : Math.floor((((height - 30) / 2) - 25) / 60) * numCols
    else if (view === 'HIDE') return width < 850
        ? Math.floor((height - 135) / 60)
        : Math.floor((((height - 30) / 2) - 25) / 60) * numCols
    else return width < 850
        ? Math.floor((height - (width / 1.8) - 135) / 60)
        : Math.floor((((height - 30) / 2) - 25) / 60) * numCols
}