"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-51y85p74#yk3de3d2^1smbl@(n6j^3g$out&+o1uj-cmt+9la4"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# for linux server setup
# "192.168.142.128"
# WSL - Ubuntu IP = 172.28.46.238
ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "base.apps.BaseConfig",
    "rest_framework",
    "corsheaders",
    "django_celery_results",
]

# as we have given default auth classes to jwt, hence request.user will return nothing unless we pass jwt token as bearer
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30), #Customized
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,

    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,

    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",

    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}



MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",


    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

# comment the database one at time
DATABASES = {
    #### Django Default Sql-lite DATABASE
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    } ,

    #### POSTGRES DATABASE
    # "default" : {
    # 'ENGINE': 'django.db.backends.postgresql',
    # 'NAME': 'ecommerce',
    # 'USER': 'postgres',
    # 'PASSWORD' : '1234' ,
    # 'HOST' : 'localhost' ,
    # 'PORT' : '5432' ,
    # }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/


## Static Files Handling ...
STATIC_URL = "static/"
MEDIA_URL = "/images/"
STATICFILES_DIRS=[os.path.join(BASE_DIR, 'static')]
MEDIA_ROOT='static/images' #By this , it will be saved in this directory


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# CORS_ALLOWED_ORIGINS = [
#     "https://127.0.0.1:8000",
# ]
CORS_ALLOW_ALL_ORIGINS = True


# for linux server setup 
# #comment it for development
# # https://stackoverflow.com/questions/24022558/differences-between-staticfiles-dir-static-root-and-media-root
# STATIC_ROOT is useless during development, it's only required for deployment.
# STATIC_ROOT = os.path.join(BASE_DIR, 'static_cdn/')
STATIC_ROOT="/var/www/mysite/assets/"


### Celery - Asynchornous Process 
CELERY_RESULT_BACKEND='django-db'


### Email SETUP CONFIG
# EMAIL_BACKEND='django.core.mail.backends.console.EmailBackend' # It shows up email content rather than actually sending mail
EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='smtp.office365.com'
EMAIL_HOST_USER='mymail@outlook.com'
EMAIL_HOST_PASSWORD='password'
EMAIL_PORT=587
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL='mymail@outlook.com'


### Caching on Redis
CACHE_TTL=60*20 # 20 Minutes 
CACHES={
    "default": {
        "BACKEND" : "django.core.cache.backends.redis.RedisCache" ,
        "LOCATION" : "redis://127.0.0.1:6379" ,
        # "LOCATION": "redis://saumojit:123@127.0.0.1:6379"
    }
}
