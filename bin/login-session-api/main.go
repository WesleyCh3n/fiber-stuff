package main

import (
	"log"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/session"
)

var store = session.New(session.Config{
	Expiration: time.Minute,
})

func main() {
	app := fiber.New()
	api := app.Group("/api", logger.New())

	api.Get("/login", func(c *fiber.Ctx) error {
		user := c.FormValue("user")
		pass := c.FormValue("pass")
		log.Println(user)
		log.Println(pass)

		/* sess, err := store.Get(c)
		if err != nil {
			log.Fatal(err)
		}

		sess.Set("name", c.Query("name", "unknown user"))
		if err := sess.Save(); err != nil {
			log.Fatal(err)
		} */

		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Successfully login",
			"data":    nil,
		})
	})

	api.Get("/logout", func(c *fiber.Ctx) error {
		sess, err := store.Get(c)
		if err != nil {
			log.Fatal(err)
		}

		sess.Delete("name")

		// Destry session
		if err := sess.Destroy(); err != nil {
			log.Fatal(err)
		}
		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Successfully logout",
			"data":    nil,
		})
	})

	api.Get("/device", func(c *fiber.Ctx) error {
		sess, err := store.Get(c)
		if err != nil {
			log.Fatal(err)
		}

		name := sess.Get("name")
		if name == nil {
			return c.JSON(fiber.Map{
				"status":  "success",
				"message": "You cannot get content",
				"data":    nil,
			})
		}

		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "You are valid to get content",
			"data":    nil,
		})
	})

	log.Fatal(app.Listen(":3000"))
}
