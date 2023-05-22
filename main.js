async function getChars() {
    const response = await fetch('personajes.json');
    const data = await response.json();
    return data.docs;
}

function setColor($element, dataParent, color) {
    $element.style.background = color;
    closeChilds($element, dataParent, color);
}

function closeChilds($element, dataParent, color) {
    const $nextElement = $element.nextElementSibling;
    if (
        $nextElement
            && $nextElement.dataset.parent
            && $nextElement.dataset.parent.length > dataParent.length
            && $nextElement.dataset.parent.startsWith(dataParent)
    ) {
        setColor($nextElement, dataParent, color);
    }
}

(async () => {
    const $tbody = document.querySelector('tbody');
    const chars = await getChars();
    const alive = [];
    const dead = [];
    const aliveMale = [];
    const aliveFemale = [];
    const deadMale = [];
    const deadFemale = [];

    // Separated by `Estado`
    chars.forEach(char => {
        char.Estado === 'Vivo' ? alive.push(char) : dead.push(char);
    });

    // Separate by `Genero`
    alive.forEach(char => {
        char.Genero === 'Masculino' ? aliveMale.push(char) : aliveFemale.push(char);
    });

    dead.forEach(char => {
        char.Estado === 'Masculino' ? deadMale.push(char) : deadFemale.push(char);
    });

    $tbody.innerHTML = `
        <tr data-parent="1">
            <td colspan=3>Los Simpsons</td>
        </tr>

        <tr data-parent="1.1">
            <td colspan=3>- Vivos</td>
        </tr>

        <tr data-parent="1.1.1">
            <td colspan=3>- - Femeninos</td>
        </tr>

    ${aliveFemale.map(char => `
        <tr data-parent="1.1.1.1">
            <td>- - - ${char.Nombre}</td>
            <td>${char.Estado}</td>
            <td>${char.Genero}</td>
        </tr>`).join('')
    }

        <tr data-parent="1.1.2">
            <td colspan=3>Masculinos</td>
        </tr>

    ${aliveMale.map(char => `
        <tr data-parent="1.1.2.1">
            <td>- - - ${char.Nombre}</td>
            <td>${char.Estado}</td>
            <td>${char.Genero}</td>
        </tr>`).join('')
    }

        <tr data-parent="1.2">
            <td colspan=3>- Fallecidos</td>
        </tr>

        <tr data-parent="1.2.1">
            <td colspan=3>- - Femeninos</td>
        </tr>

    ${deadFemale.map(char => `
        <tr data-parent="1.2.1.1">
            <td>- - - ${char.Nombre}</td>
            <td>${char.Estado}</td>
            <td>${char.Genero}</td>
        </tr>`).join('')
    }

        <tr data-parent="1.2.2">
            <td colspan=3>- - Masculinos</td>
        </tr>

    ${deadMale.map(char => `
        <tr data-parent="1.2.2.1">
            <td>- - - ${char.Nombre}</td>
            <td>${char.Estado}</td>
            <td>${char.Genero}</td>
        </tr>`).join('')
    }
    `;

    const $trs = document.querySelectorAll('tr');
    Array.from($trs).forEach($tr => $tr.addEventListener('click', ({ currentTarget }) => {
        setColor(
            currentTarget,
            currentTarget.dataset.parent,
            currentTarget.style.background === 'red' ? '' : 'red'
        );
    }));

})();