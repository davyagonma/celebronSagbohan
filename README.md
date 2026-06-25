# #CelebronSagbohan

Hommage mobile-first à Sagbohan Danialou, légende vivante de la musique béninoise.

Initiative **Benin Bouge × Podlab Media**.

## Lancer le site

```bash
cd site
npm install
npm run dev
```

Ouvrir `http://localhost:5173`

## Ajouter des images

1. Déposer les fichiers dans `public/images/`
2. Mettre à jour `src/data/content.ts` :
   - `galleryImages` pour la galerie
   - `moments[].image` pour les moments forts
   - `imagePlaceholders` : retirer les slots remplis

## Logos partenaires

Remplacer les wordmarks texte dans `SponsorBar.tsx` par les SVG officiels :

```
public/logos/benin-bouge.svg
public/logos/podlab-media.svg
```

## Sources

Contenu compilé depuis les PDF du dossier parent : Wikipédia, L'investigateur, My Addictive, Discogs, Apple Music.
