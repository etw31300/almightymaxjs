#!/usr/bin/bash
session_name="almightymaxjs"

# kill the pre-existing tmux session if one exists
if tmux has-session -t $session_name; then
  tmux kill-session -t $session_name
fi

tmux new-session -s $session_name -d
tmux rename-window $session_name

tmux select-window -t 0
tmux split-window -h
tmux send-keys -t 1 "npm run dev:lavalink" ENTER

# wait for lavalink to be set up and ready for connections before running the nest service
while ! nc -z localhost 2333 </dev/null; do sleep 5; done
tmux split-window -v -t 1
tmux send-keys -t 2 "npm run dev:nest" ENTER