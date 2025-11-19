# Base image
FROM ubuntu:22.04
# Prevent tzdata from asking for input
ARG DEBIAN_FRONTEND=noninteractive
# Install Python
RUN apt-get update && \
    apt-get install -y python3 python3-pip build-essential libsqlite3-dev && \
    apt-get clean
# Create app directory
WORKDIR /app
# Copy project files
COPY . /app
# Install Python dependencies (note: matches your filename!)
RUN pip install -r requirments.txt
# Expose backend port
EXPOSE 5000
# Run the application
CMD ["python3", "app.py"]
