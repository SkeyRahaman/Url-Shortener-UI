# ==========================================
# Stage 1: Build the React Application (Vite)
# ==========================================
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package lock and configuration files first to optimize Docker layer caching
COPY package.json package-lock.json ./

# Install exact dependencies using clean install
RUN npm ci

# Copy the remaining application source code
COPY . .

# Accept build-time environment variables for Vite (injected at bundle time)
ARG VITE_API_BASE_URL=https://url-shortner-ergb.onrender.com
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build production-ready static assets into /app/dist
RUN npm run build

# ==========================================
# Stage 2: Serve static assets with Nginx
# ==========================================
FROM nginx:alpine AS production

LABEL maintainer="Url-Shortener-UI" \
      description="Production Nginx container serving built React SPA"

# Remove default Nginx welcome site files
RUN rm -rf /usr/share/nginx/html/*

# Copy SPA-compatible Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static artifacts from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

# Healthcheck to verify Nginx is running and serving requests successfully
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
