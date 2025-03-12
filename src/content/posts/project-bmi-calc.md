---
title: Body Mass Index Calculator Website
description: Project walk-through / case-study - Frontend Mentor BMI Calculator challenge
pubDate: 2024-03-11
category: projects
---

# Frontend Mentor - Body Mass Index Calculator Challenge

In this post, I go through my implementation of the [Body Mass Index Calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/body-mass-index-calculator-brrBkfSz1T). I go over the challenge, the process, the stack choices and findings, sharing some insights and techniques which the reader will hopefully find valuable.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
- [The process and the stack](#the-process-and-the-stack)
  - [Alpine.js with Web Components](#alpinejs-with-web-components)
  - [Sass](#sass)
    - [Maps and functions](#maps-and-functions)
    - [Creating utility classes programmatically](#creating-utility-classes-programmatically)
  - [CSS Grid](#css-grid)
  - [Every Layout Techniques](#every-layout-techniques)
- [Reflections and continued development](#reflections-and-continued-development)
- [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select whether they want to use metric or imperial units
- Enter their height and weight
- See their BMI result, with their weight classification and healthy weight range
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

Here are the links to the live website and the github repo.

### Links

- [Repo URL](https://github.com/cepoumian/bmi-calculator)
- [Live Site URL](https://cepo-bmi-calculator.netlify.app/)

### Built with

- Sass
- CSS Grid
- Web Components
- [Alpine.js](https://alpinejs.dev/) - JS framework

# The process and the stack

## Alpine.js with Web Components

I found this challenge to be a perfect use case for Alpine.js, which is a super lightweight Javascript framework designed to compose behavior directly in the markup. Basically, it’s a small set of attributes, properties and methods which allow you to very selectively add the interactivity your project needs with no unnecessary overhead or complexity.

In the case of this project, most of it is static markup and styling; the BMI calculator is the only interactive element, and to be honest, I thought it would be overkill to use React just for that. Also, using React would mean making this website client-rendered; this would hinder SEO, which for this type of website is important. Granted, Next.js could solve this, but again, too much for this small website.

The only thing I don’t like about Alpine is that it doesn’t provide a mechanism to create separate components, as most other frontend frameworks do. This is not a deal breaker for such a small website, but at the very least, I wanted the BMI calculator to be its own thing.

Luckily, I found the [Alpine Web Components](https://github.com/niconoclaste/alpinejs-web-components/) package, which in the words of its developer:

_“is a tiny script which loads the content of a regular HTML file, converts it to a `Web component` and makes it usable anywhere in your pages with reactivity and logic powered by `Alpine.js`.”_

This was exactly what I needed to abstract the BMI calculator to a separate web component, but have all the logic and state being managed by Alpine.js, which features a super intuitive and declarative API.

For example, we can render text conditionally based on state:

```html
<span x-text="unit === 'metric' ? 'cm' : 'inches' "></span>
```

Or bind inputs to state values:

```html
<input type="radio" id="metric" value="metric" x-model="unit" />
```

To manage state and unit conversion in Alpine.js, I did have to set several things up within Alpine.data(). This method initializes state variables and defines getter functions. Granted, this is where complexity may start to creep in, but for small projects, it shouldn't get so bad, provided we keep our methods lean, and abstract all the logic we can to helper methods, as I did inthis case:

```jsx
window.Alpine.data("bmiCalculator", () => ({
  unit: "metric",
  prevUnit: "metric",
  height: "",
  weight: "",
  bmi: 0,
  converting: false, // Flag to prevent double conversion
  get bmiMessage() {
    return bmiMessage(this.bmi, this.unit, this.height);
  },
  convertUnits() {
    if (!this.height || !this.weight || this.converting) return;
    this.converting = true;

    const converted = convertUnits(
      this.unit,
      this.prevUnit,
      this.height,
      this.weight
    );
    this.height = converted.height;
    this.weight = converted.weight;

    this.prevUnit = this.unit;

    setTimeout(() => {
      this.converting = false;
      this.calculateBMI();
    }, 50);
  },
  idealWeightRange() {
    const height = parseFloat(this.height);
    if (isNaN(height) || height <= 0) return { min: "--", max: "--" };

    if (this.unit === "metric") {
      const heightInMeters = height / 100;
      const min = (18.5 * heightInMeters ** 2).toFixed(1);
      const max = (24.9 * heightInMeters ** 2).toFixed(1);
      return { min, max };
    } else {
      const min = ((18.5 * height ** 2) / 703).toFixed(1);
      const max = ((24.9 * height ** 2) / 703).toFixed(1);
      return { min, max };
    }
  },
  calculateBMI() {
    if (this.converting) return;
    this.bmi = calculateBMI(this.unit, this.height, this.weight);
  },
  init() {
    this.$watch("height", () => {
      if (!this.converting) this.calculateBMI();
    });
    this.$watch("weight", () => {
      if (!this.converting) this.calculateBMI();
    });
    this.$watch("unit", (newUnit, oldUnit) => {
      this.prevUnit = oldUnit;
      this.convertUnits();
    });
  },
}));
```

calculateBMI, convertUnits and bmiMessage are all helper methods imported to the script.

With the interactive logic in place, I then focused on structuring and styling the UI efficiently using Sass.

## Sass

In regards to styling, I went all in with Sass, using a modified version of the 7-1 pattern, with the main difference being that I have an individuals directory where I have the sass for very specific single entities; I like differentiating reusable components from very specific one-off entities.

Aside from that, there were several cool techniques I was able to apply.

### Maps and functions

For example, having values for colors, sizes, etc., in maps and creating functions that leverage those maps:

```scss
$colors: (
  neutral: (
    900: #000000,
    100: #ffffff,
  ),
  primary: (
    100: #e1e7fe,
    300: #b3d3f1,
    500: #345ff6,
    900: #253347,
  ),
  // ...
```

```scss
@function clr($color, $shade) {
  @if map.has-key($colors, $color, $shade) {
    @return map.get($colors, $color, $shade);
  } @else {
    @error '$colors does not have that color!';
  }
}
```

Then, using these functions is a piece of cake and prevents all color related inconsistencies down the line:

```scss
body {
  font-family: $ff-base;
  font-size: fs(400);
  font-weight: $fw-400;
  color: clr(neutral, 900);
  line-height: $line-height-regular;
}
```

### Creating utility classes programmatically

Using Sass features like `@each`, I was able to setup the generation of utility classes programmatically. I find this technique super-powerful, as the algorithm is the only thing you have to tweak and maintain, and all the bunch of necessary utility classes will be at your disposal when needed.

For example, this setup:

```scss
@each $size-name, $size-value in $font-sizes {
  .fs-#{$size-name} {
    font-size: $size-value;

    @if $size-name > 600 {
      line-height: 1.1;
    }
  }
}
```

generates classes like `fs-400`, `fs-600`, etc.

Other Sass features I used were mixins for media queries, nesting, interpolation, etc.

## CSS Grid

The design for this project asks for a very peculiar layout grid which, at large viewports, features an irregular and skewed arrangement, and becomes regular and symmetrical at medium sizes and below.

This seemed like a great opportunity to leverage the CSS Grid. Using grid template areas, I was able to accomplish the layout shifts painlessly, going from something like this in large viewports

```scss
grid-template-columns: repeat(10, 1fr);
grid-template-areas:
  ". . . . . gen gen gen gen ."
  ". . age age age age mus mus mus mus"
  "preg preg preg preg race race race race . .";
```

…to something like this at medium

```scss
grid-template-columns: repeat(8, 1fr);
grid-template-areas:
  "gen gen gen gen age age age age"
  "mus mus mus mus preg preg preg preg"
  ". . race race race race . .";
```

… and finally at small viewports

```scss
grid-template-columns: repeat(4, 1fr);
grid-template-areas:
  "gen gen gen gen"
  "age age age age"
  "mus mus mus mus"
  "preg preg preg preg"
  "race race race race";
```

## Every Layout Techniques

Finally, as I have been doing in all my projects, I applied several of the techniques proposed in the Every Layout book. The one I keep using the most is the stack, which allows us to easily add vertical separation to children elements of a parent. I ended up implementing this way for this project:

```scss
.stack {
  --stack-space: #{size(32)};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.stack > * {
  margin-block: 0;
}

.stack > * + * {
  margin-block-start: var(--stack-space);
}
```

## Reflections and continued development

This project allowed me to see that there are still a lot of Sass features and patterns I have to explore. For example, I don’t think I leveraged Sass functions as much as I could have, which would have simplified some processes even more.

On the other hand, although Alpine.js is an awesome minimalistic framework to add interactivity very selectively, I doubt I would use it for any frontend project more complex than this one. I’ve been learning backend development with Adonis.js, and Alpine.js truly shines when used in that context. However, for frontend apps, I’ll be sticking to React and Svelte.

While I’m happy with the results, if I were to redo this challenge, I might experiment with a hybrid approach—perhaps using Web Components for encapsulation but managing state with a more scalable pattern.

# Conclusion

The key learning I take away from this project is that there may be scenarios in which a minimalistic and lightweight JavaScript framework such as Alpine.js makes a lot more sense than React, Angular, Vue, etc. However, before dismissing those larger frameworks, one should carefully consider all the conveniences they provide—state management, component architecture, routing, and scalability. While a lightweight alternative may seem appealing for smaller projects, it’s crucial to evaluate whether it will fully meet the project’s needs in the long run. Otherwise, one might end up reinventing the wheel by patching together custom solutions for problems that established frameworks already solve efficiently.

That said, this challenge has reinforced my belief that understanding the trade-offs between different tools is key to making informed decisions as a developer. Each project comes with its own unique requirements, and the best technology choice is the one that balances simplicity, maintainability, and future scalability.

## Useful resources

- [AlpineJS](https://alpinejs.dev/)
- [AlpneJS Web Components](https://github.com/niconoclaste/alpinejs-web-components/)
- [Web Components Book](https://coryrylan.gumroad.com/l/web-component-essentials?layout=profile) - One valuable resource I'm using to learn about web components.
- [Every Layout](https://www.example.com/) - This is, by far, one of the most valuable resources on CSS and web layout I've found. Highly recomended.

## Author

- Website - Cesar Poumian
- [Frontend Mentor](https://www.frontendmentor.io/profile/cepoumian)
- [LinkedIn](https://www.linkedin.com/in/cesar-eduardo-poumian-orozco-407020b6/)
