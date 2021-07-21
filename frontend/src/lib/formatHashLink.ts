export function formatHashLink(slug: string) {
    return slug.toLowerCase().replace(/ /g, "-");
}
