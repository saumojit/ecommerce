from django.contrib import admin
from .models import Product,Review,Order,OrderItem,ShippingAddress,WishList,WishListItems,Account,ShippingList
# Register your models here.

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(WishList)
admin.site.register(WishListItems)
admin.site.register(Account)
admin.site.register(ShippingList)
