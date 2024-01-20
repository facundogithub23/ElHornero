document.addEventListener('DOMContentLoaded', function () {
    const formRegistro = document.getElementById('form-register');
    const searchInput = document.querySelector('.form-input');
    const noResultsMessage = document.getElementById('noResultsMessage');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function (event) {
            event.preventDefault();

            const nombre = document.getElementById('name').value;
            const dni = document.getElementById('dni').value;
            const direccion = document.getElementById('dirección').value;
            const telefono = document.getElementById('telefono').value;
            const email = document.getElementById('email').value;
            const fecha_Nac = document.getElementById('fecha_Nac').value;

            const nuevoSocio = {
                'nombre': nombre,
                'dni': dni,
                'direccion': direccion,
                'telefono': telefono,
                'email': email,
                'fechaNacimiento': fecha_Nac,
                'fechaRegistro': obtenerFechaActual()
            };

            agregarSocio(nuevoSocio);
            llenarTablaSocios();
            document.getElementById('success-message').style.display = 'block';
            formRegistro.reset();
        });

        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filteredResults = listaSocios.filter(socio => {
                return (
                    socio.nombre.toLowerCase().includes(searchTerm) ||
                    socio.dni.toLowerCase().includes(searchTerm) ||
                    socio.direccion.toLowerCase().includes(searchTerm) ||
                    socio.telefono.toLowerCase().includes(searchTerm) ||
                    socio.email.toLowerCase().includes(searchTerm)
                );
            });

            llenarTablaSocios(filteredResults);

            if (filteredResults.length === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    } else {
        console.error('No se encontró el formulario o el script de index.js no se está ejecutando correctamente.');
    }

    llenarTablaSocios();
});

function llenarTablaSocios(socios) {
    const tbody = document.getElementById('client-list');

    if (tbody) {
        tbody.innerHTML = '';

        (socios || listaSocios).forEach((socio, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${socio.nombre}</td>
                <td>${socio.dni}</td>
                <td>${socio.direccion}</td>
                <td>${socio.telefono}</td>
                <td>${socio.email}</td>
                <td>${socio.fechaRegistro}</td>
                <td><button onclick="eliminarSocio(${index})">Eliminar</button></td>
            `;
        });

        if (socios && socios.length === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    } else {
        console.error('No se encontró el elemento tbody');
    }
}

function eliminarSocio(index) {
    const sociosFiltrados = listaSocios.filter((socio, i) => i !== index);
    listaSocios = sociosFiltrados;
    llenarTablaSocios(sociosFiltrados);
}

function obtenerFechaActual() {
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anio = fechaActual.getFullYear();
    return `${dia}-${mes}-${anio}`;
}
