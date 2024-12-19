# Reranker Providers

![Version](https://img.shields.io/badge/version-0.0.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Min App Version](https://img.shields.io/badge/min%20app%20version-1.8.8-orange)

## What is this?

This is an Enconvo Extension that provides reranking capabilities through multiple providers:

- **EnConvo Cloud Plan** - Powered by Voyage Rerank models
- **Voyage AI** - Direct integration with Voyage AI's reranking models
- **SiliconFlow** - Integration with various reranking models including BAAI and Netease-Youdao

## Features

- Multiple provider options
- Easy configuration through preferences
- Support for different model variants
- Flexible API integration

## Supported Models

### EnConvo Cloud Plan

- Voyage Rerank-2 (40 points per invoke)
- Voyage Rerank-2 Lite (10 points per invoke)

### Voyage AI

- rerank-2
- rerank-2-lite

### SiliconFlow

- BAAI/bge-reranker-v2-m3
- netease-youdao/bce-reranker-base_v1

## Development

```bash
# Install dependencies
npm install

# Lint code
npm run lint

# Format code
npm run format

# Build
npm run build

# Development mode
npm run dev
```

## License

MIT EnconvoAI
