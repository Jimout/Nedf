#!/usr/bin/env pwsh
# Clear skip-worktree (lock) from all files in this repo.
# Run from repo root: pwsh ./clear-skip-worktree.ps1
Set-Location $PSScriptRoot
$count = 0
git ls-files -v | ForEach-Object {
  if ($_ -match '^H\s+(.+)') {
    $path = $matches[1]
    git update-index --no-skip-worktree -- $path 2>$null
    $count++
  }
}
Write-Host "Cleared skip-worktree for $count files."
$remaining = (git ls-files -v | Select-String '^H').Count
Write-Host "Files still with H: $remaining"
