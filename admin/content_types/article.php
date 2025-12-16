<?php
/**
 * Pugo Content Type: Article
 * 
 * Default content type for articles, blog posts, and documentation.
 * This file is NEVER touched by Pugo updates.
 */

return [
    'name' => 'Article',
    'icon' => 'file-text',
    'description' => 'Standard article with title, description, and content',
    
    // Which sections use this type (empty = all sections)
    'sections' => [],
    
    // Fields for the frontmatter
    'fields' => [
        'title' => [
            'type' => 'text',
            'required' => true,
            'label' => 'Title',
            'placeholder' => 'Enter article title...'
        ],
        'description' => [
            'type' => 'textarea',
            'required' => true,
            'label' => 'Description',
            'description' => 'Brief summary for SEO (max 160 chars)',
            'maxlength' => 160
        ],
        'date' => [
            'type' => 'date',
            'required' => true,
            'label' => 'Publish Date'
        ],
        'author' => [
            'type' => 'text',
            'required' => false,
            'label' => 'Author'
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
            'label' => 'Weight',
            'description' => 'Sort order (lower = first)'
        ],
    ],
    
    // Available shortcodes
    'shortcodes' => [
        'img' => [
            'label' => 'Image',
            'icon' => 'image',
            'template' => '{{< img src="{src}" alt="{alt}" >}}'
        ],
        'video' => [
            'label' => 'Video',
            'icon' => 'video',
            'template' => '{{< video src="{src}" >}}'
        ],
    ],
];

