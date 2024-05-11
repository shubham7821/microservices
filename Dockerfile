# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables (optional)
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD 1234
ENV POSTGRES_DB testServer

# Expose the PostgreSQL port
EXPOSE 5432

# By default, Docker runs containers non-interactively, so you need to explicitly enable this to run as a foreground process
CMD ["postgres", "-c", "log_statement=all", "-c", "log_statement_stats=true", "-c", "log_duration=true", "-c", "log_connections=true", "-c", "log_disconnections=true", "-c", "log_duration_stats=true"]
