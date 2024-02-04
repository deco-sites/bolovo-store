import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
}

export interface Props {
  title?: string;
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   * @format textarea
   */
  facebookToken: string;

  /** @description Default is 5 */
  numberOfPosts?: number;
}

export async function loader(
  {
    title,
    facebookToken,
    numberOfPosts,
  }: Props,
  _req: Request,
) {
  const fields = ["media_url", "media_type", "permalink"];
  const joinFields = fields.join(",");
  const url =
    `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  const { data } = (await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching posts from instagram", err);
    return { data: [] };
  })) as {
    data: Data[];
  };

  return {
    data: data?.slice(0, numberOfPosts ?? 5) ?? [],
    title,
  };
}

export default function InstagramPosts({
  title,
  data = [
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url: "",
    },
  ],
}: SectionProps<typeof loader>) {
  if (data.length == 0) {
    return (
      null
    );
  }

  return (
    <div class="w-full py-8 flex flex-col gap-4">
      <h3 class=" text-base md:text-center text-left px-4 font-bold">
        {title}
      </h3>
      <div class="flex overflow-x-scroll sm:overflow-clip">
        <div
          class={`flex flex-row items-center justify-center place-items-center sm:w-full w-max px-4 sm:px-0`}
        >
          {data.map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              title="Visite nosso instagram"
              class=" overflow-hidden w-full group relative"
            >
              <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center flex-row gap-3 opacity-0 group-hover:opacity-100 transition duration-400 bg-[#0000005e]">
                <div class="flex 2/4 gap-1">
                  <Icon id="LikeIntagram" size={24} colorRendering="#fff" />
                  <span class="text-white font-bold">
                    200
                  </span>
                </div>
                <div class="flex 2/4 gap-1">
                  <Icon
                    id="CommentIntagram"
                    width={24}
                    height={24}
                    class="scale-x-[-1]"
                  />
                  <span class="text-white font-bold">
                    12
                  </span>
                </div>
              </div>
              <Image
                class="max-w-full max-h-full min-w-[170px] object-cover w-full "
                src={item.media_url}
                alt="Imagem do instagram"
                width={350}
                height={350}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
