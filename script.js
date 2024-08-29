function generarTabla() {
    let filas = parseInt(document.getElementById('filas').value);
    let columnas = parseInt(document.getElementById('columnas').value);
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    // Crear encabezado de la tabla
    let thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    let thEmpty = document.createElement('th');
    headerRow.appendChild(thEmpty);

    for (let j = 1; j <= columnas; j++) {
        let th = document.createElement('th');
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    tabla.appendChild(thead);

    // Crear cuerpo de la tabla con filas y celdas aleatorias
    let tbody = document.createElement('tbody');

    for (let i = 0; i < filas; i++) {
        let tr = document.createElement('tr');

        // Celdas con números aleatorios
        for (let j = 0; j < columnas; j++) {
            let td = document.createElement('td');
            td.innerText = Math.floor(Math.random() * 60 + 10); // Números aleatorios de 2 dígitos
            tr.appendChild(td);
        }

        // Botón de color aleatorio
        let tdButton = document.createElement('td');
        let colorAleatorio = '#' + Math.floor(Math.random()*16777215).toString(16);
        let btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.backgroundColor = colorAleatorio;
        btn.onclick = () => colorearColumna(i, colorAleatorio);
        tdButton.appendChild(btn);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);
    }
    tabla.appendChild(tbody);
}

function colorearColumna(filaIndex, color) {
    let tabla = document.getElementById('tabla');
    let valores = [];
    let filas = tabla.rows.length;
    let columnas = tabla.rows[filaIndex + 1].cells.length - 1; // Excluyendo la columna del botón

    // Obtener valores de la fila seleccionada y colorear la columna
    for (let j = 0; j < columnas; j++) {
        let celda = tabla.rows[filaIndex + 1].cells[j];
        valores.push(celda.innerText);
        celda.style.backgroundColor = color;
    }

    // Resaltar coincidencias en toda la tabla
    for (let i = 1; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            let celda = tabla.rows[i].cells[j];
            if (valores.includes(celda.innerText)) {
                celda.style.backgroundColor = color;
            }
        }
    }
}

function limpiarColores() {
    let tabla = document.getElementById('tabla');
    let filas = tabla.rows.length;

    for (let i = 1; i < filas; i++) {
        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
            tabla.rows[i].cells[j].style.backgroundColor = '';
        }
    }
}