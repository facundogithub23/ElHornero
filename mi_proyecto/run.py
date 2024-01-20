from flask import Flask, render_template

app = Flask(__name__)

# Cambié el nombre del endpoint a 'index'
@app.route('/')
def index():
    return render_template('index.html')

# Mantuve el nombre del endpoint como 'lista_socios'
@app.route('/lista_socios')
def vista_lista_socios():
    return render_template('ListaClientes.html')

if __name__ == '__main__':
    app.run(debug=True)
