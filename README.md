## r_u_headless

Help to detect whether your website user is headless browser

## How To Use

```bash
npm install r_u_headless -S
```

```javascript
import RUHeadless from 'r_u_headless'

RUHeadless((isHeadless: boolean, evidences: <{ type: string, description: string }>[]) => {
  console.log(isHeadless, evidences)
})
```

