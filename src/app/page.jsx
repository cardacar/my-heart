'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [hearts, setHearts] = useState([]);
  const [fallingWords, setFallingWords] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  let audio = null;
  
  const words = ["Conocerte", "Enamorarte", "Comprenderte", "Valorarte", "Respetarte", "Consentirte", "Extrañarte", "Pensarte", "Serte fiel", "Tenerte"];

  const handleClick = () => {
    setShowMessage(true);

    if (!audioStarted) {
      audio = new Audio('/10-Razones-Para-Amarte.mp3');
      audio.loop = true;
      audio.play().catch(error => console.log("Error playing audio:", error));
      setAudioStarted(true);

      setTimeout(() => {
        let index = 0;
        const wordInterval = setInterval(() => {
          if (index >= words.length) {
            clearInterval(wordInterval);
            return;
          }
          const r_left = Math.floor(Math.random() * 60) + 20; // Ajustado para evitar que se corte
          const word = words[index];
          index++;

          setFallingWords(prevWords => [
            ...prevWords,
            {
              id: Date.now(),
              text: word,
              left: r_left,
            }
          ]);
        }, 1500);
      }, 90000); // 1 minuto y 37 segundos (97,000 ms)
    }
  };

  useEffect(() => {
    const heartInterval = setInterval(() => {
      const r_num = Math.floor(Math.random() * 40) + 1;
      const r_size = Math.floor(Math.random() * 65) + 10;
      const r_left = Math.floor(Math.random() * 100) + 1;
      const r_bg = Math.floor(Math.random() * 25) + 100;
      const r_time = Math.floor(Math.random() * 5) + 5;

      setHearts(prevHearts => [
        ...prevHearts,
        {
          id: Date.now(),
          size: r_size,
          left: r_left,
          bg: `rgba(255, ${r_bg - 25}, ${r_bg}, 1)`,
          animationDuration: `${r_time}s`,
        },
        {
          id: Date.now() + 1,
          size: r_size - 10,
          left: r_left + r_num,
          bg: `rgba(255, ${r_bg - 25}, ${r_bg + 25}, 1)`,
          animationDuration: `${r_time + 5}s`,
        }
      ]);
    }, 500);

    return () => {
      clearInterval(heartInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-transparent overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute top-[-50%] transform rotate-[-45deg]"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              left: `${heart.left}%`,
              background: heart.bg,
              animation: `love ${heart.animationDuration} ease`,
            }}
          >
            <div className="absolute top-[-50%] left-0 w-full h-full rounded-full" style={{ background: heart.bg }}></div>
            <div className="absolute top-0 right-[-50%] w-full h-full rounded-full" style={{ background: heart.bg }}></div>
          </div>
        ))}
        
        {/* Letras cayendo sobre la carta */}
        {fallingWords.map(word => (
          <motion.div
            key={word.id}
            className="absolute text-6xl font-extrabold text-pink-500 drop-shadow-lg z-50"
            initial={{ y: "-10%", opacity: 0, scale: 1 }}
            animate={{ y: ["10%", "500%", "80%"], opacity: [1, 1, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ left: `${word.left}%`, fontFamily: 'cursive' }}
          >
            {word.text}
          </motion.div>
        ))}

        {/* Carta */}
        <motion.div
          className="w-80 h-[32rem] bg-gradient-to-b from-white to-gray-200 rounded-2xl shadow-2xl flex flex-col items-center justify-center cursor-pointer relative p-4 z-40"
          onClick={handleClick}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: showMessage ? 180 : 0 }}
          transition={{ duration: 1 }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {/* Frontal de la carta */}
          <div className={`absolute w-full h-full flex flex-col items-center justify-center ${showMessage ? "hidden" : "block"}`} style={{ backfaceVisibility: "hidden" }}>
            <div className="w-32 h-32 rounded-lg mb-4 flex items-center justify-center">
            <img src="/ten-para-ti.png" alt="Imagen" className="w-32 h-32 rounded-lg mb-4 object-cover" />
            </div>
            <div className="text-center text-xl font-bold text-black">
              Click para que empiece la magia 
            </div>
          </div>

          {/* Parte trasera de la carta */}
          <div className={`absolute w-full h-full flex flex-col items-center justify-center ${showMessage ? "block" : "hidden"}`} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <div className="w-32 h-32 rounded-lg mb-4 flex items-center justify-center">
            <img src="/ten-para-ti.png" alt="Imagen" className="w-32 h-32 rounded-lg mb-4 object-cover" />
            </div>
            <div className="text-center text-lg font-semibold text-pink-600 px-4">
            Aunque hoy estemos en diferentes servidores, mi amor por ti sigue corriendo sin bugs y con alta disponibilidad. Quisiera estar contigo para hacerte el desayuno sorpresa, pero cuando leas la carta quiero que revises la cuenta, conmigo nunca serás espectadora, siempre protagonista❤️.
            </div>
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes love {
          0% { top: 110%; }
        }
      `}</style>
    </div>
  );
}
