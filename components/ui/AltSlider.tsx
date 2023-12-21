interface Props {
  text: string;
}

function AltSlider({ text }: Props) {

return (
    <div className="py-[15px] absolute bottom-0 left-0 right-0 bg-white flex items-center justify-center overflow-hidden transition-transform 
        duration-300 translate-y-[100%] group-hover:translate-y-[0%]">
        <div className="w-4/5 text-center">
            <p className="text-[#121212] font-semibold text-center leading-[130%]">{text}</p>
        </div>
    </div>
  );
}

export default AltSlider;