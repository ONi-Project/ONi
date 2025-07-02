export const html = /*html*/`
<div id="bg-texture" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
  <img src="resources/texture_1.png" />
  <img hidden src="resources/texture_higan.jpg" />
</div>
`

export function init() {
    const e = document.getElementById("main-content-area")!
    e.addEventListener('scroll', function () {
        let scrollTop = e.scrollTop
        let parallaxSpeed = 0.2

        let bgTexture = document.getElementById('bg-texture')!
        bgTexture.style.top = -(scrollTop * parallaxSpeed) / 10 + '%'
    })
}