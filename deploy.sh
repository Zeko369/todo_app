#!/bin/bash

ssh -i deploy zeko@zekan.tk -t "cd todo_app && sh run_deploy.sh"
echo "Done"
