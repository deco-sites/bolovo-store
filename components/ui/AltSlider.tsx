interface Props {
  text: string;
}

function AltSlider({ text }: Props) {
  return (
    <div class="py-[15px] absolute bottom-0 left-0 right-0 bg-white flex items-center justify-center overflow-hidden transition-transform 
      duration-300 translate-y-[100%] group-hover:translate-y-[0.5%]">
      <div class="w-4/5 text-center">
        <div
          class="text-[#121212] font-semibold text-center leading-[130%]"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
}

export default AltSlider;
