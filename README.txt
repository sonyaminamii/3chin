# 3chin — first playable static prototype

## Open locally
Because the site loads JSON using fetch(), run it through a local static server rather than opening index.html directly.
For example, from this folder:
- `python -m http.server 8000`
- Open `http://localhost:8000`

## Included
- Homepage based on the supplied 3chin design screenshot
- Four boards: /b/, /g/, /x/, /v/
- Four sample threads with 10 posts each
- Thread pages, quote anchors, basic search
- Responsive layout
- No login, registration, posting backend, or user database

## Notes
- Attachment images are visual placeholders, not final evidence assets.
- Audio attachments are placeholders and should be replaced with real audio files if desired.
- Replace the cropped design reference assets with final standalone logo/banner/avatar files when available.
- The content is editable in `data/threads.json`.
