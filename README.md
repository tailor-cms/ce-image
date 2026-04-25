# Image

Image content element with upload and alt text support.

**Type:** `IMAGE`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `url` | `string \| null` | Public image URL |
| `alt` | `string?` | Alt text |

## Edit

- Image preview with progressive loading
- Upload button in top toolbar (JPG, JPEG, PNG, GIF, WEBP, AVIF) with URL source support
- Alt text field in side toolbar

## Display

- Renders the image with alt text
- Click image to open a fullscreen viewer dialog

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
