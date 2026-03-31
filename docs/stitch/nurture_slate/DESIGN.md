# Design System Specification: The Empathetic Guardian

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Anchor"**

This design system is built to navigate the complex emotional and administrative landscape of parental leave in Singapore. We are moving away from the "government form" aesthetic and toward a "Digital Concierge" experience. 

The "Ethereal Anchor" concept balances the unwavering reliability of a financial institution (The Anchor) with the soft, supportive, and human-centric touch of early parenthood (The Ethereal). We achieve this through:
- **Intentional Asymmetry:** Breaking the 12-column rigidity to allow for "Editorial Breathing Room," where information is paced like a high-end magazine rather than a spreadsheet.
- **Tonal Depth:** Replacing harsh lines with atmospheric layering.
- **Sophisticated Scale:** Utilizing dramatic shifts between large, welcoming display type and precise, utilitarian functional type.

---

## 2. Colors: Atmospheric Trust

The palette utilizes a foundation of deep teals and soft oceanic blues, punctuated by the warmth of human connection through coral and amber accents.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
Structure is defined through **Chromatic Separation**. To separate a sidebar from a main feed, use a shift from `surface` (#f3faff) to `surface-container-low` (#e6f6ff). If an element needs to stand out, use color depth, not a stroke.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-translucent materials.
1.  **Base:** `surface` (#f3faff) — The primary canvas.
2.  **Sectioning:** `surface-container` (#dbf1fe) — For grouped content.
3.  **Elevation:** `surface-container-lowest` (#ffffff) — For cards or interactive modules that need to "pop" toward the user.

### The "Glass & Gradient" Rule
To avoid a flat, "templated" look, main CTAs and Hero sections should utilize a **Signature Texture**:
- **Primary Gradient:** Linear 135° from `primary` (#004d60) to `primary_container` (#00677f).
- **Glassmorphism:** For floating navigation or modal overlays, use `surface_container_lowest` at 80% opacity with a `backdrop-filter: blur(12px)`.

---

## 3. Typography: The Editorial Voice

We pair the geometric precision of **Manrope** for brand expression with the supreme legibility of **Inter** for data-heavy tasks.

*   **Display (Manrope):** Large, confident, and empathetic. Used for welcome messages and major milestones (e.g., "Your leave starts in 12 days").
*   **Headline/Title (Manrope):** Expert and authoritative. Used to anchor sections.
*   **Body/Label (Inter):** High-readability for complex Singaporean policy details and calculator outputs.

**Hierarchy Strategy:** 
Maintain a "High-Contrast" scale. Use `display-lg` (3.5rem) near `body-md` (0.875rem) to create a sophisticated, editorial layout that feels curated rather than crowded.

---

## 4. Elevation & Depth: Tonal Layering

Traditional box-shadows are often too heavy for a portal focused on "new beginnings." We use light and tone to guide the eye.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#e6f6ff) background. The 4% shift in brightness is enough for the eye to perceive a "lift."
*   **Ambient Shadows:** If a floating element (like a mobile FAB or a Tooltip) requires a shadow, use:
    *   `box-shadow: 0 12px 32px -4px rgba(7, 30, 39, 0.06);` (Using a tint of `on_surface` rather than pure black).
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., high-contrast mode), use `outline_variant` (#bfc8cd) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components: Soft & Intentional

### Buttons
*   **Primary:** Uses the Primary Gradient. Roundedness `full` (pill-shaped) to maximize the "friendly" feel. 
*   **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
*   **Tertiary:** Text-only with `primary` color and `label-md` weight.

### Input Fields & Data Entry
*   **Containers:** Use `surface_container_lowest` (#ffffff) with `DEFAULT` (0.5rem/8px) corners.
*   **States:** On focus, do not use a heavy border; use a 2px `primary` bottom-bar and a subtle `surface_tint` background glow.

### Cards & Lists (The "No-Divider" Rule)
*   **Lists:** Prohibit the use of horizontal rules (`<hr>`). Separate list items using `spacing-4` (1rem) of vertical whitespace and a subtle background hover state change to `surface_container_low`.
*   **Cards:** Use `lg` (1rem/16px) roundedness. Group related data using background shifts rather than internal lines.

### Specialized Component: The Calculator Output
*   **The Hero Stat:** For parental leave balance, use `display-md` in `primary` color.
*   **Visualization:** Use `secondary` (Teal) for "Used Leave" and `tertiary_fixed_dim` (Coral) for "Projected Leave" to create a warm, non-clinical data visualization style.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use asymmetrical margins. For example, a header might be offset to the right while the body text remains centered, creating a modern editorial feel.
*   **Do** use `tertiary` (Coral) sparingly as a "heartbeat" color—only for moments of delight, like "Leave Approved" or "New Baby Added."
*   **Do** prioritize "Natural Language" inputs (e.g., "My baby is due on [Date Input]").

### Don't:
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#071e27) to maintain a soft, premium feel.
*   **Don't** use `none` or `sm` roundedness. This system requires `DEFAULT` (8px) or higher to maintain its empathetic persona.
*   **Don't** crowd the screen. If a page feels full, increase the spacing from `8` (2rem) to `12` (3rem). In this system, "Luxury is Space."