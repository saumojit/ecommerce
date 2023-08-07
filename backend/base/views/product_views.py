import time
from django.contrib.auth.models import User
from django.core.paginator import Paginator , EmptyPage , PageNotAnInteger
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT  # DEFAULT_TIMEOUT = 5 Minutes
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated , IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Product , Review
from base.serializers import ProductSerializer


#  from django.http import JsonResponse
#  from .products import products

##  Views ------->>>>>----------------------->>>>>--------------------->>>>>------------------>>>>>------------------>>>>

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/api/products',
        '/api/products/<str:pk>',
    ]
    return Response(routes) 


@api_view(['GET'])
def getProducts(request):
    query=request.query_params.get('keyword')
    print("query: ", query)
    if(query is None):
        query=''

    #### Query Search Results Cache -- Caching Query In ORM Rather Than Json Reduces Memory Space by almost 25%
    ## ** Example **
    ## 127.0.0.1:6379> memory usage :1:proshop_cache_results_ch_json
    ## (integer) 4176
    ## 127.0.0.1:6379> memory usage :1:proshop_cache_results_ch
    ## (integer) 3144
    if(query!=''):
        if(f'proshop_cache_results_{query}' in cache):
            print('Fetching Data From Cache ** Cache-Hit')
            products=cache.get(f'proshop_cache_results_{query}')
        else:
            print('Fetching Data From DB ** Cache-Miss')
            products=Product.objects.filter(name__icontains=query) # Search Bar
            cache.set(f'proshop_cache_results_{query}' , products , timeout=CACHE_TTL)
    else:
        products=Product.objects.filter(name__icontains='') # All Products Are Fetched
    print(products)

    
    #  products=Product.objects.all()
    #  serializer=ProductSerializer(products,many=True)
    #  return Response(serializer.data)

    #  Pagination Logic For Backend
    no_of_products_per_page=8
    page_id=request.query_params.get('page') #  http://localhost:3000/?page=3
    paginator_object = Paginator(products, no_of_products_per_page)
    try:
        paginated_products=paginator_object.page(page_id)
    except PageNotAnInteger:
        paginated_products=paginator_object.page(1)
    except EmptyPage:
        paginated_products=paginator_object.page(paginator_object.num_pages)
        page_id=paginator_object.num_pages

    if(page_id==None):
        page_id=1
    page_id=int(page_id)
    
    serializer=ProductSerializer(paginated_products,many=True)
    return Response({'products': serializer.data , 'page': page_id , 'pages' : paginator_object.num_pages})


@api_view(['GET'])
def getProduct(request , pk):
    #  product=None
    #  for p in products:
    #      if(p['_id']==pk):
    #          product=p
    #          break
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data)


# #  --- ADMIN RIGHTS ----
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    data=request.data
    #  print('inside creatprodct view')
    #  print(data)
    new_products=[]
    for data_item in data:
        product=Product.objects.create(
            user=request.user,
            name=data_item['name'],
            # image=data_item['image'],
            brand=data_item['brand'],
            category=data_item['category'],
            description=data_item['description'],
            rating=data_item['rating'],
            numReviews=data_item['numReviews'],
            price=data_item['price'],
            countInStock=data_item['countInStock'],
        )
        new_products.append(product)
    serializer=ProductSerializer(new_products , many=True)
    return Response(serializer.data)
    # return Response(f'{len(data)} New Products Added To DB !')



@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request , pk):
    data=request.data
    product=Product.objects.get(_id=pk)
    product.user=request.user
    product.name=data['name']
    # product.image=data['image']
    product.brand=data['brand']
    product.category=data['category']
    product.description=data['description']
    product.rating=data['rating']
    product.numReviews=data['numReviews']
    product.price=data['price']
    product.countInStock=data['countInStock']
    product.save()
    serializer=ProductSerializer(product , many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted Successfully')


@api_view(['POST'])
def uploadImage(request):
    data=request.data
    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)
    product.image=request.FILES.get('image')
    product.save()
    return Response('Image Is Uploaded !')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request , pk):
    user=request.user
    product=Product.objects.get(_id=pk)
    data=request.data
    # 1 - Review Already Exists
    alreadyExists= product.review_set.filter(user=user).exists()
    if(alreadyExists):
        content={'detail':'Product Already Reviewed'}
        return Response(content , status=status.HTTP_400_BAD_REQUEST)
    # 2 - No Rating or 0
    elif(data['rating']==0 or data['rating']=='0'):
        content={'detail':'Rating Not Selected , Please Select A Rating'}
        return Response(content , status=status.HTTP_400_BAD_REQUEST)
    # 3 - Create Review
    else:
        Review.objects.create(
            user=user , 
            product=product ,
            name=user.first_name, 
            rating=data['rating'],
            comment=data['comment'],
            review_image=request.FILES.get('review_image'),
            review_video=request.FILES.get('review_video'),
        )
        product_reviews=product.review_set.all()
        product.numReviews=len(product_reviews)
        total_rating=0
        for rvw in product_reviews:
            total_rating = total_rating + rvw.rating
        calc_rating=total_rating/len(product_reviews)
        product.rating=calc_rating
        product.save()
        return Response('Review Added')



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProductReview(request , rvw_pk):
    review=Review.objects.get(_id=rvw_pk)
    product=review.product
    data=request.data
    if(data['rating']==0 or data['rating']=='0'):
        content={'detail':'Rating Not Selected , Please Select Valid Rating'}
        return Response(content , status=status.HTTP_400_BAD_REQUEST)
    else:
        review.rating=data['rating']
        review.comment=data['comment']
        if(request.FILES.get('review_image')!=None):
            review.review_image=request.FILES.get('review_image')
        if(request.FILES.get('review_video')!=None):
            review.review_video=request.FILES.get('review_video')
        review.save()
        product_reviews=product.review_set.all()
        total_rating=0
        for rvw in product_reviews:
            total_rating = total_rating + rvw.rating
        calc_rating=total_rating/len(product_reviews)
        product.rating=calc_rating
        product.save()
        return Response('Review Updated')




