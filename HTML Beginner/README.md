# its.zerrjake — How to add your images

This repository is a static personal site scaffold. To insert your own image(s), follow these steps:

1) Add the image to the `assets/` folder
   - For example: `assets/my-photo.jpg` or `assets/gallery-myphoto.jpg`
   - Use image sizes around 1200x800 for hero/gallery images and 800x800 (square) for profile images.

2) Update the HTML where you want your image
   - About/profile: replace `assets/profile.svg` with your `assets/myphoto.jpg`
   - Gallery: replace or add images inside `.gallery-grid`, e.g.

```html
<figure class="gallery-item">
  <img src="assets/gallery-myphoto.jpg" alt="My Photo">
  <figcaption>My photo</figcaption>
</figure>
```

3) Optimization suggestions
   - Use JPEG (or WEBP/AVIF for smaller sizes) and compress to ~100-200KB for faster loads.
   - Use `loading="lazy"` on gallery images to reduce initial load time.

4) Helpful commands (optional)
   - Preview locally (PowerShell):
   ```powershell
   python -m http.server 8080
   # open http://localhost:8080
   ```

If you want, I can also add a small upload helper script or convert any image you provide into optimized sizes and add them to the `assets/` folder for you — tell me and upload the file here (or tell me the path you'd like to use).