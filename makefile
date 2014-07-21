# Variables for Test
TESTS = test/*.js
REPORTER = spec
NODE_ENVIRONMENT=test

test:
	@NODE_ENV=$(NODE_ENVIRONMENT) mocha \
		--require should \
		--reporter $(REPORTER) \
		--timeout 5000 \
		--recursive


.PHONY: test