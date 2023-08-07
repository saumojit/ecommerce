import time

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.models import Q

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status


from base.serializers import UserSerializer , UserSerializerWithToken , WishListSerializer , ShippingListSerializer
from base.models import WishList,WishListItems,Product,Account,ShippingList
from base.tasks import send_registration_mail_task

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user #gets the user details from jwt token issued
    serializer=UserSerializer(user,many=False)
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
        # here adding asynchronous email manager
        send_registration_mail_task.delay(data['name'], data['email'])
        return Response(serializer.data)
    except:
        message = {'detail': 'User With This Email Already Exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user=request.user
    #It wil issue new token against new user details
    serializer=UserSerializerWithToken(user,many=False)
    data=request.data
    user.first_name=data['name']
    if(data['email']!=''):
        user.username=data['email']
        user.email=data['email']
    if(data['password']!=''):
        user.password=make_password(data['password'])
    user.save()
    return Response(serializer.data)


#   ----------------------------------------------  API For Only Admins  -------------------------------------------------------  #

#   -------   IsAdminUser Checks is_staff is true or not
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users=User.objects.all()
    serializer=UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request,pk):
    user=User.objects.get(id=pk)
    serializer=UserSerializer(user , many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUser(request,pk):
    data=request.data
    user=User.objects.get(id=pk)
    if(data["name"]!=''):
            user.first_name=data["name"]
    if(data["email"]!=''):
            user.username=data['email']
            user.email=data["email"]
    if(data['isPortalAdmin']!=user.is_staff):
        user.is_staff=data['isPortalAdmin']
    user.save()
    serializer=UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    user=User.objects.get(id=pk)
    user.delete()
    return Response("User Deleted Successfully")



# ------------------------------------------------ WishList Model Views ----------------------------------------------------- #

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createNewWishList(request):
    data=request.data
    x=list(WishList.objects.filter(Q(user=request.user) & Q(wtitle=data['wishlist_title'])))
    if(x==[]):
        wishlist=WishList.objects.create(
            wtitle=data['wishlist_title'],
            user=request.user,
            isPublic=data['isPublic']=='YES' if True else False
        )
        serializer=WishListSerializer(wishlist,many=False)
        return Response(serializer.data)
    message = {'detail': 'A WishList With Same Name Already Exists'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteWholeWishList(request,pk):
    selected_wishlist=WishList.objects.get(_id=pk)
    selected_wishlist.delete()
    return Response('WishList Dropped Successfully From Account')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyWishList(request):
    myWishList=WishList.objects.filter(user=request.user)
    serializer=WishListSerializer(myWishList,many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyWishListByName(request , wtitle):
    myWishList=WishList.objects.filter(Q(user=request.user) & Q(wtitle=wtitle))
    serializer=WishListSerializer(myWishList,many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProduct_To_WishList(request , pk):
    data=request.data
    product_id=data['product_id']
    selected_product=Product.objects.get(_id=product_id)
    selected_wishlist=WishList.objects.get(_id=pk)
    x=list(WishListItems.objects.filter(Q(product=selected_product) & Q(wishlist=selected_wishlist)))
    if(x==[]):
        WishListItems.objects.create(
            wishlist=selected_wishlist,
            product=selected_product
        )
        wishlist=WishList.objects.get(_id=pk)
        serializer=WishListSerializer(wishlist,many=False)
        return Response(serializer.data)
    message = {'detail': 'Product Already Added In Selected WishList'}
    return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeProduct_From_WishList(request , pk):
    data=request.data
    product_id=data['product_id']
    try:
        selected_product=Product.objects.get(_id=product_id)
        selected_wishlist=WishList.objects.get(_id=pk)
        wishlistItem=WishListItems.objects.get(Q(product=selected_product) & Q(wishlist=selected_wishlist))
        wishlistItem.delete()
        return Response('Product Removed From WishList Successdfully!')
    except:
        message = {'detail': 'Product Doesnot Exist In Selected WishList'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def makeWishListPublic(request , pk):
    selected_wishlist=WishList.objects.get(_id=pk)
    selected_wishlist.isPublic=True
    selected_wishlist.save()
    return Response('Wishlist Made Public Successfully')



# ------------------------------------------------ Account Model Views ----------------------------------------------------- #

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateAccount(request):
    accountObj=Account.objects.get(user=request.user)
    accountObj.mobile=request.data['mobile']
    if(request.FILES.get('profile_image')!=None):
        accountObj.account_profile_image=request.FILES.get('profile_image')
    accountObj.save()
    return Response('Account Details Saved Successfully')



# ------------------------------------------ Account Shipping Info Model Views ----------------------------------------------------- #

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllShippingList(request):
    shp_addr_list=ShippingList.objects.all()
    serializer=ShippingListSerializer(shp_addr_list , many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getShippingInfoById(request, pk):
    selected_shp_obj=ShippingList.objects.get(_id=pk)
    serializer=ShippingListSerializer(selected_shp_obj , many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addAccountShippingInfo(request):
    shplist_objects=ShippingList.objects.filter(user=request.user)
    is_first_time=not(shplist_objects.exists())
    data=request.data
    selected_shp_obj=ShippingList.objects.create(
        user=request.user,
        address_title=data['address_title'],
        address_type=data['address_type'],
        availability=data['availability'],
        address=data['address'],
        landmark=data['landmark'],
        postalCode=data['postalCode'],
        city=data['city'],
        state=data['state'],
        country=data['country']
    )
    if(is_first_time):
        selected_shp_obj.is_default_address=True
    else:
        print(data['is_default_address'].capitalize())
        if(bool(data['is_default_address'].capitalize())==True):
            selected_shp_obj.is_default_address= True
            selected_shp_obj.save()
            ShippingList.objects.exclude(_id=selected_shp_obj._id).update(is_default_address=False)
    selected_shp_obj.save()
    serializer=ShippingListSerializer(selected_shp_obj , many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def removeAccountShippingInfo(request , pk):
    selected_shp_obj=ShippingList.objects.get(_id=pk)
    if(not(selected_shp_obj.is_default_address)):
        selected_shp_obj.delete()
        return Response('Selected Shipping Address Removed Successdfully !')
    return Response('Default Shipping Address Cannot Be Removed !')


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateAccountShippingInfo(request , pk):
    data=request.data
    selected_shp_obj=ShippingList.objects.get(_id=pk)
    is_not_first_time=bool(ShippingList.objects.filter(user=request.user).count())
    selected_shp_obj.address_title=data['address_title']
    selected_shp_obj.address_type=data['address_type']
    selected_shp_obj.availability=data['availability']
    selected_shp_obj.address=data['address']
    selected_shp_obj.landmark=data['landmark']
    selected_shp_obj.postalCode=data['postalCode']
    selected_shp_obj.city=data['city']
    selected_shp_obj.state=data['state']
    selected_shp_obj.country=data['country']
    if((is_not_first_time) and (bool(data['is_default_address'].capitalize())==True)):
        selected_shp_obj.is_default_address= True
        ShippingList.objects.exclude(_id=pk).update(is_default_address=False)
    selected_shp_obj.save()
    serializer=ShippingListSerializer(selected_shp_obj , many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def makeShippingAddrDefault(request , pk):
    selected_shp_obj=ShippingList.objects.get(_id=pk)
    is_not_first_time=bool(ShippingList.objects.filter(user=request.user).count())
    if(is_not_first_time):
        ShippingList.objects.exclude(_id=pk).update(is_default_address=False)
        selected_shp_obj.is_default_address=True
        selected_shp_obj.save()
        serializer=ShippingListSerializer(selected_shp_obj , many=False)
        return Response(serializer.data)
    return Response('You Cannot UnDefault Having Only One Address!')







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