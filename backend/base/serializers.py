from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken , AccessToken


from .models import Product,Review,Order,OrderItem,ShippingAddress,WishList , WishListItems , ShippingList


class UserSerializer(serializers.ModelSerializer):
    # Getting name from get_name() function
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isPortalAdmin=serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model=User
        fields=[ 'id' , '_id' , 'username' , 'email' ,'name' , 'isPortalAdmin']
    
    # Adding Custom Function To Get The Name ==>  self refers to serializer and obj is userobject
    # Rule to Write : get_<fieldName>(self,obj)
    def get_name(self , obj):
        name=obj.first_name
        if(name == ''):
            name=obj.email
        return name
    
    def get__id(self,obj):
        return obj.id
    
    def get_isPortalAdmin(self , obj):
        return obj.is_staff


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id' , '_id' , 'username' , 'email' ,'name' , 'isPortalAdmin' , 'token']

    def get_token(self , obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Product
#         fields='__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=Product
        fields='__all__'

    def get_reviews(self , obj):
        product_reviews=obj.review_set.all()
        serializer=ReviewSerializer(product_reviews , many=True)
        return serializer.data



class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields='__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields='__all__'

## Nested Serilizer Concept
class OrderSerializer(serializers.ModelSerializer):
    orderItems=serializers.SerializerMethodField(read_only=True)
    shippingAddress=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=Order
        fields='__all__'
    
    def get_orderItems(self , obj):
        items=obj.orderitem_set.all()
        serializer = OrderItemSerializer(items , many=True)
        return serializer.data
    
    def get_shippingAddress(self , obj):
        try:
            address=ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address=False
        return address
    
    def get_user(self,obj):
        user=obj.user
        serializer=UserSerializer(user, many=False)
        return serializer.data
    

class WishListItemSerializer(serializers.ModelSerializer):
    products=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=WishListItems
        fields=['_id' , 'products', 'isPurchased','createdAt']
    def get_products(self, obj):
        products_dtls=obj.product
        serializer = ProductSerializer(products_dtls , many=False)
        return serializer.data


class WishListSerializer(serializers.ModelSerializer):
    wishlistitems=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=WishList
        fields='__all__'
    def get_wishlistitems(self, obj):
        products_dtls=obj.wishlistitems_set.all()
        serializer = WishListItemSerializer(products_dtls , many=True)
        return serializer.data


class ShippingListSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingList
        fields='__all__'