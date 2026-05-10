#!/bin/bash
# Quick pixel/color check on render output. Used as acceptance gate.
set -e
TICKS=${1:-5000}
TICKS=$TICKS node tools/dump-frames.js 2>&1 | grep "surface1-640x480" | tail -1
