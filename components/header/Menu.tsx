import Icon from "$store/components/ui/Icon.tsx";
import { NavItemProps } from "./NavItem.tsx";

export interface Props {
  items: NavItemProps[];
}

function MenuItem({ items }: { items: NavItemProps[] | NavItemProps }) {
  if (Array.isArray(items)) {
    return (
      <ul>
        {items.map((menu) => (
          <li>
            <MenuItem items={menu} />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div class="collapse collapse-plus">
        <input type="checkbox" />
        <div class="collapse-title">{items.label}</div>
        <div class="collapse-content">
          <ul>
            <li>
              <a class="underline text-sm" href={items.links?.[0]?.href}>
                Ver todos
              </a>
            </li>
            {items.images?.map((menu) => (
              <li>
                <MenuItem items={menu} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem items={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-200">
        <li>
          <a class="flex items-center gap-4 px-4 py-2" href="/wishlist">
            <Icon id="Heart" size={24} strokeWidth={2} />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" size={24} strokeWidth={2} />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" size={24} strokeWidth={2} />
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
