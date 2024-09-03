let numerosSet = []; // Array para almacenar los números seleccionados
let setButtons = []; // Array para almacenar referencias a los botones "Set"

function generarTabla() {
    let filas = parseInt(document.getElementById('filas').value);
    let columnas = parseInt(document.getElementById('columnas').value);

    // Limpiar tabla y array de botones
    setButtons = [];
    let tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
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

    let theadSet = document.createElement('thead');
    let headerRowSet = document.createElement('tr');
    for (let j = 1; j <= columnas; j++) {
        let th = document.createElement('th');
        headerRowSet.appendChild(th);
    }
    theadSet.appendChild(headerRowSet);
    tablaSet.appendChild(theadSet);

    // Crear cuerpo de la tabla
    let tbody = document.createElement('tbody');
    let tbodySet = document.createElement('tbody');

    for (let i = 0; i < filas; i++) {
        let tr = document.createElement('tr');
        let trSet = document.createElement('tr');

        // Botón "Set"
        let tdSet = document.createElement('td');
        let setBtn = document.createElement('button');
        setBtn.innerText = 'Set';
        setBtn.onclick = () => {
            setBtn.style.backgroundColor = 'blue';
            let numerosFila = [];
            for (let j = 1; j <= columnas; j++) {
                let valor = tr.cells[j].innerText;
                numerosFila.push(parseInt(valor));
            }
            numerosSet.push(...numerosFila); // Añadir números de la fila al array numerosSet

            // Actualizar el valor del textBox "txtSet" con todos los números en numerosSet
            let txtSet = document.getElementById('txtSet');
            txtSet.value = numerosSet.join(', ');
        };
        tdSet.appendChild(setBtn);
        tr.appendChild(tdSet);

        setButtons.push(setBtn);

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

        if (!btn.style.backgroundColor) {
            btn.style.backgroundColor = '#CCCCCC'; // Color por defecto si no se aplica correctamente
        }
        btn.onclick = () => colorearColumna(i, colorAleatorio);
        tdButton.appendChild(btn);
        tr.appendChild(tdButton);
        tbody.appendChild(tr);

        // Columna en blanco
        let td = document.createElement('td');
        td.innerText = " ";
        td.style.border = "none";
        tr.appendChild(td);

        // Celdas con números aleatorios en tablaSet
        for (let j = 0; j < 1; j++) {
            let td = document.createElement('td');
            td.innerText = Math.floor(Math.random() * 60 + 10);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
        tbodySet.appendChild(trSet);
    }

    tabla.appendChild(tbody);
    tablaSet.appendChild(tbodySet);
}

function eliminarCombinaciones() {
    let tbodySet = document.querySelector('#tablaSet tbody');
    tbodySet.innerHTML = ''; // Limpiar contenido de la tablaSet
    numerosSet = []; // Vaciar el array numerosSet
    txtSet.value = "";

    // Restablecer el color de fondo de todos los botones "Set"
    setButtons.forEach(btn => {
        btn.style.backgroundColor = ''; // Restablecer al color original
    });
}




// Función para generar todas las combinaciones posibles, funciona con recursividad
function generarCombinaciones(arr, k) {
    const result = [];
    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }

    backtrack(0, []);
    return result;
}

// Evento para generar combinaciones
function generarYMostrarCombinaciones() {
    let columnas = parseInt(document.getElementById('columnas').value);
    let cantComb = parseInt(document.getElementById('combinaciones').value);
    const combinaciones = generarCombinaciones(numerosSet, columnas);

    let tbodySet = document.querySelector('#tablaSet tbody');
    tbodySet.innerHTML = ''; // Limpiar contenido anterior

    // Va generando filas dependiendo de las combinaciones que se generaron en generarCombinaciones()
    for (let i = 0; i < cantComb && i < combinaciones.length; i++) {
        let trSet = document.createElement('tr');
        combinaciones[i].forEach(num => {
            let td = document.createElement('td');
            td.innerText = num;
            trSet.appendChild(td);
        });
        tbodySet.appendChild(trSet);
    }
}


function buscarCoincidencias() {
    let num1 = document.getElementById('num1').value.trim();
    let num2 = document.getElementById('num2').value.trim();
    let num3 = document.getElementById('num3').value.trim();
    let num4 = document.getElementById('num4').value.trim();

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
        if (num4 && !Array.from(celdas).some(td => td.innerText === num4)) {
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