# This is Hydra...
The most powerful language available to the human species. I think.

## What this... 'thing' is
The Hydra project is a Python-based programming language with many QOL (and just plain dumb) modifications.
Hydra is also backwards compatible with *all* Python 3 code.
Great. Now that I have that out of the way, I can tell you what you shouldn't know how to do: how to download and use this.

## How to Use
1. Download `hydra-installer.exe` or the equivalent for your platform.
2. During installation, make sure to check "add Hydra to PATH" on Windows.
3. To run your file (with a `.hy` extension), use the command:

```bash
hydra [path to Hydra script file]
```
It's as simple as that.
For example, if hello-world.hy was in your cwd:
```bash
hydra hello-world.hy
```
> You can add Hydra language support to VSCode by downloading the .vsix file in main. Then, drop it in a folder in VSCode's explorer, right click, then at the bottom of the menu, select "Install Extenstion VSIX".
# Installing Modules
To install a module, use the following command:
```bash
hydra -S [name of module]
```
This should install the module to the cwd.
For example, to install the delayprint module:
```bash
hydra -S delayprint
```
This will install the delayprint module to the same directory as sk.py.
You can then use it in your code:
```python
import delayprint as dp
dp("Hello World!", 0.05)
```
This will print each character of "Hello World!" one at a time, 0.05 seconds apart.
