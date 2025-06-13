# Running the app
1. Checkout this repository
2. Change directory into the project root (meet-the-met)
3. Run `npm install`
4. Run `npm run dev`

You should now be able to run the app in your browser at http://localhost:5173/

# Tech Stack
**React + TypeScript + Vite + TailwindCSS**

From Vite README:
> This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

I used Vite to bootstrap this project because it's fast to develop with and has a well documented plugin API with useful plugins, like [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite).
I included Tailwind CSS because I wanted to use a CSS library I'm familiar with that provides utility classes for quick prototyping.

# Features

## Prompted features
- ✅ A view for paginated display of objects - "Gallery" view. I would make this an infinite loader (Load More button instead of Prev/Next buttons) to make it more user-friendly for mobile users, if I had more time.
- ✅ A view for individual object details - "Object Details" view
- ❌ Filter objects by department - Did not have time
- ✅ Search for object by ID - Input in Object Details view. Details update on input value change.
- ✅ Search for object by title - Input in Object Details view. Click the "Search by Title" button to update details.
- ✅ Interface is mobile responsive - More or less. There are some styles/layout that change with viewport width like gallery grid columns. I could have done more like added a mobile menu, and used more carefully adjusted sizings to viewport widths.
- ✅ Interface is stylized - Technically, yes, but pretty basic. Thought about trying to match the Met website's aesthetic, but ran out of time.

## Additional features
- Uses local storage for caching individual objects from Met API.
- Uses [React Router](https://reactrouter.com/home)'s data router for rendering/linking between individual views and preloading data on view changes.