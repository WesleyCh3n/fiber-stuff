package main

import (
	"crypto/tls"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("This is HTTPS Home Page")
	})
	app.Static("/home", "./index.html")

	cert, err := tls.LoadX509KeyPair("./certs/server.crt", "./certs/server.key")
	if err != nil {
		log.Fatal(err)
	}

	config := &tls.Config{Certificates: []tls.Certificate{cert}}

	ln, err := tls.Listen("tcp", ":443", config)
	if err != nil {
		panic(err)
	}

	log.Fatal(app.Listener(ln))
}

// sudo cp server.crt /etc/ca-certificates/trust-source/anchors
// sudo update-ca-trust
