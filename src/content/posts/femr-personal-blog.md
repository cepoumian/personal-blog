---
title: Personal Blog
description: Project walk-through / case-study - Frontend Mentor Personal Blog
pubDate: 2024-03-18
category: projects
---

# Frontend Mentor - Personal Blog

I originally intended this blog to be merely a submission to the [Personal Blog challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/devjobs-web-app-HuvC_LP4l?tab=downloads). However, I decided to keep it, put it out there and start writing on it.

I figured that writing would help keep myself accountable while making the process of documenting any personal projects more enjoyable. Needless to say, I deviated from the original design where necessary.

In this post, I’ll share key takeaways, technical choices, and lessons learned.

## Table of Contents

- [Overview](#overview)
  - [Links](#links)
  - [Built with](#built-with)
- [Stack and Process](#stack-and-process)
  - [Astro](#astro)
  - [Sass](#sass)
    - [Maps and Functions](#maps-and-functions)
    - [Programmatic Utility Classes](#programmatic-utility-classes)
  - [Every Layout Techniques](#every-layout-techniques)
- [Reflections and Future Improvements](#reflections-and-future-improvements)
- [Conclusion](#conclusion)
- [Useful Resources](#useful-resources)
- [Author](#author)

---

## Overview

Since this is my personal blog, I made modifications to the challenge design to better fit my needs. For example:

- I replaced the newsletter feature with an **RSS feed** to avoid collecting email addresses.
- I added a **category filter with tabs** to allow users to browse posts by topic.

### Links

- [Solution URL](https://github.com/cepoumian/personal-blog)
- [Live Site URL](https://cepo-astro-blog.netlify.app/)

### Built With

- **Astro** – Optimized for content-focused sites
- **Sass** – Scalable and maintainable styling

---

# Stack and Process

## Astro

Astro was an excellent choice for this project, as it is designed for content-heavy websites and supports multiple rendering strategies (SSG, SSR, Hybrid). This allows me to start with a **fully static site** while keeping the option to introduce dynamic functionality later.

Some standout features:

- **Content Collections** make content management easier.
- **Ready-to-use integrations** (e.g., the RSS package, which I used to add RSS functionality with minimal effort).
- **Framework-agnostic flexibility**, which let me explore handling interactivity with **vanilla JavaScript** instead of React.

Although Astro makes integrating React (or other frameworks) seamless, I opted to stick with **vanilla JavaScript** for interactivity. This worked well, though I may rebuild certain components in React in the future.

## Sass

For styling, I followed a similar approach to my [**BMI Calculator project**](https://cepo-astro-blog.netlify.app/blog/project-bmi-calc/), using **Sass** to enhance maintainability.

- **Modified 7-1** architecture for clear separation of concerns.
- **Sass maps and functions** to manage colors, typography, and sizes.
- **Programmatic utility classes** using `@each`, reducing redundancy.
- **Layout utilities** inspired by the _Every Layout_ book.

### Maps and Functions

Using Sass maps allows for **centralized styling values**, reducing inconsistency. For example:

```scss
$colors: (
  neutral: (
    900: #000000,
    100: #ffffff,
  ),
  primary: (
    100: #e1e7fe,
    500: #345ff6,
    900: #253347,
  ),
);
```

With helper functions:

```scss
@function clr($color, $shade) {
  @return map.get($colors, $color, $shade);
}
```

Usage:

```scss
body {
  color: clr(neutral, 900);
}
```

### Programmatic Utility Classes

Instead of writing repetitive CSS, I dynamically generate utility classes using `@each`:

```scss
@each $size-name, $size-value in $font-sizes {
  .fs-#{$size-name} {
    font-size: $size-value;
  }
}
```

This approach keeps the codebase **efficient and scalable**.

## Every Layout Techniques

I applied techniques from the _Every Layout_ book to ensure **consistent spacing** and **flexible layouts**. One of the most useful was the **Stack pattern**, which creates **consistent vertical spacing** between elements.

```scss
.stack {
  --stack-space: 1rem;
  display: flex;
  flex-direction: column;
}

.stack > * + * {
  margin-block-start: var(--stack-space);
}
```

This **eliminates hardcoded margins** and improves maintainability.

---

## Reflections and Future Improvements

This project reinforced the importance of **modular design** and the advantages of **static site generation**. However, as the blog grows, I may explore **hybrid rendering** to introduce more dynamic features.

Other future enhancements may include:

- **Improved animations** for a smoother user experience.
- **Search functionality** to help users find content more easily.
- **React integration** for select interactive components.

## Conclusion

Building my personal blog with Astro was a rewarding experience that reinforced the importance of choosing the right tools for the job. Astro's flexibility allowed me to start with a simple static site while keeping the door open for more complex features in the future. Meanwhile, my continued use of Sass and CSS utility patterns helped me maintain a clean and scalable codebase.

This project also reinforced my appreciation for modular design and the benefits of static site generation. However, I recognize that as the blog grows, I may need to integrate more client-side interactivity—possibly with React for certain components. The key takeaway is that selecting a framework or approach isn’t about what’s trending but about what serves the project’s long-term goals effectively.

Moving forward, I plan to enhance the site with better animations, a search feature, and potentially a hybrid rendering strategy. Every project brings new lessons, and I’m excited to see how this blog evolves over time.

---

## Useful Resources

- [Astro Docs](https://docs.astro.build/en/getting-started/)
- [Every Layout](https://every-layout.dev/)
- [Sass Official Docs](https://sass-lang.com/documentation/)
- [Frontend Mentor](https://www.frontendmentor.io/)

---

## Author

- **Website** – Cesar Poumian
- [LinkedIn](https://www.linkedin.com/in/cesar-eduardo-poumian-orozco-407020b6/)
