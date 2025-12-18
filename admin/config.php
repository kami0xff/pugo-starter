<?php
/**
 * Pugo - Site Configuration
 * 
 * This file is NEVER touched by Pugo updates.
 * Customize it for your site.
 */

// Prevent direct access
if (!defined('HUGO_ADMIN')) {
    define('HUGO_ADMIN', true);
}

// Base paths - use environment variable if set (Docker), otherwise use relative path
$hugo_root = getenv('HUGO_ROOT') ?: dirname(__DIR__);
define('HUGO_ROOT', $hugo_root);
define('ADMIN_ROOT', __DIR__);
define('CONTENT_DIR', HUGO_ROOT . '/content');
define('STATIC_DIR', HUGO_ROOT . '/static');
define('DATA_DIR', HUGO_ROOT . '/data');
define('IMAGES_DIR', STATIC_DIR . '/images');

/**
 * Discover sections dynamically from content folder
 */
function discover_sections() {
    $sections = [];
    
    // Define colors for your sections
    $section_colors = [
        'getting-started' => '#3b82f6',  // Blue
        'tutorials' => '#f59e0b',        // Amber
        'blog' => '#f97316',             // Orange
        'docs' => '#10b981',             // Emerald
        'guides' => '#8b5cf6',           // Purple
        // Add more as needed
    ];
    
    if (is_dir(CONTENT_DIR)) {
        foreach (scandir(CONTENT_DIR) as $item) {
            if ($item[0] === '.') continue;
            $path = CONTENT_DIR . '/' . $item;
            
            if (is_dir($path)) {
                $name = ucfirst(str_replace('-', ' ', $item));
                $index_file = $path . '/_index.md';
                
                if (file_exists($index_file)) {
                    $content = file_get_contents($index_file);
                    if (preg_match('/^title:\s*["\']?(.+?)["\']?\s*$/m', $content, $matches)) {
                        $name = trim($matches[1], '"\'');
                    }
                }
                
                $sections[$item] = [
                    'name' => $name,
                    'color' => $section_colors[$item] ?? '#6b7280',
                    'path' => $path
                ];
            }
        }
    }
    
    return $sections;
}

/**
 * Discover all unique tags from content
 */
function discover_tags() {
    $tags = [];
    
    if (!is_dir(CONTENT_DIR)) return $tags;
    
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator(CONTENT_DIR, RecursiveDirectoryIterator::SKIP_DOTS)
    );
    
    foreach ($iterator as $file) {
        if ($file->isFile() && $file->getExtension() === 'md') {
            $content = file_get_contents($file->getPathname());
            if (preg_match('/^---\s*\n(.*?)\n---/s', $content, $matches)) {
                $yaml = $matches[1];
                if (preg_match('/^tags:\s*$/m', $yaml)) {
                    preg_match_all('/^\s*-\s*(.+)$/m', $yaml, $tag_matches);
                    if (!empty($tag_matches[1])) {
                        foreach ($tag_matches[1] as $tag) {
                            $tag = trim($tag, '"\'');
                            $tags[$tag] = ($tags[$tag] ?? 0) + 1;
                        }
                    }
                }
            }
        }
    }
    
    arsort($tags);
    return $tags;
}

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

$config = [
    // Site Info
    'site_name' => 'My Pugo Site',
    'site_url' => 'http://localhost:1313',
    
    // Languages
    'languages' => [
        'en' => ['name' => 'English', 'flag' => '🇬🇧', 'content_dir' => 'content'],
        // 'fr' => ['name' => 'Français', 'flag' => '🇫🇷', 'content_dir' => 'content.fr'],
    ],
    'default_language' => 'en',
    
    // Frontmatter Fields
    'frontmatter_fields' => [
        'title' => [
            'type' => 'text', 
            'required' => true, 
            'label' => 'Title'
        ],
        'description' => [
            'type' => 'textarea', 
            'required' => true, 
            'label' => 'Description',
            'maxlength' => 160
        ],
        'author' => [
            'type' => 'text', 
            'required' => false, 
            'label' => 'Author'
        ],
        'date' => [
            'type' => 'date', 
            'required' => true, 
            'label' => 'Publish Date'
        ],
        'image' => [
            'type' => 'image', 
            'required' => false, 
            'label' => 'Featured Image'
        ],
        'tags' => [
            'type' => 'tags', 
            'required' => false, 
            'label' => 'Tags'
        ],
        'draft' => [
            'type' => 'checkbox', 
            'required' => false, 
            'label' => 'Draft'
        ],
        'weight' => [
            'type' => 'number', 
            'required' => false, 
            'label' => 'Weight'
        ],
    ],
    
    // Media Settings
    'allowed_images' => ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
    'allowed_videos' => ['mp4', 'webm'],
    'max_upload_size' => 100 * 1024 * 1024,
    
    // Build Settings
    'hugo_command' => 'cd ' . HUGO_ROOT . ' && hugo --minify',
    
    // Authentication
    // Default: admin/admin - CHANGE THIS!
    'auth' => [
        'enabled' => true,
        'username' => 'admin',
        'password_hash' => '$2y$10$9s/Fprrue/z17pmHSN5wSOkteJQK3CELO9JidV/KxCIgXzbxUVUWa',
        'session_lifetime' => 86400,
    ],
    
    // Git Settings
    'git' => [
        'enabled' => true,
        'user_name' => 'Pugo Admin',
        'user_email' => 'admin@example.com',
    ],
];

return $config;

