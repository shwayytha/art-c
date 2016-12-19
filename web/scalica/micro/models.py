from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.conf import settings
from django.db import models
from django.forms import ModelForm, TextInput
from django.contrib.gis.db import models
from django.contrib.gis.db.models import PointField
from django.db.models.functions import Cast
from django.contrib.gis.utils import GeoIP

class Post(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL)
  title = models.CharField(max_length=256,default=””)
  caption = models.CharField(max_length=256, default="")
  upvotes = models.IntegerField()
  downvotes = models.IntegerField()
  QRcode = models.ImageField()
  file = models.ImageFIeld(upload_to=’imgs’) 
 #get image filepath from here, convert to url in html 
    pub_date = models.DateTimeField('date_posted')
city = models.CharField(max_length=256,default=””)

#get information from PostForm
locationID = models.OneToOneField(Address)
g = GeoIP()
lat, lng = g.lat_lon(user_ip)

Zipcode.objects.annotate(
  geom=Cast(‘geography_field’, PointField())
).filter(geom_within=poly)

class Address(models.Model):
  name = models.CharField(max_length=100)
  num = models.IntegerField()
  street = models.CharField(max_length=100)
  city = models.CharField(max_length=100)
  state = models.CharField(max_length=100)
  zipcode = models.ForeignKey(Zipcode, on_delete=CASCADE)
  postID = models.OneToOneField(Post)




# Model Forms
class PostForm(ModelForm):
  class Meta:
    model = Post
    fields = ['title’',’caption’,’file’,’city’]
    widgets = {
      'title': TextInput(attrs={'id' : 'input_post'}),
      'caption': TextInput(attrs={'id' : 'input_post'}),
    }

#to successfully upload file <form enctype="multipart/form-data" method="post" action="/foo/">



class MyUserCreationForm(UserCreationForm):
  class Meta(UserCreationForm.Meta):
    help_texts = {
      'username' : '',
    }
