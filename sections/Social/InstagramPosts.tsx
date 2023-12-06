import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";

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
  const url = `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  const { data } = (await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching posts from instagram", err);
    return { data: [] };
  })) as {
    data: Data[];
  };

  return {
    data: data.slice(0, numberOfPosts ?? 5),
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
  return (
    <>
      {data.length > 0 ?
        <div class="w-full py-8 flex flex-col gap-4">
          <h3 class=" text-base md:text-center text-left px-4 font-bold">{title}</h3>
          <div class="flex overflow-x-hidden sm:overflow-clip">
            <div
              class={`flex flex-row items-center justify-center place-items-center sm:w-full w-max px-4 sm:px-0`}
            >
              {data.map((item) => (
                <a
                  key={item.id}
                  href={item.permalink}
                  target="_blank"
                  title="Visite nosso instagram"
                  class=" overflow-hidden w-full group"
                >
                  <Image
                    class="max-w-full max-h-full min-w-[170px] object-cover w-full group-hover:scale-110  transition duration-400 group-hover:brightness-90"
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
        :
        null
      }
    </>
  );
}
