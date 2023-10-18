## Test cron triggers using wrangler
On a terminal, run the local development server:
```
npx wrangler dev --test-scheduled
```

On another terminal:
```
curl "http://localhost:8787/__scheduled"
```