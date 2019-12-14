const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("#main")

fetch(TRAINERS_URL)
    .then(function(response){
        return response.json()
    })
    .then(function(response){
        createTrainerCard(response)
    })

const createTrainerCard = function(response){
    response.forEach(function(trainer){

        const card = document.createElement("div")
        card.setAttribute("class","card")
        card.setAttribute("data-id", `${trainer.id}`)
        main.appendChild(card)

        const trainerName = trainer.name
        const trainerNameTag = document.createElement("p")
        trainerNameTag.innerHTML = trainerName
        card.appendChild(trainerNameTag)

        const addButton = document.createElement("button")
        addButton.setAttribute("data-trainer-id",`${trainer.id}`)
        addButton.innerHTML = "Add Pokemon"
        card.appendChild(addButton)

        const list = document.createElement("ul")
        card.appendChild(list)

        trainer.pokemons.forEach(function(pokemon){
            createPokemonListItem(pokemon, list)
        })
    })
}
let createPokemonListItem = function(pokemon, list){
    const listItem = document.createElement("li")
    listItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    list.appendChild(listItem)

    const release = document.createElement("button")
    release.setAttribute("class", "release")
    release.setAttribute("data-pokemon-id", `${pokemon.id}`)
    release.innerHTML = "Release"

    listItem.appendChild(release)
}

document.addEventListener("click", function(e){
    console.log(e)
    console.log(e.target.attributes[0].value)
    if(e.target.tagName == "BUTTON")
        if(e.target.innerHTML == "Add Pokemon")
            fetch(`${POKEMONS_URL}`, {
                method: 'POST',
                
                body: JSON.stringify({
                    trainer_id: parseInt(e.target.attributes[0].value)
                }),
                
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response){
                return response.json()
            })
            .then(function(pokemon){
                card = e.target.parentElement
                listArray = card.getElementsByTagName('ul')
                list = listArray[0]
                createPokemonListItem(pokemon, list)
            })
        
        if(e.target.innerHTML == "Release")
            fetch(`${POKEMONS_URL}/${e.target.attributes[1].value}`, {
                method: 'DELETE',

                body: JSON.stringify({
                    id: parseInt(e.target.attributes[1].value)
                }),

                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                return response.json()
            }).then(function(pokemon){

            })
})




