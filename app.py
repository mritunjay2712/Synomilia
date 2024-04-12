from flask import Flask, render_template, request, redirect, url_for, jsonify
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'  # Define the upload folder path
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  # Set the upload folder in the app configuration

active_rooms = []

@app.route('/')
def lobby():
    return render_template('lobby.html')

@app.route('/get_active_rooms')
def get_active_rooms():
    return jsonify(active_rooms)

@app.route('/room.html')
def room():
    room_name = request.args.get('room')
    if room_name:
        if room_name not in active_rooms:
            active_rooms.append(room_name)
    return render_template('room.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            return redirect(request.url)
        
        file = request.files['file']
        
        if file.filename == '':
            return redirect(request.url)

        if file:
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('room'))  # Redirect to the room page after successful upload


@app.route('/get_uploaded_files')
def get_uploaded_files():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    return jsonify(files)

    
if __name__ == '__main__':
    app.run(debug=True)
