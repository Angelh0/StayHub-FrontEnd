import React, { useState } from "react";
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-16 px-10 border-t border-white/10">

      <div className="mx-auto max-w-7xl grid grid-cols-4 items-start lg:grid-cols-5 md:grid-cols-3 gap-12">

        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center">
            <h2 className="text-3xl text-white uppercase font-bold border-black">
              St{" "}
            </h2>
            <MapPin size={25} className="text-yellow-500" />
            <h2 className="text-3xl text-white uppercase font-bold">yHub</h2>
          </div>

          <p className="text-gray-400/50 text-sm">
            En StayHub conectarás con los mejores alojamientos de España
          </p>

          <div className="flex flex-col text-sm ">
            <div className="flex items-center gap-3 py-2.5">
                <h2><Mail size={20} className="text-white hover:text-yellow-400 cursor-pointer"></Mail></h2>
                <span>info@stayhub.es</span>
            </div>

            <div className="flex items-center py-2.5 gap-2.5">
                <h2><Phone size={20} className="text-white hover:text-yellow-400 cursor-pointer"></Phone></h2>
                <span>+34 601 34 62 91</span>
            </div>

            <div className="flex items-center gap-2.5 py-2.5">
                <h2><MapPin size={20} className="text-white hover:text-yellow-400 cursor-pointer"></MapPin></h2>
                <span>Santa Cruz de Tenerife, España</span>
            </div>
          </div>
        </div>
          

            <div className="flex flex-col gap-6">
                <h2 className="text-yellow-400 font-bold uppercase text-xs">Empresa</h2>
                <ul className="text-white/50 text-sm space-y-3">
                <li className="hover:text-yellow-400 cursor-pointer">Sobre Nosotros</li>
                <li className="hover:text-yellow-400 cursor-pointer">Como Funciona</li>
                <li className="hover:text-yellow-400 cursor-pointer">Prensa</li>
                <li className="hover:text-yellow-400 cursor-pointer">Carreras</li>
                </ul>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-yellow-400 font-bold uppercase text-xs">Soporte</h2>
                <ul className="text-white/50 text-sm space-y-3">
                <li className="hover:text-yellow-400 cursor-pointer">Centro de ayuda</li>
                <li className="hover:text-yellow-400 cursor-pointer">Opciones de Cancelacion</li>
                <li className="hover:text-yellow-400 cursor-pointer">Seguridad</li>
                <li className="hover:text-yellow-400 cursor-pointer">Accesibilidad</li>
                </ul>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-yellow-400 font-bold uppercase text-xs">Legal</h2>
                <ul className="text-white/50 text-sm space-y-3">
                <li className="hover:text-yellow-400 cursor-pointer">Terminos de Servicio</li>
                <li className="hover:text-yellow-400 cursor-pointer">Política de Privacidad</li>
                <li className="hover:text-yellow-400 cursor-pointer">Cookies</li>
                <li className="hover:text-yellow-400 cursor-pointer">Aviso Legal</li>
                </ul>
            </div>
        
      </div>

            <div className="w-full max-w-7xl mx-auto mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-5">
                <p className="text-sm">© 2026 StayHub. Todos los derechos reservados.</p>

                <div className="flex gap-6 text-zinc-500">
                    <Instagram size={20} className="hover:text-yellow-500 cursor-pointer transition-all hover:-translate-y-1" />
                    <Twitter size={20} className="hover:text-yellow-500 cursor-pointer transition-all hover:-translate-y-1" />
                    <Facebook size={20} className="hover:text-yellow-500 cursor-pointer transition-all hover:-translate-y-1" />
                    <Linkedin size={20} className="hover:text-yellow-500 cursor-pointer transition-all hover:-translate-y-1" />

                </div>
            </div>
    </footer>
  );
};

export default Footer;
