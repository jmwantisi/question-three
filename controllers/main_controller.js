import dotenv from "dotenv"
dotenv.config();


const ALPHABET = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const NUMBERS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

const CAPITALIZED_ALPHABET = ALPHABET.map(letter => letter.toUpperCase())

const ALPHA_NUMERIC_POOL = [ ...ALPHABET, ...CAPITALIZED_ALPHABET, ...NUMBERS ]

var uniqueAlphaNumericStringObject = new Set()

let store = []

const generateAlphaNumericUniqueStringObject = async (req, res, next) => {

    const stringObject = buildAlphaNumericStringObject()

    const checkExistanceOfStringObject = findAlphaNumericStringObject(stringObject)
    
    // enable alphanumeric string if already exists
    if (!checkExistanceOfStringObject == {}) return updateAlphaNumericObjectStringState(stringObject) 
    
    store.push(stringObject)

    res.format({
        'application/json': function () {
            return res.status(201).json({
                data: stringObject
            });
        },
    }) 
  
}

const updateStatus = (req, res, next) => {

    const { is_enabled } = req.body
    const id = req.params.id
    const object = {
        [id]: {
            value: id,
            enabled: is_enabled
        }
    }
    const status = updateAlphaNumericObjectStringState(object)
     res.format({
        'application/json': function () {
            return res.status(200).json({
                data: status
            });
        },
    }) 
}

const allStringObjects = (req, res, next) => {
    res.format({
        'application/json': function () {
            return res.status(200).json({
                store
            });
        },
    }) 
}

const buildAlphaNumericStringObject = () => {
    const generateString = []

    // generate a 9 character alphanumeric string
    for (let i = 0; i < 9; i++){
        const value = ALPHA_NUMERIC_POOL[Math.floor((Math.random() * ALPHA_NUMERIC_POOL.length) + 0)]
        generateString.push(value)
    }
    const key = generateString.join("")
    return {
        [key]: {
            value: key,
            enabled: 1 // set default state to enable once generated
        },
      }
}

const findAlphaNumericStringObject = (object = {}) => {
    return new Set(store).has(object) ? object : {}
}



const updateAlphaNumericObjectStringState = (params = {}) => {

    const object = findAlphaNumericStringObject(params.object)

    console.log(object)

    if (object == {}) return "Nothing to update"

    const objectKey = Object.keys(object)[0]
    new Set(store).delete(object) // remove current object
    const newObject = { // update to new state -- enable/disable
        ...object.state, 
        ...{ [objectKey]: 
            { 
                value: objectKey, 
                enabled: params.state 
            } 
        } 
    }
    store.push(newObject)
    return newObject
}


module.exports = {
	generateAlphaNumericUniqueStringObject,
    updateStatus,
    allStringObjects
}