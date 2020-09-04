import { useRouter } from 'next/router';

const getTagIds = (tagIds: string | string[] | undefined): number[] => {
  if (tagIds && !Array.isArray(tagIds)) {
    return tagIds.split(',').map((id) => parseInt(id));
  }

  return [];
};

export const useSelectTags = (url: { href: string; as: string }) => {
  const router = useRouter();
  const tagIds: number[] = getTagIds(router.query.tags);

  const selectTag = (tagId: number) => () => {
    if (tagId === -1) {
      return router.replace(url.href, url.as);
    }

    if (tagId === -2 && !tagIds.includes(-2)) {
      return router.replace(`${url.href}?tags=-2`, `${url.as}?tags=-2`);
    }

    const newTags = (tagIds.includes(tagId)
      ? tagIds.filter((a) => a !== tagId)
      : [...tagIds, tagId]
    )
      .filter((a) => a > 0)
      .join(',');

    router.replace(`${url.href}?tags=${newTags}`, `${url.as}?tags=${newTags}`);
  };

  return [selectTag, tagIds] as const;
};
