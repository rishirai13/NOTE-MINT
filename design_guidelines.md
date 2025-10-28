# NOTE-MINT Design Guidelines

## Design Approach: Premium Minimalist System
Drawing inspiration from modern productivity tools like Notion and Linear, combined with Apple HIG's minimalist philosophy, creating an ultra-premium $100,000-quality experience.

## Core Design Principles
1. **Refinement Over Decoration**: Every element serves a purpose with no visual clutter
2. **Immediate Clarity**: Users understand functionality within 3 seconds
3. **Privacy-First Visual Language**: Design communicates ephemeral, secure nature
4. **Effortless Interaction**: Zero learning curve for core functions

## Typography System

**Font Families**: Inter (primary UI), Poppins (headings), Roboto (monospace for timestamps)

**Hierarchy**:
- Brand/Logo: Poppins Bold, 32px (desktop), 24px (mobile)
- Page Headings: Poppins SemiBold, 28px (desktop), 20px (mobile)
- Subheadings: Inter SemiBold, 18px (desktop), 16px (mobile)
- Body Text: Inter Regular, 16px (desktop), 14px (mobile)
- Note Preview Snippets: Inter Regular, 14px with line clamping
- Timestamps: Roboto Mono, 12px, subtle weight
- Button Text: Inter Medium, 14-16px
- Placeholder Text: Inter Regular, 16px, reduced opacity

**Line Heights**: 1.6 for body text, 1.3 for headings

## Layout System

**Spacing Primitives**: Use Tailwind-equivalent units of 2, 4, 8, 12, 16, 24, 32 for consistent rhythm

**Container Strategy**:
- Landing page sections: max-width 1200px, centered
- Main app interface: max-width 900px for optimal note-taking focus
- Notes list sidebar: fixed width 320px (desktop), full-width drawer (mobile)

**Grid System**:
- Landing page: 2-column layouts for features (desktop), single column (mobile)
- App interface: Single-column focus with sidebar pattern

## Component Library

### Landing Page Components

**Hero Section** (70vh):
- Centered content with generous whitespace
- Brand name with tagline beneath
- Primary CTA button with glass-morphism effect
- Subtle animated gradient background
- NO hero image - pure typographic impact

**Features Section**:
- 3-column grid (desktop), stacked cards (mobile)
- Icon + title + description format
- Soft shadow cards with hover lift effect
- Icons: minimalist line-style from Heroicons

**Privacy Statement Section**:
- Centered text block, max-width 600px
- Badge/pill elements highlighting "Session Only" and "Zero Storage"

**Footer**:
- Minimal: Brand name, year, simple navigation links

### Main App Interface Components

**Fixed Header** (64px height):
- Bold "NOTE-MINT" branding left-aligned
- Dark/light mode toggle (moon/sun icon) right-aligned
- Subtle bottom border separator
- Remains visible during scroll

**Note Textarea**:
- Full-width, auto-expanding height (min 300px)
- Generous padding (24px all sides)
- Soft inset shadow for depth
- Placeholder text with graceful fade-in
- ARIA-compliant with visible label

**Save as PDF Button**:
- Prominent positioning below textarea
- Large touch target (min 48px height)
- Primary brand color with subtle gradient
- Icon (download) + text label
- Satisfying micro-animation on click

**Notes List Sidebar**:
- Desktop: Fixed 320px width panel on right
- Mobile: Bottom sheet drawer, swipe-up to expand
- Hidden scrollbar with visible scroll indicator
- Each note card contains:
  - Truncated preview (2 lines max)
  - Timestamp (e.g., "2 min ago")
  - Edit icon button
  - Delete icon button
- Hover states with elevation change
- Empty state with encouraging illustration/icon

**Search/Filter Bar**:
- Positioned above notes list
- Search icon + input field
- Real-time filtering with smooth transitions

**Toast Notifications**:
- Slide-in from top-right corner
- Rounded corners, soft shadow
- Icon + message + auto-dismiss (3 seconds)
- Success (green accent), Info (blue accent), Error (red accent)
- Dismissible with X button

### Interactive Elements

**Buttons**:
- Primary: Filled with brand gradient, white text
- Secondary: Outlined with border, transparent background
- Icon-only: Circular with subtle background
- All buttons: 8px border-radius, smooth hover scale (1.02), active state (0.98)
- Minimum 44x44px touch targets

**Toggle Switch (Dark/Light Mode)**:
- Rounded pill shape
- Animated slide transition
- Icon change (moon ↔ sun)
- Smooth color transitions (300ms ease)

**Input Fields**:
- 1px border, increased on focus
- 8px border-radius
- Padding: 12px horizontal, 10px vertical
- Focus ring: 3px with brand color at low opacity

## Visual Style

**Color Philosophy**: Neutral-first with subtle brand accents

**Light Mode Base**:
- Background: Pure white (#FFFFFF) or very light gray (#FAFAFA)
- Surface/Cards: White with subtle shadows
- Text Primary: Near-black (#1A1A1A)
- Text Secondary: Medium gray (#666666)
- Borders: Light gray (#E5E5E5)

**Dark Mode Base**:
- Background: Deep charcoal (#0F0F0F)
- Surface/Cards: Dark gray (#1A1A1A) with subtle highlights
- Text Primary: Off-white (#F5F5F5)
- Text Secondary: Light gray (#A0A0A0)
- Borders: Dark gray (#333333)

**Shadows**:
- Light mode cards: 0 2px 8px rgba(0,0,0,0.08)
- Light mode elevated: 0 4px 16px rgba(0,0,0,0.12)
- Dark mode cards: 0 2px 8px rgba(0,0,0,0.4)
- Inset shadows for textarea: inset 0 2px 4px rgba(0,0,0,0.06)

**Border Radius**:
- Buttons/Pills: 8px
- Cards: 12px
- Modals: 16px
- Input fields: 6px

## Micro-Interactions

**Hover States**:
- Cards: Slight elevation increase (2px), scale 1.01
- Buttons: Scale 1.02, brightness increase 5%
- Links: Underline appear with slide animation

**Click/Tap Feedback**:
- Scale down to 0.98 on active state
- Ripple effect for primary actions
- Color shift on toggle switches

**Transitions**:
- Standard: 200ms ease-out
- Theme switching: 300ms ease-in-out
- Modal appearance: 250ms cubic-bezier
- Toast notifications: 300ms slide + fade

**Loading States**:
- Skeleton screens for notes list
- Subtle pulse animation
- PDF export: Progress indicator overlay

## Responsive Behavior

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Adaptations**:
- Notes list becomes bottom sheet drawer
- Larger touch targets (minimum 48px)
- Simplified header with hamburger menu if needed
- Stacked layouts, no side-by-side columns
- Full-width elements with 16px horizontal padding

**Desktop Enhancements**:
- Side-by-side layout (textarea + notes list)
- Hover states more prominent
- Keyboard shortcuts visible on hover

## Accessibility Standards

**WCAG AAA Compliance**:
- Text contrast ratio minimum 7:1
- Large text minimum 4.5:1
- Focus indicators: 3px solid outline, high contrast
- All interactive elements keyboard navigable
- ARIA landmarks for screen readers
- Skip navigation link at page top

**Focus Management**:
- Visible focus rings on all interactive elements
- Logical tab order
- Focus trap in modals
- Focus return after modal close

## Performance & Polish

**Animations**: Use sparingly - only for meaningful feedback (theme toggle, PDF download confirmation, toast notifications)

**Loading Strategy**:
- Instant app shell
- Progressive enhancement
- Lazy load jsPDF library only when needed

**PWA Elements**:
- App icon with NOTE-MINT branding
- Splash screen matching theme
- Offline indicator banner if network lost

This design system creates a cohesive, ultra-premium experience that feels worth $100,000 while remaining accessible and privacy-focused.