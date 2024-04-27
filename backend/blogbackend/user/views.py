from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import User
import json, jwt

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        
        if User.objects.filter(username=username).exists():
            # Return an error message if username already exists
            return JsonResponse({'message': 'Username already exists. Please choose a different one.'}, status=400)

        # Create a new user object and save it to the database
        new_user = User(username=username, password=password)
        new_user.save()

        # Return a success message
        return JsonResponse({'message': 'Registration successful. You can now login.'}, status=200)

    # Return an error if request method is not POST
    return JsonResponse({'message': 'Invalid request method.'}, status=405)


def get_all_users(request):
    # Retrieve all users from the User table
    users = User.objects.all()

    # Serialize the user data
    user_data = [{'id': user.id, 'username': user.username, 'password': user.password} for user in users]

    # Return the serialized user data as a JSON response
    return JsonResponse({'users': user_data})

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        
        # Get all users from the database
        users = User.objects.all()

        # Loop through each user and check if their credentials match
        for user in users:
            if user.username == username and user.password == password:
                # Authentication successful, log the user in
                # You may implement session management here if needed
                token = jwt.encode({'username': username}, 'suman', algorithm='HS256')
                return JsonResponse({'message': 'Login successful.','token':token}, status=200)
        
        # If no matching user found, return authentication failed message
        return JsonResponse({'message': 'Invalid username or password.'}, status=401)

    # Return an error if request method is not POST
    return JsonResponse({'message': 'Invalid request method.'}, status=405)

@csrf_exempt
def update_password(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        new_password = data.get('new_password')

        try:
            user = User.objects.get(username=username)
            user.password = new_password
            user.save()

            return JsonResponse({'message': 'Password updated successfully.'}, status=200)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found.'}, status=404)