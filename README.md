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

## Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone this repository
git clone https://github.com/your-org/pugo-starter.git my-site
cd my-site

# Start with Docker
docker-compose up -d

# Access:
# - Site: http://localhost:1313
# - Admin: http://localhost:8080/admin/
```

### Option 2: Local Development

Requirements:
- PHP 8.1+
- Hugo (extended version recommended)
- Pagefind (optional, for search)

```bash
# Clone this repository
git clone https://github.com/your-org/pugo-starter.git my-site
cd my-site

# Start Hugo dev server
hugo server -D

# In another terminal, start PHP dev server for admin
cd admin
php -S localhost:8080

# Access:
# - Site: http://localhost:1313
# - Admin: http://localhost:8080
```

## Default Credentials

- **Username:** admin
- **Password:** admin

⚠️ **Change this immediately** in Settings > Password Hash Generator

## Project Structure

```
my-site/
├── admin/                  # Pugo Admin Panel
│   ├── core/              # Updateable core (don't edit)
│   ├── content_types/     # Your content type definitions
│   ├── custom/            # Your customizations (survives updates)
│   ├── config.php         # Your configuration (survives updates)
│   └── pugo               # CLI tool
│
├── content/               # Hugo content (Markdown files)
│   ├── _index.md         # Homepage
│   └── getting-started/  # Example section
│
├── layouts/               # Hugo templates
│   ├── _default/         # Base templates
│   ├── partials/         # Reusable components
│   └── shortcodes/       # Custom shortcodes
│
├── static/                # Static assets
│   ├── css/
│   ├── js/
│   └── images/
│
├── data/                  # Hugo data files
├── config.toml            # Hugo configuration
├── docker-compose.yml     # Docker setup
└── README.md
```

## Customization

### Add Site Components

Site Components let you manage YAML-driven sections like FAQs, Quick Access buttons, Features, etc.

1. Copy `admin/custom/components_registry.php.example` to `admin/custom/components_registry.php`
2. Define your components:

```php
<?php
return [
    'faqs' => [
        'name' => 'FAQ',
        'description' => 'Frequently asked questions',
        'icon' => 'help-circle',
        'color' => '#8b5cf6',
        'file' => 'faqs.yaml',
        'supports_translations' => true,
        'fields' => [
            'question' => ['type' => 'text', 'label' => 'Question', 'required' => true],
            'answer' => ['type' => 'textarea', 'label' => 'Answer', 'required' => true],
        ],
        'preview_template' => 'faq'
    ],
];
```

3. Create corresponding Hugo partials to use the data
4. Access via Admin → Site Components

### Add a New Content Type

1. Create `admin/content_types/my-type.php`:

```php
<?php
return [
    'name' => 'My Type',
    'icon' => 'star',
    'sections' => ['my-section'],
    'fields' => [
        'title' => ['type' => 'text', 'required' => true],
        'my_field' => ['type' => 'text', 'label' => 'My Custom Field'],
    ],
];
```

2. Create the Hugo layout `layouts/my-section/single.html`

### Override Admin Views

Create files in `admin/custom/views/` to override core views:

```
admin/custom/views/dashboard.view.php  # Custom dashboard
admin/custom/views/edit.view.php       # Custom editor
```

### Add Languages

Edit `admin/config.php`:

```php
'languages' => [
    'en' => ['name' => 'English', 'flag' => '🇬🇧', 'content_dir' => 'content'],
    'fr' => ['name' => 'Français', 'flag' => '🇫🇷', 'content_dir' => 'content.fr'],
],
```

Then create `content.fr/` folder with translated content.

## Updating Pugo

The `admin/core/` folder can be updated without affecting your customizations:

```bash
cd admin
./pugo update
```

Your `config.php`, `content_types/`, and `custom/` folders are **never touched**.

## Deployment

### GitLab CI/CD

1. Push your repo to GitLab
2. Add `.gitlab-ci.yml`:

```yaml
stages:
  - build
  - deploy

build:
  stage: build
  image: klakegg/hugo:ext-alpine
  script:
    - hugo --minify
    - npx pagefind --site public
  artifacts:
    paths:
      - public/

deploy:
  stage: deploy
  script:
    - rsync -avz public/ user@server:/var/www/my-site/
```

### GitHub Actions

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'
          extended: true
      - name: Build
        run: hugo --minify
      - name: Deploy
        # Add your deployment step here
```

## License

MIT

---

Made with ❤️ by Pugo

