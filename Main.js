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
var poketeamIntervalId;
const pokeDex = document.getElementById("pokedex");
const pokedexImage = document.getElementById("pokedexImage");
const pokeHunt = document.getElementById("pokehunt");
const pokeTeam = document.getElementById("poketeam");
const poketeamImage = document.getElementById("poketeamImage");

initialize();

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





function goToPokemonHunting() {
    window.location.href = "/PokemonHunting/PokemonHunting.html";
}
        





