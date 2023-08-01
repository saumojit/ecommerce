import time
from datetime import datetime
from django.contrib.auth.models import User

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from rest_framework import status



from base.models import Product , Order , OrderItem , ShippingAddress
from base.serializers import OrderSerializer , OrderItemSerializer

# from django.http import JsonResponse

# Order Flow :----
# 1.Create Order
# 2.Create Shipping Address
# 3.Create Order Items and Set Order to OrderItem Relationship
# 4.Update Count in Stock
# Create Views Here

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addOrderItems(request):
    user=request.user
    data=request.data
    orderItems=data['orderItems']
    if(orderItems and len(orderItems)==0):
        message={'detail':'No Order Items'}
        return Response(message , status=status.HTTP_400_BAD_REQUEST)
    else:
        ## 1 Creating One Object for Order
        order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        ## 2 Creating One Object for Shipping Address
        shippingAddress=data['shippingAddress']
        ShippingAddress.objects.create(
            order=order ,
            address=shippingAddress['address'],
            city=shippingAddress['city'],
            postalCode=shippingAddress['postalCode'],
            country=shippingAddress['country'],
            shippingPrice=data['shippingPrice'],
        )
        # 3 # 4 Create Order Items and Set Order to OrderItem Relationship || Update Count in Stock
        for orderItem in orderItems:
            product=Product.objects.get(_id=orderItem['product'])
            OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=orderItem['qty'],
                price=orderItem['price'],
                image=product.image.url
            )
            product.countInStock=product.countInStock-orderItem['qty']
            product.save()
        serializer=OrderSerializer(order,many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request , pk):
    user=request.user
    try:
        order=Order.objects.get(_id=pk)
        if(user.is_staff or order.user==user):
            serializer=OrderSerializer(order , many=False)
        else:
            message={'detail':'Not Authorized to View The Order'}
            return Response(message , status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
    except:
        message={'detail':'Order Does Not Exist'}
        return Response(message , status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderPaid(request,pk):
    order=Order.objects.get(_id=pk)
    time.sleep(5)
    if(order.isPaid==False):
        order.isPaid=True
        order.paidAt=datetime.now()
        order.save()
        return Response('Order Payment Is Success')
    else:
        return Response('Order Payment Is Already Completed')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    #userOrders=Order.objects.filter(user=request.user) # Option : B
    q_year=request.query_params.get('year')
    if(q_year) is None:
        userOrders=request.user.order_set.all()
    else:
        pass
        # userOrders=request.user.order_set.filter(year)
    serializer=OrderSerializer(userOrders , many=True)
    return Response(serializer.data)


# -- Admin Level APIS --

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):
    orders=Order.objects.all()
    serializer=OrderSerializer(orders , many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def markOrderDelivered(request , pk):
    order=Order.objects.get(_id=pk)
    if(order.isDelivered==False):
        order.isDelivered=True
        order.deliveredAt=datetime.now()
        order.save()
    serializer=OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def changeOrderStatus(request , pk):
    order=Order.objects.get(_id=pk)
    order.ostatus=request.data['ostatus']
    order.save()
    serializer=OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def changeOrderItemStatus(request , pk):
    oitem=OrderItem.objects.get(_id=pk)
    oitem.oitem_status=request.data['oitem_status']
    oitem.save()
    if(oitem.oitem_status=="WAREHOUSE_RETURNED"):
        product_object=oitem.product
        product_object.countInStock+=oitem.qty
        product_object.save()
    serializer=OrderItemSerializer(oitem, many=False)
    return Response(serializer.data)