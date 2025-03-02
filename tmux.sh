#!/usr/bin/bash
session_name="almightymaxjs"

# function to determine if we already have a pane open already
function has_pane() {
  tmux has-session -t "$session_name.0$1" 2> /dev/null
}

# kill the pre-existing tmux session if one exists
if tmux has-session -t $session_name; then
  tmux kill-session -t $session_name
fi

tmux new-session -s $session_name -d
tmux rename-window $session_name

tmux select-window -t "$session_name.0"

# if we don't have pane 01 (lavalink), create it
if ! has_pane 1; then
  tmux split-window -h
  tmux select-pane -t "$session_name.01" -T "Lavalink"
fi
tmux send-keys -t "$session_name.01" "npm run dev:lavalink" ENTER

# wait for lavalink to be set up and ready for connections before running the nest service
while ! nc -z localhost 2333 < /dev/null; do sleep 5; done

# if we don't have pane 02 (nest), create it
if ! has_pane 2; then
  tmux split-window -v -t "$session_name.01"
  tmux select-pane -t "$session_name.02" -T "NestJS"
fi
tmux send-keys -t "$session_name.02" "npm run dev:nest" ENTER