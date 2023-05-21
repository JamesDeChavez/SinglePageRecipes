export const determineCols = (width: number) => {
    return width < 1250 ? 1 : 2
}
        
export const determineNumItems_Ing = (width: number, height: number, numCols: number) => {
    return width < 850
    ? Math.floor((height - (width / 1.8) - 135) / 50)
    : Math.floor((((height - 30) / 2) - 25) / 50) * numCols
}

export const determineNumItems_Inst = (width: number, height: number, numCols: number) => {
    return width < 850
    ? Math.floor((height - (width / 1.8) - 135) / 60)
    : Math.floor((((height - 30) / 2) - 25) / 60) * numCols
}