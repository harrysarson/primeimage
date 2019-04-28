
CFLAGS		= -Wall -Werror -lgmp -O3
EMCFLAGS	= --profiling \
			-s ALLOW_MEMORY_GROWTH=1 \
			-s EXPORTED_FUNCTIONS='["_find_candidate_with_progress", "_malloc", "_free"]' \
			-s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString", "lengthBytesUTF8"]' \
			-s MODULARIZE=1 -s 'EXPORT_NAME="prime_search"'

WEBSITE_BUILT_DIR = ../site/built

.PHONEY: clean all test install-website

all: built/near-prime built/prime-search.js

built/near-prime: prime-search.c near-prime.c Makefile
	mkdir -p built
	gcc near-prime.c prime-search.c $(CFLAGS) -o $@

built/prime-search.js: prime-search.c Makefile
	mkdir -p built
	emcc prime-search.c $(CFLAGS) $(EMCFLAGS) -o $@

prime-search.wasm: prime-search.js

install-website: prime-search.js prime-search.wasm
	mkdir -p $(WEBSITE_BUILT_DIR)
	cp prime-search.js $(WEBSITE_BUILT_DIR)/
	cp prime-search.wasm $(WEBSITE_BUILT_DIR)/

test: all
	echo "No tests yet"

clean:
	$(RM) built
