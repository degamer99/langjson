#!/bin/bash
#!/bin/bash

# Ensure list.txt exists
if [ ! -f $1 ]; then
  echo "❌ list.txt not found!"
  exit 1
fi

# Read and process each line
while IFS= read -r package || [[ -n "$package" ]]; do
  # Skip empty lines and comments
  if [[ -z "$package" || "$package" == \#* ]]; then
    continue
  fi

  echo "📦 Adding: $package"
  npx shadcn@latest add "$package"
done <$1
