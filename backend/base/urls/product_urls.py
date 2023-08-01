from django.urls import path

# commenting it out as we are overriding it with MyTokenObtainPairView
# from rest_framework_simplejwt.views import TokenObtainPairView

from base.views import product_views as views




urlpatterns = [
    path('' , views.getProducts , name='products'),
    path('create/',views.createProduct,name='product-create'),
    path('upload/',views.uploadImage,name='image-upload'),
    path('<str:pk>/reviews/',views.createProductReview,name='create-review'),
    path('<str:rvw_pk>/reviews/update/',views.updateProductReview,name='update-review'), #new
    path('<str:pk>/',views.getProduct,name='product'),
    path('update/<str:pk>/',views.updateProduct,name='product-update'),
    path('delete/<str:pk>/',views.deleteProduct,name='product-delete')

]