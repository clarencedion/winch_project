from flask import Flask, render_template, request, jsonify, redirect, request, send_from_directory
import sqlite3
import mammoth
import os

app = Flask(__name__)

conn = sqlite3.connect('database.db', check_same_thread=False)
c = conn.cursor()


c.execute('''CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT)''')
conn.commit()


@app.route('/', methods=["GET", "POST"])
def post_redirect_get():
    return redirect("/dashboard", code=303)


UPLOAD_FOLDER = os.path.abspath(os.path.join(os.getcwd(), 'uploads'))

# Create the uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)

@app.route('/uploadword', methods=['POST'])
def uploadword():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        with open(filename, "rb") as docx_file:
            result = mammoth.convert_to_html(docx_file)
            html_content = result.value

        return jsonify({'html_content': html_content})
    

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        return jsonify({'message': 'File successfully uploaded !'})


@app.route('/dashboard')
def dashboard():
    c.execute("SELECT rowid, name, type FROM items WHERE type='item'")
    items = c.fetchall()
    return render_template('dashboard.html', items=items)



@app.route('/tasks')
def tasks():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return render_template('tasks.html', files=files)



@app.route('/editor')
def chat():
    return render_template('editor.html')



@app.route('/add', methods=['POST'])
def add():
    name = request.form['name']
    type = request.form['type']
    c.execute("INSERT INTO items (name, type) VALUES (?, ?)", (name, type))
    conn.commit()
    return jsonify({'message': 'Item or task added successfully'})



@app.route('/duplicate', methods=['POST'])
def duplicate():
    rowid = request.form['rowid']
    c.execute("INSERT INTO items (name, type) SELECT name, type FROM items WHERE rowid=?", (rowid,))
    conn.commit()
    return jsonify({'message': 'Item duplicated successfully'})



@app.route('/delete', methods=['POST'])
def delete():
    rowid = request.form['rowid']
    c.execute("DELETE FROM items WHERE rowid=?", (rowid,))
    conn.commit()
    return jsonify({'message': 'Item deleted successfully'})



@app.route('/update_order', methods=['POST'])
def update_order():
    new_order = request.json.get('items')
    if new_order:
        c.execute("DELETE FROM items WHERE type='item'")
        for idx, item in enumerate(new_order):
            c.execute("INSERT INTO items (name, type) VALUES (?, 'item')", (item,))
        conn.commit()
        return jsonify({'success': True})
    else:
        return jsonify({'success': False})


if __name__ == '__main__':
    app.run(debug=True)
