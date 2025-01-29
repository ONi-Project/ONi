import * as blockRenderer from "./block"
import * as cardRenderer from "./card"
import * as tabRenderer from "./tab"
// 渲染布局
export async function renderLayout(layout: any, element: any, animation = true) {
    console.log(layout)
    let result = ""
    let cardScriptList = new Set()
    let tabScriptList = new Set()
    for (let block of layout) {
        let inner = ""
        for (let item of block.content) {
            if (item.type == "card") {
                const cardIdCamelCase = toCamelCase(item.id)
                cardScriptList.add(cardIdCamelCase)
                inner += cardRenderer.html[cardIdCamelCase as keyof typeof cardRenderer.html](item.config)
            } else if (item.type == "tab") {
                const tabIdCamelCase = toCamelCase(item.id)
                tabScriptList.add(tabIdCamelCase)
                inner += tabRenderer.html[tabIdCamelCase as keyof typeof tabRenderer.html](item.config)
            }
        }
        const blockTypeCamelCase = toCamelCase(block.type)
        result += blockRenderer.html[blockTypeCamelCase as keyof typeof blockRenderer.html](inner)
    }

    element.innerHTML = result

    setTimeout(() => {
        cardScriptList.forEach((cardIdCamelCase) => {
            cardRenderer.init[cardIdCamelCase as keyof typeof cardRenderer.init]()
        })
        tabScriptList.forEach((tabIdCamelCase) => {
            tabRenderer.init[tabIdCamelCase as keyof typeof tabRenderer.init]()
        })
    }, 100)

    if (animation) { generateLayoutAnimation(element) }
}

// 布局动画生成
function generateLayoutAnimation(element: HTMLElement) {
    Array.from(element.children).forEach((block) => {
        if (block.classList.contains("grid-full")) {
            block.classList.add("animate__animated", "animate__fadeIn", "animate__faster")
        } else {
            Array.from(block.children).forEach((card, indexCard) => {
                if (card instanceof HTMLElement) {
                    card.style.animationDelay = `${(indexCard) * 0.03}s`
                    card.classList.add("animate__animated", "animate__fadeInUp", "animate__faster")
                } else {
                    console.error("card error")
                }
            })
        }
    })
}

function toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase())
}