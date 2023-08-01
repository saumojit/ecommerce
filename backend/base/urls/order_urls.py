from django.urls import path

# commenting it out as we are overriding it with MyTokenObtainPairView
# from rest_framework_simplejwt.views import TokenObtainPairView

from base.views import order_views as views




urlpatterns = [
    path('' , views.getAllOrders , name='all-orders' ),
    path('add/' , views.addOrderItems , name='add-order-items' ),
    path('myorders/' , views.getMyOrders , name='get-my-orders' ),
    path('<str:pk>/' , views.getOrderById , name='get-user-order' ),
    path('<str:pk>/pay/' , views.updateOrderPaid , name='pay-order' ),
    path('<str:pk>/deliver/' , views.markOrderDelivered , name='mark-order-delivered' ),
    path('<str:pk>/o_status/' , views.changeOrderStatus , name='o-status-change' ),
    path('<str:pk>/oitem_tatus/' , views.changeOrderItemStatus , name='oitem-status-change' ),
]