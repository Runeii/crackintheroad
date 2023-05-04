import { RefObject, useEffect, useState } from 'react'

function useIntersectionObserver(
  elementRef,
) {
  const root = null;
  const threshold = 0;
  const rootMargin = '0%';
  const freezeOnceVisible = false;

  const [entry, setEntry] = useState();

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]) => {
    setEntry(entry)
  }

  useEffect(() => {

    const node = elementRef?.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()

  }, [frozen, elementRef])

  return entry
}

export default useIntersectionObserver
