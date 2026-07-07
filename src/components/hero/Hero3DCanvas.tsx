"use client";

export default function Hero3DCanvas() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none scale-[1.1] sm:scale-[1.4] md:scale-[1.6] lg:scale-[1.8]">
      <div className="macbook">
        <div className="macbook-inner">
          {/* Écran du MacBook */}
          <div className="macbook-screen">
            <div className="face-one">
              <div className="camera"></div>
              <div className="display" style={{ backgroundImage: "url('/profile.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="shade"></div>
              </div>
              <span>MacBook Air</span>
            </div>
          </div>

          {/* Corps du MacBook */}
          <div className="macbody">
            <div className="face-one">
              <div className="touchpad"></div>
              <div className="keyboard">
                {/* Touches du clavier */}
                <div className="key"></div>
                <div className="key"></div>
                <div className="key"></div>
                <div className="key"></div>
                <div className="key"></div>
                <div className="key space"></div>
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className={`key ${i < 15 ? "f" : ""}`}></div>
                ))}
              </div>
            </div>
            <div className="pad one"></div>
            <div className="pad two"></div>
            <div className="pad three"></div>
            <div className="pad four"></div>
          </div>
        </div>

        {/* Ombre portée */}
        <div className="macbook-shadow"></div>
      </div>
    </div>
  );
}
