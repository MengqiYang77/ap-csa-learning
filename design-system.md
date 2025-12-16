# Cloud Dancer Design System
## PANTONE 11-4201 Theme for AP CSA Learning Platform

### Color Palette

#### Primary Colors
```css
--cloud-dancer: #FEFEFE;        /* Main background - pure, clean white */
--soft-white: #F8F8F8;          /* Secondary background - subtle contrast */
--warm-gray: #E8E8E8;           /* Borders and dividers */
--text-primary: #2C2C2C;        /* Main text - high contrast */
--text-secondary: #6B6B6B;      /* Secondary text */
```

#### Accent Colors
```css
--accent-blue: #4A90E2;         /* Interactive elements, links */
--accent-blue-hover: #357ABD;   /* Hover states */
--success-green: #5CB85C;       /* Success states, correct answers */
--warning-orange: #F0AD4E;      /* Warnings, hints */
--error-red: #D9534F;           /* Errors, incorrect answers */
```

#### Code Editor Colors
```css
--code-bg: #F5F5F5;             /* Code block background */
--code-border: #DADADA;         /* Code block border */
--syntax-keyword: #0066CC;      /* Java keywords */
--syntax-string: #669900;       /* String literals */
--syntax-comment: #999999;      /* Comments */
```

### Typography

#### Font Families
- **Primary**: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Monospace**: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace

#### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px - captions */
--text-sm: 0.875rem;   /* 14px - secondary text */
--text-base: 1rem;     /* 16px - body text */
--text-lg: 1.125rem;   /* 18px - large body */
--text-xl: 1.25rem;    /* 20px - subheadings */
--text-2xl: 1.5rem;    /* 24px - section titles */
--text-3xl: 1.875rem;  /* 30px - page titles */
--text-4xl: 2.25rem;   /* 36px - hero text */
```

### Spacing System
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

### Border Radius
```css
--radius-sm: 4px;      /* Small elements */
--radius-md: 8px;      /* Cards, buttons */
--radius-lg: 12px;     /* Large containers */
--radius-xl: 16px;     /* Hero sections */
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

### Design Principles

1. **Minimalism**: Clean, uncluttered layouts with ample whitespace
2. **Clarity**: High contrast text, clear visual hierarchy
3. **Consistency**: Uniform spacing, consistent component styling
4. **Focus**: Draw attention to learning content and code
5. **Professionalism**: Suitable for academic environment

### Component Styling Guidelines

#### Buttons
- Primary: Blue accent with white text
- Secondary: White with blue border
- Minimal padding, clear hover states
- Border radius: 8px

#### Cards
- White background with subtle shadow
- 1px border in warm gray
- 12px border radius
- Generous internal padding (24px)

#### Code Blocks
- Light gray background (#F5F5F5)
- Monospace font (JetBrains Mono)
- Syntax highlighting with muted colors
- Line numbers in light gray

#### Navigation
- Fixed sidebar with white background
- Active state: subtle blue accent
- Hover: light gray background
- Clear section separators

#### Forms
- Clean input fields with subtle borders
- Focus state: blue accent border
- Error state: red border with message
- Generous spacing between fields
