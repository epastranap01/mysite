$(document).ready(function() {
    $('#persona').select2({
        placeholder: "Selecciona una o más personas",
        width: '100%'
    });
    cargarAhorros();
});

let totalEdis = 0;
let totalDania = 0;
let totalGeneral = 0;

function agregarAhorro() {
    const fecha = document.getElementById('fecha').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const personasSeleccionadas = Array.from(document.getElementById('persona').selectedOptions).map(option => option.value);

    if (fecha && monto && personasSeleccionadas.length > 0) {
        const ahorrosTable = document.getElementById('ahorrosTable').getElementsByTagName('tbody')[0];
        const newRow = ahorrosTable.insertRow();
        const fechaCell = newRow.insertCell(0);
        const edisCell = newRow.insertCell(1);
        const daniaCell = newRow.insertCell(2);

        fechaCell.innerText = fecha;
        edisCell.innerText = personasSeleccionadas.includes('Edis') ? 'L. ' + monto.toFixed(2) : '-';
        daniaCell.innerText = personasSeleccionadas.includes('Dania') ? 'L. ' + monto.toFixed(2) : '-';

        // Actualizar los totales
        if (personasSeleccionadas.includes('Edis')) {
            totalEdis += monto;
        }
        if (personasSeleccionadas.includes('Dania')) {
            totalDania += monto;
        }

        totalGeneral = totalEdis + totalDania;

        document.getElementById('totalEdis').innerText = 'L. ' + totalEdis.toFixed(2);
        document.getElementById('totalDania').innerText = 'L. ' + totalDania.toFixed(2);
        document.getElementById('totalGeneral').innerText = 'L. ' + totalGeneral.toFixed(2);

        // Guardar en localStorage
        guardarAhorro(fecha, monto, personasSeleccionadas);

        // Limpiar los campos del formulario
        document.getElementById('ahorrosForm').reset();
        $('#persona').val(null).trigger('change');
    }
}

function guardarAhorro(fecha, monto, personasSeleccionadas) {
    const ahorros = JSON.parse(localStorage.getItem('ahorros')) || [];
    ahorros.push({ fecha, monto, personas: personasSeleccionadas });
    localStorage.setItem('ahorros', JSON.stringify(ahorros));
}

function cargarAhorros() {
    const ahorros = JSON.parse(localStorage.getItem('ahorros')) || [];

    // Inicializar totales
    totalEdis = 0;
    totalDania = 0;
    totalGeneral = 0;

    ahorros.forEach(ahorro => {
        const ahorrosTable = document.getElementById('ahorrosTable').getElementsByTagName('tbody')[0];
        const newRow = ahorrosTable.insertRow();
        const fechaCell = newRow.insertCell(0);
        const edisCell = newRow.insertCell(1);
        const daniaCell = newRow.insertCell(2);

        fechaCell.innerText = ahorro.fecha;
        edisCell.innerText = ahorro.personas.includes('Edis') ? 'L. ' + ahorro.monto.toFixed(2) : '-';
        daniaCell.innerText = ahorro.personas.includes('Dania') ? 'L. ' + ahorro.monto.toFixed(2) : '-';

        // Actualizar los totales
        if (ahorro.personas.includes('Edis')) {
            totalEdis += ahorro.monto;
        }
        if (ahorro.personas.includes('Dania')) {
            totalDania += ahorro.monto;
        }
    });

    totalGeneral = totalEdis + totalDania;

    document.getElementById('totalEdis').innerText = 'L. ' + totalEdis.toFixed(2);
    document.getElementById('totalDania').innerText = 'L. ' + totalDania.toFixed(2);
    document.getElementById('totalGeneral').innerText = 'L. ' + totalGeneral.toFixed(2);
}
