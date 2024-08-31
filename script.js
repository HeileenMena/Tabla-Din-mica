let numerosSet = [];

function generarTabla() {
    let filas = parseInt(document.getElementById('filas').value);
    let columnas = parseInt(document.getElementById('columnas').value);

    // Tabla del primer DIV (tabla)
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';

    // Tabla del segundo DIV (tablaSet)
    let tablaSet = document.getElementById('tablaSet');
    tablaSet.innerHTML = '';

    // Crear encabezado para ambas tablas
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

    // Crear el thead de tablaSet sin la celda vacía
    let theadSet = document.createElement('thead');
    let headerRowSet = document.createElement('tr');

    for (let j = 1; j <= columnas; j++) {
        let th = document.createElement('th');
        headerRowSet.appendChild(th);
    }
    theadSet.appendChild(headerRowSet);
    tablaSet.appendChild(theadSet);

    // Crear cuerpo de la tabla con filas y celdas aleatorias
    let tbody = document.createElement('tbody');
    let tbodySet = document.createElement('tbody');  // Crear cuerpo vacío para tablaSet

    for (let i = 0; i < filas; i++) {
        let tr = document.createElement('tr');
        let trSet = document.createElement('tr');  // Crear fila vacía para tablaSet

        // Botón "Set" en la primera columna
        let tdSet = document.createElement('td');
        let setBtn = document.createElement('button');
        setBtn.innerText = 'Set';
        setBtn.onclick = () => {
            let numerosFila = new Set();
            for (let j = 1; j <= columnas; j++) {
                let valor = tr.cells[j].innerText;
                numerosFila.add(parseInt(valor));
            }
            numerosSet.push(...Array.from(numerosFila));
        };
        tdSet.appendChild(setBtn);
        tr.appendChild(tdSet);

        // Celdas con números aleatorios
        for (let j = 0; j < columnas; j++) {
            let td = document.createElement('td');
            td.innerText = Math.floor(Math.random() * 60 + 10); // Números aleatorios entre 10 y 60
            tr.appendChild(td);
        }

        // Botón de color aleatorio
        let tdButton = document.createElement('td');
        let colorAleatorio = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        let btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.backgroundColor = colorAleatorio;
        // Verificar que el estilo se haya aplicado correctamente
        if (!btn.style.backgroundColor) {
            // Si no se aplicó correctamente, asignar un color por defecto
            btn.style.backgroundColor = '#CCCCCC'; // Color gris claro por defecto
        }
        btn.onclick = () => colorearColumna(i, colorAleatorio);
        tdButton.appendChild(btn);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);

        // Columna en blanco para dar espacio
        let td = document.createElement('td');
        td.innerText = " "; // Cadena en blanco
        td.style.border = "none";
        tr.appendChild(td);

        // Crear fila vacía para tablaSet
        for (let j = 1; j <= columnas; j++) {
            let tdSet = document.createElement('td');
            trSet.appendChild(tdSet);
        }

        // Celdas con números aleatorios
        for (let j = 0; j < 1; j++) {
            let td = document.createElement('td');
            td.innerText = Math.floor(Math.random() * 60 + 10); // Números aleatorios
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
        tbodySet.appendChild(trSet);  // Añadir fila vacía a tablaSet
    }

    tabla.appendChild(tbody);
    tablaSet.appendChild(tbodySet);  // Añadir tbody vacío a tablaSet
}

// Función para generar todas las combinaciones posibles, funciona con recursividad
function generarCombinaciones(arr) {
    // Si el arreglo está vacío regresa cadena vacía
    if (arr.length === 0) return [[]];
    // Separa primer elemento del array del resto
    const [first, ...rest] = arr;
    // La función se llama recursivamente y genera todas las combinaciones posibles de rest.
    const combsWithoutFirst = generarCombinaciones(rest);
    // Se le añade el primer elemento al inicio de todas las combinaciones anteriores
    const combsWithFirst = combsWithoutFirst.map(comb => [first, ...comb]);
    // Se obtienen todas las combinaciones 
    return [...combsWithoutFirst, ...combsWithFirst];
}

// Evento para generar combinaciones
function generarYMostrarCombinaciones() {
    const combinaciones = generarCombinaciones(numerosSet);

    let tbodySet = document.querySelector('#tablaSet tbody');
    tbodySet.innerHTML = ''; // Limpiar contenido anterior

    // Va generando filas dependiendo de las combinaciones que se generaron en generarCombinaciones()
    combinaciones.forEach(comb => {
        let trSet = document.createElement('tr');
        comb.forEach(num => {
            let td = document.createElement('td');
            td.innerText = num;
            trSet.appendChild(td);
        });
        tbodySet.appendChild(trSet);
    });
    numerosSet = [];
}

function buscarCoincidencias() {
    let num1 = document.getElementById('num1').value.trim();
    let num2 = document.getElementById('num2').value.trim();
    let num3 = document.getElementById('num3').value.trim();

    // Obtener todos los valores de la tablaSet
    let filas = document.querySelectorAll('#tablaSet tbody tr');
    
    // Busca fila por fila buscando las coicidencias con los números ingresados
    filas.forEach(fila => {
        let celdas = fila.getElementsByTagName('td');
        let mostrarFila = true;

        // Verificar coincidencias, si no está el número deja de mostrar esa fila
        if (num1 && !Array.from(celdas).some(td => td.innerText === num1)) {
            mostrarFila = false;
        }
        if (num2 && !Array.from(celdas).some(td => td.innerText === num2)) {
            mostrarFila = false;
        }
        if (num3 && !Array.from(celdas).some(td => td.innerText === num3)) {
            mostrarFila = false;
        }

        // Mostrar u ocultar fila según la coincidencia
        fila.style.display = mostrarFila ? '' : 'none';
    });
}

function colorearColumna(filaIndex, color) {
    let tabla = document.getElementById('tabla');
    let valores = [];
    let filas = tabla.rows.length;
    let columnas = tabla.rows[filaIndex + 1].cells.length - 1; // Excluyendo la columna del botón

    // Obtener valores de la fila seleccionada y colorear la columna
    for (let j = 1; j < columnas - 2; j++) {
        let celda = tabla.rows[filaIndex + 1].cells[j];
        valores.push(celda.innerText);
        celda.style.backgroundColor = color;
    }

    // Resaltar coincidencias en toda la tabla
    for (let i = 1; i < filas; i++) {
        for (let j = 1; j < columnas; j++) {
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