import BannerGrid, {
  Props as BannerGridProps,
} from "../../components/content/BannerGrid.tsx";
import type { SectionProps } from "deco/types.ts";

/**
 * @titleBy matcher
 */
export interface BannerGrid {
  matcher: string;
  banner: BannerGridProps;
}

export interface Props {
  bannersGrid: BannerGrid[];
}

export default function BannerCategoryGrid(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const { bannerGrid } = props;

  if (!bannerGrid) {
    return null;
  }

  return <BannerGrid {...bannerGrid.banner} />;
}
export const loader = (props: Props, req: Request) => {
  const { bannersGrid } = { ...props };

  const bannerGrid = bannersGrid.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { bannerGrid };
};
