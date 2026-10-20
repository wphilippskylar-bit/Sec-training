#!/usr/bin/env python3
"""Builds the deployable GitHub Pages folder (dist/) and a zip for upload."""
import json, os, shutil, zipfile, hashlib
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC, DIST = os.path.join(ROOT, 'src'), os.path.join(ROOT, 'dist')
APP = {'name': 'Security+ Range', 'short': 'Sec+ Range', 'id': 'secplusrange', 'glyph': 'S+', 'color': '#2dd4bf', 'bg': '#0a0e13', 'desc': 'Game-mode CompTIA Security+ SY0-701 prep: every objective, 1,100+ explained questions, hands-on PBQ labs, XP and levels.'}
JS = ['bank.js', 'refdata.js', 'c0.js', 's1.js', 's2.js', 's3.js', 's4.js', 's5.js', 'tools.js', 'labpbq.js', 'app.js']
EXTRA_FILES = []

def read(n): return open(os.path.join(SRC, n), encoding='utf-8').read()

def icons(out):
    os.makedirs(out, exist_ok=True)
    def draw(size, pad=0.0):
        im = Image.new('RGB', (size, size), APP['bg']); d = ImageDraw.Draw(im)
        s = size; inset = int(s * pad)
        c = tuple(int(APP['color'][i:i + 2], 16) for i in (1, 3, 5))
        # rounded panel
        d.rounded_rectangle([inset, inset, s - inset, s - inset], radius=int(s * .18), fill='#101823', outline=c, width=max(2, s // 64))
        # three nodes + links
        w = max(2, s // 40)
        for (cx, cy, r) in [(.36, .52, .14), (.52, .42, .18), (.67, .53, .13)]:
            d.ellipse([s * (cx - r), s * (cy - r), s * (cx + r), s * (cy + r)], outline=c, width=w, fill='#101823')
        d.rectangle([s * .36, s * .52, s * .67, s * .66], fill='#101823')
        d.line([s * .36, s * .66, s * .67, s * .66], fill=c, width=w)
        try:
            f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', int(s * .12))
            d.text((s * .515, s * .56), APP['glyph'], font=f, fill='#ffffff', anchor='mm')
        except Exception:
            pass
        return im
    draw(192).save(os.path.join(out, 'icon-192.png'))
    draw(512).save(os.path.join(out, 'icon-512.png'))
    draw(512, .1).save(os.path.join(out, 'icon-maskable-512.png'))
    draw(180).save(os.path.join(out, 'apple-touch-icon.png'))

def main():
    if os.path.exists(DIST): shutil.rmtree(DIST)
    os.makedirs(DIST)
    css = read('style.css')
    js = '\n;\n'.join(read(n) for n in JS).replace('</script', '<\\/script')
    ver = hashlib.sha1((css + js).encode()).hexdigest()[:10]
    html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="{APP['bg']}">
<meta name="description" content="{APP['desc']}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="{APP['short']}">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="icon" type="image/png" href="icons/icon-192.png">
<title>{APP['name']}</title>
<style>
{css}
</style>
</head>
<body>
<noscript>This study app needs JavaScript enabled.</noscript>
<script>
/* build {ver} */
{js}
</script>
</body>
</html>
'''
    open(os.path.join(DIST, 'index.html'), 'w', encoding='utf-8').write(html)
    manifest = {'name': APP['name'], 'short_name': APP['short'], 'description': APP['desc'], 'start_url': './', 'scope': './',
                'display': 'standalone', 'orientation': 'any', 'background_color': APP['bg'], 'theme_color': APP['bg'],
                'icons': [{'src': 'icons/icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
                          {'src': 'icons/icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
                          {'src': 'icons/icon-512-maskable.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'}]}
    json.dump(manifest, open(os.path.join(DIST, 'manifest.json'), 'w'), indent=2)
    sw = read('sw.js').replace('__VERSION__', APP['id'] + '-' + ver)
    open(os.path.join(DIST, 'sw.js'), 'w').write(sw)
    for ef in EXTRA_FILES:
        shutil.copy(os.path.join(SRC, ef), os.path.join(DIST, ef))
    shutil.copytree(os.path.join(ROOT, 'extract', 'icons'), os.path.join(DIST, 'icons'))
    shutil.copy(os.path.join(ROOT, 'game.html'), os.path.join(DIST, 'game.html'))
    shutil.copy(os.path.join(DIST, 'sw.js'), os.path.join(DIST, 'service-worker.js'))
    shutil.copy(os.path.join(ROOT, 'README.md'), os.path.join(DIST, 'README.md'))
    open(os.path.join(DIST, '.nojekyll'), 'w').close()
    z = os.path.join(ROOT, APP['id'] + '.zip')
    with zipfile.ZipFile(z, 'w', zipfile.ZIP_DEFLATED) as zf:
        for base, _, files in os.walk(DIST):
            for f in files:
                p = os.path.join(base, f); zf.write(p, os.path.relpath(p, DIST))
    print('built', ver, 'index.html', os.path.getsize(os.path.join(DIST, 'index.html')) // 1024, 'KB ->', z)

if __name__ == '__main__':
    main()
