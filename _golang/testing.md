## Testing

Need to ensure cleanup is performed as there is no handholding by GO testing framework i.e. creating and deleting temp files.

```
go mod init <current_directory_folder_name>
go test
```

```go
package main

import (
	"os"
	"testing"
)

func TestNewDeck(t *testing.T) {
	cards := newDeck()
	if len(cards) != 16 {
		t.Errorf("Expected deck length of 16 but got %d", len(cards))
	}

	if cards[0] != "Ace of Spades" {
		t.Errorf("Expected first card Ace of Spades, but got %s", cards[0])
	}
}

func TestSaveToDeckAndNewDeckTestFromFile(t *testing.T) {
	os.Remove("_decktesting")
	deck := newDeck()
	deck.saveToFile("_decktesting")
	loadedDeck := newDeckFromFile("_decktesting")

	if len(loadedDeck) != 16 {
		t.Errorf("Expected 16 cards, got %d", len(loadedDeck))
	}
	os.Remove("_decktesting")
}
```
