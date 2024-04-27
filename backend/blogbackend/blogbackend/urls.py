"""
URL configuration for blogbackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from user import views as user_views
from post import views as post_views

urlpatterns = [

    path('admin/', admin.site.urls),
    path('register', user_views.register, name='register'),
    path('login', user_views.login, name='login'),
    path('createpost', post_views.create_post, name='create_post'),
    path('getpost', post_views.get_posts, name='create_post'),
    path('delete/<int:post_id>', post_views.delete_post, name='delete_post'),
    path('getpost/<int:post_id>', post_views.get_post, name='get_post'),
    path('updatepost/<int:post_id>', post_views.update_post, name='update_post'),
    path('addcomment/<int:post_id>', post_views.add_comment, name='add_comment'),
    path('getcomment/<int:post_id>', post_views.get_comments,name='get_comment'),
    path('reset', user_views.update_password, name='login')
]
