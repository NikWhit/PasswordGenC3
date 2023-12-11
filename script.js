var generateBtn = document.querySelector("#generate");

// event listener
generateBtn.addEventListener("click", writePassword);


//Start Functions
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

//Generate
function generatePassword() {
  //Prompts
  const lengthMessage = "Please enter the desired password length from 8 to 128:";
  const upperMessage = "Would you like to use uppercase letters? Enter \"Y\" for Yes or \"N\" for No:";
  const lowerMessage = "Would you like to use lowercase letters? Enter \"Y\" for Yes or \"N\" for No:";
  const specialMessage = "Would you like to use special characters? Enter \"Y\" for Yes or \"N\" for No:";
  const numberMessage = "Would you like to use numbers? Enter \"Y\" for Yes or \"N\" for No:";
  
  var criteria = "";
  var passLength;
  var passUpper;  
  var passLower;
  var passSpecial;
  var passNumbers;
  var password = "";
  var validCriteria = false;

  do {    
    passLength = getPassLength(lengthMessage);

    passUpper = getPassCriteria(upperMessage);

    passLower = getPassCriteria(lowerMessage);

    passSpecial = getPassCriteria(specialMessage);

    passNumbers = getPassCriteria(numberMessage);

    validCriteria = validInputCriteria(passUpper, passLower, passSpecial, passNumbers);
  }
  while (validCriteria === false);

  criteria = getPasswordCritieriaString(passUpper, passLower, passSpecial, passNumbers);
  
  //Generate the password from criteria
  for(var i=0;i<passLength;i++) {
    password += criteria.charAt(Math.floor(Math.random() * criteria.length));
  }

  return password;
  
}

//Prompts for the password length
function getPassLength(promptMessage) {
  var validLength = false;
  var userLength;
  do {
    userLength = prompt(promptMessage);
    if (userLength === null) {
      throw new Error("User canceled, exiting the generator.");
    }      
    userLength = parseInt(userLength) || 0;
    validLength = validateInputNumber(userLength); 
     
  }
  while (validLength === false);
  return userLength;
}

//Prompts for the password critiera
function getPassCriteria(promptMessage) {
  var userInput = "";
  var validYesNo = false;
  do {
    userInput = prompt(promptMessage);
    if (userInput === null) {
      throw new Error("User canceled, exiting the generator.");
    }  
    userInput = userInput.toLowerCase();
    validYesNo = validInputYesNo(userInput);    
  }
  while (validYesNo === false);
  return userInput;
}

//Generates the password criteria and returns a string
function getPasswordCritieriaString(passUpper, passLower, passSpecial, passNumbers) {
    //Password Critiera Constants
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChar = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\";

    var criteria = "";

    if(passUpper === "y" || passUpper === "yes") {
      criteria += upperCase;
    }  
    if (passLower === "y" || passLower === "yes") {
      criteria += lowerCase;
    }  
    if (passSpecial === "y" || passSpecial === "yes") {
      criteria += specialChar;
    }  
    if (passNumbers === "y" || passNumbers === "yes") {
      criteria += numbers;
    } 

    return criteria;
}

//Validate the user input to ensure that only numbers within the allowed values are passed are passed.
function validateInputNumber(passLength) {
  const alertText = "You must enter a valid number between 8 and 128.  Please try again";
  if (passLength < 8 || passLength > 128) {
    alert (alertText);
    return false;
  } else {
    return true;
  }  
}

//Validate the user input to ensure a proper Yes or No response. 
function validInputYesNo(response) {
  const alertText = "Please enter either \"Y\" for Yes or \"N\" for No";
  if (response === "y" || response === "n" || response ==="yes" || response === "no") {
    return true;
  } else {
    alert(alertText);
    return false;
  }
}

//Validate that one of the criteria was entered with a "Y"
function validInputCriteria(passUpper, passLower, passSpecial, passNumbers) {
  var valid = false;
  
  if(passUpper === "y" || passUpper === "yes") {
    valid = true;
  } else if (passLower === "y" || passLower === "yes") {
    valid = true;
  } else if (passSpecial === "y" || passSpecial === "yes") {
    valid = true;
  } else if (passNumbers === "y" || passNumbers === "yes") {
    valid = true;
  } else {
    alert("You must select at least one critiera.  Please try again.");
    valid = false;
  }
  
  return valid;
}
