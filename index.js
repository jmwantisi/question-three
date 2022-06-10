

const ALPHABET = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const NUMBERS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

const CAPITALIZED_ALPHABET = ALPHABET.map(letter => letter.toUpperCase())

const ALPHA_NUMERIC_POOL = [ ...ALPHABET, ...CAPITALIZED_ALPHABET, ...NUMBERS ]

const uniqueAlphaNumericStringObject = new Set()

const generateAlphaNumericUniqueStringObject = () => {

    const stringObject = buildAlphaNumericStringObject()

    const checkExistanceOfStringObject = findAlphaNumericStringObject(stringObject)
    
    // enable alphanumeric string if already exists
    if (!checkExistanceOfStringObject == {}) return updateAlphaNumericObjectStringState(stringObject) 
      
    uniqueAlphaNumericStringObject.add(stringObject)
    return stringObject
  
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
    return uniqueAlphaNumericStringObject.has(object) ? object : {}
}

const updateAlphaNumericObjectStringState = (params = {}) => {

    const object = findAlphaNumericStringObject(params.object)

    if (object == {}) return // add throw here

    const objectKey = Object.keys(object)[0]
    uniqueAlphaNumericStringObject.delete(object) // remove current object
    const newObject = { // update to new state -- enable/disable
        ...object.state, 
        ...{ [objectKey]: 
            { 
                value: objectKey, 
                enabled: params.state 
            } 
        } 
    }
    uniqueAlphaNumericStringObject.add(newObject)
    return newObject
}

const value = generateAlphaNumericUniqueStringObject()

console.log(findAlphaNumericStringObject(value))

const state = {
    object: value,
    state: 0

}
console.log(updateAlphaNumericObjectStringState(state))
console.log(uniqueAlphaNumericStringObject)

// Add tests