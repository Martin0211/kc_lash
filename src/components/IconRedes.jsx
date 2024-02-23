import Link from 'next/link';

export default function IcomRedes({ icon: Icon, titulo, subtitulo, ruta }) {

    return (
        <Link href={ruta}>
            <div className="text-white font-bold p-2 flex flex-col items-center">
                <Icon size={28} />
            </div>
        </Link>
    );
}