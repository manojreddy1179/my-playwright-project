from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title='TradeLens Data Service', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health')
@app.get('/api/health')
def health() -> dict[str, Any]:
    return {
        'service': 'data-service',
        'status': 'ok',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'mode': 'paper',
    }


@app.get('/api/market/summary')
def market_summary() -> dict[str, Any]:
    return {
        'symbol': 'RELIANCE',
        'lastPrice': 2894.5,
        'changePct': 1.24,
        'status': 'demo-delayed',
        'note': 'Demo feed only. Replace with broker/WebSocket data later.',
    }


@app.get('/api/watchlist')
def watchlist() -> list[dict[str, Any]]:
    return [
        {'symbol': 'RELIANCE', 'score': 82, 'sentiment': 'Bullish'},
        {'symbol': 'TCS', 'score': 74, 'sentiment': 'Neutral'},
        {'symbol': 'HDFCBANK', 'score': 68, 'sentiment': 'Bullish'},
    ]
