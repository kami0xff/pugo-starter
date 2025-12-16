# Build stage
FROM hugomods/hugo:exts-0.139.5 AS builder

WORKDIR /src

# Copy project files
COPY . .

# Build the site
RUN hugo --minify --gc

# Install and run Pagefind for search indexing
RUN npx -y pagefind

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built site from builder (includes pagefind index)
COPY --from=builder /src/public /usr/share/nginx/html

# Copy admin files
COPY admin /var/www/html/admin

# Create Hugo directories for volume mounts
RUN mkdir -p /var/www/hugo/content /var/www/hugo/data /var/www/hugo/static/images

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
