import Vue from 'vue'
import { parse } from 'node-html-parser'

function parseHTML(html) {
    const root = parse(html, {
        blockTextElements: {
            pre: false
        }
    })
    return root.removeWhitespace()
}

function fillList(html, selector) {
    const data = parseHTML(html).querySelectorAll(selector)
    let obj = Object.create({})
    let mangas = []
    data.forEach(p => {
        const a = p.firstChild
        const div = p.lastChild
        const pp = div.lastChild

        obj.href = a.attrs.href
        obj.src = a.firstChild.attrs.src
        obj.name = div.firstChild.innerText
        obj.state = pp.firstChild.innerText
        obj.title = pp.lastChild.attrs.title
        obj.new = pp.lastChild.attrs.href
        mangas.push(obj)
        obj = {}
    })
    return mangas
}

Vue.prototype.$fillList = fillList
Vue.prototype.$parse = parseHTML