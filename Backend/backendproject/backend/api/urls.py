from django.urls import path
from .views import  signup_view, login_view
from .views import stripe_create_payment_intent, google_reviews

urlpatterns = [
   
    path("signup/", signup_view, name="signup"),
    path("login/", login_view, name="login"),
    path("payments/stripe/create-intent/", stripe_create_payment_intent, name="stripe-create-intent"),
    path('api/reviews/', google_reviews, name='google-reviews'),
]
