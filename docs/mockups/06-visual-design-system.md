# Visual Design System

## Brand Direction

**Creative & Bold, but Professional**
- Appeals to digital creators and artists
- Maintains credibility for enterprise/agency users
- Modern, premium feel

## Color Palette

### Primary Colors
```
Primary Gradient:  #7C3AED → #2563EB → #06B6D4
                   (Purple)   (Blue)    (Cyan)

Primary Solid:     #7C3AED (Violet-600)
```

### Neutral Colors
```
Background Dark:   #0F172A (Slate-900)
Background Card:   #1E293B (Slate-800)
Surface:           #334155 (Slate-700)
Border:            #475569 (Slate-600)

Text Primary:      #F8FAFC (Slate-50)
Text Secondary:    #94A3B8 (Slate-400)
Text Muted:        #64748B (Slate-500)
```

### Semantic Colors
```
Success:           #10B981 (Emerald-500)
Warning:           #F59E0B (Amber-500)
Error:             #EF4444 (Red-500)
Info:              #3B82F6 (Blue-500)
```

## Typography

### Font Family
```
Headings:  Inter (700, 600)
Body:      Inter (400, 500)
Mono:      JetBrains Mono (for hashes, code)
```

### Scale
```
Display:   48px / 1.1 line-height
H1:        36px / 1.2
H2:        30px / 1.25
H3:        24px / 1.3
H4:        20px / 1.4
Body:      16px / 1.5
Small:     14px / 1.5
Caption:   12px / 1.4
```

## Spacing

Based on 4px grid:
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

## Components

### Buttons

**Primary Button**
```
Background: Primary gradient
Text: White
Border-radius: 8px
Padding: 12px 24px
Hover: Brightness increase + subtle glow
```

**Secondary Button**
```
Background: Transparent
Border: 1px solid Slate-600
Text: Slate-200
Hover: Background Slate-700
```

**Ghost Button**
```
Background: Transparent
Text: Slate-400
Hover: Text Slate-200
```

### Cards

```
Background: Slate-800 with 80% opacity
Border: 1px solid Slate-700
Border-radius: 12px
Shadow: 0 4px 6px rgba(0,0,0,0.3)
Hover: Border Slate-600, Shadow increase
```

### Inputs

```
Background: Slate-900
Border: 1px solid Slate-600
Border-radius: 8px
Focus: Border Primary, subtle glow
Placeholder: Slate-500
```

### Badges

**Verified Badge**
```
Background: Emerald-500/20
Text: Emerald-400
Border: 1px solid Emerald-500/30
Icon: Checkmark
```

**Pending Badge**
```
Background: Amber-500/20
Text: Amber-400
```

## Effects

### Glassmorphism (Login card, modals)
```
Background: rgba(30, 41, 59, 0.8)
Backdrop-filter: blur(12px)
Border: 1px solid rgba(255,255,255,0.1)
```

### Glow Effects
```
Primary glow: 0 0 20px rgba(124, 58, 237, 0.3)
Success glow: 0 0 20px rgba(16, 185, 129, 0.3)
```

### Gradients

**Background Mesh**
```
Radial gradients with:
- Purple at top-left
- Blue at center
- Cyan at bottom-right
Animated subtle movement
```

## Motion

### Transitions
```
Default:  150ms ease-out
Slow:     300ms ease-out
Spring:   200ms cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Animations
- Card hover: scale(1.02)
- Button hover: brightness(1.1)
- Loading: pulse or skeleton shimmer
- Success: subtle confetti or particles
- 3D viewer: smooth orbit rotation

## Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

### Layout Adjustments
- Mobile: Sidebar becomes bottom nav or hamburger
- Tablet: Sidebar collapsed by default
- Desktop: Full sidebar visible
