all:
	sudo go run ./bin/test-tls/main.go

win:
	env GOOS=windows GOARCH=amd64 go build

ssl:
	openssl req -x509 -new -nodes -sha256 -utf8 -days 3650 -newkey rsa:2048 \
		-keyout server.key -out server.crt -config ssl.conf
