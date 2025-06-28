import { Dialog } from "mdui"

export const html = /*html*/`
<div id="tool__content" class="panel-content" hidden>

    <div class="grid-l">
        <mdui-card class="card animate__animated animate__fadeInUp animate__faster" variant="filled" id="tool__power-convert">
            <div class="card-title">
                <mdui-icon name="power" style="font-size: 32px;margin-right: 0.35rem;align-self: center;"></mdui-icon>
                <div style="text-align: center;">功率转换</div>
            </div>
            <div style="opacity: 0.5;font-size: large;">输入功率</div>
            <div style="display: flex;align-items: center;gap: 1rem;">
                <mdui-text-field id="tool__power-convert-input-a" type="number" toggle-password label="电流 (A)"></mdui-text-field>
                <mdui-text-field id="tool__power-convert-input-v" style="cursor: pointer;" level="1" label="电压等级" readonly value="LV (32V)"></mdui-text-field>
            </div>
            <div style="opacity: 0.5;font-size: large;">输出功率</div>
            <div class="power-box-1">
                LV: <b><span class="power-1"></span></b> A
            </div>
            <div class="power-box-2">
                MV: <b><span class="power-2"></span></b> A
            </div>
            <div class="power-box-3">
                HV: <b><span class="power-3"></span></b> A
            </div>
            <div class="power-box-4">
                EV: <b><span class="power-4"></span></b> A
            </div>
            <div class="power-box-5">
                IV: <b><span class="power-5"></span></b> A
            </div>
            <div class="power-box-6">
                LuV: <b><span class="power-6"></span></b> A
            </div>
            <div class="power-box-7">
                ZPM: <b><span class="power-7"></span></b> A
            </div>
            <div class="power-box-8">
                UV: <b><span class="power-8"></span></b> A
            </div>
            <div class="power-box-9">
                UHV: <b><span class="power-9"></span></b> A
            </div>
            <div class="power-box-10">
                UEV: <b><span class="power-10"></span></b> A
            </div>
            <div class="power-box-11">
                UIV: <b><span class="power-11"></span></b> A
            </div>
            <div class="power-box-12">
                UMV: <b><span class="power-12"></span></b> A
            </div>
            <div class="power-box-13">
                UXV: <b><span class="power-13"></span></b> A
            </div>
            <div class="power-box-14">
                MAX: <b><span class="power-14"></span></b> A
            </div>
        </mdui-card>
        <mdui-card class="card animate__animated animate__fadeInUp animate__faster" variant="filled">
            test
        </mdui-card>
        <mdui-card class="card animate__animated animate__fadeInUp animate__faster" variant="filled">
            test
        </mdui-card>
        <mdui-card class="card animate__animated animate__fadeInUp animate__faster" variant="filled">
            test
        </mdui-card>
        <mdui-card class="card animate__animated animate__fadeInUp animate__faster" variant="filled">
            test
        </mdui-card>
    </div>

    <mdui-dialog id="tool__power-convert-select-dialog" close-on-overlay-click>
        <mdui-list>
            <mdui-list-item active value="1" class="tool__power-convert-select-dialog-button">LV (32V)</mdui-list-item>
            <mdui-list-item value="2" class="tool__power-convert-select-dialog-button">MV (128V)</mdui-list-item>
            <mdui-list-item value="3" class="tool__power-convert-select-dialog-button">HV (512V)</mdui-list-item>
            <mdui-list-item value="4" class="tool__power-convert-select-dialog-button">EV (2048V)</mdui-list-item>
            <mdui-list-item value="5" class="tool__power-convert-select-dialog-button">IV (8192V)</mdui-list-item>
            <mdui-list-item value="6" class="tool__power-convert-select-dialog-button">LuV (32768V)</mdui-list-item>
            <mdui-list-item value="7" class="tool__power-convert-select-dialog-button">ZPM (131072V)</mdui-list-item>
            <mdui-list-item value="8" class="tool__power-convert-select-dialog-button">UV (524288V)</mdui-list-item>
            <mdui-list-item value="9" class="tool__power-convert-select-dialog-button">UHV (2097152V)</mdui-list-item>
            <mdui-list-item value="10" class="tool__power-convert-select-dialog-button">UEV (8388608V)</mdui-list-item>
            <mdui-list-item value="11" class="tool__power-convert-select-dialog-button">UIV (33554432V)</mdui-list-item>
            <mdui-list-item value="12" class="tool__power-convert-select-dialog-button">UMV (134217728V)</mdui-list-item>
            <mdui-list-item value="13" class="tool__power-convert-select-dialog-button">UXV (536870912V)</mdui-list-item>
            <mdui-list-item value="14" class="tool__power-convert-select-dialog-button">MAX (2147483648V)</mdui-list-item>
        </mdui-list>
    </mdui-dialog>

</div>
`

export function init() {
    const powerConvertSelectDialog = document.getElementById("tool__power-convert-select-dialog") as Dialog

    document.getElementById("tool__power-convert-input-v")!.addEventListener("click", (event) => {
        const selectedLevel = (event.target as HTMLElement).getAttribute("level")
        document.querySelectorAll(".tool__power-convert-select-dialog-button").forEach((button) => {
            button.removeAttribute("active")
            if (button.getAttribute("value") == selectedLevel) {
                button.setAttribute("active", "")
            }
        })
        powerConvertSelectDialog.open = true
    })

    document.querySelectorAll(".tool__power-convert-select-dialog-button").forEach((button) => {
        button.addEventListener("click", (event) => {
            const value = parseInt(button.getAttribute("value")!)
            const input = document.getElementById("tool__power-convert-input-v") as HTMLInputElement
            input.setAttribute("level", value.toString())
            input.value = (event.target as HTMLElement).innerText
            powerConvertSelectDialog.open = false
            updatePowerConvert()
        })
    })

    document.getElementById("tool__power-convert-input-a")!.addEventListener("input", () => {
        updatePowerConvert()
    })

    function updatePowerConvert() {
        const voltageMap = [
            32,
            128,
            512,
            2048,
            8192,
            32768,
            131072,
            524288,
            2097152,
            8388608,
            33554432,
            134217728,
            536870912,
            2147483648
        ]

        const inputA = Number((document.getElementById("tool__power-convert-input-a") as HTMLInputElement).value)
        const level = Number((document.getElementById("tool__power-convert-input-v") as HTMLInputElement).getAttribute("level")!)
        const inputV = voltageMap[level - 1]

        const power = inputA * inputV

        console.log(power, inputA, inputV, level)

        const resultLv = power / voltageMap[1 - 1]
        const resultMv = power / voltageMap[2 - 1]
        const resultHv = power / voltageMap[3 - 1]
        const resultEv = power / voltageMap[4 - 1]
        const resultIv = power / voltageMap[5 - 1]
        const resultLuv = power / voltageMap[6 - 1]
        const resultZpm = power / voltageMap[7 - 1]
        const resultUv = power / voltageMap[8 - 1]
        const resultUhv = power / voltageMap[9 - 1]
        const resultUev = power / voltageMap[10 - 1]
        const resultUiv = power / voltageMap[11 - 1]
        const resultUmv = power / voltageMap[12 - 1]
        const resultUxv = power / voltageMap[13 - 1]
        const resultMax = power / voltageMap[14 - 1]

        const card = document.getElementById("tool__power-convert")!

        // const powerBoxLv = card.querySelector(".power-box-1") as HTMLSpanElement
        // const powerBoxMv = card.querySelector(".power-box-2") as HTMLSpanElement
        // const powerBoxHv = card.querySelector(".power-box-3") as HTMLSpanElement
        // const powerBoxEv = card.querySelector(".power-box-4") as HTMLSpanElement
        // const powerBoxIv = card.querySelector(".power-box-5") as HTMLSpanElement
        // const powerBoxLuv = card.querySelector(".power-box-6") as HTMLSpanElement
        // const powerBoxZpm = card.querySelector(".power-box-7") as HTMLSpanElement
        // const powerBoxUv = card.querySelector(".power-box-8") as HTMLSpanElement
        // const powerBoxUhv = card.querySelector(".power-box-9") as HTMLSpanElement
        // const powerBoxUev = card.querySelector(".power-box-10") as HTMLSpanElement
        // const powerBoxUiv = card.querySelector(".power-box-11") as HTMLSpanElement
        // const powerBoxUmv = card.querySelector(".power-box-12") as HTMLSpanElement
        // const powerBoxUxv = card.querySelector(".power-box-13") as HTMLSpanElement
        // const powerBoxMax = card.querySelector(".power-box-14") as HTMLSpanElement

        card.querySelector(".power-1")!.innerHTML = resultLv.toFixed(2)
        card.querySelector(".power-2")!.innerHTML = resultMv.toFixed(2)
        card.querySelector(".power-3")!.innerHTML = resultHv.toFixed(2)
        card.querySelector(".power-4")!.innerHTML = resultEv.toFixed(2)
        card.querySelector(".power-5")!.innerHTML = resultIv.toFixed(2)
        card.querySelector(".power-6")!.innerHTML = resultLuv.toFixed(2)
        card.querySelector(".power-7")!.innerHTML = resultZpm.toFixed(2)
        card.querySelector(".power-8")!.innerHTML = resultUv.toFixed(2)
        card.querySelector(".power-9")!.innerHTML = resultUhv.toFixed(2)
        card.querySelector(".power-10")!.innerHTML = resultUev.toFixed(2)
        card.querySelector(".power-11")!.innerHTML = resultUiv.toFixed(2)
        card.querySelector(".power-12")!.innerHTML = resultUmv.toFixed(2)
        card.querySelector(".power-13")!.innerHTML = resultUxv.toFixed(2)
        card.querySelector(".power-14")!.innerHTML = resultMax.toFixed(2)

    }
}