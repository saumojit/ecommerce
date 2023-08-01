import uuid
import pytz
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator , RegexValidator , FileExtensionValidator

# Create your models here.

class Product(models.Model):
    user=models.ForeignKey(User , on_delete=models.SET_NULL, null=True)
    name=models.CharField(max_length=200 , null=True , blank=True)
    image=models.ImageField(null=True , blank=True , default='/placeholder.png')
    brand=models.CharField(max_length=200 , null=True , blank=True)
    category=models.CharField(max_length=200 , null=True , blank=True)
    description=models.TextField(null=True , blank=True)
    rating=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    numReviews=models.IntegerField(null=True , blank=True , default=0)
    price=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    countInStock=models.IntegerField(null=True , blank=True , default=0)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.UUIDField(default=uuid.uuid4, unique=True , primary_key=True , editable=False)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product , on_delete=models.SET_NULL , null=True)
    user = models.ForeignKey(User , on_delete=models.CASCADE , related_name='review')
    name = models.CharField(max_length=200 , null=True , blank=True)
    rating = models.IntegerField(default=0,null=True , blank=True)
    comment = models.TextField()
    review_image = models.ImageField(upload_to='Review_Images' , null=True , blank=True) #ExtraField Added On 18/05
    review_video = models.FileField(upload_to='Review_Images',null=True, blank=True , validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])]) ##ExtraField Added On 18/05
    lastmodified = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id=models.UUIDField(default=uuid.uuid4 , unique=True , primary_key=True , editable=False)

    def __str__(self):
        return str(self.rating)



class Order(models.Model):
    order_status_choices=[
    ("PLACED", "PLACED"),
    ("INPROGRESS", "INPROGRESS"),
    ("PACKED", "PACKED"),
    ("READYTOSHIP", "READYTOSHIP"),
    ("INTRANSIT", "INTRANSIT"),
    ("SHIPPED", "SHIPPED"),
    ("LOCALSHIPPED", "LOCALSHIPPED"),
    ("OUTFORDELIVERY", "OUTFORDELIVERY"),
    ("DELIVERED", "DELIVERED"),
    ("DELIVERYDECLINED", "DELIVERYDECLINED"),
    ("CANCELLED", "CANCELLED"),
    ("RETURNED", "RETURNED"),
    ("RETURNEDTOWAREHOUSE", "RETURNEDTOWAREHOUSE"),
    ]
    user=models.ForeignKey(User,on_delete=models.SET_NULL , null=True)
    paymentMethod=models.CharField(max_length=200 , null=True , blank=True)
    taxPrice=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    shippingPrice=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    totalPrice=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    isPaid=models.BooleanField(default=False)
    paidAt=models.DateTimeField(auto_now_add=False , null=True , blank=True)
    isDelivered=models.BooleanField(default=False)
    deliveredAt=models.DateTimeField(auto_now_add=False , null=True , blank=True)
    ostatus=models.CharField(max_length=20 , null=True , blank=True ,choices=order_status_choices)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.UUIDField(default=uuid.uuid4 , unique=True , primary_key=True , editable=False)

    def __str__(self):
        local_dt = timezone.localtime(self.createdAt, pytz.timezone('Asia/Calcutta'))
        return str(self._id)+'_____'+str(local_dt)
    
    class Meta:
        ordering=['-createdAt']



class OrderItem(models.Model):
    oitem_status=[
    ("WAREHOUSE_PACKED", "WAREHOUSE_PACKED"),
    ("WAREHOUSE_OUT", "WAREHOUSE_OUT"),
    ("WAREHOUSE_REPLACED", "WAREHOUSE_REPLACED"),
    ("WAREHOUSE_RETURNED", "WAREHOUSE_RETURNED"),
    ]
    product=models.ForeignKey(Product , on_delete=models.SET_NULL , null=True)
    order=models.ForeignKey(Order , on_delete=models.SET_NULL , null=True)
    name=models.CharField(max_length=200 , null=True , blank=True)
    qty=models.IntegerField(default=0 , null=True , blank=True)
    price=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    image=models.CharField(max_length=200 , null=True , blank=True)
    oitem_status=models.CharField(max_length=200 , null=True , blank=True , choices=oitem_status)
    _id=models.UUIDField(default=uuid.uuid4 , unique=True , primary_key=True , editable=False)

    def __str__(self):
        return str(self.name)+' X '+str(self.qty)


class ShippingAddress(models.Model):
    order=models.OneToOneField(Order , on_delete=models.CASCADE , null=True , blank=True)
    address=models.CharField(max_length=200 , null=True , blank=True)
    city=models.CharField(max_length=200 , null=True , blank=True)
    postalCode=models.CharField(max_length=200 , null=True , blank=True)
    country=models.CharField(max_length=200 , null=True , blank=True)
    shippingPrice=models.DecimalField(max_digits=7 , decimal_places=2 , null=True , blank=True)
    _id=models.UUIDField(default=uuid.uuid4 , unique=True , primary_key=True , editable=False)

    def __str__(self):
        return str(self.address)


class WishList(models.Model):
    wtitle=models.CharField(max_length=20,default='default',null=True,blank=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    isPublic=models.BooleanField(default=False)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.user) + '  < >  ' + str(self.wtitle)
    

class WishListItems(models.Model):
    wishlist=models.ForeignKey(WishList, on_delete=models.CASCADE)
    product=models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    isPurchased=models.BooleanField(default=False)
    createdAt=models.DateTimeField(auto_now_add=True)
    # wnp_cmp_key=models.CharField(max_length=200,unique=True) # Composite Key Implementation
    _id=models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.wishlist) + '  < >  ' + str(self.product)



class Account(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE) #name , username , password , email ,isstaff
    account_profile_image=models.ImageField(upload_to='Account_Profile_Images', default='/Account_Profile_Images/Avatar_Placeholder.png',null=True , blank=True)
    mobile=models.CharField(max_length=10 , validators=[MinLengthValidator(10) , RegexValidator("[0-9]$")] ,null=True , blank=True )
    lastmodified=models.DateTimeField(auto_now=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)

    def __str__(self):
        return str(self.user)


class ShippingList(models.Model):
    address_type_choices=[
        ("HOME", "HOME"),
        ("APARTMENT", "APARTMENT"),
        ("OFFICE", "OFFICE"),
        ("OTHER", "OTHER"),
        ]
    availability_choices=[
        ("8-22" ,"8am to 10 pm"),
        ("10-18" ,"10am to 6 pm"),
    ]
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address_title=models.CharField(max_length=25 , default='Untitled')
    name=models.CharField(max_length=25 , default='')
    address_type=models.CharField(max_length=10 , null=True , blank=True ,choices=address_type_choices)
    is_default_address=models.BooleanField(default=False)
    availability=models.CharField(max_length=10 , null=True , blank=True ,choices=availability_choices)
    address=models.CharField(max_length=200 , null=True , blank=True)
    landmark=models.CharField(max_length=200  , null=True, blank=True)
    postalCode=models.CharField(max_length=200 , null=True , blank=True)
    city=models.CharField(max_length=200 , null=True , blank=True)
    state=models.CharField(max_length=200 , null=True , blank=True)
    country=models.CharField(max_length=200 , null=True , blank=True)
    lastModified=models.DateTimeField(auto_now=True)
    createdAt=models.DateTimeField(auto_now_add=True)
    _id=models.UUIDField(default=uuid.uuid4 , unique=True , primary_key=True , editable=False)

    def __str__(self):
        return str(self.address_title)