from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .models import User

def register_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = User.objects.create_user(email=email, password=password)
        login(request, user)
        return redirect('home')  # for registration redirect
    return render(request, 'register.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def delete_account_view(request):
    if request.method == 'POST':
        user = request.user
        user.delete()
        return redirect('login')  # for redirect to login post-account deletion
    return render(request, 'delete_account.html')

def toggle_dark_mode(request):
    user = request.user
    user.is_dark_mode = not user.is_dark_mode  # Toggle the boolean field
    user.save()
    return JsonResponse({'is_dark_mode': user.is_dark_mode})  # Return the new state
