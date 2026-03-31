import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/result/'],
      },
    ],
    sitemap: 'https://leavecalculator.sg/sitemap.xml',
    host: 'https://leavecalculator.sg',
  }
}
