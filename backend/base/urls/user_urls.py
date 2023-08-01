# commenting it out as we are overriding it with MyTokenObtainPairView
# from rest_framework_simplejwt.views import TokenObtainPairView

from django.urls import path
from base.views import user_views as views

urlpatterns = [

    #  --- User API -----  #

    path('login/', views.MyTokenObtainPairView.as_view() , name='token_obtain_pair' ),  #keep token auth url on top (always)
    path('register/' , views.registerUser , name='register') ,
    path('profile/',views.getUserProfile , name='user-profile'),
    path('profile/update/',views.updateUserProfile , name='user-profile-update'),


    #  --- WishList API -----  #

    path('wishlist/',views.getMyWishList , name='my-wishlist'),
    path('wishlist/new/',views.createNewWishList , name='create-new-wishlist'),
    path('wishlist/<str:wtitle>/',views.getMyWishListByName , name='my-custom-wishlist'),
    path('wishlist/<str:pk>/add/',views.addProduct_To_WishList , name='add-products-wishlist'),
    path('wishlist/<str:pk>/public/',views.makeWishListPublic , name='make-wishlist-public'),
    path('wishlist/<str:pk>/remove/',views.removeProduct_From_WishList , name='add-products-wishlist'),
    path('wishlist/<str:pk>/delete/',views.deleteWholeWishList , name='delete-full-wishlist'),


    #  --- Account API -----  #
    path('account/update/',views.updateAccount , name='user-account-update'),


    #  --- ShippingList API -----  # 
    path('shipinfo/',                views.getAllShippingList ,        name='shipping-info-all')    ,
    path('shipinfo/<str:pk>/',       views.getShippingInfoById ,       name='shipping-info-id')     ,
    path('shipinfo/add/',            views.addAccountShippingInfo ,    name='shipping-info-add')    ,
    path('shipinfo/remove/<str:pk>/',views.removeAccountShippingInfo , name='shipping-info-remove') ,
    path('shipinfo/update/<str:pk>/',views.updateAccountShippingInfo , name='shipping-info-update') ,
    path('shipinfo/default/<str:pk>/',views.makeShippingAddrDefault ,   name='shipping-set-default') ,
    



    #  --- Admin API -----  #
    path('',                views.getUsers ,   name='users'),
    path('<str:pk>/',       views.getUserById, name='user'),
    path('update/<str:pk>/',views.updateUser,  name='user-update'),
    path('delete/<str:pk>/',views.deleteUser,  name='user-delete'),

]