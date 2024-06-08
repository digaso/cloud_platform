FROM python:3.10.12
COPY requirements.txt /
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 8080
ENV PORT 8080

WORKDIR /app