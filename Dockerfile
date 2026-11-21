# =========================================================================
# EYP OTO KURTARMA - DOKPLOY PRODUCTION DOCKERFILE
# Ultra-lightweight high-performance Nginx Alpine web server with Clean URLs
# =========================================================================

FROM nginx:alpine

# Copy custom Nginx configuration for Clean URLs, Gzip & dual-port support
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy static website files
COPY . /usr/share/nginx/html

# Expose HTTP port 80 and port 3000 (Dokploy default)
EXPOSE 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
