---

layout: post
title:  "React and Django Freelance Site"
date:   2024-11-02 
categories: React
excerpt: "This is a freelance site that has a ticketing system"
image: /assets/images/github-logo.png


---

# Making a simple freelance site using Django and React 

___

## Let's start with installing dependencies

### Backend stuff

For doing backend-ey stuff....

You need to start by installing Django. Django is the server side of the website, so there won't be any HTMl on this
side of the project. It will be done in python and be responsible for the database management and communication between 
the database and frontend, as well as authentication. That is what we will be using Django for in this project at least.

So in order to actually use Django, you need to actually install it. Yeah.... It's not built in to python.... Obviously.
So let's install it along with the rest framework. This additional framework extends Djangos capabilities to create RESTful APIs. This
helps with communication between the frontend and backend.

```bash
pip install django djangorestframework
```

In addition to this, we need to install the dependency for installing CORS headers. This is because communication between the frontend and backend can be difficult due to them being on different ports. So
using APIs, and doing this has some security risks, because it is done through links, so permission and authorisation is essential
for the security of your site. So CORS is what allows the backend to accept requests from the frontend.

```bash
pip install django-cors-headers
```


### Frontend stuff

To do frontend-ey stuff.....

`To do the frontend things you need to make sure that you have got npm installed.`

To start a React project is fairly easy. Running the npx command makes a whole react template for you.

```bash
npx create-react-app freelance-frontend
```

Axios is a javascript library for making HTTP requests. This will help the React frontend interact with the Django backend.

```bash
npm install axios
```

Now there are additional stuff that you can add for frontend to make it easier, but for this project, we are just gonna use
normal CSS

Here's a little table with some explanations of what was just explained

| **Library**           | **Backend/Frontend** | **Why Install It?**                                                                 |
|-----------------------|----------------------|------------------------------------------------------------------------------------|
| Django                | Backend             | Framework for building backend APIs and handling database and server logic.       |
| Django REST Framework  | Backend             | Extends Django to create RESTful APIs for communication with the frontend.        |
| django-cors-headers    | Backend             | Allows the backend to accept requests from the React frontend.                    |
| Node.js and npm        | Frontend            | Required for running React and managing frontend dependencies.                    |
| create-react-app       | Frontend            | Scaffolds a React app with a ready-to-use template.                               |
| Axios                  | Frontend            | Handles API requests between React and Django.                                    |

___

## Now we will start with the backend to make sure that when calling stuff in the front end, we will be able to test immediately.

Let's start with the django project creation

```bash
django-admin startproject <project_name>
```

Then you will create the individual app using:

```bash
python manage.py startapp <app_name>
```

I was going to originally have two different apps. One for accounts, and one for the jobs, but as I made it I realized that there
was really no need to have it seperate. Just a really long models page and a lot of urls, but totally manageable.

So put the `<app_name>` as `accounts`.

First things first, lets edit the settings to include the apps that will be used.

### Settings

```python
INSTALLED_APPS = [
    # Django default apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes', 
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',

    # Third-party apps
    'rest_framework',

    # Your custom apps
    'accounts',
    'jobs',
    'messaging',
    'payments',
]
```

Like I said, when first making this project, I was going to have the account info and jobs seperately, but decided that there 
was no need. Was also going to have payments and messaging included, but that is kinda unneccessary now.

Next we are going to need to add the database, because the tables can't be created without a database to add them in to *shrug*.

Under your database section in your settings, add this (with your own info. hashed out mine, because it looks more professional hashed out lol):

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'freelancesite3',
        'USER': '###',
        'PASSWORD': '###',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Now that we have the settings page sorted, time to move on to the....

### Models page

The models page is basically telling it what SQL to write to create the tables in your database, but the table is written as a class. Really simple.

Here's an example:

```python
class OpenProject(models.Model):
    title = models.CharField(max_length=255, default="Untitled Project")
    description = models.TextField(default="No description provided.")
    category = models.CharField(max_length=255, default="General")  # Store as string
    client = models.CharField(max_length=255, default="Unknown Client")  # Store client's name as string
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
```

See.... That is all you need to create a table. This would be it in SQL:

```sql
CREATE TABLE OpenProject (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255) DEFAULT 'Untitled Project',
    description TEXT DEFAULT 'No description provided.',
    category VARCHAR(255) DEFAULT 'General',
    client VARCHAR(255) DEFAULT 'Unknown Client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The rows in the tables are fairly standard, mainly just the names, and dates with descriptions and topics. The status will all be 
in different tables, so ongoing, open and closed will all be seperate. The user profiles and auth stuff just keep the user information with Roles, profile pics, and stuff like that. This
is a really cool project and the functionality is also really cool, but the stuff is pretty basic, so that's actually why I think it is the perfect starting project.

```python
from django.contrib.auth.models import User
from django.db import models

class Review(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews_given")
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews_received")
    heading = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.client.username} for {self.freelancer.username}"



class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class OpenProject(models.Model):
    title = models.CharField(max_length=255, default="Untitled Project")
    description = models.TextField(default="No description provided.")
    category = models.CharField(max_length=255, default="General")  
    client = models.CharField(max_length=255, default="Unknown Client")  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title





class OngoingProject(models.Model):
    title = models.CharField(max_length=255, default="Untitled Project") 
    description = models.TextField(default="No description provided.")  
    category = models.CharField(max_length=255, default="General")  
    client = models.CharField(max_length=255, default="Unknown Client")  
    freelancer = models.CharField(max_length=255, default="Unassigned Freelancer")  
    started_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.title



class CompletedProject(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name="completed_projects")
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name="completed_projects_client")
    freelancer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="completed_projects_freelancer")
    completed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)
    category = models.CharField(max_length=50, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_image = models.ImageField(upload_to="profile_images/", blank=True, null=True)

    def __str__(self):
        return self.user.username


class Job(models.Model):
    STATUS_CHOICES = [
        ('in-progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    freelancer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='jobs')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

```

Now that the tables are set up, and you have access to your database. Let's make the migrations, then migrate.

```bash
python manage.py makemigrations
python manage.py migrate
```

After this, you need to go in to your 'serializers' file and create classes in there. This really is not hard. Most complicated in here is the UserRegistration, so I'll explain that to you to ensure you fully understand.

#### RegisterSerializer

Starts with:

```python
profile_image = serializers.ImageField(required=False)
bio = serializers.CharField(required=False)
category = serializers.CharField(required=False)
role = serializers.CharField(required=True)
```
 These will add additional features to the serializer that are not part of the default user model. The `required=False` makes it optional, so `required=True`, would obviously make it mandatory to fill in, right?

```python
class Meta:
    model = User
    fields = ['username', 'email', 'password', 'role', 'category', 'bio', 'profile_image']
```

This mainly just states the fields that the serializer will handle.

Then there is a function for creating the new user.

```python
def create(self, validated_data):
    user = User.objects.create_user(
        username=validated_data['username'],
        email=validated_data['email'],
        password=validated_data['password']
    )

```

What this does: 
Creates a new user object using the create_user method, which is a built in helper in django for creating users.

```python
UserProfile.objects.create(
    user=user,
    role=validated_data['role'],
    category=validated_data.get('category', ""),
    bio=validated_data.get('bio', ""),
    profile_image=validated_data.get('profile_image')
)
```
After creating the User, it creates an associated UserProfile object.

Category is laid out as `validated_data.get('field', default_value)`. This safely retrieves a field from the validated data, falling back to a default value if the field is not present, which is an empty string.

This explaination should help with making the full thing a lot more readable. So, in a serializers file in the accounts folder, add this code:

```python
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile
import re
from .models import OpenProject, OngoingProject, CompletedProject, Category
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source="client.username", read_only=True)
    freelancer_name = serializers.CharField(source="freelancer.username", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "client",
            "client_name",
            "freelancer",
            "freelancer_name",
            "heading",
            "description",
            "created_at",
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'role']

def validate_username(value):
    # Allow letters, numbers, spaces, dashes, and underscores
    if not re.match(r'^[\w\s-]+$', value):
        raise serializers.ValidationError("Username can only contain letters, numbers, spaces, dashes, and underscores.")
    return value


# accounts/serializers.py
class RegisterSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)
    bio = serializers.CharField(required=False)
    category = serializers.CharField(required=False)
    role = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'role', 'category', 'bio', 'profile_image']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        UserProfile.objects.create(
            user=user,
            role=validated_data['role'],
            category=validated_data.get('category', ""),
            bio=validated_data.get('bio', ""),
            profile_image=validated_data.get('profile_image')
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class OpenProjectSerializer(serializers.ModelSerializer):
    category = serializers.CharField()

    class Meta:
        model = OpenProject
        fields = ['id', 'title', 'description', 'category', 'client', 'created_at']



class OngoingProjectSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = OngoingProject
        fields = ['id', 'title', 'description', 'category', 'client', 'freelancer', 'started_at']


class CompletedProjectSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = CompletedProject
        fields = ['id', 'title', 'description', 'category', 'client', 'freelancer', 'completed_at']


```

You should have your models and serializers completed now, so let's move on....

### The views page. 

I know what this page is, but don't feel that I can give a proper explaination that will make sense, so asked ChatGPT to give an explaination on this one lol...

"""

**Purpose of the views.py File**

*Handle HTTP Requests:*

 - The views.py file contains functions or classes that take in HTTP requests and return HTTP responses.

*Process Data:*

 - It processes input data from requests (e.g., query parameters, form submissions, JSON payloads).

*Fetch Data from the Database:*

 - It interacts with the database via models to fetch or save data.

*Return a Response:*

 - It uses Django templates, JSON data, or other formats to construct and return a response.

"""

Now in a lot of these classes you'll see a few functions. From things like getting and posting. This is just to handle different operations and help with communication with the frontend. Trust me, it's really simple and once you understand what you 
need each view to do, it is just obvious. Like if you need to get a user profile from the users view, you'll just get it like this:

```python
    def get(self, request):
        try:
            # Attempt to fetch the user's profile
            profile = UserProfile.objects.get(user=request.user)
            data = {
                "username": request.user.username,
                "bio": profile.bio,
                "profile_image": profile.profile_image.url if profile.profile_image else None,
                "role": profile.role,
                "category": profile.category,
            }
            return Response(data)
        except UserProfile.DoesNotExist:
            # Automatically create a profile if it doesn't exist
            UserProfile.objects.create(user=request.user, role="freelancer", bio="", category="")
            return Response(
                {"message": "Profile was missing but has been created. Please update your details."},
                status=201,
            )
```

Literally just putting the users info in to a dictionary which can be passed around, and handles if the user doesnt exist....

So just keep this in mind when reading through the below code:

```python
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import UserProfile
from .serializers import UserProfileSerializer, RegisterSerializer, UserSerializer
from .models import UserProfile, Job
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import OpenProject, OngoingProject, CompletedProject, Category
from .serializers import OpenProjectSerializer, OngoingProjectSerializer, CompletedProjectSerializer, CategorySerializer
from .serializers import ReviewSerializer
from .models import Review
import json
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import OpenProject
from .serializers import OpenProjectSerializer


class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        freelancer_id = self.request.query_params.get("freelancer_id", None)
        if freelancer_id:
            return Review.objects.filter(freelancer_id=freelancer_id)
        return Review.objects.filter(freelancer=self.request.user)

class CreateReviewView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)



class OpenProjectView(APIView):
    def get(self, request):
        # Return all open projects for the logged-in user
        client_name = request.user.username  # Get the logged-in user's name
        projects = OpenProject.objects.filter(client=client_name)
        serializer = OpenProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Create a new project
        data = request.data.copy()  # Copy request data to ensure immutability
        data['client'] = request.user.username  # Automatically set the client's name

        serializer = OpenProjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TakeProjectView(generics.UpdateAPIView):
    queryset = OpenProject.objects.all()
    serializer_class = OpenProjectSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            project = OpenProject.objects.get(pk=pk)
            OngoingProject.objects.create(
                title=project.title,
                description=project.description,
                client=project.client,
                freelancer=request.user,
            )
            project.delete()
            return Response({"message": "Project taken successfully."}, status=status.HTTP_200_OK)
        except OpenProject.DoesNotExist:
            return Response({"error": "Project not found."}, status=status.HTTP_404_NOT_FOUND)

    def take_project(request, project_id):
        if request.method == "POST":
            try:
                # Fetch the project
                open_project = OpenProject.objects.get(id=project_id)

                # Get the freelancer's profile
                freelancer_profile = UserProfile.objects.get(user=request.user)

                # Move project to OngoingProject
                ongoing_project = OngoingProject.objects.create(
                    title=open_project.title,
                    description=open_project.description,
                    category=open_project.category,
                    client=open_project.client,
                    freelancer=request.user.username,  # Freelancer name as string
                )

                # Delete the project from OpenProject
                open_project.delete()

                return JsonResponse({"success": True, "message": "Project taken successfully"})
            except OpenProject.DoesNotExist:
                return JsonResponse({"success": False, "message": "Project not found"}, status=404)
            except Exception as e:
                return JsonResponse({"success": False, "message": str(e)}, status=500)
        return JsonResponse({"success": False, "message": "Invalid request method"}, status=400)


class OngoingProjectsView(generics.ListAPIView):
    serializer_class = OngoingProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return OngoingProject.objects.filter(freelancer=self.request.user)


class CloseProjectView(generics.UpdateAPIView):
    queryset = OngoingProject.objects.all()
    serializer_class = OngoingProjectSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            # Fetch the ongoing project assigned to the freelancer
            project = OngoingProject.objects.get(pk=pk, freelancer=request.user.username)

            # Get the client as a User instance
            client_user = User.objects.get(username=project.client)

            # Create a completed project
            CompletedProject.objects.create(
                title=project.title,
                description=project.description,
                client=client_user,  # Pass the User instance here
                freelancer=request.user,  # Pass the User instance for the freelancer
            )

            # Delete the ongoing project
            project.delete()

            return Response({"message": "Project closed successfully."}, status=status.HTTP_200_OK)

        except OngoingProject.DoesNotExist:
            return Response({"error": "Project not found or not assigned to you."}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({"error": "Client user does not exist."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CompletedProjectsView(generics.ListAPIView):
    serializer_class = CompletedProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CompletedProject.objects.filter(freelancer=self.request.user)

User = get_user_model()  # Using get_user_model for flexibility with custom user models

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Attempt to fetch the user's profile
            profile = UserProfile.objects.get(user=request.user)
            data = {
                "username": request.user.username,
                "bio": profile.bio,
                "profile_image": profile.profile_image.url if profile.profile_image else None,
                "role": profile.role,
                "category": profile.category,
            }
            return Response(data)
        except UserProfile.DoesNotExist:
            # Automatically create a profile if it doesn't exist
            UserProfile.objects.create(user=request.user, role="freelancer", bio="", category="")
            return Response(
                {"message": "Profile was missing but has been created. Please update your details."},
                status=201,
            )


class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                # Save the user
                user = serializer.save()

                # Check if UserProfile already exists
                if not UserProfile.objects.filter(user=user).exists():
                    # Create a UserProfile only if it doesn't exist
                    UserProfile.objects.create(
                        user=user,
                        role=request.data.get("role", "freelancer"),
                        bio=request.data.get("bio", ""),
                        category=request.data.get("category", ""),
                        profile_image=request.data.get("profile_image", None),
                    )

                return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
            except IntegrityError as e:
                return Response(
                    {"error": "A profile already exists for this user."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)  # Get default tokens
        data['username'] = self.user.username  # Add custom fields
        data['role'] = self.user.userprofile.role  # Add the user's role
        data['user_id'] = self.user.id  # Add user ID

        # Debugging: Log or print the response
        print("Login response data:", data)

        return data

# Custom view for login
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id, *args, **kwargs):
        # Fetch the UserProfile using user_id and serialize the data
        user_profile = get_object_or_404(UserProfile, user_id=user_id)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

class FreelancerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        data = {
            "name": request.user.username,
            "bio": profile.bio,
            "profile_image": profile.profile_image.url if profile.profile_image else None,
            "category": profile.category,
        }
        return Response(data)

class FreelancerJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = UserProfile.objects.get(user=request.user)
        jobs = Job.objects.filter(freelancer=profile)
        job_data = [{"id": job.id, "title": job.title, "description": job.description, "status": job.status} for job in jobs]
        return Response(job_data)

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class FreelancerOpenProjectView(APIView):
    def get(self, request):
        try:
            # Get the logged-in user's category from their profile
            user_profile = UserProfile.objects.get(user=request.user)
            freelancer_category = user_profile.category

            # Filter projects that match the freelancer's category
            projects = OpenProject.objects.filter(category=freelancer_category)

            # Serialize the filtered projects
            serializer = OpenProjectSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except UserProfile.DoesNotExist:
            # Handle case where the user does not have a profile
            return Response(
                {"error": "User profile not found for the logged-in user."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            # Handle any unexpected errors
            return Response(
                {"error": f"An error occurred while fetching open projects: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class FreelancerOngoingProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Filter ongoing projects by freelancer's username
            ongoing_projects = OngoingProject.objects.filter(freelancer=request.user.username)
            serializer = OngoingProjectSerializer(ongoing_projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An error occurred while fetching ongoing projects: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class FreelancerCompletedProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Filter completed projects by freelancer's username
            completed_projects = CompletedProject.objects.filter(freelancer=request.user)
            serializer = CompletedProjectSerializer(completed_projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An error occurred while fetching completed projects: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class ClientOngoingProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Filter ongoing projects by client name
            client_name = request.user.username
            ongoing_projects = OngoingProject.objects.filter(client=client_name)
            serializer = OngoingProjectSerializer(ongoing_projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An error occurred while fetching ongoing projects: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class ClientCompletedProjectsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Filter completed projects by client name
            client_name = request.user.username
            completed_projects = CompletedProject.objects.filter(client__username=client_name)
            serializer = CompletedProjectSerializer(completed_projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"An error occurred while fetching completed projects: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class SubmitReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, project_id):
        try:
            # Fetch the completed project
            project = CompletedProject.objects.get(id=project_id, client=request.user)

            # Validate and save the review
            serializer = ReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(
                    client=request.user,
                    freelancer=project.freelancer,
                    project=project
                )
                return Response({"message": "Review submitted successfully."}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except CompletedProject.DoesNotExist:
            return Response({"error": "Completed project not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(
                {"error": f"An error occurred while submitting the review: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
```



Now.... how this site will work is by having the site run on two different ports, and then the frontend will be the only port that we will be looking at in our browser though. If you look at each class above, they all have an authentication requirement. This
is done through the CORS header thing that we installed, so if you try to just view it, you will be told that you are not authenticated, but before we able to view it, we actually need to make it findable. So we need to make URLs for each one.

How this will work is that we have two URL files. One for the main backend and then in that we will reference our accounts.url page, which will have all these models that were listed above.

Out main project url.py will look like this:

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


```

Literally just making the views in to urls. Notice though how the `api/accounts` url has that `include()` in it. This means that all the urls that are listed in the accounts urls will be usable as well. It is important 
to note that any urls that are called from the accounts url must have `/api/accounts` before the listed url so that the app knows where the url is being called from.

This is what the accounts url looks likes:

```python
from django.urls import path
from . import views
from .views import UserProfileView, RegisterView
from .views import CustomTokenObtainPairView
from .views import UserDetailView
from .views import (
    OpenProjectView,
    TakeProjectView,
    OngoingProjectsView,
    CloseProjectView,
    CompletedProjectsView,
    CategoryListView,
    FreelancerOpenProjectView,
    FreelancerOngoingProjectsView,
    FreelancerCompletedProjectsView,ClientOngoingProjectsView,
    ClientCompletedProjectsView,
    SubmitReviewView,
)
from .views import ReviewListView, CreateReviewView


urlpatterns = [
    path('profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('register/', RegisterView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/<int:user_id>/', views.UserProfileView.as_view(), name='user-profile'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("api/open_projects/", OpenProjectView.as_view(), name="open_projects"),
    path("api/take_project/<int:pk>/", TakeProjectView.as_view(), name="take_project"),
    path("api/ongoing_projects/", OngoingProjectsView.as_view(), name="ongoing_projects"),
    path("api/close_project/<int:pk>/", CloseProjectView.as_view(), name="close_project"),
    path("api/completed_projects/", CompletedProjectsView.as_view(), name="completed_projects"),
    path("api/reviews/", ReviewListView.as_view(), name="review_list"),
    path("api/reviews/create/", CreateReviewView.as_view(), name="create_review"),
    path('api/categories/', CategoryListView.as_view(), name='categories'),
    path('freelancer_open_projects/', FreelancerOpenProjectView.as_view(), name='freelancer_open_projects'),
    path('freelancer_ongoing_projects/', FreelancerOngoingProjectsView.as_view(), name='freelancer_ongoing_projects'),
    path('freelancer_completed_projects/', FreelancerCompletedProjectsView.as_view(), name='freelancer_completed_projects'),
    path('ongoing_projects/', ClientOngoingProjectsView.as_view(), name='client-ongoing-projects'),
    path('completed_projects/', ClientCompletedProjectsView.as_view(), name='client-completed-projects'),
    path('submit_review/<int:project_id>/', SubmitReviewView.as_view(), name='submit-review'),
]


```

And that is the backend completed. Don't worry about the stuff you don't know here. Things will be explained. This is just setting up the backend so that when we need it, it's ready. 

Now to start the backend, go to the directory that has the manage.py script in the terminal and then run `python manage.py runserver` and then go to the local host you set it up to be in.

___

## Frontend 

For the frontend we will be using react, and will be starting with the register page:

Login.js:


```javascript
import React, { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        category: "",
        bio: "",
        profileImage: null, // Store the file for profile image
    });

    const [showCategory, setShowCategory] = useState(false); // Control category visibility

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle regular text inputs
        setFormData({ ...formData, [name]: value });

        // Show category dropdown only when role is freelancer
        if (name === "role") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                role: value,
                category: value === "freelancer" ? prevFormData.category : "", // Clear category for non-freelancer
            }));
            setShowCategory(value === "freelancer");
        } else {
            setFormData({ ...formData, [name]: value });
        }
        
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Registering with:", formData);

        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("password", formData.password);
        form.append("role", formData.role);
        form.append("category", formData.category);
        form.append("bio", formData.bio);
        if (formData.profileImage) {
            form.append("profile_image", formData.profileImage);
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/accounts/api/register/", {
                method: "POST",
                body: form,
            });

            if (response.ok) {
                alert("Registration successful!");
                window.location.href = "/login";
            } else {
                const errorData = await response.json();
                console.error("Registration failed:", errorData);
                alert(errorData.detail || "Registration failed. Please try again.");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1 style={styles.header}>Create an Account</h1>
                <p style={styles.subHeader}>Join us today</p>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    style={styles.input}
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    style={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="bio"
                    placeholder="Tell us about yourself"
                    style={styles.textarea}
                    value={formData.bio}
                    onChange={handleChange}
                ></textarea>

                <select
                    name="role"
                    style={styles.input}
                    value={formData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                </select>

                {showCategory && (
                    <select
                        name="category"
                        style={styles.input}
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="web-development">Web Development</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="content-writing">Content Writing</option>
                        <option value="digital-marketing">Digital Marketing</option>
                    </select>
                )}

                <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    style={styles.input}
                    onChange={handleFileChange}
                />

                <button type="submit" style={styles.button}>
                    Sign Up
                </button>

                <p style={styles.footerText}>
                    Already have an account? <a href="/login" style={styles.link}>Log In</a>
                </p>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000", // Match dashboard background
    },
    form: {
        width: "100%",
        maxWidth: "400px",
        padding: "20px",
        backgroundColor: "#222", // Match dashboard panels
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        color: "#fff", // White text for dark background
    },
    header: {
        fontSize: "2.5rem",
        marginBottom: "15px",
        color: "#fff", // White header text
    },
    subHeader: {
        fontSize: "1rem",
        marginBottom: "20px",
        color: "#bbb", // Lighter gray for subtext
    },
    input: {
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #555",
        borderRadius: "5px",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
        width: "90%"
    },
    textarea: {
        width: "90%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #555",
        borderRadius: "5px",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "1rem",
        height: "80px",
        resize: "none",
    },
    button: {
        width: "100%",
        padding: "12px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007bff", // Accent color
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    footerText: {
        fontSize: "0.9rem",
        marginTop: "10px",
        color: "#bbb", // Lighter gray for subtext
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
    },
};

export default Register;
```

Since this is most likely your first react project, I'll explain everything in as much detail as I can.....

From the start....

`import React, { useState } from "react";`
- This imports the React and and useState hook for managing the local state in the functional component 

`const Register = () => { ... }`
- This contains all the logic in the registration form

```javascript
const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    category: "",
    bio: "",
    profileImage: null,
});
```

- This manages the form input values using an object to store values.

`const [showCategory, setShowCategory] = useState(false);`
- This just makes the category dropdown visible if the user selects the freelancer role


`const handleChange = (e) => { ... };`
- Just updates `formdata` when text, or textarea feilds change

`const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
};`

- This is just for selecting a file to upload as the profile image

`const handleSubmit = async (e) => { ... };`
- sends the data to the backend

I'll just explain one input field, because they're all basically the same.

```html
<input
    type="text"
    name="username"
    placeholder="Username"
    style={styles.input}
    value={formData.username}
    onChange={handleChange}
    required
/>

```

- Attributes:
  - name: Field identifier
  - placeholder: Guides the user on what to enter
  - required: Ensures that it is mandatory


Reletively simple, right?

Just the HTML, CSS and JS on one page...

___

Now for the login page....

```javascript
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // For navigation after login

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(null); // Clear previous errors

        try {
            // Make the login request to the backend
            const response = await fetch("http://127.0.0.1:8000/api/accounts/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.detail || "Login failed. Please check your credentials.");
                return;
            }

            const data = await response.json();
            const { access, role, username } = data;

            // Store token and user details in localStorage
            localStorage.setItem("token", access);
            localStorage.setItem("role", role);
            localStorage.setItem("username", username);

            // Redirect user based on their role
            if (role === "freelancer") {
                navigate("/dashboard/freelancer");
            } else if (role === "client") {
                navigate("/dashboard/client");
            } else {
                setError("Unexpected role. Contact support.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h1 style={styles.header}>Welcome Back</h1>
                <p style={styles.subHeader}>Log in to continue</p>

                {error && <p style={styles.error}>{error}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    style={styles.input}
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" style={styles.button}>
                    Log In
                </button>

                <p style={styles.footerText}>
                    Don't have an account? <a href="/register" style={styles.link}>Sign Up</a>
                </p>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000", // Black background
    },
    form: {
        width: "100%",
        maxWidth: "400px",
        padding: "20px",
        backgroundColor: "#222", // Match dashboard card color
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Subtle shadow
        textAlign: "center",
        color: "#fff", // White text for dark background
    },
    header: {
        fontSize: "2.5rem",
        marginBottom: "15px",
        color: "#fff", // White header text
    },
    subHeader: {
        fontSize: "1rem",
        marginBottom: "20px",
        color: "#bbb", // Lighter gray for subtext
    },
    input: {
        width: "90%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #555", // Subtle border for dark theme
        borderRadius: "5px",
        backgroundColor: "#333", // Match dashboard input background
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
    },
    button: {
        width: "100%",
        padding: "12px",
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#007bff", // Accent color
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
        marginBottom: "15px",
    },
    footerText: {
        fontSize: "0.9rem",
        marginTop: "10px",
        color: "#bbb", // Lighter gray for subtext
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
    },
};

export default Login;

```

First thing that you would've noticed is an additional import:
`import { useNavigate } from "react-router-dom";`
- All this function does is import the `useNavigation` from "react-router-dom" to help with navigation after a successful login attempt.


The rest is fairly straight-forward...


`const Login = () => { ... }`
- This just handles the authentication and redirection

`const [formData, setFormData] = useState({ username: "", password: "" });`
 - Just stores the login form info as an object

`const [error, setError] = useState(null);`
- Tracks the error messages

```
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};
```
- Updates the formdata state whenever the user types in an input field

```javascript
const handleSubmit = async (e) => { ... };

```
- Handles the login process when the form is submitted

- Steps:
  - Prevents default form submission
  - Clears ant previous error messages
  - Sends the POST request to the backend login API with the formdata
  - Then handles the outcome of the attempt being successful or unsuccessful

Then the rendering of the actual page 

___

### Freelancer Dashboard

```javascript
import React, { useEffect, useState } from "react";
import ColorThief from "colorthief";

const FreelancerDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [accentColor, setAccentColor] = useState("#007bff");
    const [activeTab, setActiveTab] = useState("open");
    const [openProjects, setOpenProjects] = useState([]);
    const [ongoingProjects, setOngoingProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchFreelancerData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    if (data.profile_image) {
                        const img = new Image();
                        img.crossOrigin = "Anonymous";
                        img.src = `http://127.0.0.1:8000${data.profile_image}`;
                        img.onload = () => {
                            const colorThief = new ColorThief();
                            const [r, g, b] = colorThief.getColor(img);
                            setAccentColor(`rgb(${r}, ${g}, ${b})`);
                        };
                    }
                } else {
                    console.error("Failed to fetch freelancer data");
                }
            } catch (err) {
                console.error("Error fetching freelancer data:", err);
            }
        };

        const fetchProjectsAndReviews = async () => {
            try {
                const endpoints = {
                    open: "http://127.0.0.1:8000/api/accounts/freelancer_open_projects/",
                    ongoing: "http://127.0.0.1:8000/api/accounts/freelancer_ongoing_projects/",
                    completed: "http://127.0.0.1:8000/api/accounts/freelancer_completed_projects/",
                    reviews: "http://127.0.0.1:8000/api/accounts/api/reviews/?freelancer_id=me",
                };

                const [open, ongoing, completed, fetchedReviews] = await Promise.all(
                    Object.values(endpoints).map((url) =>
                        fetch(url, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }).then((res) => (res.ok ? res.json() : []))
                    )
                );

                setOpenProjects(Array.isArray(open) ? open : []);
                setOngoingProjects(Array.isArray(ongoing) ? ongoing : []);
                setCompletedProjects(Array.isArray(completed) ? completed : []);
                setReviews(Array.isArray(fetchedReviews) ? fetchedReviews : []);
            } catch (err) {
                console.error("Error fetching projects or reviews:", err);
            }
        };

        fetchFreelancerData();
        fetchProjectsAndReviews();
    }, []);

    const handleAction = async (projectId, actionType, updateState) => {
        try {
            const endpoint = `http://127.0.0.1:8000/api/accounts/api/${actionType}_project/${projectId}/`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                updateState(projectId);
            } else {
                const errorData = await response.json();
                alert(errorData.message || `Failed to ${actionType} project.`);
            }
        } catch (err) {
            console.error(`Error ${actionType} project:`, err);
        }
    };

    const renderProjects = (projects, buttonLabel, buttonAction) => (
        <div>
            {projects.length === 0 ? (
                <p>No projects available.</p>
            ) : (
                projects.map((project) => (
                    <div key={project.id} style={styles.projectCard}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p>
                            <strong>Client:</strong> {project.client}
                        </p>
                        {buttonLabel && (
                            <button
                                style={{ ...styles.actionButton, backgroundColor: accentColor }}
                                onClick={() => buttonAction(project.id)}
                            >
                                {buttonLabel}
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );

    const renderReviews = () => (
        <div>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} style={styles.reviewCard}>
                        <h3>{review.heading}</h3>
                        <p>{review.description}</p>
                        <p>
                            <strong>Client:</strong> {review.client_name}
                        </p>
                        <p>
                            <strong>Date:</strong> {new Date(review.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))
            )}
        </div>
    );

    if (!userData) return <p>Loading...</p>;

    return (
        <div style={{ ...styles.container, backgroundColor: "#000" }}>
            <div style={{ ...styles.topPanel, backgroundColor: accentColor }}>
                <button style={styles.logoutButton} onClick={() => localStorage.clear()}>
                    Logout
                </button>
                <div style={styles.profileImageWrapper}>
                    {userData.profile_image ? (
                        <img
                            src={`http://127.0.0.1:8000${userData.profile_image}`}
                            alt="Profile"
                            style={styles.profileImage}
                        />
                    ) : (
                        <div style={styles.placeholderImage}>No Profile Image</div>
                    )}
                </div>
            </div>
            <div style={styles.userInfoPanel}>
                <h1 style={styles.username}>{userData.username}</h1>
                <p style={styles.bio}>{userData.bio}</p>
                <p style={styles.category}>Category: {userData.category}</p>
            </div>
            <div style={styles.tabContainer}>
                {[
                    { key: "open", label: "Open Projects" },
                    { key: "ongoing", label: "Ongoing Projects" },
                    { key: "completed", label: "Completed Projects" },
                ].map((tab) => (
                    <div
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === tab.key ? `3px solid ${accentColor}` : "none",
                            color: activeTab === tab.key ? accentColor : "#fff",
                        }}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
            <div style={styles.content}>
                {activeTab === "open" &&
                    renderProjects(openProjects, "Take Project", (id) =>
                        handleAction(id, "take", (projectId) => {
                            const takenProject = openProjects.find((p) => p.id === projectId);
                            setOpenProjects(openProjects.filter((p) => p.id !== projectId));
                            setOngoingProjects([...ongoingProjects, takenProject]);
                        })
                    )}
                {activeTab === "ongoing" &&
                    renderProjects(ongoingProjects, "Close Project", (id) =>
                        handleAction(id, "close", (projectId) => {
                            const closedProject = ongoingProjects.find((p) => p.id === projectId);
                            setOngoingProjects(ongoingProjects.filter((p) => p.id !== projectId));
                            setCompletedProjects([...completedProjects, closedProject]);
                        })
                    )}
                {activeTab === "completed" && renderProjects(completedProjects, null, null)}
                {activeTab === "reviews" && renderReviews()}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        color: "#fff",
    },
    topPanel: {
        height: "150px",
        position: "relative",
        textAlign: "center",
    },
    logoutButton: {
        position: "absolute",
        top: "10px",
        right: "20px",
        padding: "8px 16px",
        backgroundColor: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    profileImageWrapper: {
        position: "absolute",
        top: "75px",
        left: "50%",
        transform: "translateX(-50%)",
    },
    profileImage: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        border: "4px solid #000",
        objectFit: "cover",
    },
    placeholderImage: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        backgroundColor: "#666",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "0.9rem",
        border: "4px solid #000",
    },
    userInfoPanel: {
        marginTop: "80px",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#111",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    username: {
        fontSize: "1.5rem",
        margin: "10px 0",
    },
    bio: {
        fontSize: "1rem",
        margin: "10px 0",
        color: "#bbb",
    },
    category: {
        fontSize: "1rem",
        margin: "10px 0",
        color: "#bbb",
    },
    tabContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        backgroundColor: "#111",
        padding: "10px 0",
    },
    tab: {
        padding: "10px 20px",
        margin: "0 10px",
        cursor: "pointer",
        textAlign: "center",
        fontSize: "1rem",
        borderBottom: "3px solid transparent",
        transition: "color 0.3s, border-bottom 0.3s",
    },
    content: {
        marginTop: "20px",
        textAlign: "center",
        fontSize: "1.2rem",
    },
    projectCard: {
        backgroundColor: "#222",
        margin: "10px",
        padding: "15px",
        borderRadius: "5px",
        textAlign: "left",
    },
    actionButton: {
        marginTop: "10px",
        padding: "10px 20px",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s",
    },
    reviewCard: {
        backgroundColor: "#222",
        margin: "10px",
        padding: "15px",
        borderRadius: "5px",
        textAlign: "left",
    },
};

export default FreelancerDashboard;
```

The colorthief import is just  purely for customization.


`const [userData, setUserData] = useState(null);`
- userData stores the freelancer data fetched from the backend

```html
const [activeTab, setActiveTab] = useState("open");
const [openProjects, setOpenProjects] = useState([]);
const [ongoingProjects, setOngoingProjects] = useState([]);
const [completedProjects, setCompletedProjects] = useState([]);
const [reviews, setReviews] = useState([]);
```

- Active tab tracks the currently active tab
- These all store arrays for different project states

```
useEffect(() => { ... fetchFreelancerData(); ... }, []);
```

- Fetches the freelancers profile data
- Process:
  - Retrieves the token from the local storage
  - Fetches the profile data from the backend

`useEffect(() => { ... fetchProjectsAndReviews(); ... }, []);`
- fetches project and review data for the freelancer

`const handleAction = async (projectId, actionType, updateState) => { ... };`

- Handles actions like taking or closing a project 

The rest is just rendering of the page...

___

### Client Dashboard

```html
import React, { useEffect, useState } from "react";

const ClientDashboard = () => {
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState("create");
    const [openProjects, setOpenProjects] = useState([]);
    const [ongoingProjects, setOngoingProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [loadingStates, setLoadingStates] = useState({
        user: true,
        openProjects: false,
        ongoingProjects: false,
        completedProjects: false,
    });

    const hardcodedCategories = [
        { id: 1, name: "Web Development", value: "web-development" },
        { id: 2, name: "Graphic Design", value: "graphic-design" },
        { id: 3, name: "Content Writing", value: "content-writing" },
        { id: 4, name: "Digital Marketing", value: "digital-marketing" },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in. Redirecting to login page...");
            window.location.href = "/login";
            return;
        }

        const fetchData = async () => {
            try {
                setLoadingStates((prev) => ({ ...prev, user: true }));
                const response = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    handleUnauthorized();
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoadingStates((prev) => ({ ...prev, user: false }));
            }
        };

        fetchData();
    }, []);

    const fetchProjects = async (endpoint, setter, loadingKey) => {
        const token = localStorage.getItem("token");
        try {
            setLoadingStates((prev) => ({ ...prev, [loadingKey]: true }));
            const response = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.ok) {
                const data = await response.json();
                setter(Array.isArray(data) ? data : []);
            } else {
                handleUnauthorized();
            }
        } catch (error) {
            console.error(`Error fetching projects from ${endpoint}:`, error);
        } finally {
            setLoadingStates((prev) => ({ ...prev, [loadingKey]: false }));
        }
    };

    const handleUnauthorized = () => {
        alert("Your session has expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/login";
    };

    const handleCreateProject = async (title, description) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/accounts/api/open_projects/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, category: selectedCategory }),
            });

            if (response.ok) {
                const newProject = await response.json();
                alert("Project created successfully!");
                setOpenProjects((prev) => [...prev, newProject]);
                setActiveTab("open");
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error || "Failed to create project"}`);
            }
        } catch (error) {
            console.error("Error creating project:", error);
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const renderProjects = (projects, isLoading, type) => {
        if (isLoading) return <p>Loading {type} projects...</p>;
        if (!projects.length) return <p>No {type} projects available.</p>;
    
        return (
            <div>
                {projects.map((project) => (
                    <div key={project.id} style={styles.projectCard}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <p><strong>Category:</strong> {project.category}</p>
                        {type === "ongoing" && <p><strong>Freelancer:</strong> {project.freelancer || "N/A"}</p>}
                        {type === "completed" && (
                            <>
                                <p><strong>Freelancer:</strong> {project.freelancer || "N/A"}</p>
                                <p><strong>Completed On:</strong> {new Date(project.completed_at).toLocaleDateString()}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    if (loadingStates.user) return <p>Loading user data...</p>;

    return (
        <div style={{ ...styles.container, backgroundColor: "#000" }}>
            <div style={styles.topPanel}>
                <button
                    style={styles.logoutButton}
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>
                <h1 style={styles.header}>Client Dashboard</h1>
            </div>

            <div style={styles.userInfoPanel}>
                <h2>Welcome, {userData.username}!</h2>
                <p>{userData.bio}</p>
            </div>

            <div style={styles.tabContainer}>
                {["create", "open", "ongoing", "completed"].map((tab) => (
                    <div
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            if (tab === "open") {
                                fetchProjects(
                                    "http://127.0.0.1:8000/api/accounts/api/open_projects/",
                                    setOpenProjects,
                                    "openProjects"
                                );
                            }
                            if (tab === "ongoing") {
                                fetchProjects(
                                    "http://127.0.0.1:8000/api/accounts/ongoing_projects/",
                                    setOngoingProjects,
                                    "ongoingProjects"
                                );
                            }
                            if (tab === "completed") {
                                fetchProjects(
                                    "http://127.0.0.1:8000/api/accounts/completed_projects/",
                                    setCompletedProjects,
                                    "completedProjects"
                                );
                            }
                        }}
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === tab ? "3px solid #007bff" : "none",
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Projects
                    </div>
                ))}
            </div>

            <div style={styles.content}>
                {activeTab === "create" && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const title = e.target.title.value;
                            const description = e.target.description.value;
                            handleCreateProject(title, description);
                        }}
                        style={styles.form}
                    >
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            style={styles.input}
                            required
                        />
                        <textarea
                            name="description"
                            placeholder="Project Description"
                            rows="5"
                            style={styles.textarea}
                            required
                        />
                        <select
                            name="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={styles.select}
                            required
                        >
                            <option value="">Select Category</option>
                            {hardcodedCategories.map((category) => (
                                <option key={category.id} value={category.value}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button type="submit" style={styles.button}>
                            Create Project
                        </button>
                    </form>
                )}
                {activeTab === "open" && renderProjects(openProjects, loadingStates.openProjects, "open")}
                {activeTab === "ongoing" && renderProjects(ongoingProjects, loadingStates.ongoingProjects, "ongoing")}
                {activeTab === "completed" &&
                    renderProjects(completedProjects, loadingStates.completedProjects, "completed")}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        color: "#fff",
    },
    topPanel: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#222",
    },
    logoutButton: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    header: {
        fontSize: "24px",
        color: "#fff",
    },
    link: {
        color: "#007bff",
        textDecoration: "none",
    },
    userInfoPanel: {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#333",
    },
    tabContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        backgroundColor: "#111",
        padding: "10px 0",
    },
    tab: {
        padding: "10px 20px",
        margin: "0 10px",
        cursor: "pointer",
        textAlign: "center",
        fontSize: "1rem",
        color: "#fff",
        borderBottom: "3px solid transparent",
    },
    content: {
        marginTop: "20px",
        textAlign: "center",
    },
    form: {
        backgroundColor: "#222",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        color: "#fff",
    },
    input: {
        padding: "10px",
        border: "1px solid #555",
        borderRadius: "5px",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
    },
    textarea: {
        padding: "10px",
        border: "1px solid #555",
        borderRadius: "5px",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
        resize: "none",
    },
    select: {
        padding: "10px",
        border: "1px solid #555",
        borderRadius: "5px",
        backgroundColor: "#333",
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
    },
    button: {
        padding: "10px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    projectCard: {
        backgroundColor: "#222",
        margin: "10px",
        padding: "15px",
        borderRadius: "5px",
        textAlign: "left",
    },
    filterContainer: {
        margin: "20px 0",
        textAlign: "center",
    },
};

export default ClientDashboard;

```

```
const [userData, setUserData] = useState(null);
const [loadingStates, setLoadingStates] = useState({
    user: true,
    openProjects: false,
    ongoingProjects: false,
    completedProjects: false,
});
```

- `UserData` stores the clients profile information fetched from the backend
- `loadingStates` tracks the loading state of various operations 

```
const [activeTab, setActiveTab] = useState("create");
const [openProjects, setOpenProjects] = useState([]);
const [ongoingProjects, setOngoingProjects] = useState([]);
const [completedProjects, setCompletedProjects] = useState([]);
```

- This is the same as above 


```html
const [selectedCategory, setSelectedCategory] = useState("");
const [filterCategory, setFilterCategory] = useState("");
```

- `selectedCategory` stores the selected category when creating a projects
- `filterCategory` hasn't been used yet. Was something I was thinking of adding


```html
const hardcodedCategories = [
    { id: 1, name: "Web Development", value: "web-development" },
    { id: 2, name: "Graphic Design", value: "graphic-design" },
    { id: 3, name: "Content Writing", value: "content-writing" },
    { id: 4, name: "Digital Marketing", value: "digital-marketing" },
];

```

- Hard-coding them was a lot easier than calling them from a database. Also making it a dropdown instead of something that they can enter themselves means no typos or anything, so can call in to freelancers feed easier

```html
useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You are not logged in. Redirecting to login page...");
        window.location.href = "/login";
    }
    ...
}, []);

```

- Ensures that the client is logged in by checking if there is a token in the local storage


`const fetchData = async () => { ... };`
- fetches client data from the backend

`const fetchProjects = async (endpoint, setter, loadingKey) => { ... };`
- Fetches the projects for the specific client

___

All that is left to do now is to just make links for each page so that each page can actually be viewed.

The urls go in to the app.js file

Here is the full app.js.


```html
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ClientDashboard from './components/Dashboard/ClientDashboard';
import FreelancerDashboard from './components/Dashboard/FreelancerDashboard';
import FreelancerSearch from "./components/FreelancerSearch";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/client" element={<ClientDashboard />} />
                <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
                <Route path="/freelancer-search" element={<FreelancerSearch />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;

```
Now this time we're importing the objects we created in each file and then making that in to a page in the link. 


Now in your terminal, navigate to your folder and type `npm start`, and marvel at your beautiful site!!!




