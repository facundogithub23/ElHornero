// Representa un objeto de socio
class Socio {
    constructor(id, nombre, dni, direccion, telefono, email, fechaNacimiento, fechaRegistro) {
        this.id = id;
        this.nombre = nombre;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaRegistro = fechaRegistro;
    }
}

// Lista para almacenar los socios registrados
const listaSocios = [];

// Obtener la referencia a la tabla en el HTML
const tablaSocios = document.getElementById('tabla-socios');

// Función para agregar un socio a la lista
function agregarSocio(socio) {
    listaSocios.push(socio);
    llenarTablaSocios();
    mostrarMensajeCumpleanios(); // Llama a la función para mostrar mensaje de cumpleaños al agregar un socio
}

// Función para llenar la tabla de socios con datos
function llenarTablaSocios(socios) {
    console.log('Llenando la tabla con socios:', socios);
    

    const tbody = document.getElementById('tabla-socios').getElementsByTagName('tbody')[0];

    if (tbody) {
        tbody.innerHTML = '';

        (socios || listaSocios).forEach((socio, index) => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${socio.id}</td>
                <td>${socio.nombre}</td>
                <td>${socio.dni}</td>
                <td>${socio.direccion}</td>
                <td>${socio.telefono}</td>
                <td>${socio.email}</td>
                <td>${socio.fecha_nacimiento}</td>
                <td>${socio.fecha_registro}</td>
                <td>
                    <button class="btn btn-sm editar-btn" onclick="editarSocio(${socio.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm eliminar-btn" onclick="eliminarSocio(${socio.id})"><i class="fas fa-trash"></i></button>
                </td>
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


 
// Función para mostrar un mensaje si es el cumpleaños de algún socio
function mostrarMensajeCumpleanios() {
    const fechaHoy = new Date();
    const hoy = fechaHoy.toISOString().split('T')[0];  // Formato de fecha YYYY-MM-DD

    listaSocios.forEach((socio) => {
        const fechaCumpleanios = socio.fechaNacimiento.split('T')[0];

        if (fechaCumpleanios === hoy) {
            mostrarAnimacionCumpleanios(socio.nombre);
        }
    });
}

// Función para mostrar el mensaje de cumpleaños
function mostrarAnimacionCumpleanios(nombre) {
    // Aquí puedes agregar la lógica para mostrar la animación con guirnaldas y papelitos
    alert(`¡Hoy es el cumpleaños de ${nombre}! 🎉🎂`);
}

// Función para editar un socio (ejemplo)
function editarSocio(id) {
    // Lógica para editar el socio con el ID proporcionado
    console.log('Editar socio con ID:', id);
}

// Función para eliminar un socio (ejemplo)
function eliminarSocio(id) {
    // Lógica para eliminar el socio con el ID proporcionado
    console.log('Eliminar socio con ID:', id);
    // Después de eliminar, vuelve a llenar la tabla para reflejar los cambios
    llenarTablaSocios();
}

// Llenar la tabla de socios cuando se carga la página
document.addEventListener('DOMContentLoaded', llenarTablaSocios);
    

// Simulación de agregar socios (puedes eliminar esto en tu implementación real)
agregarSocio(new Socio(1, 'Juan Pérez', '12345678', 'Calle A #123', '555-1234', 'juan@example.com', '15-01-1990', '15-01-2022'));
agregarSocio(new Socio(2, 'María Gómez', '87654321', 'Calle B #456', '555-5678', 'maria@example.com', '16-01-1990', '16-01-2022'));
