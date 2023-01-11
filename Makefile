install:
	npm install

start:
	npx gulp develop

lint:
	npx stylelint ./src/styles/**/*.scss
	npx htmlhint ./src/*.html

deploy:
	surge ./build/