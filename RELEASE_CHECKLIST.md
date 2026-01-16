# Release Checklist

## Before Version Bump
- Update code and tests
- Run `npm test` (if applicable)
- Run `npm run build:lib`
- Verify `example` app still works
- Update `CHANGELOG.md` with new version notes

## Version + Tag
- `npm version patch` (or `minor` / `major`)

## Publish
- `npm login`
- `npm publish` (or `npm publish --access public` for scoped)

## After Publish
- Verify install in a fresh app
- Push git tag and commits to remote
