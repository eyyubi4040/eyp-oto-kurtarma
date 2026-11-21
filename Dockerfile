# =========================================================================
# EYP OTO KURTARMA - DOKPLOY PRODUCTION DOCKERFILE
# Ultra-lightweight high-performance Nginx Alpine web server with Clean URLs
# =========================================================================

FROM nginx:alpine

# Copy custom Nginx configuration for Clean URLs, Gzip & caching
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY . /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Dokploy healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
