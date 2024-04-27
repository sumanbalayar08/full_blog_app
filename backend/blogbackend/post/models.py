from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=50)

class Post(models.Model):
    title = models.CharField(max_length=200) 
    content = models.TextField()
    author = models.CharField(max_length=100)
    creation_date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag)


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)