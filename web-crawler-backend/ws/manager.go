package ws

import (
	"sync"
)

type Client chan string

type Hub struct {
	clients map[Client]bool
	mu      sync.Mutex
}

var hub = Hub{
	clients: make(map[Client]bool),
}

func (h *Hub) Register(client Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.clients[client] = true
}

func (h *Hub) Unregister(client Client) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.clients, client)
	close(client)
}

func (h *Hub) Broadcast(message string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	for client := range h.clients {
		client <- message
	}
}

func GetHub() *Hub {
	return &hub
}
