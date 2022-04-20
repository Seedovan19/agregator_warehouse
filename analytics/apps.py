from django.apps import AppConfig
# from django.conf import settings


class AnalyticsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'analytics'
    # def ready(self):
    #     tempUser= settings.AUTH_USER_MODEL.objects.create_user(username="anon", email="none")
    #     tempUser.save()
    #     pass