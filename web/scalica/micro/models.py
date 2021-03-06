from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.gis.db import models
from django.forms import ModelForm, TextInput

class Post(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL)
  title = models.CharField(max_length=256, default="")
  text = models.CharField(max_length=256, default="")
  pub_date = models.DateTimeField('date_posted')
  votes = models.BigIntegerField(default = 0)
  url = models.URLField(max_length=200, default="")
  latitude = models.FloatField(default="40.7128")
  longtitude = models.FloatField(default="74.0059")
  mpoint = models.PointField(srid=4326, null=True, blank=True)
  def __str__(self):
    if len(self.text) < 16:
      desc = self.text
    else:
      desc = self.text[0:16]
    return self.user.username + ':' + desc

class TopPost(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL)
  title = models.CharField(max_length=256, default="")
  text = models.CharField(max_length=256, default="")
  pub_date = models.DateTimeField('date_posted')
  votes = models.BigIntegerField(default = 0)
  url = models.URLField(max_length=200, default="")
  latitude = models.FloatField(default="40.7128")
  longtitude = models.FloatField(default="74.0059")
  mpoint = models.PointField(srid=4326, null=True, blank=True)
  def __str__(self):
    if len(self.text) < 16:
      desc = self.text
    else:
      desc = self.text[0:16]
    return self.user.username + ':' + desc

class Following(models.Model):
  follower = models.ForeignKey(settings.AUTH_USER_MODEL,
                               related_name="user_follows")
  followee = models.ForeignKey(settings.AUTH_USER_MODEL,
                               related_name="user_followed")
  follow_date = models.DateTimeField('follow data')
  def __str__(self):
    return self.follower.username + "->" + self.followee.username


# Model Forms
class PostForm(ModelForm):
  class Meta:
    model = Post
    fields = ('title','text','url', 'latitude', 'longtitude')
    widgets = {
      'title': TextInput(attrs={'id' : 'input_post', 'placeholder':'Title'}),
      'text': TextInput(attrs={'id' : 'input_post', 'placeholder':'Text'}),
      'url': TextInput(attrs={'id' : 'url', 'placeholder':'URL'}),
      'latitude': TextInput(attrs={'id' : 'latitude', 'placeholder':'Latitude'}),
      'longtitude': TextInput(attrs={'id' : 'longtitude', 'placeholder':'Longitude'})
    }

class FollowingForm(ModelForm):
  class Meta:
    model = Following
    fields = ('followee',)

class MyUserCreationForm(UserCreationForm):
  class Meta(UserCreationForm.Meta):
    help_texts = {
      'username' : '',
    }
