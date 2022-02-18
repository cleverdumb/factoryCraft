console.log('tools loaded');
const createGrid = (w = 1, h = 1, el = undefined) => {
    let grid = [];
    for (let a = 0; a < h; a++) {
        grid.push([]);
        for (let b = 0; b < w; b++) {
            grid[a].push(el);
        }
    }
    return grid;
}

let grid = createGrid(3, 3, 1)
// console.log(grid);

Array.prototype.loop2d = function (cb = (el, x, y) => { }) {
    for (let a = 0; a < this.length; a++) {
        for (let b = 0; b < this[a].length; b++) {
            cb(this[a][b], b, a);
        }
    }
}

grid.loop2d((el, x, y) => {
    // console.log(`el: ${el} x: ${x} y: ${y}`)
})

let grid2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const rotateMatrixClockwise = (matrix) => {
    let mod = [];
    for (let a = 0; a < matrix.length; a++) {
        mod.push([]);
        for (let b = 0; b < matrix[a].length; b++) {
            mod[a].push(undefined);
        }
    }

    for (let a = 0; a < matrix.length; a++) {
        for (let b = 0; b < matrix[a].length; b++) {
            mod[a][b] = matrix[b][a]
        }
    }

    // console.log(mod)

    mod.forEach((x, i) => {
        mod[i] = x.reverse();
    })

    return mod;
}

// console.log(rotateMatrixClockwise(grid2,false))

const rotateMatrixAnti = (matrix)=>{
    let g = matrix;
    for (let a=0; a<3; a++) {
        g = rotateMatrixClockwise(g);
    }
    return g;
}

// console.log(rotateMatrixAnti(grid2));

const flipUpDown = (matrix)=>{
    let g = matrix;
    return g.reverse();
}

const flipLeftRight = (matrix)=>{
    let g = matrix;
    g.forEach((x,i)=>{
        g[i] = x.reverse();
    })
    return g;
}

// console.log(flipUpDown(grid2));
// console.log(flipLeftRight(grid2));

const make2dMatrix = (str)=>{
    let rows = str.split(';');
    let columns = [];
    rows.forEach(x=>{
        columns.push(x.split(':'));
    })
    return columns;
}

// console.log(make2dMatrix('1:2;3:4;5:6'))

const flatten2dMatrix = (matrix)=>{
    let arr = [];
    matrix.forEach(x=>{
        x.forEach(y=>{
            arr.push(y);
        })
    })
    return arr;
}

// console.log(flatten2dMatrix([[1,2],[3,4]]))

const maxMatrix = (matrix)=>{
    let arr = flatten2dMatrix(matrix);
    return Math.max(...arr);
}

const minMatrix = (matrix)=>{
    let arr = flatten2dMatrix(matrix);
    return Math.min(...arr);
}

// console.log(maxMatrix(grid2));
// console.log(minMatrix(grid2));

const meanMatrix = (matrix)=>{
    let arr = flatten2dMatrix(matrix);
    let sum = arr.reduce((a,b)=>a+b)
    return sum/arr.length;
}

// console.log(meanMatrix([[1,2,3],[1,2,3]]))

Array.prototype.last = function() {
    return this[this.length-1];
}
