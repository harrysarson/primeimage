
CFLAGS		= -Wall -Werror -lgmp -O3
EMCFLAGS	= --profiling \
			-s ALLOW_MEMORY_GROWTH=1 \
			-s EXPORTED_FUNCTIONS='["_find_candidate_with_progress", "_malloc", "_free"]' \
			-s EXTRA_EXPORTED_RUNTIME_METHODS='["stringToUTF8", "UTF8ToString", "lengthBytesUTF8"]' \
			-s MODULARIZE=1 -s 'EXPORT_NAME="prime_search"'

WEBSITE_BUILT_DIR = ../site/built

.PHONEY: clean all install_website

all: prime_search.out prime_search.js

prime_search.out: prime_search.c main.c Makefile
	gcc main.c prime_search.c $(CFLAGS) -o $@

prime_search.js: prime_search.c Makefile
	emcc prime_search.c $(CFLAGS) $(EMCFLAGS) -o $@

prime_search.wasm: prime_search.js

install_website: prime_search.js prime_search.wasm
	mkdir -p $(WEBSITE_BUILT_DIR)
	cp prime_search.js $(WEBSITE_BUILT_DIR)/
	cp prime_search.wasm $(WEBSITE_BUILT_DIR)/


clean:
	$(RM) prime_search.out prime_search.js prime_search.wasm
