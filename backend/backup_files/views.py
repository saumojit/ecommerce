import time
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status



from .models import Product
from .serializers import ProductSerializer , UserSerializer , UserSerializerWithToken

# from django.http import JsonResponse
# from .products import products


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Custom Fields
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v

        # data['username']=self.user.username
        # data['email']=self.user.email

        return data


# This View Is Needed Along With MyTokenObtainPairSerializer , and it needs to be into url
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer



# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products',
        '/api/products/<str:pk>',
    ]
    return Response(routes) 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user #gets the user details from jwt token issued
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


#IsAdminUser Checks is_staff is true or not
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data= request.data
    try:
        user=User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password']) ,
        )
        serializer=UserSerializerWithToken(user , many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User With This Email Already Exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    # time.sleep(5)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request , pk):
    # product=None
    # for p in products:
    #     if(p['_id']==pk):
    #         product=p
    #         break
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)











# Customizing JWT Token Claim :
# Username and Message will be encoded inside the token , frontend would have to decode to get it
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token['username'] = user.username
#         token['message'] = 'login token issued'
#         # ...

#         return token

# Customizing JWT Token Claim :
# Username and Message will not be encoded inside the token
# It will be in plain json format along side the token (access)
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)

#         # Custom Fields
#         data['username']=self.user.username
#         data['email']=self.user.email

#         return data