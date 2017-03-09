# Import the environment variables
-include .env

LIBRARY_NAME=handorgel

NODE_MODULES=./node_modules
SCRIPTS_PATH=./.tasks
CONFIG_PATH=./.config

WEBPACK=$(NODE_MODULES)/.bin/webpack
POSTCSS=$(NODE_MODULES)/.bin/postcss
ESLINT=$(NODE_MODULES)/.bin/eslint
BROWSERSYNC=$(NODE_MODULES)/.bin/browser-sync

WEBPACK_CONFIG=$(CONFIG_PATH)/webpack.js
POSTCSS_CONFIG=$(CONFIG_PATH)/postcss.js
BROWSERSYNC_CONFIG=$(CONFIG_PATH)/browsersync.js

SOURCE_PATH=./src
LIBRARY_PATH=./lib
ASSETS_PATH=./assets

DEV_PATH=./docs
DEV_CSS_PATH=$(DEV_PATH)/css
DEV_JS_PATH=$(DEV_PATH)/js


publish: build
	@ npm publish

build: test js js-minified css css-minified

test:
	# check source with eslint
	@ $(ESLINT) $(SOURCE_PATH)

js:
	@ LIBRARY_NAME=$(LIBRARY_NAME) \
		LIBRARY_PATH=$(LIBRARY_PATH) \
		SOURCE_PATH=$(SOURCE_PATH) \
		$(WEBPACK) --config $(WEBPACK_CONFIG) \
		--progress --colors --display-error-details

js-minified:
	@ LIBRARY_NAME=$(LIBRARY_NAME) \
		LIBRARY_PATH=$(LIBRARY_PATH) \
		SOURCE_PATH=$(SOURCE_PATH) \
		$(WEBPACK) --config $(WEBPACK_CONFIG) \
		--progress --colors --display-error-details --env.mode=minified

css: sass postcss

css-minified: sass postcss-minified

sass:
	# compile the sass files
	@ scss -I $(NODE_MODULES) \
		$(SOURCE_PATH)/style.scss:$(SOURCE_PATH)/style.scss.css \
		--style expanded \
		-r sass-json-vars

postcss:
	# modify the normal css with postcss
	@ ASSETS_PATH=$(ASSETS_PATH) \
		$(POSTCSS) --config $(POSTCSS_CONFIG) \
		$(SOURCE_PATH)/style.scss.css -o $(LIBRARY_PATH)/$(LIBRARY_NAME).css

postcss-minified:
	# modify the normal css with postcss in minified mode
	@ MODE=minified \
	  ASSETS_PATH=$(ASSETS_PATH) \
		$(POSTCSS) --config $(POSTCSS_CONFIG) \
		$(SOURCE_PATH)/style.scss.css -o $(LIBRARY_PATH)/$(LIBRARY_NAME).min.css


dev:
	@ $(SCRIPTS_PATH)/utils/parallel \
		"make dev-sync" \
		"make dev-js" \
		"make dev-css"

dev-sync:
	# starting browser sync server for demo
	@ DEV_PATH=$(DEV_PATH) \
		DEV_JS_PATH=$(DEV_JS_PATH) \
		DEV_CSS_PATH=$(DEV_CSS_PATH) \
		BROWSER=$(BROWSERSYNC_BROWSER) \
		PORT=$(BROWSERSYNC_PORT) \
		$(BROWSERSYNC) start \
		--config $(BROWSERSYNC_CONFIG)

dev-js:
	# watch demo js
	@ LIBRARY_NAME=$(LIBRARY_NAME) \
		LIBRARY_PATH=$(LIBRARY_PATH) \
		SOURCE_PATH=$(SOURCE_PATH) \
		DEV_PATH=$(DEV_PATH) \
		DEV_JS_PATH=$(DEV_JS_PATH) \
		$(WEBPACK) --config $(WEBPACK_CONFIG) \
		--progress --colors --watch --display-error-details --env.mode=dev

dev-css:
	# watch demo sass
	@ $(SCRIPTS_PATH)/utils/parallel \
		"make dev-sass" \
		"make dev-postcss"

dev-sass:
	# watch the sass files
	@ scss -I $(NODE_MODULES) \
		$(DEV_PATH)/demo.scss:$(DEV_CSS_PATH)/demo.scss.css \
		-r sass-json-vars \
		--watch

dev-postcss:
	# watch generated css file with postcss
	@ ASSETS_PATH=$(ASSETS_PATH) \
	  $(POSTCSS) --config $(POSTCSS_CONFIG) \
		$(DEV_CSS_PATH)/demo.scss.css -o $(DEV_CSS_PATH)/demo.css \
		--watch
