# Upload Page (FE-1, FE-2)

## Initial State - Dropzone

```
┌─────────────────────────────────────────────────────────────────┐
│  Register New Asset                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │     ┌───────┐                                           │   │
│  │     │  📁   │   Drag & drop your 3D asset here         │   │
│  │     └───────┘   or click to browse                      │   │
│  │                                                         │   │
│  │     Supported: GLTF, GLB, FBX, VRM (up to 1GB)         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## After File Selected

```
┌─────────────────────────────────────────────────────────────────┐
│  Register New Asset                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐  ┌────────────────────────────────┐  │
│  │                      │  │ Asset Details                  │  │
│  │   [3D Preview]       │  │                                │  │
│  │   (auto-rotating)    │  │ Name:                          │  │
│  │                      │  │ [                            ] │  │
│  │                      │  │                                │  │
│  │                      │  │ Description:                   │  │
│  │                      │  │ [                            ] │  │
│  └──────────────────────┘  │ [                            ] │  │
│                            │                                │  │
│  ████████████░░░░ 75%      │ DNA Hash (SHA-256):            │  │
│  Calculating hash...       │ ┌────────────────────────────┐ │  │
│                            │ │ a3f2b8c9d1e4f5a6b7c8d9e0f1 │ │  │
│                            │ │ 2a3b4c5d6e7f8a9b0c1d2e3f4a │ │  │
│                            │ └────────────────────────────┘ │  │
│                            │            [Copy Hash]         │  │
│                            │                                │  │
│                            │ [      Register DNA      ]     │  │
│                            └────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Registration Success Modal

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         ✓ DNA Registered                        │
│                                                                 │
│     Your asset has been registered on the blockchain.          │
│                                                                 │
│     Token ID: #1234                                             │
│     Transaction: 0xabc123...  [View on Explorer]               │
│                                                                 │
│     [  View Asset  ]     [  Upload Another  ]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## User Flow

1. **Drop/Select File**
   - Validate file type (GLTF, GLB, FBX, VRM)
   - Show file name and size
   - Begin loading 3D preview

2. **Hash Calculation**
   - Progress bar animation
   - Client-side SHA-256 (mocked with 2-3 second delay)
   - Display truncated hash with copy button

3. **Fill Details**
   - Name field (required)
   - Description field (optional)
   - Auto-suggest name from filename

4. **Register**
   - Button disabled until hash complete + name filled
   - Click → loading state → success modal
   - Mock transaction hash generated

5. **Post-Registration**
   - "View Asset" → `/assets/[newId]`
   - "Upload Another" → reset form

## Visual Notes

- Dropzone: Dashed border, changes color on drag-over
- 3D Preview: Dark background, auto-rotate, same viewer as detail page
- Hash display: Monospace font, subtle code-block styling
- Progress bar: Gradient animation while processing
- Success modal: Confetti or subtle particle effect
