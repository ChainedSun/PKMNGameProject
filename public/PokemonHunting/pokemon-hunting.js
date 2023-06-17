const GameControler = {}
const backButton = new BackButton("Back to main menu.", "backButtonContainer", "../Main.html")
const gachaCardsImages = [
    ["images/gacha_cards1.png", "images/gacha_cards_selected1.png"],
    ["images/gacha_cards2.png", "images/gacha_cards_selected2.png"],
    ["images/gacha_cards3.png", "images/gacha_cards_selected3.png"],
    ["images/gacha_cards4.png", "images/gacha_cards_selected4.png"]
]
let flipped = false


class GachaCard  {
    constructor(defaultCardBack, cardBack) {
        this.cardContainer = document.createElement("div")
        this.pkmCardContainer = document.createElement("div")
        this.pkmImgContainer = document.createElement("div")
        this.cardBackImage = document.createElement("img")
        this.pkmImg = document.createElement("img")
        this.pkmName = document.createElement("span")
        this.pkmId = document.createElement("span")
        this.cardBackImage.className = "cardBackImg"
        this.pkmImgContainer.className = "pkmImgContainer"
        this.pkmImg.className = "pkmImg"
        this.pkmId.className = "pkmId"
        this.pkmName.className = "pkmName"
        this.pkmCardContainer.id = "pokemonContainer"
        this.pkmCardContainer.className = "hidden"
        this.cardBackImage.src = defaultCardBack
        this.cardContainer.id = "gachaCardContainer"
        this.cardContainer.appendChild(this.cardBackImage)
        this.cardContainer.appendChild(this.pkmCardContainer)
        this.pkmCardContainer.appendChild(this.pkmId)
        this.pkmImgContainer.appendChild(this.pkmImg)
        this.pkmCardContainer.appendChild(this.pkmImgContainer)
        this.pkmCardContainer.appendChild(this.pkmName)
        this.pkmId.textContent = "---"
        this.pkmImg.src = "images/empty_card-export.png"
        this.pkmName.textContent = "---"

        this.defaultCardBackLink = defaultCardBack
        this.cardBackLink = cardBack
        this.setupSignals()
        
        this.addPokemonInformation()
    }

    hoverIn() {
        this.cardBackImage.src = this.cardBackLink
    }

    hoverOut() {
        this.cardBackImage.src = this.defaultCardBackLink
    }

    clicked() {
        // if(this.cardBackContainer.classList.contains("flipToFace")) {
        //     this.cardBackContainer.classList.remove("flipToFace")
        //     this.cardBackContainer.classList.add("flipToBack")
        // } else {
        //     this.cardBackContainer.classList.add("flipToFace")
        //     this.cardBackContainer.classList.remove("flipToBack")
        // }
        //Animation will be added here
        this.animate()
    }

    setupSignals() {
        this.cardContainer.addEventListener("mouseover", () => {
            this.hoverIn()
        })
        this.cardContainer.addEventListener("mouseout", () => {
            this.hoverOut()
        })
        this.cardContainer.addEventListener("click", () => {
            this.clicked()
        })
        this.cardContainer.addEventListener('animationstart', (event) => {
            this.animationStart(event)
        });
        this.cardContainer.addEventListener('animationend',  (event) => {
            this.animationEnd(event)
        });
    }

    addPokemonInformation() {
        let pkmData = this.getPokemon()
        if(pkmData) {
            this.pkmId.textContent = pkmData.id
            this.pkmImg.src = pkmData.image.hires
            this.pkmName.textContent = pkmData.name.english
            this.addType(pkmData.type)
        } else {
            this.addType("none")
        }
    }

    getPokemon() {
        if(Math.random() <= 0.1) {
            return pokemons[getRandomInt(0, pokemons.length)]
        }
        return null

    }

    addType(pkmType) {
        if(Array.isArray(pkmType)) {
            pkmType.forEach(type => {
                this.pkmCardContainer.classList.add(type.toLowerCase())
                this.pkmCardContainer.setAttribute("data-custom-type", "has-type")
            })
        } else if(typeof(pkmType) === "string") {
            this.pkmCardContainer.classList.add(pkmType.toLowerCase())
            if(pkmType == "none") {
                this.pkmCardContainer.setAttribute("data-custom-type", "none")
            } else {
                this.pkmCardContainer.setAttribute("data-custom-type", "has-type")
            }
        }
    }

    animate(classValue = null) {
        if(classValue) {
            if(classValue == "toBack") {
                this.cardContainer.classList.remove("toFront")
                this.cardContainer.classList.add(classValue)
            } else if(classValue == "toFront")
            this.cardContainer.classList.remove("toBack")
            this.cardContainer.classList.add(classValue)
        } else {
            this.cardContainer.classList.add("toBack")
        }
    }

    swapContainers() {
        if(this.cardBackImage.classList.contains("hidden")) {
            this.cardBackImage.classList.remove("hidden")
            this.pkmCardContainer.classList.add("hidden")
        } else if (this.pkmCardContainer.classList.contains("hidden")) {
            this.pkmCardContainer.classList.remove("hidden")
            this.cardBackImage.classList.add("hidden")
        }
    }

    animationStart(event) {
        //console.log(`${event.animationName}`);
    }
    
    animationEnd(event) {
        if(event.animationName == "toBack") {
            this.swapContainers()
            this.animate("toFront")
        } else if(event.animationName == "toFront") {
            if(this.pkmCardContainer.getAttribute("data-custom-type") !== "none") {
                this.pkmCardContainer.classList.add("glow")
            }
        }
    }

}

GameControler.canvasContainer = document.getElementById("canvasContainer")
GameControler.gachaContainer = document.getElementById("gachaGameContainer")
GameControler.gameCanvas = document.getElementById("miniGameCanvas")
GameControler.gameButton = document.getElementById("miniGameTab")
GameControler.gachaButton = document.getElementById("gachaTab")
GameControler.gachaCardsList = []


GameControler.generateGachaCards = function (amount = 10) {
    if(amount == 0) return
    this.clearGachaCards()
    for (let i = 0; i < amount; i++) {
        const gInt = getRandomInt(0, gachaCardsImages.length - 1)
        const newCard = new GachaCard(gachaCardsImages[gInt][0], gachaCardsImages[gInt][1])
        GameControler.gachaCardsList.push(newCard)
        GameControler.gachaContainer.appendChild(newCard.cardContainer)
    }
}
   
GameControler.clearGachaCards = function () {
    for (let i = 0; i < GameControler.gachaCardsList.length; i++) {
        GameControler.gachaCardsList[i].cardContainer.remove()
    }
}

GameControler.flipGachaCards = function () {
    if(flipped) {
        GameControler.generateGachaCards(10)
        flipped = false
        this.flipGachaCards()
    } else {
        for(let i = 0; i < GameControler.gachaCardsList.length; i++) {
            GameControler.gachaCardsList[i].animate()
        }
        flipped = true
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

init()
backButton.changeStyle(true)

function init() {
    // if(GameControler.gameButton.classList.contains("default")) {
    //     GameControler.gachaContainer.classList.add("hidden")
    // } 
    // else if (GameControler.gachaButton.classList.contains("default")) {
    //     GameControler.canvasContainer.classList.add("hidden")
    // }
    GameControler.generateGachaCards()

    document.getElementById("refreshCards").addEventListener("click", () => {
        GameControler.generateGachaCards()
    })

    document.getElementById("flipCards").addEventListener("click", () => {
        GameControler.flipGachaCards()
    })
}

//TEST FUNCTION

//--------------------------------


