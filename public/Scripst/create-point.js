//console.log("hello");

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos")
    .then((res)=>{return res.json()})
    .then(states =>{
        for(state of states){
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }
                
    })
}
populateUfs()

function getCitys(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    ufSelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then((res)=>{return res.json()})
    .then(cities =>{
        for(city of cities){
            ufSelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCitys)

//itens de coleta, pegar todos os lis
const itensToColect = document.querySelectorAll(".items-CanvasGradient li")
for(const item of itensToColect){
    item.addEventListener("click", handelSelectedItem)
}
 const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []
function handelSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe com JavaScript
    itemLi.classList.toggle("selected")
    const itemID = event.target.dataSet.id;
    //pegar item selecionados
    //console.log('item ID: ',itemID);
    const alredySelected =selectedItems.findIndex((item)=>{
        const itemFound = item == itemID
        return itemFound
    })
    //console.log(alredySelected!=-1)
    if(alredySelected>=0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDiferent = item != itemID
            return itemIsDiferent
        })
        selectedItems = filteredItems
    }else{
        selectedItems.push(itemID)
    }
    collectedItems.value=selectedItems
    //console.log('Selected items: ',alredySelected);
}