export const seoData = {
  description: 'Découvrez les recommandations culturelles issues du Floodcast. Accédez à une liste organisée par épisode, regroupant films, livres, musiques et autres suggestions partagées par les participants.',
  ogTitle: 'Recommandations culturelles du Floodcast',
  image: 'https://reco-cultu-floodcast.fr/cover.jpg',
  mySite: 'https://reco-cultu-floodcast.fr',
}

export const siteMetaData = [
  {
    name: 'description',
    content: seoData.description,
  },
  // Test on: https://developers.facebook.com/tools/debug/ or https://socialsharepreview.com/
  { property: 'og:site_name', content: seoData.mySite },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:url',
    content: seoData.mySite,
  },
  {
    property: 'og:title',
    content: seoData.ogTitle,
  },
  {
    property: 'og:description',
    content: seoData.description,
  },
  {
    property: 'og:image',
    content: seoData.image,
  },
  // Test on: https://cards-dev.twitter.com/validator or https://socialsharepreview.com/
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:url',
    content: seoData.mySite,
  },
  {
    name: 'twitter:title',
    content: seoData.ogTitle,
  },
  {
    name: 'twitter:description',
    content: seoData.description,
  },
  {
    name: 'twitter:image',
    content: seoData.image,
  },
]
