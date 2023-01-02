const passwordLength = document.getElementById("password-length")
const inputPassword = document.querySelector("#password")
const securityindicatorBar = document.querySelector(".bar")

const upeerCaseCheck = document.querySelector("#upeercase-check")
const numberCheck = document.querySelector("#number-check")
const symbolCheck = document.querySelector("#symbol-check")


function generationPassword(){
    let chars = "abcdefghjkmnpqrstuvwxyz"

    const upeerCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if(upeerCaseCheck.checked){
        chars += upeerCaseChars
    }

    if(numberCheck.checked){
        chars += numberChars
    }

    if(symbolCheck.checked){
        chars += symbolChars
    }

    let password = ''

    for(let i = 0; i < passwordLength.value; i++){
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    
    inputPassword.value = password

    calculateSecurity()
    calculateFontSize()
}

function calculateSecurity(){
    const securirtyBar = Math.floor((passwordLength.value / 64) * 35 + (upeerCaseCheck.checked ? 16 : 0) + (numberCheck.checked ? 19 : 0) + (symbolCheck.checked ? 30 : 0)) 
    
    securityindicatorBar.style.width = `${securirtyBar}%`

    if(securirtyBar > 65){
        securityindicatorBar.classList.add("safe")
        securityindicatorBar.classList.remove("warning")
        securityindicatorBar.classList.remove("critical")
    } else if (securirtyBar > 48){
        securityindicatorBar.classList.add("warning")
        securityindicatorBar.classList.remove("safe")
        securityindicatorBar.classList.remove("critical")
    } else {
        securityindicatorBar.classList.remove("warning")
        securityindicatorBar.classList.remove("safe")
        securityindicatorBar.classList.add("critical")
    }

    if(securirtyBar === 100){
        securityindicatorBar.classList.add("completed")
    } else {
        securityindicatorBar.classList.remove("completed")
    }
}

function calculateFontSize(){
    if(passwordLength.value > 43){
        inputPassword.classList.add("font-xxs")
        inputPassword.classList.remove("font-xs")
        inputPassword.classList.remove("font-sm")
    } else if(passwordLength.value > 32){
        inputPassword.classList.remove("font-xxs")
        inputPassword.classList.add("font-xs")
        inputPassword.classList.remove("font-sm")
    } else if(passwordLength.value > 21){
        inputPassword.classList.remove("font-xxs")
        inputPassword.classList.remove("font-xs")
        inputPassword.classList.add("font-sm")
    } else {
        inputPassword.classList.remove("font-xxs")
        inputPassword.classList.remove("font-xs")
        inputPassword.classList.remove("font-sm")
    }
}

function copy(){
    navigator.clipboard.writeText(inputPassword.value)
}

document.querySelector('#copyBtn').addEventListener('click', copy)
document.querySelector('#copyBtn2').addEventListener('click', copy)

generationPassword()

upeerCaseCheck.addEventListener("click", generationPassword)
numberCheck.addEventListener("click", generationPassword)
symbolCheck.addEventListener("click", generationPassword)
document.querySelector("#renew").addEventListener("click", generationPassword)

passwordLength.addEventListener("change", function(){
    document.querySelector("#password-lenght-text").innerText = passwordLength.value 
    generationPassword()
})
