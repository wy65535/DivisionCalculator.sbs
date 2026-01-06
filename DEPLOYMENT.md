# Deployment Guide for DivisionCalculator.sbs

This guide will walk you through deploying your Long Division Calculator to GitHub Pages and Cloudflare Pages.

## Prerequisites

- A GitHub account
- A Cloudflare account (free tier is sufficient)
- Git installed on your computer
- Your custom domain (divisioncalculator.sbs) configured in your domain registrar

## Part 1: Deploy to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `DivisionCalculator.sbs` (or any name you prefer)
5. Make it **Public**
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Push Code to GitHub

Open your terminal/command prompt in the project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Long Division Calculator"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/DivisionCalculator.sbs.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages (Optional)

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Your site will be available at: `https://YOUR_USERNAME.github.io/DivisionCalculator.sbs/`

## Part 2: Deploy to Cloudflare Pages

### Step 1: Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click "Pages" in the left sidebar
3. Click "Create a project"
4. Click "Connect to Git"
5. Authorize Cloudflare to access your GitHub account
6. Select your `DivisionCalculator.sbs` repository

### Step 2: Configure Build Settings

On the setup page:

- **Project name**: `divisioncalculator-sbs` (or your preference)
- **Production branch**: `main`
- **Framework preset**: `None` (it's a static site)
- **Build command**: Leave empty
- **Build output directory**: `/`
- **Root directory**: `/`

Click "Save and Deploy"

### Step 3: Wait for Deployment

Cloudflare will now deploy your site. This usually takes 1-2 minutes.

Once complete, you'll see a URL like: `https://divisioncalculator-sbs.pages.dev`

## Part 3: Configure Custom Domain

### Step 1: Add Custom Domain in Cloudflare Pages

1. In your Cloudflare Pages project
2. Go to "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter: `divisioncalculator.sbs`
5. Click "Continue"

### Step 2: Update DNS Settings

If your domain is already on Cloudflare:
- Cloudflare will automatically add the necessary DNS records
- Wait for DNS propagation (usually 5-30 minutes)

If your domain is NOT on Cloudflare:
1. Go to your domain registrar's DNS settings
2. Add a CNAME record:
   - **Name**: `@` or leave empty for root domain
   - **Value**: `divisioncalculator-sbs.pages.dev` (your Cloudflare Pages URL)
   - **TTL**: Auto or 3600

For www subdomain, add another CNAME:
   - **Name**: `www`
   - **Value**: `divisioncalculator-sbs.pages.dev`
   - **TTL**: Auto or 3600

### Step 3: Enable HTTPS

Cloudflare automatically provides free SSL certificates. This may take a few minutes to activate.

## Part 4: Configure Google AdSense

### Step 1: Update ads.txt

1. Apply for Google AdSense if you haven't already
2. Once approved, you'll receive a publisher ID (format: `pub-XXXXXXXXXXXXXXXX`)
3. Open `ads.txt` file in your repository
4. Replace `pub-0000000000000000` with your actual publisher ID
5. Commit and push changes:

```bash
git add ads.txt
git commit -m "Update AdSense publisher ID"
git push
```

### Step 2: Add AdSense Code

1. Get your AdSense code from Google AdSense dashboard
2. Open `index.html`
3. Find the AdSense comment section (near the top of `<main>`)
4. Replace with your actual AdSense code:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

5. You can also add ad units where you want ads to appear
6. Commit and push changes

### Step 3: Add Ad Units (Optional)

You can insert ad units in strategic locations:

- Below the calculator
- Between content sections
- In the sidebar (if you add one)
- At the end of blog posts

Example ad unit:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## Part 5: Verify Deployment

### Checklist

✅ Site is accessible at https://divisioncalculator.sbs  
✅ HTTPS is working (green padlock in browser)  
✅ All pages load correctly (index, privacy, blog, 404)  
✅ Calculator works properly  
✅ Mobile responsive design works  
✅ sitemap.xml is accessible: https://divisioncalculator.sbs/sitemap.xml  
✅ robots.txt is accessible: https://divisioncalculator.sbs/robots.txt  
✅ ads.txt is accessible: https://divisioncalculator.sbs/ads.txt  

### Test Calculator Functionality

1. Enter some numbers (e.g., 156 ÷ 12)
2. Click "Calculate Division"
3. Verify step-by-step solution appears
4. Check that history saves calculations
5. Try quick calculation buttons
6. Test on mobile device

## Part 6: SEO Setup

### Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://divisioncalculator.sbs`
3. Verify ownership (Cloudflare makes this easy with DNS verification)
4. Submit your sitemap: `https://divisioncalculator.sbs/sitemap.xml`

### Submit to Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

### Google Analytics (Optional but Recommended)

1. Create a Google Analytics 4 property
2. Get your measurement ID (format: `G-XXXXXXXXXX`)
3. Add to the `<head>` section of your HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Part 7: Ongoing Maintenance

### Update Content Regularly

- Add new examples
- Expand FAQ section
- Write more blog posts
- Update for seasonal keywords

### Monitor Performance

- Check Google Analytics weekly
- Monitor Search Console for issues
- Track AdSense revenue
- Check for broken links

### Update Files

When you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

Cloudflare Pages will automatically rebuild and deploy your changes in 1-2 minutes!

## Troubleshooting

### Site not loading after deployment
- Check DNS settings in your domain registrar
- Wait for DNS propagation (can take up to 48 hours, usually much faster)
- Clear your browser cache

### Calculator not working
- Check browser console for JavaScript errors
- Verify all files uploaded correctly
- Test in different browsers

### AdSense not showing ads
- Make sure your site is approved by AdSense
- Ads may not show immediately (can take 24-48 hours)
- Check that ad code is correct
- Ensure ads.txt file is accessible

### Custom domain not working
- Verify CNAME record points to correct Cloudflare Pages URL
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net/)
- Make sure SSL/TLS is set to "Full" in Cloudflare

## Performance Tips

1. **Enable Cloudflare CDN features**:
   - Auto Minify (CSS, JS, HTML)
   - Brotli compression
   - HTTP/2 and HTTP/3

2. **Optimize images** (when you add them):
   - Use WebP format
   - Compress before uploading
   - Use Cloudflare Image Resizing

3. **Monitor Core Web Vitals**:
   - Use Google PageSpeed Insights
   - Aim for green scores on mobile and desktop

## Success Metrics to Track

- **Traffic**: Sessions, users, pageviews
- **Engagement**: Average session duration, bounce rate
- **SEO**: Search rankings, impressions, clicks (Search Console)
- **Revenue**: AdSense earnings, RPM, CTR
- **Performance**: Page load time, Core Web Vitals

## Next Steps

1. ✅ Deploy to GitHub
2. ✅ Deploy to Cloudflare Pages
3. ✅ Configure custom domain
4. ✅ Set up AdSense
5. ✅ Submit to search engines
6. 📊 Monitor and optimize
7. 💰 Start earning!

Congratulations! Your Long Division Calculator is now live and ready to help users while generating AdSense revenue.

