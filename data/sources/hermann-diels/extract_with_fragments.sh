#!/bin/bash
# Extract only philosophers with B. FRAGMENTE sections

# Heraclitus - manually verified
sed -n '4101,6509p' band1.txt > philosophers/12-Heraclitus.txt
echo "✅ 12. Heraclitus (4101-6509)"

# Add others as we find them
echo "TODO: Extract remaining 15 philosophers with fragments"
