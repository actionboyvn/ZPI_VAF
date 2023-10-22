from flask import  request, jsonify, Blueprint, make_response # Blueprint, render_template, redirect, url_for,
#from flask_restful import reqparse
from flask_login import login_user, login_required, logout_user, current_user
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from userAccess import Access, User

auth = Blueprint('auth', __name__)

#userPostArgs = reqparse.RequestParser()
#userPostArgs.add_argument("name",type=str,help="User name",required=True)
#userPostArgs.add_argument("password",type=str,help="User password",required=True)

access = Access()

@auth.route('/ab',methods=['GET'])
def ab():
    test = {"key": "data"}
    return jsonify(test)

@auth.route('/users/login',methods=['POST'])
@cross_origin()
def login_post():
    request_data = request.get_json()
    print(request_data)
    email = request_data['email']
    password = request_data['password']
    result = access.getFromUser(email)
    if not result:
        return jsonify("False")

    hashed_password = result[1]
    print('Extracted hashed password: ',hashed_password)

    if not check_password_hash(hashed_password, password):
        print('User password:', password,' does not encrypt into hashed password: ', hashed_password)
        return jsonify("False")

    user = User()
    user.id = result[0]
    return jsonify("True") if login_user(user) else jsonify("False")

@auth.route('/users/signup',methods=['POST'])
@cross_origin()
def signup_post():
    print('somebody tried to sign up')
    # args = userPostArgs.parse_args()
    request_data = request.get_json()
    email = request_data['email']
    password = request_data['password']
    name = request_data['name']
    password = generate_password_hash(password, method='sha256')
    result = access.signup(email=email, password=password, name=name)
    if not result:
        return jsonify("False")
    user = User()
    user.id = result[0]
    print('logging user to session')
    return jsonify("True") if login_user(user) else jsonify("False")

@auth.route('/users/logout')
@cross_origin()
def logout():
    if current_user.is_authenticated:  # Check if the user is logged in
        logout_user()
        return jsonify("True")
    else:
        return jsonify("False")
