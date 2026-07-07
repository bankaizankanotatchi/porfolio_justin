import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Langues supportées
  locales: ['fr', 'en'],
  
  // Langue par défaut
  defaultLocale: 'fr',
  
  // Utiliser les préfixes de langue dans les URL (ex: /fr/projets)
  localePrefix: 'always'
});

export const config = {
  // Matcher pour exclure les dossiers internes, les fichiers statiques et les routes API
  matcher: [
    // Activer l'i18n pour toutes les routes sauf celles ci-dessous
    '/((?!api|_next|_vercel|cv.pdf|profile.jpg|.*\\..*).*)',
    // Toujours appliquer la redirection de la racine
    '/'
  ]
};
