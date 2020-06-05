#!/bin/bash

git push
ssh vps -t "cd todo_app && sh run_deploy.sh"
echo "Done"
