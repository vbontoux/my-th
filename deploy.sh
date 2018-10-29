#!/bin/sh

npm i && npm run build && aws s3 sync build/ s3://my-th-site
