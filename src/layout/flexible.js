
(function flexible(window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = 12 * dpr + 'px'
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize()

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        const clientWidth = docEl.clientWidth
        var cellWidth = 20
        // 768px 时候切换到移动端模式
        if (clientWidth <= 768) {
            cellWidth = 10
        } else if (clientWidth >= 800 && clientWidth <= 1024) {
            cellWidth = 16
        } else if (clientWidth >= 1280 && clientWidth <= 1366) {
            cellWidth = 18
        } else if (clientWidth >= 1600 && clientWidth < 1920) {
            cellWidth = 20 // 对应的 aside 为3.5
        } else if (clientWidth >= 1920) {
            cellWidth = 24
        }

        var rem = clientWidth / cellWidth
        // console.log('setRemUnit...', rem);
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
})(window, document)
