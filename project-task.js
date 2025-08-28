const readlineSync = require('readline-sync');

let animals = [];
let fees = [];

function addAnimal(name, fee) {
    if (!name || name.trim() === "") {
        throw new Error("Invalid animal name");
    }
    if (fee < 0 || isNaN(fee)) {
        throw new Error("Invalid fee.");
    }
    animals.push(name);
    fees.push(fee);
}

function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName.trim());
    if (index === -1) {   //negative 1 means value not found due to 0 indexing
        throw new Error(`${animalName} not found in records!`);
    }
    return fees[index];
}

// Main program
console.log("Welcome to the Pet Shelter System");

while (true) {
    try {
        let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();
        if (action === "exit") {
            console.log("Goodbye!");
            break;
        }
        if (action === "add") {
            try {
                let animal = readlineSync.question("Enter the animal's name: ");
                let fee = Number(readlineSync.question("Enter the adoption fee: "));
                addAnimal(animal, fee);
                console.log(`${animal} added with a fee of $${fee}.`);
            } catch (error) { // only catches errors in the if block
                console.log(`invalid, ${error.message}`);
            }
        } else if (action === "fee") {
            try {
                let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
                console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
            } catch (error) { // do not forget to include the (error) or it will be undefined.
                console.log(`invalid input, ${error.message}`);
            }
        } else {
            console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
        }
    } catch (error) {  // DO NOT forget to include the (error) or it will be undefined!
        console.log(`Error. ${error.message}`);
    }
}

/* Notes:
    I did not see a way to account for non alphabetic characters to get pulled as an error
    while also allowing names with spaces or hyphens to go through. 

    Correction, I did but it requires the use of a for loop and that seems needlessly verbose.

    The solution I did find was using regex, but I didn't include it because it seems unfair to add the solution to an assignment
    that is supposed to measure my understanding of the material. 
    
    if (!/^[A-Za-z]+([ -][A-Za-z]+)*$/.test(name)) {
    throw new Error("Animal name must contain only letters, spaces, or hyphens.");
    }

    Admittedly, I understand why this works but I definitely didn't think of it.
    I did however learn that using the .test method checks if a string matches a regular expression.
    I will have to study up on my use of regex so that I can feel confident about its implementation. 

    Good assignment overall and I feel much more confident about using try and catch.
*/
