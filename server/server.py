from flask import Flask, jsonify, request
from flask_cors import CORS
import pyone
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

IP = "104.199.41.215"

app = Flask(__name__)

CORS(app, origins="*")

global db

@app.route('/')
def default():
    return jsonify({"message": "isto é uma Plataforma cloud"})

@app.route('/api')
def api():
    return jsonify({"message": "Hello, World!"})

@app.route('/register', methods=['POST']) # type: ignore
def register():
    #create user in firebase
    data = request.get_json()
    print(data)
    #check data is valid
    if 'username' not in data:
        return jsonify({"message": "Username is required"}), 400
    if 'password' not in data:
        return jsonify({"message": "Password is required"}), 400
    #check if there is not others atributes
    if len(data.keys()) > 2:
        return jsonify({"message": "Invalid attributes"}), 400
    #add user to firebase with filter
    if db.collection('users').where('username', '==', data['username']).get():
        return jsonify({"message": "Username already exists"}), 400
    one = pyone.OneServer(f"http://{IP}:2633", session="oneadmin:12345")
    #check if username  exists in opennebula
    user_id = -1
    users = one.userpool.info()
    for user in users.USER: # type: ignore
        if user.NAME == data['username']:
            return jsonify({"message": "Username already exists"}), 400
        
    user_id = one.user.allocate(data['username'], data['password'],'',[1])
    print(f"User ID: {user_id}")
    data['one_id'] = user_id
    data['vms'] = []
    data['ssh_keys_pub'] = []
    data['ssh_keys_priv'] = []
    db.collection('users').add(data, data['username'])
    return jsonify({"message": "User created successfully"}), 201

#get user by id
@app.route('/user', methods=['GET'])
def user():
    username = request.args.get('username')
    user_ref = db.collection('users').where('username', '==', username)
    user_doc = user_ref.get()
    # Check if the document exists
    if user_doc != None and len(user_doc) > 0:
        user_data = user_doc[0].to_dict() 
        del user_data['password'] #type: ignore
        return jsonify(user_data), 200

    return jsonify({"message": "User not found"}), 404

@app.route('/vm', methods=['GET', 'POST'])
def vm():
    if request.method == 'GET':
        return jsonify({"message": "GET VM"})
    elif request.method == 'POST':
        id = request.args.get('id')
        if id == None:
            return jsonify({"message": "ID is required"}), 400
        
        one = pyone.OneServer(f"http://{IP}:2633/RPC2", session="oneadmin:12345")
        vm_pool = one.vmpool.info(-2, -1, -1, -1) # Retrieve all VMs
        vm = None
        
        for vm in vm_pool.VM:
            if vm.ID == int(id):
                break

        if vm == None:
            return jsonify({"message": "VM not found"}), 404
        
        

        return jsonify({"message": "POST VM"})

    return jsonify({"message": "Invalid method"}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    if 'username' not in data:
        return jsonify({"message": "Username is required"}), 400
    if 'password' not in data:
        return jsonify({"message": "Password is required"}), 400
    if len(data.keys()) > 2:
        return jsonify({"message": "Invalid attributes"}), 400
    #check if user exists
    users = db.collection('users').where('username', '==', data['username']).where('password', '==', data['password']).get()
    if len(users) == 0:
        return jsonify({"message": "Invalid credentials"}), 400
    
    one_id = users[0].get('one_id')
    one = pyone.OneServer(f"http://{IP}:2633", session="oneadmin:12345")
    vm_pool = one.vmpool.info(-2, -1, -1, -1) 
    user_vms = [vm for vm in vm_pool.VM if vm.UID == one_id]

    # Print the number of VMs the user has
    print(f"The user has {len(user_vms)} VMs.")
    return jsonify({"message": "Login successfull"})


if __name__ == "__main__":
    cred = credentials.Certificate('credentials.json')
    fb_app = firebase_admin.initialize_app(cred)
    db = firestore.client(fb_app)
    print("Firebase initialized")
    
    app.run(debug=True, port=8080)