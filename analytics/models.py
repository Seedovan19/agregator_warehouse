from django.conf import settings
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from .utils import get_client_ip
from .signals import object_viewed_signal

User = settings.AUTH_USER_MODEL

class ObjectViewed(models.Model):
    user            = models.ForeignKey(User, blank=True, on_delete=models.SET_NULL, null=True)
    ip_address      = models.CharField(max_length=120, blank=True, null=True)
    content_type    = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True)
    object_id       = models.PositiveIntegerField()
    content_object  = GenericForeignKey('content_type', 'object_id')
    timestamp       = models.DateTimeField(auto_now_add=True)

    def __str__(self, ):
        return "%s viewed: %s" %(self.content_object, self.timestamp)

    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'Object Viewed'
        verbose_name_plural = 'Objects Viewed'

def object_viewed_receiver(sender, instance, request, *args, **kwargs):
    c_type = ContentType.objects.get_for_model(sender) # instance.__class__
    # print(sender)
    # print(instance)
    # print(request)
    # print(request.user)
     
    if request.user.is_anonymous:
        user_visited = None
    else:
        user_visited = request.user
    
    new_view_obj = ObjectViewed.objects.create (
        user=user_visited,
        content_type=c_type,
        object_id=instance.id,
        ip_address = get_client_ip(request)
    )

object_viewed_signal.connect(object_viewed_receiver)


