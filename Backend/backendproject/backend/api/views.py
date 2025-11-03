from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import *
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .serializers import SignupSerializer, LoginSerializer
import razorpay
from rest_framework.permissions import IsAuthenticated
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

User = get_user_model()

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def signup_view(request):
#     """
#     Signup: expects JSON { first_name, last_name, email, password }
#     Returns: { token, user: { id, first_name, last_name, email } }
#     """
#     serializer = SignupSerializer(data=request.data)
#     if not serializer.is_valid():
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     user = serializer.save()

#     # create / get token
#     token, _ = Token.objects.get_or_create(user=user)

#     user_data = {
#         "id": user.id,
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "email": user.email,
#     }

#     return Response({"token": token.key, "user": user_data}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    """
    Signup API
    Expects: JSON { first_name, last_name, email, password }
    Returns: { token, user: { id, first_name, last_name, email } }
    """
    serializer = SignupSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    first_name = serializer.validated_data.get("first_name")
    last_name = serializer.validated_data.get("last_name")
    email = serializer.validated_data.get("email")
    password = serializer.validated_data.get("password")

    # Create user
    user = User.objects.create_user(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password
    )

    # Send welcome email
    subject = "Your Account Details"
    message = f"""
Hello {first_name}, welcome to Sivaji Nursery!

Your account has been successfully created.

Email: {email}
Password: {password}

You can log in using your credentials.

Regards,
Sivaji Nursery Team
"""
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False
        )
    except Exception as e:
        print(f"Email sending failed: {e}")

    # Create or get token
    token, _ = Token.objects.get_or_create(user=user)

    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
    }

    return Response({"token": token.key, "user": user_data}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    """
    Login: expects JSON { email, password }
    Returns: { token, user: { id, first_name, last_name, email } } on success
    """
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    # Authenticate. If your User model uses email as username, ensure authenticate accepts email
    # We created username=email at signup, so authenticate with username=email:
    user = authenticate(request, username=email, password=password)

    # If your AUTHENTICATION uses email field as username_field, you can do:
    # user = authenticate(request, email=email, password=password)

    if user is None:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    token, _ = Token.objects.get_or_create(user=user)

    user_data = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
    }

    return Response({"token": token.key, "user": user_data}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def razorpay_create_order(request):
    """
    Body: { amount_paise: int, receipt?: str, notes?: dict }
    Returns: { order_id, amount, currency: 'INR', key_id }
    """
    try:
        amount_paise = int(request.data.get("amount_paise", 0))
        receipt = request.data.get("receipt") or f"rcpt_{request.user.id}"
        notes = request.data.get("notes") or {}

        if amount_paise <= 0:
            return Response({"detail": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ use the initialized client here
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "receipt": receipt,
            "notes": {
                "user_id": str(request.user.id),
                **{k: str(v) for k, v in notes.items()},
            },
        })

        return Response({
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "key_id": settings.RAZORPAY_KEY_ID,
        })
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def razorpay_verify_payment(request):
    """
    Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
    Verifies signature. Return 200 on success.
    """
    try:
        payload = {
            "razorpay_order_id": request.data["razorpay_order_id"],
            "razorpay_payment_id": request.data["razorpay_payment_id"],
            "razorpay_signature": request.data["razorpay_signature"],
        }
        razorpay.Utility.verify_payment_signature(payload)

        # OPTIONAL (recommended):
        # payment = client.payment.fetch(payload["razorpay_payment_id"])
        # if payment.get("status") != "captured":
        #     return Response({"detail": "Payment not captured"}, status=status.HTTP_400_BAD_REQUEST)

        # TODO: mark your local Order as 'paid' using the order/payment IDs here
        # e.g., Order.objects.filter(razorpay_order_id=payload["razorpay_order_id"]).update(status="paid")

        return Response({"status": "ok"})
    except KeyError:
        return Response({"detail": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)
    except razorpay.errors.SignatureVerificationError:
        return Response({"detail": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)