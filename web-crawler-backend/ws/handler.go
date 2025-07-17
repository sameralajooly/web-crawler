package ws

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // allow all origins (development only)
	},
}

func HandleWebSocket(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket upgrade failed:", err)
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	client := make(Client)
	GetHub().Register(client)

	go func() {
		defer func() {
			GetHub().Unregister(client)
			conn.Close()
		}()

		for msg := range client {
			err := conn.WriteMessage(websocket.TextMessage, []byte(msg))
			if err != nil {
				break
			}
		}
	}()
}
