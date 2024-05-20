const apiUrl = "https://pokeapi.co/api/v2/pokemon/"
const btn = document.getElementById("generate-btn")
const pokemonImg = document.getElementById("pokemon-img")
const pokemonName = document.querySelector(".name")
const pokemonHp = document.querySelector(".hp")
const pokemonAttack = document.getElementById("attack-pb")
const pokemonDefense = document.getElementById("defense-pb")
const pokemonSpeed = document.getElementById("speed-pb")
const type = document.querySelector(".types")

function getRandomBrightColorRGB() {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    return [`rgb(${r}, ${g}, ${b})`, `rgba(${r}, ${g}, ${b}, 0.4)`];
}
const generateNewTheme = () =>{
    const newColor = getRandomBrightColorRGB()
    const root = document.documentElement;
    root.style.setProperty('--main-color', newColor[0])
    root.style.setProperty('--bg-color', newColor[1])
}
const generateCard = () =>{
    type.innerHTML = ""
    generateNewTheme()
    const id = Math.floor(Math.random() * 150) + 1;
    fetch(apiUrl + id).then((resp) => resp.json()).then((data) =>{
        pokemonImg.setAttribute("src", data.sprites.other.dream_world.front_default)
        console.log(data)
        pokemonHp.innerHTML = `<p class="hp">HP: <span>${data.stats[0].base_stat}</span></p>`
        pokemonName.innerHTML = `<p class="name">Name: <span>${data.name}</span></p>`
        const tmpType = document.createElement("p")
        tmpType.setAttribute("id", "type-1")
        tmpType.innerText = data.types[0].type.name
        type.appendChild(tmpType)
        if (data.types.length > 1)
        {
            const tmpType2 = document.createElement("p")
            tmpType2.setAttribute("id", "type-1")
            tmpType2.innerText = data.types[1].type.name
            type.appendChild(tmpType2)
        }
        pokemonAttack.style.setProperty("width", data.stats[1].base_stat >= 100 ? "100%" : `${data.stats[1].base_stat}%`)
        pokemonDefense.style.setProperty("width", data.stats[2].base_stat >= 100 ? "100%" : `${data.stats[2].base_stat}%`)
        pokemonSpeed.style.setProperty("width", data.stats[5].base_stat >= 100 ? "100%" : `${data.stats[5].base_stat}%`)
    })

}
btn.addEventListener('click', generateCard)

window.addEventListener("load", generateCard)
