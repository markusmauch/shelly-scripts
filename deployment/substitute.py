import os
import re
from dotenv import load_dotenv

def get_replacements():
    """
    Retrieve the replacement pairs from the environment variables.
    """
    replacements = {}
    for key, value in os.environ.items():
        if key.isupper() and value:
            replacements[key] = f"'{value}'"
    return replacements

def replace_in_file(file_path, replacements):
    """
    Replace occurrences of the strings in the specified file.
    """
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    for old_string, new_string in replacements.items():
        content = re.sub(re.escape(old_string), new_string, content)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_directory(directory_path, replacements):
    """
    Process all files in the given directory and apply replacements.
    """
    for root, _, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)
            replace_in_file(file_path, replacements)

if __name__ == "__main__":
    import argparse
    
    # Set up command-line arguments
    parser = argparse.ArgumentParser(description="Replace strings in files based on .env configuration.")
    parser.add_argument('directory', help='The directory containing files to process.')
    parser.add_argument('--env-file', default='.env', help='Path to the .env file.')

    args = parser.parse_args()
    
    # Load environment variables from the specified .env file
    load_dotenv(args.env_file)
    
    # Get the replacements from environment variables
    replacements = get_replacements()
    
    # Process the files in the target directory
    process_directory(args.directory, replacements)
    
    print(f"Replaced strings in all files in {args.directory}")
