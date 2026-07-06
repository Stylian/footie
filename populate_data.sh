#!/bin/bash

# Configuration
BASE_URL="http://localhost:8080"

# Helpers
invoke_post_request() {
    local path="$1"
    echo "POST $path"
    curl -s -X POST "${BASE_URL}${path}"
    echo "" # Add newline after output
}

invoke_get_request() {
    local path="$1"
    echo "GET $path"
    curl -s -X GET "${BASE_URL}${path}"
    echo "" # Add newline after output
}

run_season() {
    local season_num="$1"
    echo "=== Running Season ${season_num} ==="
    
    invoke_post_request "/rest/ops/season/create"
    
    if [ "${season_num}" -gt 1 ]; then
        invoke_post_request "/rest/ops/quals/0/set"
        invoke_get_request "/rest/ops/fill"
        invoke_get_request "/rest/next_game"
    fi

    invoke_post_request "/rest/ops/quals/1/set"
    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"

    invoke_post_request "/rest/ops/quals/2/set"
    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"

    invoke_post_request "/rest/ops/groups/1/set"
    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"

    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"

    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"

    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"

    invoke_get_request "/rest/ops/fill"
    invoke_get_request "/rest/next_game"
}

# Run simulation
run_season 1
run_season 2
run_season 3
run_season 4


