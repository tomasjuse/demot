#!/usr/bin/env python3
"""
Robot Framework variable file that loads environment configuration.
Usage: robot --variablefile config_loader.py tests/
"""
import os
from pathlib import Path
from dotenv import load_dotenv


def get_variables(env="dev"):
    """Load variables from environment files"""

    # Determine which environment to load
    test_env = os.getenv("TEST_ENV", env)

    # Load the appropriate .env file
    env_file = Path(__file__).parent.parent / f".env.{test_env}"

    if env_file.exists():
        load_dotenv(env_file, override=True)
    else:
        raise FileNotFoundError(f"Environment file not found: {env_file}")

    # Return variables as a dictionary
    return {
        "LOGIN_URL": os.getenv("LOGIN_URL", ""),
        "TABLE_URL": os.getenv("TABLE_URL", ""),
        "USERNAME": os.getenv("USERNAME", ""),
        "PASSWORD": os.getenv("PASSWORD", ""),
        "INVALID_PASSWORD": os.getenv("INVALID_PASSWORD", ""),
        "TEST_TIMEOUT": os.getenv("TEST_TIMEOUT", "30000"),
        "HEADLESS": os.getenv("HEADLESS", "false").lower() == "true",
    }
