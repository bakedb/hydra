#!/bin/bash

# Hydra Launcher Script for Linux

# Get the absolute path to the launcher directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define paths
PYTHON_HOME="$DIR/python"
PYTHON_BIN="$PYTHON_HOME/bin/python3"
HYDRA_ENTRY="$DIR/hydra/main.py"

# Optional: Set environment variables to isolate runtime
export PYTHONHOME="$PYTHON_HOME"
export PYTHONPATH="$DIR/hydra"

# Dispatch to Hydra engine
"$PYTHON_BIN" "$HYDRA_ENTRY" "$@"
