const tab = document.getElementById('tab')

const casas = []

let proximo = 'X'

for (let i = 0; i < 3; i++) {
    casas.push([])
    for (let j = 0; j < 3; j++) {
        casas[i].push({ i: i, j: j, content: null })
        let casa = document.createElement('button')
        casa.setAttribute('class', 'casa')
        casa.setAttribute('id', `i${i}j${j}`)
        casa.setAttribute("onclick", `marcarCasa(${i}, ${j})`);
        tab.appendChild(casa)
    }
}

const marcarCasa = (i, j) => {
    if (casas[i][j] && casas[i][j].content == null) {
        const casa = document.getElementById(`i${i}j${j}`)
        casa.innerHTML = `<p class="text">${proximo}</p>`
        casas[i][j].content = proximo
        check()
    }
}

const check = () => {

    if (
        casas[0][0].content == casas[1][1].content && casas[1][1].content == casas[2][2].content && casas[2][2].content != null ||
        casas[0][2].content == casas[1][1].content && casas[1][1].content == casas[2][0].content && casas[2][0].content != null
    ) {
        setTimeout(() => { alert(`${proximo} ganhou`) }, 100)
        reset()
        return
    }

    for (let i = 0; i < 3; i++) {
        if (
            casas[i][0].content == casas[i][1].content && casas[i][1].content == casas[i][2].content && casas[i][2].content != null ||
            casas[0][i].content == casas[1][i].content && casas[1][i].content == casas[2][i].content && casas[2][i].content != null
        ) {
            setTimeout(() => { alert(`${proximo} ganhou`) }, 100)
            reset()
            return
        }
    }

    let velha = true
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (casas[i][j].content == null) {
                velha = false
                break
            }
        }
        if (!velha) break
    }

    if (velha) {
        setTimeout(() => { alert('Deu velha') }, 100)
        reset()
        return
    } else {
        if (proximo == 'X') proximo = 'O'
        else proximo = 'X'
    }
}

const reset = () => {
    casas.filter(itemi => {
        itemi.filter(itemj => {
            itemj.content = null
        })
    })

    let lista = document.getElementsByClassName('text')
    setTimeout(() => { for (let i = lista.length - 1; i >= 0; i--) lista[i].remove() }, 200)
}