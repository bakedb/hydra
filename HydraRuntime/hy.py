import sys
from pathlib import Path
import tokenize, io
import urllib.request

keyword_map = {
    "cdef": "class",
    "func": "def",
    "gdef": "global",
}

def transpile_code(code, keyword_map):
    output_tokens = []
    tokens = tokenize.generate_tokens(io.StringIO(code).readline)
    for tok_type, tok_string, *_ in tokens:
        if tok_type == tokenize.NAME and tok_string in keyword_map:
            output_tokens.append((tok_type, keyword_map[tok_string]))
        else:
            output_tokens.append((tok_type, tok_string))
    return tokenize.untokenize(output_tokens)

def run_hy_file(path):
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {path}")
    code = path.read_text(encoding="utf-8")
    py_code = transpile_code(code, keyword_map)
    exec(py_code, globals())

def get_module_url(module_name):
    return f"https://raw.githubusercontent.com/bakedb/hydra/main/modules/{module_name}.hym"

def install_module(module_name):
    url = get_module_url(module_name)
    try:
        with urllib.request.urlopen(url) as response:
            content = response.read().decode("utf-8")

        lines = content.splitlines()
        cleaned = "\n".join(line.rstrip() for line in lines if line.strip() != "")

        file_path = Path(f"{module_name}.py")
        if file_path.exists():
            print(f"Module '{module_name}' already exists. Skipping download.")
            return

        file_path.write_text(cleaned, encoding="utf-8")
        print(f"Installed '{module_name}.hym' from GitHub.")
    except Exception as e:
        print(f"Failed to install module '{module_name}': {e}")

if "-S" in sys.argv:
    index = sys.argv.index("-S")
    if index + 1 < len(sys.argv):
        module_name = sys.argv[index + 1]
        install_module(module_name)
        sys.exit()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python hy.py <your_file.hy>")
    else:
        run_hy_file(sys.argv[1]) 
