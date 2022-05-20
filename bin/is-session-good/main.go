package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/template/html"
)

var store = session.New(session.Config{
	Expiration: time.Minute,
})

func main() {

	engine := html.New("./views", ".html")
	engine.Reload(true)
	// engine.Debug(true)
	engine.Layout("embed")
	engine.Delims("{{", "}}")
	app := fiber.New(fiber.Config{
		Views: engine,
	})
	api := app.Group("/api", logger.New())

	api.Get("/", func(c *fiber.Ctx) error {
		sess, err := store.Get(c)
		if err != nil {
			log.Println(err)
		}

		log.Println(sess)
		name := sess.Get("name")
		isLogin := name != nil
		UnauthorizedMessage := "You are not login"
		AuthorizedMessage := fmt.Sprintf("Welcome %v", name)

		return c.Render("index", fiber.Map{
			"AuthorizedMessage":   AuthorizedMessage,
			"UnauthorizedMessage": UnauthorizedMessage,
			"IsLogin":             isLogin,
		})
	})

	api.Get("/login", func(c *fiber.Ctx) error {
		sess, err := store.Get(c)
		if err != nil {
			panic(err)
		}

		sess.Set("name", c.Query("name", "unknown user"))
		if err := sess.Save(); err != nil {
			panic(err)
		}

		return c.Redirect("/api")
	})

	api.Get("/logout", func(c *fiber.Ctx) error {
		sess, err := store.Get(c)
		if err != nil {
			panic(err)
		}

		sess.Delete("name")

		// Destry session
		if err := sess.Destroy(); err != nil {
			panic(err)
		}

		return c.Redirect("/api")
	})

	log.Fatal(app.Listen(":3000"))
}
