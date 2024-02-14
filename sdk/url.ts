export const relative = (link?: string | undefined) => {
  const linkUrl = link ? new URL(link) : undefined;
  const linkPath = linkUrl ? `${linkUrl.pathname}${linkUrl.search}` : undefined;
  return linkPath;
};

export const skuid = (link?: string | undefined) => {
  const linkUrl = link ? new URL(link) : undefined;
  const linkPath = linkUrl ? `${linkUrl.search.replace("?skuId=", "")}` : undefined;
  return linkPath;
};
