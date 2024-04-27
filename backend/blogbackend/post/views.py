from django.http import JsonResponse
from .models import Post, Tag, Comment
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create_post(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        title = data.get('title')
        content = data.get('content')
        author = data.get('author')
        category = data.get('category')
        tags = data.get('tags', [])  # Assuming tags are sent as a list in the request body
        
        # Create a new post object and save it to the database
        new_post = Post.objects.create(
            title=title,
            content=content,
            author=author,
            category=category
        )
        
        # Add tags to the post
        for tag_name in tags:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            new_post.tags.add(tag)

        # Return a success message
        return JsonResponse({'message': 'Post created successfully.'}, status=200)

    # Return an error if request method is not POST
    return JsonResponse({'message': 'Invalid request method.'}, status=405)

@csrf_exempt
def get_posts(request):
    if request.method == 'GET':
        query = {}
        if 'category' in request.GET:
            # Check if a 'category' query parameter is present
            query['category'] = request.GET['category']  # Set the category filter in the query
        posts = Post.objects.filter(**query).order_by('creation_date')

        post_data = []
        for post in posts:
            post_data.append({
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'author': post.author,
                'creation_date': post.creation_date.strftime('%Y-%m-%d %H:%M:%S'),
                'category': post.category,
                'tags': [tag.name for tag in post.tags.all()]
            })

        return JsonResponse({'statusCode': 200, 'message': 'Fetched posts', 'data': {'posts': post_data}}, status=200)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=405)
    

@csrf_exempt
def delete_post(request, post_id):
    if request.method == 'DELETE':
        try:
            post = Post.objects.get(id=post_id)
            post.delete()
            return JsonResponse({'message': f'Post with ID {post_id} deleted successfully.'}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({'message': f'Post with ID {post_id} does not exist.'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=405)
    

@csrf_exempt
def get_post(request, post_id):
    if request.method == 'GET':
        try:
            post = Post.objects.get(id=post_id)
            post_data = {
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'author': post.author,
                'creation_date': post.creation_date.strftime('%Y-%m-%d %H:%M:%S'),
                'category': post.category,
                'tags': [tag.name for tag in post.tags.all()]
            }
            return JsonResponse({'post': post_data}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({'message': f'Post with ID {post_id} does not exist.'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=405)
    
@csrf_exempt
def update_post(request, post_id):
    if request.method == 'PUT':
        try:
            # Retrieve the post object
            post = Post.objects.get(id=post_id)
            # Parse request data
            data = json.loads(request.body.decode('utf-8'))
            # Update post attributes if provided in the request data
            if 'title' in data:
                post.title = data['title']
            if 'content' in data:
                post.content = data['content']
            if 'author' in data:
                post.author = data['author']
            if 'category' in data:
                post.category = data['category']
            if 'tags' in data:
                post.tags.clear()  # Clear existing tags
                for tag_name in data['tags']:
                    tag, created = Tag.objects.get_or_create(name=tag_name)
                    post.tags.add(tag)
            # Save the updated post
            post.save()
            return JsonResponse({'message': f'Post with ID {post_id} updated successfully.'}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({'message': f'Post with ID {post_id} does not exist.'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=405)
    

@csrf_exempt
def add_comment(request, post_id):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        text = data.get('text')
        
        try:
            post = Post.objects.get(id=post_id)
            comment = Comment.objects.create(post=post, text=text)
            return JsonResponse({'message': 'Comment added successfully.', 'comment_id': comment.id}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({'message': f'Post with ID {post_id} does not exist.'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=405)

@csrf_exempt
def get_comments(request, post_id):
    if request.method == 'GET':
        try:
            post = Post.objects.get(id=post_id)
            comments = post.comments.all().values('id', 'text', 'created_at')
            return JsonResponse({'comments': list(comments)}, status=200)
        except Post.DoesNotExist:
            return JsonResponse({'message': f'Post with ID {post_id} does not exist.'}, status=404)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=405)