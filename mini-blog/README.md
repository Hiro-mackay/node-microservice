# Microservices Blog Application

A blog application built with microservices architecture using Docker Compose.

## Architecture

- **Posts Service** (Port 4000): Create and retrieve posts
- **Event Bus** (Port 4005): Event distribution
- **Query Service** (Port 4002): Data aggregation and queries
- **Comments Service** (Port 4001): Comment management
- **Moderation Service** (Port 4003): Content moderation

## Quick Start

### Start all services

```bash
./start.sh
```

### Stop all services

```bash
./stop.sh
```

### Individual service management

```bash
# Start specific services
docker-compose up -d posts event-bus

# View logs
docker-compose logs -f posts

# Check service status
docker-compose ps
```

## API Endpoints

### Posts Service (http://localhost:4000)

- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `POST /events` - Receive events

### Event Bus (http://localhost:4005)

- `POST /events` - Send event
- `GET /events` - Get event history

### Query Service (http://localhost:4002)

- `GET /posts` - Get posts with comments
- `POST /events` - Receive events

### Comments Service (http://localhost:4001)

- `GET /posts/:postId/comments` - Get comments for a post
- `POST /posts/:postId/comments` - Create comment
- `POST /events` - Receive events

### Moderation Service (http://localhost:4003)

- `POST /events` - Receive events for moderation

## Development

### Run individual service

```bash
cd posts
npm run dev
```

### Rebuild Docker images

```bash
docker-compose build --no-cache
```

## Logs and Debugging

```bash
# All services logs
docker-compose logs -f

# Specific service logs
docker-compose logs -f posts

# Real-time logs
docker-compose logs -f --tail=100
```

## Cleanup

```bash
# Stop and remove containers
docker-compose down -v

# Remove images as well
docker-compose down --rmi all
```
