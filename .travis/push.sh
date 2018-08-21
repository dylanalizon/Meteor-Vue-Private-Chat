#!/bin/sh

meteor build .build/ --server-only --directory
cd .build/bundle/
git init
git add .
git commit -q -m "Build"
git remote add cleverapps https://$CLEVER_TOKEN:$CLEVER_SECRET@push.clever-cloud.com/app_6f6dfbaf-7f8a-4237-bc5b-5047c6412f5c.git
git push -v cleverapps master
