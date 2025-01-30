!(function () {

})()




// AE ITEM INFO START

function dialog__aeShowItemInfo(aeuuid, id, type) {
    let item = globalAe.find(ae => ae.uuid == aeuuid).itemList.find(item => item.id == id)
    let link = ""

    if (type == "item") {
        link = `item/${item.id}_${item.damage}.png`
    } else if (type == "fluid") {
        link = `fluid/${item.id}.png`
    } else if (type == "vis") {
        link = `vis/${item.id}.png`
    }

    document.getElementById("ae__item-info-dialog-display").innerHTML = item.display
    document.getElementById("ae__item-info-dialog-amount").innerHTML = numberDisplayConvert(item.amount)
    document.getElementById("ae__item-info-dialog-icon").setAttribute("src", `./resources/itempanel/${link}`)
    document.getElementById("ae__item-info-dialog-request-button").disabled = !item.craftable

    document.getElementById("ae__item-info-dialog").open = true
}

document.getElementById("ae__item-info-dialog-close-button").addEventListener("click", event => {
    document.getElementById("ae__item-info-dialog").open = false
})

document.getElementById("ae__item-info-dialog-request-button").addEventListener("click", event => {
    document.getElementById("ae__item-info-dialog").open = false
})

// AE ITEM INFO END