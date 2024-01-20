from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Configuración de la base de datos (reemplaza 'nombre_de_tu_db', 'usuario' y 'contrasena' con los valores reales)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost:3306/elhornero'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialización de la extensión SQLAlchemy
db = SQLAlchemy(app)

# Definición del modelo Socio
class Socio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    dni = db.Column(db.String(20), nullable=False, unique=True)
    direccion = db.Column(db.String(120), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    num_socio = db.Column(db.String(20), nullable=True)
    fecha_nacimiento = db.Column(db.String(20), nullable=False)
    fecha_registro = db.Column(db.String(20), nullable=False)

# Ruta para la lista de socios
@app.route('/lista_socios')
def lista_socios():
    socios = Socio.query.all()
    return render_template('lista_socios.html', socios=socios)

# Ruta para agregar un nuevo socio
@app.route('/nuevo_socio', methods=['POST'])
def nuevo_socio():
    nombre = request.form['nombre']
    dni = request.form['dni']
    direccion = request.form['direccion']
    telefono = request.form['telefono']
    email = request.form['email']
    num_socio = request.form['num_socio']
    fecha_nacimiento = request.form['fecha_Nac']
    
    socio = Socio(
        
        nombre=nombre,
        dni=dni,
        direccion=direccion,
        telefono=telefono,
        email=email,
        num_socio=num_socio,
        fecha_nacimiento=fecha_nacimiento,
        fecha_registro=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    )
    print(socio.nombre)
    print(socio)
    db.session.add(socio)
    db.session.commit()
    return redirect(url_for('lista_socios'))

# Ruta principal que redirige a la lista de socios
@app.route('/')
def index():
    return render_template('index.html')

# Función para crear la base de datos
def crear_base_datos():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    # Crear la base de datos si no existe
    crear_base_datos()
    # Ejecutar la aplicación en modo debug
    app.run(debug=True)
