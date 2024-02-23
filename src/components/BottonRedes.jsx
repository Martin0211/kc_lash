
import Link from 'next/link';

export default function BotonPersonalizado({ icon: Icon, titulo, subtitulo, ruta }) {

    return (
        <Link href={ruta}>
            <div className="bg-[#01121EBA] border-2 border-white text-white rounded-[36px] py-2 my-4 text-center flex items-center ">
                <div className='w-[55px] flex justify-center'>
                <Icon  size={27} />
                </div>
                <div className='w-full'>
                    <h1 className="h-[26.25px] text-lg font-semibold">{titulo}</h1>
                    <h3 className="h-[21px] text-sm">{subtitulo}</h3>
                </div>
            </div>
        </Link>
    );
}

