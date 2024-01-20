from flask import render_template, request, flash, redirect, url_for
from app import app

# Lista para almacenar los registros (simulación de base de datos)
registros = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Obtén los datos del formulario
        nombre = request.form['Nombre']
        dni = request.form['DNI']
        direccion = request.form['dirección']
        telefono = request.form['telefono']
        email = request.form['email']
        fecha_nac = request.form['fecha_Nac']

        # Crea un diccionario con los datos y agrega a la lista
        nuevo_registro = {
            'Nombre': nombre,
            'DNI': dni,
            'Dirección': direccion,
            'Teléfono': telefono,
            'Email': email,
            'Fecha_Nac': fecha_nac
        }

        registros.append(nuevo_registro)

        # Muestra un mensaje de éxito
        flash('Registro exitoso', 'success')

        # Redirige a la página principal para mostrar el formulario nuevamente
        return redirect(url_for('index'))

    return render_template('index.html', registros=registros)

