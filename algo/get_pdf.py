import subprocess
import nbformat

if __name__ == '__main__':
    try:
        # TODO: use the nbformat library to convert the notebook to a PDF
        #       https://nbconvert.readthedocs.io/en/latest/nbconvert_library.html
        
        subprocess.run('jupyter nbconvert --to pdf pdf_output.ipynb', check=True)
        print("Notebook conversion to PDF successful.")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred during notebook conversion: {e}") 