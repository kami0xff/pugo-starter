# 🚀 Pugo Starter

A ready-to-use [Hugo](https://gohugo.io/) static site with the **Pugo** admin panel.

## What is Pugo?

Pugo is a PHP-based admin panel for Hugo static sites. It provides:

- 📝 **Markdown Editor** - Write content with live preview
- 🖼️ **Media Manager** - Upload and organize images/videos
- 🏷️ **Taxonomy Management** - Manage tags and categories
- 🌍 **Multi-language Support** - Built-in i18n
- 🔍 **Search** - Pagefind integration
- 🚀 **Git Publishing** - Push changes to trigger CI/CD

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     DEVELOPMENT                              │
│  docker-compose up                                           │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   PHP Admin     │  │   Hugo Server   │                   │
│  │   :8080         │  │   :1313         │                   │
│  │   Edit content  │  │   Live preview  │                   │
│  └─────────────────┘  └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
                               │
                               │ git push → CI/CD
                               ↓
┌─────────────────────────────────────────────────────────────┐
│                     PRODUCTION                               │
│  Static files only - No PHP, No Hugo                         │
│  ┌─────────────────────────────────────┐                    │
│  │         nginx:alpine                 │                    │
│  │   Serves pre-built static files      │                    │
│  └─────────────────────────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Clone with Submodules

```bash
git clone --recursive https://github.com/kami0xff/pugo-starter.git my-site
cd my-site
```

### 2. Start Development Environment

```bash
docker-compose up -d

# Access:
# - Hugo site (live reload): http://localhost:1313
# - PHP Admin panel:         http://localhost:8080
```

### 3. Set Up Your Own Repo

```bash
# Remove starter origin
git remote remove origin

# Add your project's repo
git remote add origin https://github.com/YOUR_USER/my-site.git
git push -u origin main
```

## Default Credentials

- **Username:** admin
- **Password:** admin

⚠️ **Change this immediately** in Settings > Password Hash Generator

## Project Structure

```
my-site/
├── admin/                  # Pugo Admin Panel
│   ├── core/              # Git submodule → pugo-core
│   ├── content_types/     # Your content type definitions
│   ├── custom/            # Your customizations
│   └── config.php         # Your configuration
│
├── content/               # Hugo content (Markdown files)
├── layouts/               # Hugo templates
├── static/                # Static assets
├── data/                  # Hugo data files
│
├── docker-compose.yml     # Development: PHP + Hugo
├── Dockerfile.prod        # Production: nginx only
├── nginx.prod.conf        # Production nginx config
└── .github/workflows/     # CI/CD pipeline
```

## Development Workflow

1. **Edit content** via PHP admin at `localhost:8080`
2. **Preview changes** live at `localhost:1313`
3. **Commit and push** to trigger deployment
4. **CI/CD builds** Hugo + Pagefind → deploys static files

## Deployment

### GitHub Actions (Included)

The `.github/workflows/deploy.yml` handles:
1. Build Hugo site
2. Generate Pagefind search index
3. Deploy to your server via rsync

**Required GitHub Secrets:**
- `DEPLOY_HOST` - Server hostname/IP
- `DEPLOY_USER` - SSH username
- `DEPLOY_KEY` - SSH private key
- `DEPLOY_PATH` - Path on server (e.g., `/var/www/my-site`)

### Manual Docker Deployment

```bash
# Build production image (after running hugo locally or in CI)
hugo --minify
npx pagefind --site public
docker build -f Dockerfile.prod -t my-site:latest .

# Run production container
docker run -d -p 80:80 my-site:latest
```

## Customization

### Add Site Components

Manage YAML-driven sections like FAQs, Quick Access, Features:

1. Copy `admin/custom/components_registry.php.example` to `components_registry.php`
2. Define your components
3. Access via Admin → Site Components

### Add Content Types

Create `admin/content_types/my-type.php`:

```php
<?php
return [
    'name' => 'My Type',
    'icon' => 'star',
    'sections' => ['my-section'],
    'fields' => [
        'title' => ['type' => 'text', 'required' => true],
    ],
];
```

### Add Languages

Edit `admin/config.php`:

```php
'languages' => [
    'en' => ['name' => 'English', 'flag' => '🇬🇧', 'content_dir' => 'content'],
    'fr' => ['name' => 'Français', 'flag' => '🇫🇷', 'content_dir' => 'content.fr'],
],
```

## Updating Pugo Core

```bash
git submodule update --remote admin/core
git add admin/core
git commit -m "chore: update pugo-core"
git push
```

## Contributing to Pugo Core

Changes in `admin/core/` can be pushed back:

```bash
cd admin/core
git add . && git commit -m "fix: improvement"
git push origin main

cd ../..
git add admin/core
git commit -m "chore: update pugo-core ref"
```

## License

MIT

---

Made with ❤️ by Pugo
