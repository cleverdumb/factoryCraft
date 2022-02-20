const recipes = {
    furnace:{
        stone:7,
        wood:1
    },
    compressedWood:{
        wood:9
    },
    stoneGlass:{
        stone:1,
        glass:3
    },
    filter:{
        glass:5,
        wood:5,
        stone:5
    }
}

const furnaceRecipes = [
    {raw:'sand',result:'glass'},
    {raw:'iron',result:'ironIngot'}
]

const furnaceFuels = ['wood','compressedWood']

const rawTimes = {
    sand:100,
    iron:300
}

const fuelTimes = {
    wood:100,
    compressedWood:300
}

const filterRecipes = {
    sand:[
        {prob:100,result:'iron'}
    ]
}

const filterTimes = {
    sand:1000
}