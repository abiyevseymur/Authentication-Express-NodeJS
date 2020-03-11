// normalization
//consistency
let author = {
    name:'Mosh'
}

let course ={
    author:'id',
    
}

// denormalization
let course ={
    author:{
        name:'Mosh'
    }
}


//hybrid
let author = {
    name:'Mosh'
}

let course = {
    author:{
        id:'ref',
        name:'Mosh'
    }
}