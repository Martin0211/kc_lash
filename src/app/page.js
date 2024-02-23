import ButtonSubscribe from "../components/ButtonSubs"
import ButtonShare from "../components/ButtonShare"
import Image from 'next/image'
import profilePic from '../components/profilePic.jpg'
import salonPic from '../components/salonPic.jpg'
import ButtonLocation from "@/components/Ubication"
import Abaut from "@/components/Abaut"
import BotonPersonalizado from '../components/BottonRedes';
import IcomRedes from '../components/IconRedes';
import VideoTiktok from '../components/TiktokVideo';
import { BsWhatsapp, BsInstagram, BsTiktok, BsFacebook } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';

export default function Home() {

  return (
    <div className="bg-cover bg-center h-full bg-fixed" style={{ backgroundImage: `url(${salonPic.src})` }}>
        <div className="bg-black bg-opacity-50" >
        <div className="max-w-[600px] m-auto px-[20px] pb-24">

          <div className="flex justify-between py-4">
            <ButtonSubscribe />
            <ButtonShare />
          </div>

          <div className="flex flex-col items-center pb-4">
            <Image className="rounded-full"
              src={profilePic}
              alt="Picture of the author"
              width={141}
              height={141}
            />

            <h1 className="mt-4 text-center text-white">KC LASHES MX</h1>
            <ButtonLocation className="mb-4" />
            <div className="flex">
              <IcomRedes icon={BsWhatsapp} ruta="https://api.whatsapp.com/message/YMBXIE727E2VB1?autoload=1&app_absent=0" />
              <IcomRedes icon={BsInstagram} ruta="https://www.instagram.com/kclashes_mex/" />
              <IcomRedes icon={BsTiktok} ruta="https://www.tiktok.com/@kclashes_mex" />
              <IcomRedes icon={BsFacebook} ruta="https://www.facebook.com/kclashesmex" />
              <IcomRedes icon={CgMail} ruta="https://api.whatsapp.com/message/YMBXIE727E2VB1?autoload=1&app_absent=0" />
            </div>
          </div>

          <Abaut />

          <h3 className="text-center text-white">CONTACTAME AQUÍ. 👇</h3>
          <BotonPersonalizado
            icon={BsWhatsapp}
            titulo="WhatsApp"
            subtitulo="Comunicate conmigo Aquí"
            ruta="https://api.whatsapp.com/message/YMBXIE727E2VB1?autoload=1&app_absent=0"
          />
          <BotonPersonalizado
            icon={BsInstagram}
            titulo="instagram"
            subtitulo="Conoce mis trabajos Aquí"
            ruta="https://www.instagram.com/kclashes_mex/"
          />
          <BotonPersonalizado
            icon={BsTiktok}
            titulo="Tiktok"
            subtitulo="Aprende de extenciones de pestalas Aquí"
            ruta="https://www.tiktok.com/@kclashes_mex"
          />
          <BotonPersonalizado
            icon={BsFacebook}
            titulo="Facebook"
            subtitulo="Conoce un poco mas de mi Aquí"
            ruta="https://www.facebook.com/kclashesmex"
          />
          <h3 className="text-center text-white pb-4">LASHTIPS 💡</h3>
          <div className=' flex justify-center rounded-[36px]'>
            <VideoTiktok/>
          </div>

        </div>
      </div>
    </div>
  )
}
