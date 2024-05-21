from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos")
    title = models.CharField(max_length=30)
    desc = models.TextField(max_length=500)
    completed = models.BooleanField(default=False, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    finish_by = models.DateField()
    slug = models.SlugField(default="", blank=True)

    def __str__(self):
        return self.title


    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        return super(Todo, self).save(*args, **kwargs)
