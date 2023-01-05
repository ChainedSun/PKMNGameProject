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
const evoContainers = document.querySelectorAll("#evolutionStageContainer")

const evoEevee = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "eevee" || undefined)
const evo6 = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "6" || undefined)
const evo5 = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "5" || undefined)
const evo4 = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "4" || undefined)
const evo3 = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "3" || undefined)
const evo2 = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "2" || undefined)
const evo1 = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "1" || undefined)
const evoNA = Array.prototype.find.call(evoContainers, element => element.getAttribute("data-type") === "0" || undefined)

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
    //console.log(pokemons[p]["name"]["english"])
    let newDiv = document.createElement("div")
    newDiv.addEventListener("click", function(event) {
      pokemonCardSelected(event.target)
    })
    newDiv.id = "pokemonEntry"

    let newImg = document.createElement("img")
    newImg.id = "pokemonImage"

    let idNum = pokemons[p]["id"]
    let pokeName = pokemons[p]["name"]["english"]
    let condition = idNum.toString().length
    let fileName = ""
    if(condition < 3 ) {
      if(condition < 2) {
        fileName = "00"
      } else if(condition == 2) {
        fileName = "0"
      }
    }

    //let localLink = imageFilePathLocal + fileName + idNum + imageFileExtension
    //newImg.src = imageFilePathLocal + fileName + idNum + imageFileExtension
    let localLink = altImageFilePathLocal + pokeName + altImageFileExtension
    fetch(localLink) 
      .then(response => {
        if(response.ok)
          //newImg.src = altImageFilePathLocal + pokeName + altImageFileExtension
          newImg.src = imageFilePathLocal + idNum + imageFileExtension
        else{
          console.log(`Image was not found on path: ${localLink}`)
          newImg.src = imageFilePathLocal  + idNum + imageFileExtension
        }
      })

      .catch(error => {
        //console.log(`There was an error loading the image from path: ${localLink}`)
      })
    //newImg.src = altImageFilePathLocal + pokeName + altImageFileExtension
    //newDiv.classList.add("notOwned")
    let newId = document.createElement("p")
    newId.id = "pokedexIndex"
    newId.classList.add("pokemonId")
    newId.textContent = ("#" + fileName + idNum)
    let newEntryName = document.createElement("p")
    newEntryName.classList.add("cardName")
    newEntryName.id = "cardName"
    newEntryName.textContent = pokemons[p]["name"]["english"]
    //type on the bottom of the card
    let newType = document.createElement("div")
    newType.classList.add("entryTypeContainer")
    let typeSize = pokemons[p]["type"].length
    for(var t = 0; t < typeSize; t++) {
      let newTypeDiv = document.createElement("div")
      if(typeSize > 1) {
        newType.classList.add("dualType")
        if (t == 0) {
          newTypeDiv.classList.add(pokemons[p]["type"][t].toLowerCase(), "entryTypeLeft")
        } else {
          newTypeDiv.classList.add(pokemons[p]["type"][t].toLowerCase(), "entryTypeRight")
        }
      } else {
        newTypeDiv.classList.add(pokemons[p]["type"][t].toLowerCase(), "entryType")
        newType.classList.add("singleType")
      }
      newTypeDiv.appendChild(document.createTextNode(pokemons[p]["type"][t]))
      newDiv.classList.add(pokemons[p]["type"][t].toLowerCase())
      newType.appendChild(newTypeDiv)
    }

    newDiv.appendChild(newEntryName)
    newDiv.appendChild(newImg)
    newDiv.appendChild(newId)
    newDiv.appendChild(newType)
    pokemonList.appendChild(newDiv)
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

// resetButton.addEventListener("click", function(){
//   deselectAllCards()
// })

function applyFilter(target = null) {
  if(target == null) {

  } else {
    let newFindNode = findMatchingNode(target, "filter", "id", "parent")
    console.log(newFindNode)
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
  //console.log(newString)
  newString.forEach(word => {
    let sepWord = word.replace(/[ ,\\,/,>,<,:,",',`,!,@,#,$,%,^,&,*,(,),_,+,-,=]/g, "")
    sepWord = sepWord.split("")
    let text = sepWord.filter(t => isNaN(t))
    let num = sepWord.filter(n => !isNaN(n))
    

    if(text != "") {
      text = text.join("")
      words.push(text)
    }
    //console.log(num, typeof(num))
    num = num.join("")
    num = parseInt(num)
    //console.log(Number.isNaN(num), num, typeof(num))
    if(Number.isNaN(num) === false) {
      // num = num.join("")
      // num = parseInt(num)
      idNumbers.push(num)
    }
    
  })
  if(words.length <= 0 && idNumbers.length <= 0) {
    // console.log("AllVisible")
    makeSelectionVisible()
  } else {
    let newText = words.concat(idNumbers)
    //console.log(newText)
    checkPokemonEntriesForSearching(newText)
  }
  // if(text == "" && numbers == NaN) {
  //  makeSelectionVisible()
  // } else {
  //   console.log(text, numbers)
  //   for(let entry of pokemonEntries) {
  //     checkPokemonEntriesForSearching(entry, text, numbers)
  //   }
  // }
}

function checkPokemonEntriesForSearching(textToMatch) {
  //ill make the search input take comma separated entries and search for all matching cardsif(child.classList.contains("cardName")) 
  // let pokeName = child.textContent.toLowerCase()
  // if(pokeName.includes(word.toLowerCase())) {
  //   //console.log(pokeName, text)
  //   pEntry.classList.remove("searchHidden")
  // } else {
  //   pEntry.classList.add("searchHidden")
  // }
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
    //console.log(entryName, entryId)
    textToMatch.forEach(word=> {
      if(typeof(word) === "string") {
        // console.log("Not a Number!")
        if(entryName.includes(word.toLowerCase())) {
          entry.classList.remove("searchHidden")
          matchFound = true
          return
        }
          
      } else {
        if(typeof(word) === "number") {
          // console.log("is a Number!")
          entryId = entryId.toString()
          word = word.toString()
          // console.log(entryId, word)
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
  //console.log(node)
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
  //maybe open details and close when nothing is selected
  //something like expanding the details page overtime and when fully expanded reveal items inside
  //look into creating tabs
  //have gifs and mega animation added on tabs
}

function populateDetails(card) {
  console.log(typeof(card))
  if(typeof(card) === "object") {
    for(let c of card.children) {
      if(c.classList.contains("pokemonId")) {
        let idVal = parseInt(c.textContent.replace("#", ""))
        for(let e of pokemons) {
          if(e["id"] === idVal) {
            /*let dImg = document.getElementById("detailsImage")
            let source = "../Pokedex/pokemon-data.json-master/images/ShinyGifs/" + e["name"]["english"] + ".gif"
            dImg.src = source*/
            setPokedexImage(e["name"]["english"], idVal)
            setDescription(e["description"])
            setAbilityandType(e["type"], e["profile"]["ability"])
            let newProfile = e["profile"]
            newProfile["species"] = e["species"]
            setSpeciesDetails(newProfile)
            setEvolutionInfo(idVal, e["evolution"])
            setBaseStatsDetails(e["base"])
            nameDetails.textContent = e["name"]["english"]
          }
        }
      }
    }
  } else if(typeof(card) === "number" || typeof(card) === "string") {
    let newIndex
    if(typeof(card) === "string") newIndex = Number.parseInt(card); else newIndex = card
  }
  //fill details here with loops
  //use the dexID to find the pokemon in the database
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
  // if(!abilityList.some(Array.isArray)) {
  //   if(!(abilityList.length < 1)) {
  //     aOne.textContent = abilityList[0][0]
  //     if(abilityList.length > 1) {
  //       if(abilityList[1][1] == "true") {
  //         aTwo.textContent = "-"
  //         hA.textContent = abilityList[1][0]
  //       } else {
  //         aTwo.textContent = abilityList[1][0]
  //         hA.textContent = abilityList[2][0]
  //       }
  //     } else {
  //       aTwo.textContent = "-"
  //       hA.textContent = "-"
  //     }
      
  //   } else {
  //     aOne.textContent = "-"
  //     aTwo.textContent = "-"
  //     hA.textContent = "-"
  //   }
  // } else {
  //   aOne.textContent = abilityList[0]
  // }
  let descNode = getDetailsValueContainer("ability")
  let containerChildren = [...descNode.children]
  let typeEffChart = {}
  let typeChartNode = null
  // for(let i = 0; i < types.length; i++) {
  //   typeEffChart[types[i]["english"]] = 0
  // }
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

          //typeEffChart
        })

      }
      let typeNodeList = [...child.children]
      typeNodeList.forEach(typeNodeChild => {
        let tDat = typeNodeChild.getAttribute("data-type-data")
        tDat = getFirstUp(tDat)
        let calcArr = calculateTypeEffect(typeEffChart[tDat])
        // let typeNodeElements = [...typeNodeChild.children]
        // for(let typeElement of typeNodeElements) {
        //   console.log(typeElement)
        // }
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

  

  // console.log(typeEffChart)
}

function setSpeciesDetails(profile = "") {
  //let descNode = getDetailsValueContainer("spec")
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

function setEvolutionInfo(pokemonId, evoProfile = {}) {
  // track()
  let indexArr = []
  // let levelArr = []
  let imagesArr = []
  let type = 0
  //console.log(evoProfile)
  let firstEvo
  let nextEvo
  let lastEvo
  if(Object.keys(evoProfile).length === 0) {
    //console.log("Empty")
    // //type = 0
    evoNA.classList.remove("hidden")
    evo1.classList.add("hidden")
    evo2.classList.add("hidden")
    evo3.classList.add("hidden")
    evo4.classList.add("hidden")
    //console.log(typeof(evo2), typeof(evo1), typeof(evoNA))
  } else if(Object.keys(evoProfile).length >= 1) {
    //console.log("here")
    if(evoProfile.hasOwnProperty("prev") && evoProfile.hasOwnProperty("next")) {
      //console.log(evoProfile["prev"], evoProfile["next"])
      evoNA.classList.add("hidden")
      evo1.classList.add("hidden")
      evo2.classList.remove("hidden")
      nextEvo = evoProfile
      firstEvo = requestEvolutionInformation(nextEvo["prev"][0])
      lastEvo = requestEvolutionInformation(nextEvo["next"][0])
      type = 2
      indexArr.push(nextEvo["prev"][0], firstEvo["next"][0], nextEvo["next"][0])
      // console.log(indexArr)
    } 
    
    else if(evoProfile.hasOwnProperty("prev") && !evoProfile.hasOwnProperty("next")) {
      lastEvo = evoProfile
      nextEvo = requestEvolutionInformation(evoProfile["prev"][0])
      if(Object.keys(nextEvo).length > 1) {
        evoNA.classList.add("hidden")
        evo1.classList.add("hidden")
        evo2.classList.remove("hidden")
        firstEvo = requestEvolutionInformation(nextEvo["prev"][0])
        indexArr.push(nextEvo["prev"][0], firstEvo["next"][0], nextEvo["next"][0])
        type = 2
      } else {
        evoNA.classList.add("hidden")
        evo1.classList.remove("hidden")
        evo2.classList.add("hidden")
        firstEvo = nextEvo
        indexArr.push(lastEvo["prev"][0], firstEvo["next"][0])
        type = 1
      }
      // console.log(indexArr)
    } 
    
    else if(!evoProfile.hasOwnProperty("prev") && evoProfile.hasOwnProperty("next")) {
      firstEvo = evoProfile
      nextEvo = requestEvolutionInformation(evoProfile["next"][0])
      if(Object.keys(nextEvo).length > 1) {
        evoNA.classList.add("hidden")
        evo1.classList.add("hidden")
        evo2.classList.remove("hidden")
        lastEvo = requestEvolutionInformation(nextEvo["next"][0])
        indexArr.push(nextEvo["prev"][0], firstEvo["next"][0], nextEvo["next"][0])
        type = 2
      } else {
        evoNA.classList.add("hidden")
        evo1.classList.remove("hidden")
        evo2.classList.add("hidden")
        lastEvo = requestEvolutionInformation(firstEvo["next"][0])
        indexArr.push(lastEvo["prev"][0], firstEvo["next"][0])
        type = 1
      }
      // console.log(indexArr)
    }

    
    console.log(lastEvo)
    // let newArr = Object.entries(evoProfile).map(([key, value]) => [key, value])
    // for(let evImage of evolutionImages) {
    //   if (evImage.getAttribute("data-stage") === "0") {
    //     //evImage.src = imageFilePathLocal + fileName + newArr[0][0] + imageFileExtension
    //     evImage.src = imageFilePathLocal + newArr[0][1][0] + imageFileExtension
    //   }
    // }
  }

  switch(type) {
    case 0:
      cleanOutChildren()
      break;
    case 1:
      let containerChildren = [...evo1.children]
      let newArr = []
      containerChildren.forEach(child => {
        if(child.id == "evolutionStage") {
          newArr.push(child)
        }
      })
      for(let i = 0; i < newArr.length; i++) {
        let newEntry = null
        pokemonEntries.forEach(entry => {
          if(newEntry === null) {
            [...entry.children].forEach(child => {
              if(child.id == "pokedexIndex") {
                let newIndex = child.textContent
                newIndex = newIndex.replace("#","")
                newIndex = Number.parseInt(newIndex)
                if(newIndex == indexArr[i]) {
                  newEntry = entry.cloneNode(true)
                  newEntry.classList.remove("searchHidden")
                  newEntry.classList.remove("hidden")
                  newEntry.addEventListener("click", function(event) {
                    pokemonCardSelected(event.target)
                  })
                  return
                }
              }
            })
          } else {
            return
          }
        })
        newArr[i].appendChild(newEntry)
      }
    break;
    case 2:
      let evo2ContainerChildren = [...evo2.children]
      let evo2NewArr = []
      evo2ContainerChildren.forEach(child => {
        if(child.id == "evolutionStage") {
          evo2NewArr.push(child)
        }
      })
      for(let i = 0; i < evo2NewArr.length; i++) {
        let newEntry = null
        pokemonEntries.forEach(entry => {
          if(newEntry === null) {
            [...entry.children].forEach(child => {
              if(child.id == "pokedexIndex") {
                let newIndex = child.textContent
                newIndex = newIndex.replace("#","")
                newIndex = Number.parseInt(newIndex)
                if(newIndex == indexArr[i]) {
                  newEntry = entry.cloneNode(true)
                  newEntry.classList.remove("searchHidden")
                  newEntry.classList.remove("hidden")
                  newEntry.addEventListener("click", function(event) {
                    pokemonCardSelected(event.target)
                  })
                  return
                }
              }
            })
          } else {
            return
          }
        })
        evo2NewArr[i].appendChild(newEntry)
      }

    break;
  }
  

}

function requestEvolutionInformation(pokemonIndex) {
  let newObj = {}
  pokemons.forEach(pe => {
    if(pe["id"] == pokemonIndex) {
      newObj = pe["evolution"]
    }
  })
  return newObj
}

function cleanOutChildren(childList = null) {
  if(childList === null) {
    cleanOutChildren([...evoEevee.children])
    cleanOutChildren([...evo6.children])
    cleanOutChildren([...evo5.children])
    cleanOutChildren([...evo4.children])
    cleanOutChildren([...evo3.children])
    cleanOutChildren([...evo2.children])
    cleanOutChildren([...evo1.children])
  } else {
    childList.forEach(child => {
      if(child.id == "evolutionStage") {
        [...child.children].forEach(c => {
          child.removeChild(c)
        })
      }
    })
  }
}


function setBaseStatsDetails(baseStats = "") {
  console.log(baseStats)
  for(let key of Object.keys(baseStats)) {
    let tableElements = getTableElements(key,"id")
    tableElements.forEach(el => {
      //console.log(el.id)
      if(el.id === "baseValue") {
        el.textContent = baseStats[key]
      } else if(el.id === "totalValue") {
        let sum = 0
        for(let keyVal of Object.keys(baseStats)) {
          sum += Number.parseInt(baseStats[keyVal])
        }
        //console.log(sum)
        el.textContent = sum
        //console.log(typeof(sum))
      }
    })
    //console.log(tableElements)
  }
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
    //console.log(child.tagName)
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
      //console.log("Child:", child)
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
  // detailsValues.forEach(val => {
  //   let c = [...val.children]
  //   if (!(c.length < 1)) {
  //     c.forEach(child => {
  //       if(child.id == "textValue")
  //         child.textContent = ""
  //     })
  //   }
  //   else
  //     val.textContent = ""
  // })
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
  detailsImages.forEach((img)=>{
    let newDat = img.getAttribute("data-custom-data")
    if(newDat == "normal") {
      img.src = "../Pokedex/pokemon-data.json-master/images/pokedex/hires/" + idVal + ".png"
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

function showDetails(value) {
  //value is the pokemon card

}

function getEntryData() {
  
}

/*TODO: clean up the code IMPORTANT!!!
clean up the evo cards, maybe create a whole new type for them
expand the evolution to work for the 2 type evolution
add method and level for evos
*/

