const pokedexImagePaths = [
    "/images/main-menu/pokedex/Pokemon-Pokedex1.png",
    "/images/main-menu/pokedex/Pokemon-Pokedex2.png"
];
const poketeamImagePaths = [
    "/images/main-menu/pokemon-team/8719.png",
    "/images/main-menu/pokemon-team/team.gif",
    
];
const messageList = [
    "Select your starting location first."
]
let poketeamIntervalId;
const pokeDex = document.getElementById("pokedex");
const pokedexImage = document.getElementById("pokedexImage");
const pokeHunt = document.getElementById("pokehunt");
const pokeTeam = document.getElementById("poketeam");
const poketeamImage = document.getElementById("poketeamImage");
const user = {}
user.accountInfo = {}
user.accountForm = {}
user.accountForm.signIn = {}
user.accountForm.signUp = {}
user.accountInfo.container = document.getElementById("accountInfo")
user.accountInfo.username = ""
user.accountInfo.usernameField = document.getElementById("username")
user.accountInfo.settings = document.getElementById("accSettings")
user.accountInfo.logOut = document.getElementById("logOut")
user.signInButton = document.getElementById("signInButton")
user.signUpButton = document.getElementById("signUpButton")
user.accountForm.container = document.getElementById("accountFormContainer")
user.accountForm.backdrop = document.getElementById("backdrop")
user.accountForm.signIn.form = document.getElementById("signInForm")
user.accountForm.signIn.fields = {
    username : "",
    password : "",
    usernameField : document.getElementById("loginUsername"),
    passwordField : document.getElementById("loginPassword")
}
user.accountForm.signIn.loginButton = document.getElementById("loginButton")
user.accountForm.signUp.form = document.getElementById("signUpForm")
user.accountForm.signUp.fields = {
    username : "",
    password : "",
    email : "",
    usernameField : document.getElementById("signupUsername"),
    passwordField : document.getElementById("signupPassword"),
    emailField : document.getElementById("signupEmail")
}
user.accountForm.signUp.signupButton = document.getElementById("signupButton")
user.accountForm.formsVisibility = (form, value) => {
    const signInForm = user.accountForm.signIn.form
    const signUpForm = user.accountForm.signUp.form
    const container = user.accountForm.container
    const backdrop = user.accountForm.backdrop
    switch(form){
        case 0: //sign in form
            if(value) {
                signInForm.classList.remove("hidden")
                container.classList.remove("hidden")
                backdrop.classList.remove("hidden")
                container.classList.add("drop")
                backdrop.classList.add("fadeIn")
                signUpForm.classList.add("hidden")
            } else {
                signInForm.classList.add("hidden")
            }
            break
        case 1: //sign up form
            if(value) {
                signUpForm.classList.remove("hidden")
                container.classList.remove("hidden")
                backdrop.classList.remove("hidden")
                container.classList.add("drop")
                backdrop.classList.add("fadeIn")
                signInForm.classList.add("hidden")
            } else {
                signUpForm.classList.add("hidden")
            }
            break
        default:
            signInForm.classList.add("hidden")
            container.classList.add("hidden")
            signUpForm.classList.add("hidden")
            container.classList.remove("drop")
            container.classList.remove("rise")

    }
}
user.accountForm.signIn.rememberUserCheckbox = document.getElementById("rememberMe")
user.accountForm.signIn.rememberUser = user.accountForm.signIn.rememberUserCheckbox.checked
user.accountForm.signIn.rememberUserLabel = document.getElementById("RML")


user.loggedInCheck = () => {
    fetch('/api/check-login-status', {
        method: 'GET',
        credentials: 'include'
      })
    .then(response => {
        if (response.ok) {
        // User is logged in
        return response.json();
        } else {
        // User is not logged in
        throw new Error('Not logged in');
        }
    })
    .then(data => {
        // Handle the response data if needed
        console.log('Logged in user:', data.username);
        user.showAccountInfo(data)
    })
    .catch(error => {
        // Handle errors or redirect to login page
        console.error('Login check failed:', error.message);
        // Redirect to login page or show login form
        // Example: window.location.href = '/login';
    });
}

user.showAccountInfo = (data) => {
    user.signInButton.classList.add("hidden")
    user.signUpButton.classList.add("hidden")
    user.accountInfo.container.classList.remove("hidden")
    user.accountInfo.username = user.accountInfo.usernameField.textContent = data.username;
}

user.hideAccountInfo = () => {
    user.signInButton.classList.remove("hidden")
    user.signUpButton.classList.remove("hidden")
    user.accountInfo.container.classList.add("hidden")
    user.accountInfo.username = user.accountInfo.usernameField.textContent = "";
}

user.testLogInCheck = (test = true) => {
    // Simulate a mock server response
    let mockResponse
    if(test) {
        mockResponse = {
            username: "Vaki",
            loggedIn: true
        };
    } else {
        mockResponse = {
            username: "Vaki",
            loggedIn: false
        };
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockResponse);
            reject()
        }, 1000); // Simulate a delay of 1 second (adjust as needed)
    })
    .then(data => {
    // Handle the response data if needed
        // if(data.loggedIn) {
        //     user.showAccountInfo(data)
        //     console.log('Logged in user:', data.username);
        // } else {
        //     user.hideAccountInfo()
        //     console.log('User logged out:', data.username);
        // }
    })
    .catch(error => {
        // Handle errors or redirect to login page
        console.error('Login check failed:', error.message);
        // Redirect to login page or show login form
        // Example: window.location.href = '/login';
    });
      
}

user.signIn = function(value = true) {
    
}
user.signUp = function(value = true) {
    
}

user.init = function() {
    const container = user.accountForm.container
    const backdrop = user.accountForm.backdrop
    const checkbox = user.accountForm.signIn.rememberUserCheckbox
    const checkLabel = user.accountForm.signIn.rememberUserLabel
    this.signInButton.addEventListener("click", () => {
        user.accountForm.formsVisibility(0, true)
    })
    this.signUpButton.addEventListener("click", () => {
        user.accountForm.formsVisibility(1, true)
    })
    this.accountInfo.logOut.addEventListener("click", () => {
        this.testLogInCheck(false)
    })
    backdrop.addEventListener("animationend", function(animation) {
        if(animation.animationName === "fadeOut") {
            backdrop.classList.remove("fadeOut")
            backdrop.classList.remove("fadeIn")
            backdrop.classList.add("hidden")
        }
    })
    container.addEventListener("animationend", function(animation) {
        if(animation.animationName === "rise") {
            user.accountForm.formsVisibility()
        } else if(animation.animationName === "drop") {
            container.classList.remove("drop")
        }
    })
    container.addEventListener("mousedown", (event) => {
        if(event.target === event.currentTarget) {
            container.classList.remove("drop")
            container.classList.add("rise")
            backdrop.classList.remove("fadeIn")
            backdrop.classList.add("fadeOut")
        }
    })
    checkbox.addEventListener("change", function(event) {
        if(event.target.checked) {
            checkLabel.classList.add("RML-active")
        } else {
            checkLabel.classList.remove("RML-active")
        }
    })
}



function initialize() {
    //click events
    pokeDex.addEventListener("click", ()=> {
      window.location.href = "/Pokedex/pokedex.html"  
    })
    pokeTeam.addEventListener("click", ()=> {
      window.location.href = "/PokemonTeam/pokemon-team.html"  
    })
    pokeHunt.addEventListener("click", ()=> {
      window.location.href = "/PokemonHunting/pokemon-hunting.html"  
    })
    user.init()

    //image swapping hover effects
    pokeDex.addEventListener("mouseover", ()=> {
        pokedexImage.src = pokedexImagePaths[1]
    })
    pokeDex.addEventListener("mouseout", ()=> {
        pokedexImage.src = pokedexImagePaths[0]
    })
    pokeTeam.addEventListener("mouseover", ()=> {
        poketeamImage.src = poketeamImagePaths[1]
    })
    pokeTeam.addEventListener("mouseout", ()=> {
        poketeamImage.src = poketeamImagePaths[0]
    })
    
}

initialize();


//testing area




//



function goToPokemonHunting() {
    window.location.href = "/PokemonHunting/PokemonHunting.html";
}
        





