const statsNames = [
  "HP",
  "Attack",
  "Defense",
  "Sp. Attack",
  "Sp. Defense",
  "Speed"
]

class EvolutionCard {
  constructor(pokemonID, pokemonName, evolutionMethodText, imageSource, type) {
    this.pokemonIndex = pokemonID
    this.pokemonName = pokemonName
    this.type = type
    this.evolutionMethod = evolutionMethodText
    this.elementContainer = document.createElement("div")
    this.elementContainer.id = "evoCardContainer"
    if (Array.isArray(this.type)) {
      this.type.forEach(type => {
        this.elementContainer.classList.add(type.toLowerCase())
      })
    } else {
      this.elementContainer.classList.add(type.toLowerCase())
    }
    this.elementContainer.setAttribute("data-index", this.pokemonIndex)
    this.createPokemonName(this.pokemonName)
    this.createImage(imageSource)
    this.createIndex(this.pokemonIndex)
    this.createType(this.type)
    this.createMethod(this.evolutionMethod)
    
    this.elementContainer.addEventListener("click", function(event) {
      evoCardSelected(event.target)
    })

    return this.elementContainer
  }

  createIndex(pokemonID) {
    this.index = document.createElement("p")
    this.index.textContent = this.getPokemonIndexString(pokemonID)
    this.index.id = "evoPokemonIndex"
    this.elementContainer.appendChild(this.index)
  }

  createImage(imageSource) {
    this.evoImage = document.createElement("img")
    this.evoImage.id = "evoImage"
    this.evoImage.src = imageSource
    this.elementContainer.appendChild(this.evoImage)
  }

  createPokemonName(pokemonName) {
    this.pkmName = document.createElement("p")
    this.pkmName.id = "evoPokemonName"
    this.pkmName.textContent = pokemonName
    this.elementContainer.appendChild(this.pkmName)
  }

  createType(type) {
    this.typeContainer = document.createElement("div")
    this.typeContainer.id = "evoTypeContainer"
    if (Array.isArray(this.type)) {
      this.type.forEach(type => {
        this.typeLabel = document.createElement("div")
        this.typeLabel.className = type.toLowerCase()
        this.typeLabel.id = "evoTypeLabel"
        this.typeLabel.textContent = type
        this.typeContainer.appendChild(this.typeLabel)
      })
    } else {
      this.typeLabel = document.createElement("div")
      this.typeLabel.className = type.toLowerCase()
      this.typeLabel.id = "evoTypeLabel"
      this.typeLabel.textContent = type
      this.typeContainer.appendChild(this.typeLabel)
    }
    this.elementContainer.appendChild(this.typeContainer)
  }

  createMethod(methodValue) {
    this.methodNode = document.createElement("p")
    this.methodNode.id = "evoPokemonMethod"
    if(methodValue === "") {
      this.methodNode.textContent = "-------"
    } else {
      this.methodNode.textContent = methodValue
    }
      this.elementContainer.appendChild(this.methodNode)
  }

  getPokemonIndexString(indexVal) {
    indexVal = "" + indexVal
    this.retValue = ""
    // console.log(indexVal.length)
    if(indexVal.length < 3) {
      if(indexVal.length < 2) {
        this.retValue = "#00" + indexVal
      } else {
        this.retValue = "#0" + indexVal
      }
    } else {
      this.retValue = "#" + indexVal
    }
    // console.log(this.retValue)
    return this.retValue
  }

}

class PokemonCard {
  constructor(pokemonIndex, pokemonName, pokemonImage, altImage, pokemonType) {
    this.pokemonCard = document.createElement("div")
    this.pokemonCard.id = "pokemonEntry"
    this.nameValue = pokemonName
    this.indexNumber = pokemonIndex
    this.imageLink = pokemonImage
    this.altImageValue = altImage
    this.typeValue = pokemonType
    if(Array.isArray(pokemonType)) {
      pokemonType.forEach(type => {
        this.pokemonCard.classList.add(type.toLowerCase())
      })
    } else if(typeof(pokemonType) === "string") {
      this.pokemonCard.className = pokemonType.toLowerCase()
    }

    this.pokemonCard.addEventListener("click", function(event) {
      pokemonCardSelected(event.target)
    })
    this.createPokemonName(this.nameValue)
    this.createPokemonImage(this.imageLink, this.altLink)
    this.createPokemonIndex(this.indexNumber)
    this.createPokemonType(this.typeValue)


    return this.pokemonCard
  }

  createPokemonName(value) {
    this.pokemonName = document.createElement("p")
    this.pokemonName.id = "cardName"
    this.pokemonName.className = "cardName"
    this.pokemonName.textContent = value
    this.pokemonCard.appendChild(this.pokemonName)
  }

  createPokemonImage(image, altValue) {
    this.pokemonImage = document.createElement("img")
    this.pokemonImage.id = "pokemonImage"
    fetch(image)
      .then(response => {
        if(response.ok) {
          this.pokemonImage.src = image
        }
        else {
          fetch(altValue)
            .then(response => {
              if(response.ok) {
                this.pokemonImage.src = altValue
              } else {
                console.log(`Image was not found on path: ${altValue}`)
              }
            })
        }
      })
      .catch(_error => {
        console.log(`Image was not found on path: ${image}. \nImage is broken.`)
      })

    this.pokemonCard.appendChild(this.pokemonImage)
    

    
    
  }

  createPokemonIndex(idNum) {
    this.pokemonIndex = document.createElement("p")
    this.pokemonIndex.id = "pokedexIndex"
    this.pokemonIndex.className = "pokemonId"
    this.pokemonIndex.textContent = this.getPokemonIndexString(idNum)
    this.pokemonCard.appendChild(this.pokemonIndex)
  }

  createPokemonType(types) {
    this.typeDiv = document.createElement("div")
    this.typeDiv.className = "entryTypeContainer"
    this.typeDiv.classList.add((types.length > 1)?"dualType":"singleType")
    for(let i = 0; i < types.length; i++) {
      this.newTypeDiv = document.createElement("div")
      this.newTypeDiv.classList.add(types[i].toLowerCase(), (types.length > 1)?((i === 0)?"entryTypeLeft":"entryTypeRight"):"entryType")
      this.newTypeDiv.appendChild(document.createTextNode(types[i]))
      this.typeDiv.appendChild(this.newTypeDiv)
    } 

    this.pokemonCard.appendChild(this.typeDiv)

  }
  
  getPokemonIndexString(indexVal) {
    indexVal = "" + indexVal
    this.retValue = ""
    if(indexVal.length < 3) {
      if(indexVal.length < 2) {
        this.retValue = "#00" + indexVal
      } else {
        this.retValue = "#0" + indexVal
      }
    } else {
      this.retValue = "#" + indexVal
    }
    return this.retValue
  }

}

const filterContainer = document.getElementById("typeListContainer");
const pokemonList = document.getElementById("pokemonList");
const imageFilePathLocal = "../Pokedex/pokemon-data.json-master/images/pokedex/thumbnails/"
const evoImageFilePathLocal = "../Pokedex/pokemon-data.json-master/images/pokedex/thumbnails/"
const altImageFilePathLocal = "../Pokedex/pokemon-data.json-master/images/ShinyGifs/"
const imageFileExtension = ".png"
const altImageFileExtension = ".gif"
const searchBar = document.getElementById("searchInput")
const pokedexLight = document.getElementById("pokedexLightIndicator")
const pokedexScreen = document.getElementById("pokedexScreen")
const detailsValueContainer = document.getElementById("detailsValueContainer")
const nameDetailsContainer = document.getElementById("nameDetailsContainer")
const nameDetails = document.getElementById("nameDetails")
const shinyMode = document.getElementById("shinyMode")
const detailsImages = document.querySelectorAll("#detailsImage")
const detailsTabs = document.querySelectorAll("#detailsType")
const detailsValues = document.querySelectorAll("#detailsValue")
const aOne = document.getElementById("a1")
const aTwo = document.getElementById("a2")
const hA = document.getElementById("ha")
const evolutionContainers = document.querySelectorAll("#evolutionStageContainer")
const evoContainerOne = document.getElementById("evoStage0")
const evoContainerTwo = document.getElementById("evoStage1")
const evoContainerThree = document.getElementById("evoStage2")

const statsTable = document.getElementById("statsTable")

import { types } from "../setLocalStorage.js";
import { pokemons } from "../setLocalStorage.js";
var selectedTypes = []
var shinyModeValue = "off"



initializeStart()



function initializeStart() {
  

  for(var i = 0; i < types.length; i++) {
    let newDiv = document.createElement("div")
    let newText = document.createElement("p")
    newText.textContent = types[i]["english"]
    newText.classList.add("filterInsideLabel")
    newDiv.classList.add("filter")
    newDiv.id = "filter"
    newDiv.classList.add(types[i]["english"].toLowerCase())
    newDiv.addEventListener("click", (event)=> {
      applyFilter(event.target)
    })
    newDiv.appendChild(newText)
    filterContainer.appendChild(newDiv)
  }

  for(var p = 0; p < pokemons.length; p++) {
    let imageLink = pokemons[p].image.hires
    // let imageLink = imageFilePathLocal + pokemons[p].id + imageFileExtension
    let altImageLink = altImageFilePathLocal + pokemons[p].id + imageFileExtension
    pokemonList.appendChild(new PokemonCard(pokemons[p].id, pokemons[p].name.english, imageLink, altImageLink, pokemons[p].type))
  }
  searchBar.addEventListener("input", ()=> {
    searchPokemonEntries(searchBar.value)
  });
  shinyMode.addEventListener("click", (event)=> {
    shinyModeValue = (shinyModeValue == "off")?"on":"off"
    if (shinyModeValue == "off") {
      event.target.classList.remove("shinyActive")
    } else if(shinyModeValue == "on") {
      event.target.classList.add("shinyActive")
    }
    changeImageVisibility()
  })
  changeImageVisibility()

  detailsTabs.forEach(tab => {
    tab.addEventListener("click", ()=> {
      changeTabs(tab.getAttribute("data-custom-data"))
    })
    if(tab.classList.contains("activeTab")) {
      let customDat = tab.getAttribute("data-custom-data")
      detailsValues.forEach(val => {
        if(val.getAttribute("data-custom-data") == customDat)
          val.classList.remove("hidden")
        else
          val.classList.add("hidden")
      })
    }
  })
}

const pokemonEntries = document.querySelectorAll("#pokemonEntry")

document.getElementById("ListContainer").addEventListener("click", (event)=>{
  if(checkAllConditions(event.target, "id", "or", ["ListContainer", "detailsWindow", "searchMenu", "screenAndControls"])) {
    let element = findMatchingNode(event.target, "pokemonEntry")
    if(!(element == null)) {
      let newRect = element.getBoundingClientRect();
      let x = event.clientX
      let y = event.clientY
      if(hasClickEvent(x, y, newRect)) {
        console.log("Click inside a card.")
      } else {
        console.log("Click outside the cards.")
        deselectAllCards()
      }
    } else {
      deselectAllCards()
    }
  }
})

function checkAllConditions(target, what, conType, [...condition]) {
  let state = false
  switch(what) {
    case "id":
      switch(conType) {
        case "or":
          condition.forEach(con => {
            if(target.id == con) {
             state =  true
             return
            }
          })
          return state
        case "and":
          condition.forEach(con => {
            if(target.id != con) {
              state =  false
              return
            }
          })
          return state
      }
      break;
      
    case "class":
      switch(conType) {
        case "or":
          condition.forEach(con => {
            if(target.classList.contains(con)) {
              console.log("true")
              state =  true
              return
            }
          })
          return state
        case "and":
          condition.forEach(con => {
            if(!(target.classList.contains(con))) {
              state =  false
              return
            }
          })
          return state
      }
      break;

  }
}

function applyFilter(target = null) {
  if(target == null) {

  } else {
    let newFindNode = findMatchingNode(target, "filter", "id", "parent")
    //console.log(newFindNode)
    if(!(newFindNode == null)) {
      if(newFindNode.id == "filter") {
        let classes = [...newFindNode.classList]
        let type = classes.filter(type => type != "filter" && type != "selected")
        type = type[0]
        if(newFindNode.classList.contains("selected")) {
          newFindNode.classList.remove("selected")
          manageSelectedTypes("remove", type)
        }else {
          newFindNode.classList.add("selected")
          manageSelectedTypes("add", type)
        }
      }
    }
    
  }
  
  //console.log(selectedTypes.length)

  loop0:
    for(let pe of pokemonEntries) {
      if(selectedTypes.length > 0) {
        //if single type
        //if dual type
        let classes = [...pe.classList]
        let type = classes.filter(type => type != "hidden")// && type != "selected")
        for(let val of selectedTypes) {
          for(let t of type) {
            if (t == val) {
              pe.classList.remove("hidden")
              continue loop0;
            }
          }
        }
        pe.classList.add("hidden")
      } else {
        pe.classList.remove("hidden")
      }
    }

}

function hasClickEvent(x, y, rect) {
  if(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    return true
  } else {
    return false
  }
}

function manageSelectedTypes(action, value) {
  switch(action) {
    case "add":
      selectedTypes.push(value)
      break;
    case "remove":
      let index = selectedTypes.indexOf(value)
      selectedTypes.splice(index, 1)
      break;
  }
}

function searchPokemonEntries(textValue) {
  let newString = textValue.split(";")
  let words = []
  let idNumbers = []
  newString.forEach(word => {
    let sepWord = word.replace(/[ ,\\,/,>,<,:,",',`,!,@,#,$,%,^,&,*,(,),_,+,-,=]/g, "")
    sepWord = sepWord.split("")
    let text = sepWord.filter(t => isNaN(t))
    let num = sepWord.filter(n => !isNaN(n))
    

    if(text != "") {
      text = text.join("")
      words.push(text)
    }
    num = num.join("")
    num = parseInt(num)
    if(Number.isNaN(num) === false) {
      idNumbers.push(num)
    }
    
  })
  if(words.length <= 0 && idNumbers.length <= 0) {
    makeSelectionVisible()
  } else {
    let newText = words.concat(idNumbers)
    checkPokemonEntriesForSearching(newText)
  }
}

function checkPokemonEntriesForSearching(textToMatch) {
  pokemonEntries.forEach(entry => {
    let childList = [...entry.children]
    let matchFound = false
    let entryName = null
    let entryId = null
    let cardList = []
    childList.forEach(child=> {
      if(child.id == "cardName") {
        entryName = child
      } else if(child.id == "pokedexIndex") {
        entryId = child
      }
    })
    entryName = entryName.textContent.toLowerCase()
    entryId = parseInt(entryId.textContent.replace("#",""))
    textToMatch.forEach(word=> {
      if(typeof(word) === "string") {
        if(entryName.includes(word.toLowerCase())) {
          entry.classList.remove("searchHidden")
          matchFound = true
          return
        }
      } else {
        if(typeof(word) === "number") {
          entryId = entryId.toString()
          word = word.toString()
          if(entryId.includes(word)) {
            entry.classList.remove("searchHidden")
            matchFound = true
            return
          }
        }       
      }
    })
    if(!matchFound) {
      entry.classList.add("searchHidden")
    } 
  })
}

function pokemonCardSelected(target) {
  let cardNode = findMatchingNode(target, "pokemonEntry")
  if(!(cardNode === null)) {
    if(!(cardNode.classList.contains("notOwned"))){
      deselectAllCards()
      cardNode.classList.add("entrySelected")
      openDetails(cardNode)
    } else deselectAllCards()
  } else deselectAllCards()
  
}

function deselectAllCards() {
  for(let card of pokemonEntries) {
    card.classList.remove("entrySelected")
  }
  deselectEvoCards()
  clearDetails()
  
}
/**
 * finds an element matching parameters
 * 
 * @param {Element} node The Element which you compare to the matchValue.
 * @param {String} matchValue The match value which you compare to a parameter of the Element.
 * @param {String} property The property of the Element.
 * @param {String} relation Are we searching parents or children?
*/

function findMatchingNode(node, matchValue, property = "id", relation = "parent" ) {
  let retVal;
  switch (relation) {
    case "parent":
      if(!(node == null || node.tagName == "HTML"))
        retVal = (node.getAttribute(property) === matchValue)?node:findMatchingNode(node.parentNode, matchValue)
      else
        return null
  }
  return retVal
}

function openDetails(card) {
  populateDetails(card)
  pokedexLight.classList.add("blink")
  pokedexScreen.classList.add("active")
  detailsValueContainer.classList.add("active")
  nameDetailsContainer.classList.add("active")
}

function populateDetails(card) {
  if(typeof(card) === "object") {
    for(let c of card.children) {
      if(c.classList.contains("pokemonId")) {
        let idVal = parseInt(c.textContent.replace("#", ""))
        for(let e of pokemons) {
          if(e.id === idVal) {
            setPokedexImage(e.name.english, e.id)
            setDescription(e.description)
            setAbilityandType(e.type, e.profile.ability)
            let newProfile = e.profile
            newProfile.species = e.species
            setSpeciesDetails(newProfile)
            setBaseStatsDetails(e.base)
            setEvolutionInfo(e.id)
            nameDetails.textContent = e.name.english
            evoCardSelected(e.id)
          }
        }
      }
    }
  } else if(typeof(card) === "number" || typeof(card) === "string") {
    for(let e of pokemons) {
      if(e.id === card) {
        setPokedexImage(e.name.english, e.id)
        setDescription(e.description)
        setAbilityandType(e.type, e.profile.ability)
        let newProfile = e.profile
        newProfile.species = e.species
        setSpeciesDetails(newProfile)
        setBaseStatsDetails(e.base)
        nameDetails.textContent = e.name.english
      }
    }
  }
}

function setDescription(textDesc = "") {
  let descNode = getDetailsValueContainer("desc")
  let descNodeChildren = [...descNode.children]
  descNodeChildren.forEach(child => {
    if(child.id == "textValue")
      child.textContent = textDesc
  })

}

function setAbilityandType(textType = "", abilityList = []) {
  /*
  3 divs we need to get here:
  -abilityTable:
  -pokemonType:
  -typeChart:

  These are Id's.
  */
  let abilityOne = "";
  let abilityTwo = "";
  let hiddenAbility = "";
  //console.log(abilityList)
  if(abilityList.length > 0) {
    if(abilityList.some(Array.isArray)) {
      abilityList.forEach(ability => {
        if(ability[1] === "false" || ability[1] === false) {
          if(abilityOne === "") {
            abilityOne = ability[0]
          } else {
            abilityTwo = ability[0]
          }
        } else if(ability[1] === "true" || ability[1] === true) hiddenAbility = ability[0]
      })
      //console.log("Abilities are:", "Ability 1: ", abilityOne, "/ Ability 2: ",  abilityTwo, "/ Hidden Ability: ",  hiddenAbility)
    } else {
      abilityOne = abilityList[0]
      abilityTwo = ""
      hiddenAbility = ""
      //console.log("Abilities are:",abilityOne, abilityTwo, hiddenAbility)
    }
  } else {
    abilityOne = ""
    abilityTwo = ""
    hiddenAbility = ""
  }

  aOne.textContent = abilityOne
  aTwo.textContent = abilityTwo
  hA.textContent = hiddenAbility
  let descNode = getDetailsValueContainer("ability")
  let containerChildren = [...descNode.children]
  let typeEffChart = {}
  let typeChartNode = null
  types.forEach(t => {
    typeEffChart[t["english"]] = 0
  })
  containerChildren.forEach(child => {
    if(child.id == "pokemonType") {
      let childNodes = [...child.children]
      childNodes.forEach(cNode => {
        if(cNode.id == "typeContainer") {
          let typeCont = [...cNode.children]
          if(!(textType == "")) {
            for(let i = 0; i < textType.length; i++) {
              typeCont.forEach(tC => {
                if(tC.id == "type" + (i + 1)) {
                  tC.classList.remove("hidden")
                  tC.classList.add(textType[i].toLowerCase())
                  let tCTextChildren = [...tC.children]
                  tCTextChildren.forEach(typeText => {
                    if (typeText.id == "typeText")
                      typeText.textContent = textType[i]
                  })
                  
                }
              })
            }
          } else {
            typeCont.forEach(tC => {
              if(tC.id == "type1" || tC.id == "type2") {
                types.forEach(t => {
                  tC.classList.remove(t["english"].toLowerCase())
                })
                tC.classList.add("hidden")
                let tCTextChildren = [...tC.children]
                tCTextChildren.forEach(typeText => {
                  if (typeText.id == "typeText")
                    typeText.textContent = ""
                })
                
              }
            })
            
          }
        }
      })
    } else if(child.id == "typeChart") {
      if(!(textType == "")) {
        //for each element of textType
        textType.forEach(pkmType => {
          let typeData = []
          //look for the type data
          types.forEach(typeEntry => {
            if(pkmType == typeEntry["english"]) {
              typeData.push(typeEntry["effective_against"], typeEntry["ineffective_against"], typeEntry["no_effect_against"])
            }
            if(typeEntry["effective_against"].includes(pkmType)) {
              if(typeEffChart[typeEntry["english"]] != null)
                typeEffChart[typeEntry["english"]] += 1
            }
            if(typeEntry["ineffective_against"].includes(pkmType)) {
              if(typeEffChart[typeEntry["english"]] != null)
                typeEffChart[typeEntry["english"]] -= 1
            }
            if(typeEntry["no_effect_against"].includes(pkmType)) {
                typeEffChart[typeEntry["english"]] = null
            }
          })

        })

      }
      let typeNodeList = [...child.children]
      typeNodeList.forEach(typeNodeChild => {
        let tDat = typeNodeChild.getAttribute("data-type-data")
        tDat = getFirstUp(tDat)
        let calcArr = calculateTypeEffect(typeEffChart[tDat])
        for(let typeElement of [...typeNodeChild.children]) {
          if(typeElement.id == "effectValue") {
            let textNode = [...typeElement.children]
            textNode.forEach(el => {
              if(el.id == "text") {
                textNode = el
              }
            })
            if(calcArr[1] == "") {
              typeElement.className = ""
              typeElement.title = ""
              textNode.classList.remove("hasValue")
            } else {
              typeElement.classList.add(calcArr[1])
              typeElement.title = calcArr[2]
              textNode.classList.add("hasValue")
            }
            textNode.textContent = calcArr[0]
          }
        }
        
      })
    }
  })
}

function setSpeciesDetails(profile = "") {
  let speciesValue = document.getElementById("speciesValue")
  let heightValue = document.getElementById("heightValue")
  let weightValue = document.getElementById("weightValue")
  let eggValue = document.getElementById("eggValue")
  let genderBar = document.getElementById("genderProgress")
  let maleValue = document.getElementById("maleValue")
  let femaleValue = document.getElementById("femaleValue")
  if(profile == "") {
    speciesValue.textContent = ""
    heightValue.textContent = ""
    weightValue.textContent = ""
    eggValue.textContent = ""
    genderBar.value = 50
    maleValue.textContent = "NA"
    femaleValue.textContent = "NA"
  } else {
    speciesValue.textContent = profile["species"]
    heightValue.textContent =  profile["height"]
    weightValue.textContent =  profile["weight"]
    profile["egg"].forEach(eggType => {
      eggValue.textContent += " " + eggType
    })
    if(profile["gender"] === "Genderless") {
      genderBar.value = 50
      maleValue.textContent = "NA"
      femaleValue.textContent = "NA"
    } else {
      let newGenderValues = profile["gender"].split(":")
      genderBar.value = parseFloat(newGenderValues[0])
      maleValue.textContent = parseFloat(newGenderValues[0]) + "%"
      femaleValue.textContent = parseFloat(newGenderValues[1]) + "%"
    }
  }

}

function track() {
  const err = new Error();
  Error.captureStackTrace(err, track)
  console.log(err.stack)
}

function setEvolutionInfo(pokemonIndex = null) {
  let type = 0
  cleanOutChildren(evoContainerOne, evoContainerTwo, evoContainerThree)
  let evolutionProfile = getEvolutionProfile(pokemonIndex)
  if(evolutionProfile) {
    
    if(!isEmpty(evolutionProfile["base-pokemon"]) && !isEmpty(evolutionProfile["next-pokemon"]) && !isEmpty(evolutionProfile["last-pokemon"])) {
      type = 2;
      evoContainerOne.appendChild(createEvolutionCards(evolutionProfile["base-pokemon"]))
      if(multiEvo(evolutionProfile["next-pokemon"])) {
        evolutionProfile["next-pokemon"].forEach(pokemon => {
          evoContainerTwo.appendChild(createEvolutionCards(pokemon))
        })
      } else {
        evoContainerTwo.appendChild(createEvolutionCards(evolutionProfile["next-pokemon"]))
      }
      if(multiEvo(evolutionProfile["last-pokemon"])) {
        evolutionProfile["last-pokemon"].forEach(pokemon => {
          evoContainerThree.appendChild(createEvolutionCards(pokemon))
        })
      } else {
        evoContainerThree.appendChild(createEvolutionCards(evolutionProfile["last-pokemon"]))
      }
    } 
    
    else if(!isEmpty(evolutionProfile["base-pokemon"]) && !isEmpty(evolutionProfile["next-pokemon"]) && isEmpty(evolutionProfile["last-pokemon"])) {
      type = 1
      evoContainerOne.appendChild(createEvolutionCards(evolutionProfile["base-pokemon"]))
      if(multiEvo(evolutionProfile["next-pokemon"])) {
        evolutionProfile["next-pokemon"].forEach(pokemon => {
          evoContainerTwo.appendChild(createEvolutionCards(pokemon))
        })
      } else {
        evoContainerTwo.appendChild(createEvolutionCards(evolutionProfile["next-pokemon"]))
      }

    } else if(!isEmpty(evolutionProfile["base-pokemon"]) && isEmpty(evolutionProfile["next-pokemon"]) && isEmpty(evolutionProfile["last-pokemon"])) {
      [...evolutionContainers].forEach(container => {
        if(container.getAttribute("data-type") === "none") {
          container.classList.remove("hidden")
        } else {
          container.classList.add("hidden")
        }
      })
    }
  }
  manageEvoDisplayContainers(type)
}

function isEmpty(objectValue) {
  return Object.keys(objectValue) < 1
}

function getEvolutionProfile(pokemonId) {
  let evolutionProfile = null
  if(!pokemonId) {
    return null
  } else {
    let basePokemon = requestEvolutionInformation(pokemonId)
    while(basePokemon.evolution.prev) {
      let prevId = basePokemon.evolution.prev[0]
      basePokemon = requestEvolutionInformation(prevId)
    }
    // console.log(basePokemon)
    let nextPokemon = {}
    let lastPokemon = {}
    if(basePokemon.evolution.next) {
      // console.log(basePokemon.evolution.next)
      if(evoIsMoreThanOne(basePokemon.evolution.next)) {
        let nextArr = []
        basePokemon.evolution.next.forEach(nextEvo => {
          nextArr.push(requestEvolutionInformation(nextEvo[0]))
        })
        nextPokemon = nextArr
        // console.log(nextPokemon)
        let lastArr = []
        Object.keys(nextPokemon).forEach(key => {
          if(nextPokemon[key].evolution.next) {
            lastArr.push(requestEvolutionInformation(nextPokemon[key].evolution.next[0]))
          }
        })
        if(!lastArr.length < 1) {
          lastPokemon = lastArr
        }
      } 
      else {
        nextPokemon = requestEvolutionInformation(basePokemon.evolution.next[0])
        //console.log(nextPokemon.evolution.next)
        // if(evoIsMoreThanOne(nextPokemon)) {}
        if(nextPokemon.evolution.next) {
          if(evoIsMoreThanOne(nextPokemon.evolution.next)) {
            let lastArr = []
            nextPokemon.evolution.next.forEach(lastEvo => {
              lastArr.push(requestEvolutionInformation(lastEvo[0]))
            })
            lastPokemon = lastArr
          } else {
            lastPokemon = requestEvolutionInformation(nextPokemon.evolution.next[0])
          }
        }
      }
    }
    evolutionProfile = {
      "base-pokemon": basePokemon || {},
      "next-pokemon": nextPokemon || {},
      "last-pokemon": lastPokemon || {}
    }    
    // console.log(basePokemon?.name?.english ?? "Doesn't exist.", nextPokemon?.name?.english ?? "Doesn't exist.", lastPokemon?.name?.english ?? "Doesn't exist.")
  }
  //console.log(evolutionProfile)
  return evolutionProfile
}

function createEvolutionCards(value) {
  let pkID = value.id
  let pkName = value.name.english
  let pkType = value.type
  let getImageLink = () => {
    let foundPokemon = pokemons.find(pokemon => pokemon.id == value.id);
    if (foundPokemon) {
      return foundPokemon.image.thumbnail;
    }
    return '';
  }
  let pkImage = getImageLink()
  let method = ""
  if((value.evolution.next && value.evolution.prev) || (!value.evolution.next && value.evolution.prev)) {
    method = value.evolution.prev[1]
  }

  return new EvolutionCard(pkID, pkName, method, pkImage, pkType)
  
}

function cleanOutChildren() {
  Array.prototype.forEach.call(arguments, argument => {
    let childList = getChildList(argument)
    childList.forEach(child => {
      argument.removeChild(child)
    })
  })
}

function requestEvolutionInformation(pokemonIndex) {
  let newObj = {}
  if(typeof(pokemonIndex) === "string") {
    pokemonIndex = Number.parseInt(pokemonIndex)
  }
  pokemons.forEach(pe => {
    if(pe.id === pokemonIndex) {
      newObj.id = pe.id
      newObj.name = pe.name
      newObj.type = pe.type
      newObj.evolution = pe.evolution
    }
  })
  return newObj
}

function evoIsMoreThanOne(objValue) {
  let retValue = false
  if(Array.isArray(objValue)) {
    retValue = Array.isArray(objValue[0])?true:false
  } 
  else if(Object.prototype.toString.call(objValue) === "[object Object]") {
    if(Object.keys(objValue).length >= 1) {
      retValue = objValue.name ? false : true
    }

  }
  return (retValue)
}

function multiEvo(value) {
  return value.name? false:true
}

function manageEvoDisplayContainers(evoType) {
  let evoMethod = [...document.querySelectorAll("#evoMethod")]
  switch(evoType) {
    case 0:
    [...evolutionContainers].forEach(container => {
      if(container.getAttribute("data-type") === "has-evolution") {
        container.classList.add("hidden")
      } else {
        container.classList.remove("hidden")
      }
    })
      break;
    case 1:
      [...evolutionContainers].forEach(container => {
        if(container.getAttribute("data-type") === "has-evolution") {
          container.classList.remove("hidden")
        } else {
          container.classList.add("hidden")
        }
      })
      evoMethod.forEach(method => {
        if(method.getAttribute("data-type") === "0-1")
          method.classList.remove("hidden")
        else
          method.classList.add("hidden")
      })
      break;
    case 2:
      [...evolutionContainers].forEach(container => {
        if(container.getAttribute("data-type") === "has-evolution") {
          container.classList.remove("hidden")
        } else {
          container.classList.add("hidden")
        }
      })
      evoMethod.forEach(method => {
          method.classList.remove("hidden")
      })
      break;
  }
}

function evoCardSelected(evoCard) {
  //gonna check here if details already has the pokemon details open so we dont create new ones
  if(typeof(evoCard) === "object") {
    let evoCardContainer = findMatchingNode(evoCard, "evoCardContainer")
    deselectEvoCards(evoCardContainer)
    let evoCardChildList = getChildList(evoCardContainer)
    let pokemonIndex = -1
    evoCardChildList.forEach(child => {
      if(child.id === "evoPokemonIndex") {
        openDetails(Number.parseInt(child.textContent.replace("#", "")))
      }
    })
  } else if(typeof(evoCard) === "number") {
    deselectEvoCards(getEvoCard(evoCard))
  }
}

function getEvoCard(index) {
  let evoCards = [...document.querySelectorAll("#evoCardContainer")]
  let retCard = null
  evoCards.forEach(card => {
    getChildList(card).forEach(child => {
      if(child.id === "evoPokemonIndex") {
        let cardIndex = Number.parseInt(child.textContent.replace("#", ""))
        if(cardIndex === index)
          retCard = card
      }
    })
  })
  return retCard
}

function deselectEvoCards(node = null) {
  if(node === null) {
    let evoCards = [...document.querySelectorAll("#evoCardContainer")]
    evoCards.forEach(card => {
      card.classList.remove("evoSelected")
    })
  } else {
    let evoCards = [...document.querySelectorAll("#evoCardContainer")]
    evoCards.forEach(card => {
      if(!(card === node)){
        card.classList.remove("evoSelected")
      }
      else {
        card.classList.add("evoSelected")
      }
      
    })
  }
}

function setBaseStatsDetails(baseStats = "") {
  //console.log(baseStats == "")
  if(!baseStats == "") {
    for(let key of Object.keys(baseStats)) {
      let tableElements = getTableElements(key,"id")
      let minMaxStats = getMinMaxStatValue(baseStats[key], key)
      tableElements.forEach(el => {
        //console.log(el.id)
        if(el.id === "baseValue") {
          el.textContent = baseStats[key]
        } else if(el.id === "totalValue") {
          let sum = getTotalStats(baseStats)
          //console.log(sum)
          el.textContent = sum
          //console.log(typeof(sum))
        } 
        
        else if(el.id === "minValue") {
          el.textContent = minMaxStats[0]
        } 
        
        else if(el.id === "maxValue") {
          el.textContent = minMaxStats[1]
        } 
        
        else if(el.id === "sliderValue") {
          let childNode = null;
          [...el.children].forEach(child => {
            if(child.id === "statsSlider") {
              childNode = child
            }
          })
          if(childNode) {
            setSliderValue(childNode, baseStats[key])
            //childNode.value = baseStats[key]
          }
        }
      })
      //console.log(tableElements)
    }
  } else {
    //console.log("it was else")
    statsNames.forEach(name => {
      let tableElements = getTableElements(name, "id")
      tableElements.forEach(element => {
        if(element.id !== "nameValue" && element.id !== "sliderValue") {
          element.textContent = ""
        } else if(element.id === "sliderValue") {
          let childNode = null;
          [...element.children].forEach(child => {
            if(child.id === "statsSlider") {
              childNode = child
            }
            setSliderValue(child)
          })
        }
      })
    })
  }
}

function setSliderValue(sliderNode, value = 0) {
  let classCat = 0
  sliderNode.value = value
  let percentValue = getStatsPercent(sliderNode.value)
  if(percentValue >= 80) {
    classCat = 5
  } else if(percentValue >= 50) {
    classCat = 4

  } else if(percentValue >= 25) {
    classCat = 3

  } else if(percentValue > 10) {
    classCat = 2

  } else if(percentValue <= 10) {
    classCat = 1
  }
  removeSliderClasses(sliderNode, classCat)
}

function removeSliderClasses(sliderNode, notRemove) {
  for(let i = 1; i <= 5; i++) {
    if(i == notRemove) {
      sliderNode.classList.add(`cat${i}`)
    } else {
      sliderNode.classList.remove(`cat${i}`)
    }
  }
}


function getMinMaxStatValue(statNumber, statName, typeValue = "both") {
  let retValue
  if(statName.toLowerCase() === "hp") {
    retValue = calculateStats(statNumber, true)
  } else {
    retValue = calculateStats(statNumber)
  }
  switch(typeValue.toLowerCase()) {
    case "min":
      return retValue[0]
    case "max":
      return retValue[1]
    case "both":
      return retValue
  }

}

function getTotalStats(statsProfile) {
  let sum = 0
  for(let keyVal of Object.keys(statsProfile)) {
    sum += Number.parseInt(statsProfile[keyVal])
  }
  return sum
}

function calculateStats(statNumber, isItHP = false) {
  let calculatedStats = []
  let resultMin = 0
  let resultMax = 0
  const minEV = 0
  const maxEV = 255
  const minIV = 0
  const maxIV = 31
  if(isItHP) {
    resultMin = Math.floor(0.01 * ((2 * statNumber + minIV + Math.floor(0.25 * minEV)) * 100) + 100 + 10)
    resultMax = Math.floor(0.01 * ((2 * statNumber + maxIV + Math.floor(0.25 * maxEV)) * 100) + 100 + 10)
  } else {
    resultMin = Math.floor(((0.01 * (2 * statNumber + minIV + Math.floor(0.25 * minEV)) * 100) + 5) * 0.9)
    resultMax = Math.floor(((0.01 * (2 * statNumber + maxIV + Math.floor(0.25 * maxEV)) * 100) + 5) * 1.1)
  }

  calculatedStats[0] = resultMin
  calculatedStats[1] = resultMax
  return calculatedStats
}

function getStatsPercent(statValue, maxValue = 180) {
  return ((statValue * 100) / maxValue)
}

/**
 * Finds the appropriate value container by searching for its custom-data value
 * 
 * @param {String} dataName < desc | ability | spec | evo | stats >
 * This is the name for the value container you are looking for.
 * @returns Node
 */


function getDetailsValueContainer(dataName) {
  let retNode = null;
  let compDat = "";
  switch(dataName) {
    case "desc":
      compDat = "description-details"
      break;
    case "ability":
      compDat = "abilities-and-type-data"
      break;
    case "spec":
      compDat = "species-details"
      break;
    case "evo":
      compDat = "evolution-details"
      break;
    case "stats":
      compDat = "stats-details"
      break;
    default:
      console.log("The parameter does not match any value container currently available. \n Make sure your parameter match any of these: \n-desc: retrieves the description container\n-ability: retrieves the ability and type container\n-spec: retrieves the species container\n-evo: retrieves the evolution container\n-stats: retrieves the stats container")

  };
  detailsValues.forEach(val => {
    if(val.getAttribute("data-custom-data") == compDat)
      retNode = val;
  })
  return retNode;
}

function getTableElements(sectionId, attributeName, attributeValue = null) {
  let retVal = []
  let childList = getChildList(statsTable)
  childList.forEach(child => {
    if(child.tagName == "TBODY") {
      let tBodyChildren = getChildList(child)
      tBodyChildren.forEach(TBC => {
        if(TBC.getAttribute("data-section").toLowerCase() === sectionId.toLowerCase()) {
          let tbcList = getChildList(TBC)
          tbcList.forEach(tbcChild => {
            retVal.push(tbcChild)
          })
        }
      })
    } else if(child.tagName == "TFOOT") {
      getChildList(child).forEach(footChild => {
        if(footChild.id === "total") {
          getChildList(footChild).forEach(fGC => {
            if(fGC.id === "totalValue")
            retVal.push(fGC)
          })
        }
      })
    }
    
  })
  return retVal
}

function calculateTypeEffect(effectCode) {
  let retValue;
  let retClass;
  let retTitle;
  switch(effectCode) {
    case 0:
      retValue = "0"
      retClass = ""
      retTitle = "100% damage"
      break;
    case 1:
      retValue = "2"
      retClass = "superEffective"
      retTitle = "200% damage"
      break;
    case 2:
      retValue = "4"
      retClass = "doubleSuperEffective"
      retTitle = "400% damage"
      break;
    case -1:
      retValue = "½"
      retClass = "notVeryEffective"
      retTitle = "50% damage"
      break;
    case -2:
      retValue = "¼"
      retClass = "doubleNotVeryEffective"
      retTitle = "25% damage"
      break;
    case null:
      retValue = "0"
      retClass = "noEffect"
      retTitle = "0% damage/No Effect"
      break;
  }
  return [retValue, retClass, retTitle]
}

function getFirstUp(word) {
  let text = word.split("")
  text[0] = text[0].toUpperCase()
  text = text.join("")
  return text
}

function getChildList(nodeVal) {
  return [...nodeVal.children]
}

function clearDetails() {
  pokedexLight.classList.remove("blink")
  pokedexScreen.classList.remove("active")
  detailsImages.forEach(element=>{
    element.src = ""
  })
  setDescription()
  setAbilityandType()
  setBaseStatsDetails()
  setEvolutionInfo()
  setSpeciesDetails()
  nameDetails.textContent = ""
  detailsValueContainer.classList.remove("active")
  nameDetailsContainer.classList.remove("active")
}

function setPokedexImage(nameVal, idVal) {
  let normalImage
  /*
  let shinyImage
  let normalAnimated
  let shinyAnimated
  let megaImage
  let femaleImage
  */

  let getImageLink = () => {
    let foundPokemon = pokemons.find(pokemon => pokemon.id == idVal);
    if (foundPokemon) {
      return foundPokemon.image.hires;
    }
    return '';
  }
  detailsImages.forEach((img) => {
    let newDat = img.getAttribute("data-custom-data")
    if(newDat == "normal") {
      img.src = getImageLink()
      // img.src = "../Pokedex/pokemon-data.json-master/images/pokedex/hires/" + idVal + ".png"
    } 
    /*
    else if(newDat == "shiny") {
      img.src = "../Pokedex/pokemon-data.json-master/images/ShinyGifs/" + nameVal + ".gif"
    }
    */
  })
}

function changeTabs(tabData) {
  detailsTabs.forEach(tab => {
    let newData = tab.getAttribute("data-custom-data")
    if(tabData == newData) {
      tab.classList.add("activeTab")
      detailsValues.forEach(value => {
        let newValDat = value.getAttribute("data-custom-data")
        if(tabData == newValDat) {
          value.classList.remove("hidden")
        } else {
          value.classList.add("hidden")
        }
      })
    } else {
      tab.classList.remove("activeTab")
    }
  })
}


function changeImageVisibility(imgType = "normal") {
  detailsImages.forEach(img => {
    let newDat = img.getAttribute("data-custom-data")
    if(shinyModeValue == "off") {
      if(newDat == "normal") {
        img.classList.remove("hidden")
      } else {
        img.classList.add("hidden")
      }
    } else if(shinyModeValue == "on") {
      if(newDat == "shiny") {
        img.classList.remove("hidden")
      } else {
        img.classList.add("hidden")
    }
    }
  });
  console.log(shinyModeValue)
}

function makeSelectionVisible() {
  for(let entry of pokemonEntries) {
    entry.classList.remove("searchHidden")
  }
}


/*TODO: clean up the code IMPORTANT!!!
clean up the evo cards, maybe create a whole new type for them
expand the evolution to work for the 2 type evolution
add method and level for evos
*/

