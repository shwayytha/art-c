#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scalica.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
    
    PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
    STATIC_ROOT = os.path.join(PROJECT_DIR, 'static')
