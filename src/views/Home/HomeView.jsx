import { Link } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import WhatsappButton from "../../components/common/WhatsappButton/whatsappButton";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchHome } from "../../store/slices/homeSlice";

import "./HomeView.css";
import sanAndresImg from "../../assets/banioUdesa.jpeg";

const HomeView = () => {
  const dispatch = useAppDispatch();
  const homeState = useAppSelector((s) => s.home) || {};
  const data = homeState.data ?? null;
  const status = homeState.status ?? "idle";
  const isUsingFallback = homeState.isUsingFallback ?? true;

  useEffect(() => {
    if (status === "idle") dispatch(fetchHome());
  }, [dispatch, status]);

  const fallback = {
    brandName: "DryMat",
    heroText:
      "Alfombras de goma para mingitorios: higiene, diseño y funcionalidad para baños de alto tránsito.",
    diffItems: [
      {
        title: "Higiene real",
        text: "Reduce salpicaduras y ayuda a mantener el baño limpio por más tiempo.",
      },
      {
        title: "Material premium",
        text: "Goma resistente, antideslizante y preparada para uso intensivo.",
      },
      {
        title: "Reemplazo mensual",
        text: "Las alfombrillas se reemplazan cada 30 días para asegurar máxima higiene y efectividad.",
      },
    ],
  };

  const view = isUsingFallback || !data ? fallback : { ...fallback, ...data };

  return (
    <div className="home-view">
      <Navbar />

      <main className="home-content">
        {status === "loading" && (
          <div style={{ marginBottom: "1rem", opacity: 0.8 }}>Cargando...</div>
        )}

        {/* HERO */}
        <section className="hero-section">
          <h1>{view.brandName}</h1>
          <p>{view.heroText}</p>
        </section>

        {/* INTRO */}
        <section className="intro-section">
          <h2>¿Quiénes somos?</h2>
          <p>
            En <strong>DryMat</strong> desarrollamos alfombras de goma diseñadas
            específicamente para mingitorios, con el objetivo de mejorar la
            higiene, reducir salpicaduras y optimizar la limpieza.
          </p>
          <p>
            Nuestros productos combinan{" "}
            <strong>funcionalidad, durabilidad y diseño</strong>, ofreciendo una
            solución práctica tanto para espacios comerciales como
            institucionales.
          </p>
        </section>

        {/* DIFERENCIADOR */}
        <section className="diferenciador-section">
          <h2>¿Qué nos diferencia?</h2>
          <div className="diferenciador-content">
            {(view.diffItems || []).map((it, idx) => (
              <div className="diferenciador-item" key={idx}>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLIENTES / INSTALACIONES */}
        <section className="clientes-section">
          <h2>Nuestro producto en acción</h2>
          <p>Conocé cómo se ve instalado en un entorno real.</p>

          <div className="clientes-grid">
            <div className="cliente-item">
              <img
                src={sanAndresImg}
                alt="Instalación de DryMat en mingitorio"
              />
              <h3>Instalación real</h3>
              <p>Ejemplo de colocación en baño institucional.</p>
            </div>

            <div className="cliente-item">
              <div className="cliente-placeholder">Próximamente</div>
              <h3>Más casos</h3>
              <p>Sumaremos más fotos y casos de uso.</p>
            </div>
          </div>
        </section>

        {/* OBJETIVO */}
        <section className="objetivo-section">
          <h2>Nuestro objetivo</h2>
          <p>
            Mejorar la experiencia en baños públicos y privados con una solución
            simple, efectiva y duradera.
          </p>
          <p>
            Si estás buscando elevar el estándar de higiene en tu espacio, DryMat
            es una opción pensada para uso real.
          </p>
        </section>

        {/* CTA (SIN BOTÓN) */}
        <section className="contacto-cta">
          <h2>¿Querés una cotización?</h2>
          <p>
            Escribinos por WhatsApp o completá el formulario de contacto{" "}
            <Link to="/contacto" className="cta-link">
              acá
            </Link>
            , y te respondemos a la brevedad.
          </p>
        </section>
      </main>

      <WhatsappButton />
      <Footer />
    </div>
  );
};

export default HomeView;
