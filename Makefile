# Import the environment variables
-include .env

LIBRARY_NAME=handorgel

NODE_MODULES=./node_modules
SCRIPTS_PATH=./.tasks
CONFIG_PATH=./.config

ROLLUP=$(NODE_MODULES)/.bin/rollup
POSTCSS=$(NODE_MODULES)/.bin/postcss
ESLINT=$(NODE_MODULES)/.bin/eslint
BROWSERSYNC=$(NODE_MODULES)/.bin/browser-sync
UGLIFYJS=$(NODE_MODULES)/uglify-js/bin/uglifyjs

ROLLUP_CONFIG=$(CONFIG_PATH)/rollup.config.js
ROLLUP_CONFIG_DEV=$(CONFIG_PATH)/demo.rollup.config.js
POSTCSS_CONFIG=$(CONFIG_PATH)/postcss.config.js
BROWSERSYNC_CONFIG=$(CONFIG_PATH)/bs.config.js

SOURCE_PATH=./src
LIBRARY_PATH=./lib
ASSETS_PATH=./assets
DEV_PATH=./docs


publish: build
	@ npm publish

build: test js js-minify css css-minify

test:
	# check source with eslint
	@ $(ESLINT) $(SOURCE_PATH)

js:
	# create umd lib
	@ SOURCE_PATH=$(SOURCE_PATH) \
		$(ROLLUP) --config $(ROLLUP_CONFIG)

js-minify:
	# minify js
	@ $(UGLIFYJS) $(LIBRARY_PATH)/$(LIBRARY_NAME).js \
		--compress \
		--mangle \
		--toplevel \
		--output $(LIBRARY_PATH)/$(LIBRARY_NAME).min.js \
		--comments "/@preserve|@license|@cc_on/i"

css: sass postcss

css-minify: postcss-minified

sass:
	# compile the sass files
	@ scss -I $(NODE_MODULES) \
		$(SOURCE_PATH)/style.scss:$(SOURCE_PATH)/style.scss.css \
		--sourcemap=none \
		--style expanded \
		-r sass-json-vars

postcss:
	# modify the normal css with postcss
	@ ASSETS_PATH=$(ASSETS_PATH) \
		$(POSTCSS) --config $(POSTCSS_CONFIG) \
		$(SOURCE_PATH)/style.scss.css -o $(LIBRARY_PATH)/$(LIBRARY_NAME).css \
		--no-map

postcss-minified:
	# modify the normal css with postcss in minified mode
	@ MODE=minified \
	  ASSETS_PATH=$(ASSETS_PATH) \
		$(POSTCSS) --config $(POSTCSS_CONFIG) \
		$(SOURCE_PATH)/style.scss.css -o $(LIBRARY_PATH)/$(LIBRARY_NAME).min.css \
		--no-map

dev:
	@ $(SCRIPTS_PATH)/utils/parallel \
		"make dev-js" \
		"make dev-css" \
		"make dev-sync"

dev-sync:
	# starting browser sync server for demo
	@ DEV_PATH=$(DEV_PATH) \
		BROWSER=$(BROWSERSYNC_BROWSER) \
		PORT=$(BROWSERSYNC_PORT) \
		$(BROWSERSYNC) start \
		--config $(BROWSERSYNC_CONFIG)

dev-js:
	# watch demo js
	@ DEV_PATH=$(DEV_PATH) \
		$(ROLLUP) --config $(ROLLUP_CONFIG_DEV) --watch

dev-css:
	# watch demo sass
	@ $(SCRIPTS_PATH)/utils/parallel \
		"make dev-sass" \
		"make dev-postcss"

dev-sass:
	# watch the sass files
	@ scss -I $(NODE_MODULES) \
		$(DEV_PATH)/demo.scss:$(DEV_PATH)/css/demo.scss.css \
	  --load-path $(SOURCE_PATH) \
		--sourcemap=none \
		-r sass-json-vars \
		--watch

dev-postcss:
	# watch generated css file with postcss
	@ ASSETS_PATH=$(ASSETS_PATH) \
	  $(POSTCSS) --config $(POSTCSS_CONFIG) \
		$(DEV_PATH)/css/demo.scss.css -o $(DEV_PATH)/css/demo.css \
		--no-map \
		--watch
