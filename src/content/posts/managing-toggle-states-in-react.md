---
title: Managing Toggle States in React
description: Learn the basics of managing Toggle States in React.
pubDate: 2025-03-04
---

# Managing Toggle States in React

Handling toggles like menus, modals, or theme switches is a frequent need in React development. The **useState** hook combined with clear event handlers is a clean, reusable solution.

## Example: Navbar Menu Toggle

```jsx
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? "Close Menu" : "Open Menu"}
      </button>
      <ul className={isMenuOpen ? "menu open" : "menu"}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
```
