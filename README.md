# ipfy

A beautiful and interactive Node.js CLI utility to quickly fetch your local and public IPv4 addresses.

## Features

- 🎨 **Interactive Menu** - Arrow-key navigation for easy selection
- 🌈 **Colorful Output** - Beautiful, color-coded terminal output using Chalk
- 🖥️ **Local IP** - Fetch all local IPv4 addresses (excluding `127.0.0.1`)
- 🌍 **Public IP** - Fetch your public-facing IPv4 address
- ⚡ **Fast & Lightweight** - Minimal dependencies, maximum performance
- 🚀 **Multiple Modes** - Interactive menu or command-line flags
- 🎯 **Script-Friendly** - Clean output for piping and automation

## Installation

### Prerequisites
- Node.js >= 18.0.0

### Install globally
```bash
npm install -g ipfy
npx ipfy
```

## Usage

### Interactive Mode
Simply run `ipfy` without any flags to launch the interactive menu:

```bash
ipfy
```

You'll see a menu where you can use arrow keys to select:
- My Local IP Address
- My Public IP Address
- Both Local and Public IPs
- Exit

### Command-Line Flags

#### Show Local IP
```bash
ipfy --local
```
Output:
```
192.168.1.7
```

#### Show Public IP
```bash
ipfy --public
```
Output:
```
203.0.113.42
```

#### Show Help
```bash
ipfy --help
# or
ipfy -h
```

## Examples

### Use in Scripts
```bash
# Store local IP in a variable
LOCAL_IP=$(ipfy --local)
echo "My local IP is: $LOCAL_IP"

# Store public IP in a variable
PUBLIC_IP=$(ipfy --public)
echo "My public IP is: $PUBLIC_IP"
```

### Pipe to Other Commands
```bash
# Copy IP to clipboard (Linux with xclip)
ipfy --public | xclip -selection clipboard

# Save to file
ipfy --local > my-ip.txt
```

## Dependencies

- [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts) - Interactive command-line prompts
- [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling

## Technical Details

- **Local IP Detection**: Uses native Linux/Unix commands (`ip`, `awk`, `cut`)
- **Public IP Detection**: Fetches from [api.ipify.org](https://www.ipify.org/)
- **Platform**: Linux/Unix systems only

## License

MIT

## Author

Syam Farijal