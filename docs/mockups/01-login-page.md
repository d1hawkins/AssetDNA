# Login Page (FE-0)

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    [Merava AssetDNA Logo]                       │
│                                                                 │
│              "Protect your digital identity"                    │
│                                                                 │
│         ┌─────────────────────────────────────┐                 │
│         │                                     │                 │
│         │   [Email Input                   ]  │                 │
│         │   [    Send OTP Code    ]           │                 │
│         │                                     │                 │
│         │   ─────────── or ───────────        │                 │
│         │                                     │                 │
│         │   [🦊 Connect Wallet        ]       │                 │
│         │                                     │                 │
│         └─────────────────────────────────────┘                 │
│                                                                 │
│              Background: Subtle 3D avatar silhouettes           │
│              with gradient mesh / particle effects              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Interactions

### Email + OTP Flow
1. User enters email address
2. Click "Send OTP Code"
3. Modal appears for 6-digit OTP input
4. On valid code → redirect to `/dashboard`

### Wallet Connect Flow
1. Click "Connect Wallet"
2. Mock wallet selection modal (MetaMask, WalletConnect, Coinbase)
3. Display "Connected as 0x1234..."
4. Redirect to `/dashboard`

## Visual Notes

- **Background:** Animated gradient mesh with floating 3D avatar silhouettes
- **Card:** Glassmorphism effect with subtle blur
- **Colors:** Bold gradients (purple → blue → cyan)
- **Typography:** Modern sans-serif, large hero text

## Mock Data

All auth is mocked with localStorage:
- Any email → sends "code" (accept any 6 digits)
- Wallet connect → generates mock address
- Store auth state in localStorage for persistence
