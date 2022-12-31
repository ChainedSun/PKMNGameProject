const filterContainer = document.getElementById("typeListContainer");
const pokemonList = document.getElementById("pokemonList");
const imageFilePathLocal = "../Pokedex/pokemon-data.json-master/images/pokedex/thumbnails/"
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
          newImg.src = imageFilePathLocal + fileName + idNum + imageFileExtension
        else{
          console.log(`Image was not found on path: ${localLink}`)
          newImg.src = imageFilePathLocal + fileName + idNum + imageFileExtension
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
    console.log("AllVisible")
    makeSelectionVisible()
  } else {
    console.log(words, idNumbers)
    let newText = words.concat(idNumbers)
    //console.log(newText)
    pokemonEntries.forEach(entry => {
      checkPokemonEntriesForSearching(entry, newText)
    })
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

function checkPokemonEntriesForSearching(pEntry, textToMatch) {
  //ill make the search input take comma separated entries and search for all matching cardsif(child.classList.contains("cardName")) 
  // let pokeName = child.textContent.toLowerCase()
  // if(pokeName.includes(word.toLowerCase())) {
  //   //console.log(pokeName, text)
  //   pEntry.classList.remove("searchHidden")
  // } else {
  //   pEntry.classList.add("searchHidden")
  // }
  let childList = [...pEntry.children]
  let entryName = null
  let entryId = null
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
    if(Number.isNaN(word) == false) {
      console.log("Not a Number!")
      if(entryName.inculdes(word.toLowerCase())) {
        if(pEntry.classList.contains("searchHidden")) {
          pEntry.classList.remove("searchHidden")
        }
      } else {
        pEntry.classList.add("searchHidden")
      }
    } else {

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
  for(let c of card.children) {
    if(c.classList.contains("pokemonId")) {
      let idVal = parseInt(c.textContent.replace("#", ""))
      for(let e of pokemons) {
        if(e["id"] == idVal) {
          /*let dImg = document.getElementById("detailsImage")
          let source = "../Pokedex/pokemon-data.json-master/images/ShinyGifs/" + e["name"]["english"] + ".gif"
          dImg.src = source*/
          setPokedexImage(e["name"]["english"], c.textContent.replace("#", ""))
          setDescription(e["description"])
          setAbilityandType(e["type"], e["profile"]["ability"])
          nameDetails.textContent = e["name"]["english"]
        }
      }
    }
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

  if(!(abilityList.length < 1)) {
    aOne.textContent = abilityList[0][0]
    if(abilityList.length > 1) {
      if(abilityList[1][1] == "true") {
        aTwo.textContent = ""
        hA.textContent = abilityList[1][0]
      } else {
        aTwo.textContent = abilityList[1][0]
        hA.textContent = abilityList[2][0]
      }
    } else {
      aTwo.textContent = ""
      hA.textContent = ""
    }
    
  } else {
    aOne.textContent = ""
    aTwo.textContent = ""
    hA.textContent = ""
  }

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

function setSpeciesDetails(textVal = "") {
  let descNode = getDetailsValueContainer("spec")

}

function setEvolutionInfo(textVal = "") {
  let descNode = getDetailsValueContainer("evo")

}

function setBaseStatsDetails(textVal = "") {
  let descNode = getDetailsValueContainer("stats")

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

//TODO: clean up the code IMPORTANT!!!!