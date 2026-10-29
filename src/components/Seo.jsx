import { useEffect } from 'react'

const setMeta = (selector, attribute, value, content) => {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function Seo({ title, description }) {
  useEffect(() => {
    const fullTitle = `${title} | RodeghieroTech`
    const canonical = `${window.location.origin}${window.location.pathname}`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    setMeta('meta[property="og:image"]', 'property', 'og:image', `${window.location.origin}/img/logo-henrique-r.png`)
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary')
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  }, [title, description])

  return null
}
